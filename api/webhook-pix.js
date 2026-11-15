import crypto from 'node:crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.ATENASPAY_WEBHOOK_SECRET;
  const signatureHeader = req.headers['x-webhook-signature'] || req.headers['x-webhook-signature'];
  const signature = typeof signatureHeader === 'string' ? signatureHeader.trim() : '';

  if (!secret) {
    return res.status(500).json({ error: 'ATENASPAY_WEBHOOK_SECRET não configurada' });
  }

  if (!signature) {
    return res.status(401).json({ error: 'Assinatura do webhook ausente' });
  }

  const payloadRaw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  const expected = crypto.createHmac('sha256', secret).update(payloadRaw).digest('hex');
  const received = signature;

  if (!crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(received, 'hex'))) {
    return res.status(401).json({ error: 'Assinatura de webhook inválida' });
  }

  const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

  return res.status(200).json({
    ok: true,
    received: true,
    payload
  });
}
