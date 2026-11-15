const PRODUCTS = {
  'tapete-de-entrada-tradicional-com-design-de-floco-de-neve-e-': 177.80,
  'festao-de-natal-verde-com-lacos': 77.68,
  'capa-natalina-para-micro-ondas': 74.98,
  'cordao-de-luzes-led-solar-em-formato-de-cogumelos': 161.38,
  'projetor-led-natalino-com-papai-noel-e-arvore-de-natal': 108.75,
  'cordao-de-luzes-led-cogumelos': 96.92,
  'cordao-de-luzes-led-solar-em-fio-de-cobre': 71.50,
  'luminaria-de-jardim-em-forma-de-treno-de-papai-noel-luz-sola': 298.85,
  'cascata-de-luzes-led-natalinas-gotas-de-gelo': 119.35,
  'cordao-de-luzes-led-com-folhas-verdes': 127.67,
  'mini-enfeite-natalino-papai-noel-vermelho': 30.08,
  'arvore-de-natal-de-feltro-infantil-diy-com-enfeites-decorati': 132.58,
  'calendario-do-advento-com-cena-de-natal-24-figuras-de-acrili': 151.03,
  'papai-noel-escalando-com-luzes-led': 220.55,
  'enfeite-natalino-de-madeira-para-canto-de-porta': 78.04,
  'enfeites-natalinos-pendentes': 75.95,
  'kit-4-capas-de-almofada-natalinas-45x45cm-em-poliester': 134.60,
  'enfeite-natalino-iluminado-com-led-para-porta': 180.98,
  'kit-de-decoracao-natalina-para-banheiro': 161.65,
  'caneca-de-cafe-de-papai-noel-500ml-caneca-de-ceramica-com-de': 109.78,
  'kit-com-10-enfeites-natalinos-de-madeira': 92.57,
  'boneco-natalino-telescopico-de-pelucia': 177.35,
  'kit-com-10-ou-20-flores-de-natal-artificiais-com-glitter-14-': 104.45,
  'estrela-de-belem-natalina-iluminada-com-led': 209.98,
  'mini-papai-noel-para-monitor-tv': 49.90,
  'calendario-do-advento-em-forma-de-chamine-lareira-com-papai-': 189.90,
  'estatua-de-anjo-querubim-branco-pensativo': 79.90,
  'boneco-de-neve-mini-com-cartola-e-cachecol': 45.90,
  'estatua-de-rena-branca-com-cachecol': 89.90,
  'anjo-branco-orando': 69.90,
  'treno-vermelho-decorativo-de-natal': 59.90,
  'letras-3d-feliz-natal-vermelhas-com-floco-de-neve': 74.90,
  'arvores-de-natal-de-papel-acordeao': 54.90,
  'anjo-led-dourado-com-cauda-de-estrelas': 99.90,
  'mini-arvore-de-natal-com-laco-vermelho-e-bolas-douradas': 67.90,
  'presepio-kit-natividade-completo-com-figuras': 129.90,
  'kit-de-blocos-de-montar-treno-merry-christmas': 79.90,
  'caixa-de-presente-decorativa-com-pernas-e-rosto': 39.90
};

function jsonError(res, status, error, message) {
  return res.status(status).json({ error, message });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return jsonError(res, 405, 'Method not allowed');
  }

  const apiKey = process.env.ATENASPAY_API_KEY;
  if (!apiKey) return jsonError(res, 503, 'Pagamento indisponível', 'A loja ainda não configurou a chave AtenasPay.');

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); }
    catch { return jsonError(res, 400, 'JSON inválido'); }
  }
  body = body || {};

  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 50) {
    return jsonError(res, 400, 'Carrinho inválido', 'Envie uma lista de produtos e quantidades.');
  }

  let totalCents = 0;
  const lines = [];
  for (const item of body.items) {
    const id = String(item && item.id || '');
    const qty = Number(item && item.qty);
    if (!Object.prototype.hasOwnProperty.call(PRODUCTS, id) || !Number.isInteger(qty) || qty < 1 || qty > 20) {
      return jsonError(res, 400, 'Item inválido', 'Confira os produtos e quantidades do carrinho.');
    }
    const unitCents = Math.round(PRODUCTS[id] * 100);
    totalCents += unitCents * qty;
    lines.push(`${qty}x ${id}`);
  }

  if (totalCents < 100) return jsonError(res, 400, 'Valor mínimo', 'O pedido mínimo é R$ 1,00.');
  const amount = (totalCents / 100).toFixed(2);

  const externalId = String(body.external_id || '');
  if (!/^[A-Za-z0-9_-]{8,80}$/.test(externalId)) {
    return jsonError(res, 400, 'external_id inválido', 'Envie um identificador estável para esta tentativa de pagamento.');
  }

  const payer = body.payer || {};
  const payerName = String(payer.name || '').trim().slice(0, 120);
  const payerCpf = String(payer.cpf || '').replace(/\D/g, '');
  const payerEmail = String(payer.email || '').trim().slice(0, 254);
  if (!payerName || payerCpf.length !== 11 || !payerEmail) {
    return jsonError(res, 400, 'Dados do pagador inválidos', 'Informe nome, CPF e e-mail para gerar o Pix.');
  }

  const origin = req.headers.origin;
  const allowedOrigin = process.env.SITE_ORIGIN;
  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return jsonError(res, 403, 'Origem não autorizada');
  }

  const baseUrl = (process.env.ATENASPAY_BASE_URL || 'https://atenaspay.com.br').replace(/\/$/, '');
  const payload = {
    external_id: externalId,
    amount,
    description: `Pedido Magia Natalina: ${lines.join(', ')}`.slice(0, 240),
    payer: { name: payerName, cpf: payerCpf, email: payerEmail }
  };
  if (process.env.ATENASPAY_SHOP_ID) payload.shop_id = process.env.ATENASPAY_SHOP_ID;
  if (process.env.ATENASPAY_WEBHOOK_URL) payload.webhook_url = process.env.ATENASPAY_WEBHOOK_URL;

  try {
    const response = await fetch(`${baseUrl}/api/pix/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('AtenasPay create failed:', response.status, data);
      return jsonError(res, 502, 'Não foi possível gerar o Pix', 'A AtenasPay recusou a solicitação. Revise as configurações e tente novamente.');
    }

    return res.status(200).json({
      ok: true,
      external_id: data.external_id || externalId,
      txid: data.txid || data.id || data.transaction_id || null,
      status: data.status || 'PENDING',
      amount,
      qr_code: data.qr_code || data.qrCode || '',
      qr_code_base64: data.qr_code_base64 || data.qrCodeBase64 || '',
      copiacola: data.copiacola || data.pix_copy_paste || data.pixCopyPaste || data.emv || ''
    });
  } catch (error) {
    console.error('AtenasPay request failed:', error);
    return jsonError(res, 502, 'Falha ao comunicar com AtenasPay');
  }
}
