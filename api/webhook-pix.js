import crypto from 'node:crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.ATENASPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-webhook-signature'] || req.headers['x-webhook-signature'] || '';

  if (secret && signature) {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');

    const received = String(signature).trim();
    const expectedBuf = Buffer.from(expected, 'hex');
    const receivedBuf = Buffer.from(received, 'hex');

    if (expectedBuf.length !== receivedBuf.length || !crypto.timingSafeEqual(expectedBuf, receivedBuf)) {
      return res.status(401).json({ error: 'Assinatura de webhook inválida' });
    }
  }

  const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

  return res.status(200).json({
    ok: true,
    received: true,
    payload
  });
}
