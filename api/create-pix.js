export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ATENASPAY_API_KEY;
  const baseUrl = (process.env.ATENASPAY_BASE_URL || 'https://atenaspay.com.br').replace(/\/$/, '');

  if (!apiKey) {
    return res.status(503).json({
      error: 'Pagamento indisponível',
      message: 'Configure ATENASPAY_API_KEY e ATENASPAY_BASE_URL no ambiente do deploy.'
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (error) {
      return res.status(400).json({ error: 'JSON inválido' });
    }
  }

  body = body || {};

  const externalId = String(body.external_id || '').trim();
  const amount = Number(body.amount || 0);
  const name = String(body.payer?.name || body.customerName || '').trim();
  const cpf = String(body.payer?.cpf || body.customerCpf || '').replace(/\D/g, '');
  const email = String(body.payer?.email || body.customerEmail || '').trim();

  if (!externalId) {
    return res.status(400).json({ error: 'external_id obrigatório' });
  }

  if (!Number.isFinite(amount) || amount < 1) {
    return res.status(400).json({ error: 'amount inválido', message: 'O valor mínimo é R$ 1,00.' });
  }

  if (!name || cpf.length !== 11 || !email) {
    return res.status(400).json({ error: 'Dados do pagador obrigatórios', message: 'Informe nome, CPF e e-mail.' });
  }

  const payload = {
    external_id: externalId,
    amount: Number(amount.toFixed(2)),
    description: body.description || 'Pedido Magia Natalina',
    payer: {
      name,
      cpf,
      email
    }
  };

  if (process.env.ATENASPAY_SHOP_ID) payload.shop_id = process.env.ATENASPAY_SHOP_ID;
  if (process.env.ATENASPAY_WEBHOOK_URL) payload.webhook_url = process.env.ATENASPAY_WEBHOOK_URL;

  try {
    const response = await fetch(`${baseUrl}/api/pix/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status || 502).json({
        error: 'Erro ao criar cobrança na AtenasPay',
        details: data
      });
    }

    return res.status(200).json({
      ok: true,
      external_id: data.external_id || externalId,
      txid: data.txid || data.id || data.transaction_id || null,
      status: data.status || 'PENDING',
      amount: Number(amount.toFixed(2)),
      qr_code: data.qr_code || data.qrCode || '',
      qr_code_base64: data.qr_code_base64 || data.qrCodeBase64 || '',
      pix_copy_paste: data.pix_copy_paste || data.pixCopyPaste || data.emv || data.copiacola || '',
      raw: data
    });
  } catch (error) {
    return res.status(502).json({
      error: 'Falha ao comunicar com a AtenasPay',
      message: error.message
    });
  }
}
