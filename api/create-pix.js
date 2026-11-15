export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ATENASPAY_API_KEY;
  const baseUrl = (process.env.ATENASPAY_BASE_URL || 'https://atenaspay.com.br').replace(/\/$/, '');

  if (!apiKey) {
    return res.status(500).json({
      error: 'ATENASPAY_API_KEY não configurada',
      message: 'Configure a variável ATENASPAY_API_KEY no painel do Vercel.'
    });
  }

  let payload = {};
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch (err) {
    return res.status(400).json({ error: 'JSON inválido', detail: err.message });
  }

  const amount = Number(payload.amount || 0);
  const description = payload.description || 'Pedido Magia Natalina';
  const referenceId = payload.reference_id || `mn-${Date.now()}`;
  const payer = payload.payer || {
    name: payload.customerName || 'Cliente',
    email: payload.customerEmail || '',
    cpf: payload.customerCpf || ''
  };

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount inválido' });
  }

  try {
    const response = await fetch(`${baseUrl}/api/pix/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        amount,
        description,
        reference_id: referenceId,
        payer
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro ao criar cobrança na AtenasPay',
        message: data.message || data.error || 'AtenasPay retornou erro',
        details: data
      });
    }

    const qrCode = data.qr_code || data.qrCode || data.qrcode || data.qrCodeBase64 || '';
    const emv = data.pix_copy_paste || data.pixCopyPaste || data.emv || '';
    const txid = data.id || data.transaction_id || data.txid || referenceId;

    return res.status(200).json({
      ok: true,
      id: txid,
      status: data.status || 'PENDING',
      amount,
      qrCode,
      emv,
      raw: data
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Falha ao comunicar com a AtenasPay',
      message: err.message
    });
  }
}
