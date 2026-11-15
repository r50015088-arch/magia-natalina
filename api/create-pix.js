const PRODUCTS = {
  'tapete-de-entrada-tradicional-com-design-de-floco-de-neve-e-': { name: 'Tapete de Entrada Tradicional com Design de Floco de Neve e Estrela Dourada', price: 177.80 },
  'festao-de-natal-verde-com-lacos': { name: 'Festão de Natal Verde com Laços', price: 77.68 },
  'capa-natalina-para-micro-ondas': { name: 'Capa Natalina para Micro-ondas', price: 74.98 },
  'cordao-de-luzes-led-solar-em-formato-de-cogumelos': { name: 'Cordão de Luzes LED Solar em Formato de Cogumelos', price: 161.38 },
  'projetor-led-natalino-com-papai-noel-e-arvore-de-natal': { name: 'Projetor LED Natalino com Papai Noel e Árvore de Natal', price: 108.75 },
  'cordao-de-luzes-led-cogumelos': { name: 'Cordão de Luzes LED Cogumelos', price: 96.92 },
  'cordao-de-luzes-led-solar-em-fio-de-cobre': { name: 'Cordão de Luzes LED Solar em Fio de Cobre', price: 71.50 },
  'luminaria-de-jardim-em-forma-de-treno-de-papai-noel-luz-sola': { name: 'Luminária de Jardim em Forma de Trenó de Papai Noel', price: 298.85 },
  'cascata-de-luzes-led-natalinas-gotas-de-gelo': { name: 'Cascata de Luzes LED Natalinas Gotas de Gelo', price: 119.35 },
  'cordao-de-luzes-led-com-folhas-verdes': { name: 'Cordão de Luzes LED com Folhas Verdes', price: 127.67 },
  'mini-enfeite-natalino-papai-noel-vermelho': { name: 'Mini Enfeite Natalino Papai Noel Vermelho', price: 30.08 },
  'arvore-de-natal-de-feltro-infantil-diy-com-enfeites-decorati': { name: 'Árvore de Natal de Feltro Infantil DIY com Enfeites Decorativos', price: 132.58 },
  'calendario-do-advento-com-cena-de-natal-24-figuras-de-acrili': { name: 'Calendário do Advento com Cena de Natal', price: 151.03 },
  'papai-noel-escalando-com-luzes-led': { name: 'Papai Noel Escalando com Luzes LED', price: 220.55 },
  'enfeite-natalino-de-madeira-para-canto-de-porta': { name: 'Enfeite Natalino de Madeira para Canto de Porta', price: 78.04 },
  'enfeites-natalinos-pendentes': { name: 'Enfeites Natalinos Pendentes', price: 75.95 },
  'kit-4-capas-de-almofada-natalinas-45x45cm-em-poliester': { name: 'Kit 4 Capas de Almofada Natalinas', price: 134.60 },
  'enfeite-natalino-iluminado-com-led-para-porta': { name: 'Enfeite Natalino Iluminado com LED para Porta', price: 180.98 },
  'kit-de-decoracao-natalina-para-banheiro': { name: 'Kit de Decoração Natalina para Banheiro', price: 161.65 },
  'caneca-de-cafe-de-papai-noel-500ml-caneca-de-ceramica-com-de': { name: 'Caneca de Café de Papai Noel 500ML', price: 109.78 },
  'kit-com-10-enfeites-natalinos-de-madeira': { name: 'Kit com 10 Enfeites Natalinos de Madeira', price: 92.57 },
  'boneco-natalino-telescopico-de-pelucia': { name: 'Boneco Natalino Telescópico de Pelúcia', price: 177.35 },
  'kit-com-10-ou-20-flores-de-natal-artificiais-com-glitter-14-': { name: 'Kit de Flores de Natal Artificiais com Glitter', price: 104.45 },
  'estrela-de-belem-natalina-iluminada-com-led': { name: 'Estrela de Belém Natalina Iluminada com LED', price: 209.98 },
  'mini-papai-noel-para-monitor-tv': { name: 'Mini Papai Noel para Monitor/TV', price: 49.90 },
  'calendario-do-advento-em-forma-de-chamine-lareira-com-papai-': { name: 'Calendário do Advento em Forma de Chaminé', price: 189.90 },
  'estatua-de-anjo-querubim-branco-pensativo': { name: 'Estátua de Anjo Querubim Branco Pensativo', price: 79.90 },
  'boneco-de-neve-mini-com-cartola-e-cachecol': { name: 'Boneco de Neve Mini com Cartola e Cachecol', price: 45.90 },
  'estatua-de-rena-branca-com-cachecol': { name: 'Estátua de Rena Branca com Cachecol', price: 89.90 },
  'anjo-branco-orando': { name: 'Anjo Branco Orando', price: 69.90 },
  'treno-vermelho-decorativo-de-natal': { name: 'Trenó Vermelho Decorativo de Natal', price: 59.90 },
  'letras-3d-feliz-natal-vermelhas-com-floco-de-neve': { name: 'Letras 3D Feliz Natal Vermelhas', price: 74.90 },
  'arvores-de-natal-de-papel-acordeao': { name: 'Árvores de Natal de Papel Acordeão', price: 54.90 },
  'anjo-led-dourado-com-cauda-de-estrelas': { name: 'Anjo LED Dourado com Cauda de Estrelas', price: 99.90 },
  'mini-arvore-de-natal-com-laco-vermelho-e-bolas-douradas': { name: 'Mini Árvore de Natal com Laço Vermelho', price: 67.90 },
  'presepio-kit-natividade-completo-com-figuras': { name: 'Presépio / Kit Natividade Completo', price: 129.90 },
  'kit-de-blocos-de-montar-treno-merry-christmas': { name: 'Kit de Blocos de Montar Trenó Merry Christmas', price: 79.90 },
  'caixa-de-presente-decorativa-com-pernas-e-rosto': { name: 'Caixa de Presente Decorativa com Pernas e Rosto', price: 39.90 }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const apiKey = process.env.ATENASPAY_API_KEY;
  const baseUrl = (process.env.ATENASPAY_BASE_URL || 'https://atenaspay.com.br').replace(/\/$/, '');
  if (!apiKey) {
    return res.status(503).json({ error: 'Pagamento indisponível', message: 'Configure ATENASPAY_API_KEY no ambiente do deploy.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'JSON inválido' }); }
  }
  body = body || {};

  const items = body.items;
  const name = String(body.payer?.name || '').trim().slice(0, 120);
  const cpf = String(body.payer?.cpf || '').replace(/\D/g, '');
  const email = String(body.payer?.email || '').trim().slice(0, 200);
  if (!Array.isArray(items) || items.length < 1 || items.length > 40) {
    return res.status(400).json({ error: 'Carrinho inválido', message: 'Adicione ao menos um produto.' });
  }
  if (!name || cpf.length !== 11 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Dados do pagador inválidos', message: 'Informe nome, CPF e e-mail válidos.' });
  }

  let amount = 0;
  const description = [];
  for (const item of items) {
    const product = PRODUCTS[String(item?.id || '')];
    const qty = Number(item?.qty);
    if (!product || !Number.isInteger(qty) || qty < 1 || qty > 10) {
      return res.status(400).json({ error: 'Produto ou quantidade inválida' });
    }
    amount += product.price * qty;
    description.push(`${qty}x ${product.name}`);
  }
  amount = Number(amount.toFixed(2));
  if (amount < 1 || amount > 10000) return res.status(400).json({ error: 'Valor do pedido fora do limite permitido' });

  const externalId = `mn_${crypto.randomUUID()}`;
  const payload = {
    external_id: externalId,
    amount,
    description: description.join(', ').slice(0, 240),
    payer: { name, cpf, email }
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
      return res.status(502).json({ error: 'Não foi possível gerar o Pix. Tente novamente mais tarde.' });
    }
    return res.status(200).json({
      ok: true,
      external_id: data.external_id || externalId,
      status: data.status || 'PENDING',
      amount,
      qr_code: data.qr_code || data.qrCode || '',
      qr_code_base64: data.qr_code_base64 || data.qrCodeBase64 || '',
      pix_copy_paste: data.pix_copy_paste || data.pixCopyPaste || data.emv || data.copiacola || ''
    });
  } catch {
    return res.status(502).json({ error: 'Falha ao conectar ao serviço de pagamento. Tente novamente.' });
  }
}
