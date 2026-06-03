import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { order_id, amount, currency = 'LKR' } = req.body;
  if (!order_id || !amount) return res.status(400).json({ error: 'Missing fields' });

  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

  if (!merchantId || !merchantSecret) {
    return res.status(500).json({ error: 'PayHere credentials not configured' });
  }

  // PayHere hash: MD5(merchant_id + order_id + amount + currency + MD5(secret).toUpperCase()).toUpperCase()
  const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const amountFormatted = parseFloat(amount).toFixed(2);
  const rawHash = `${merchantId}${order_id}${amountFormatted}${currency}${secretHash}`;
  const hash = crypto.createHash('md5').update(rawHash).digest('hex').toUpperCase();

  res.status(200).json({
    hash,
    merchant_id: merchantId,
    order_id,
    amount: amountFormatted,
    currency,
    sandbox: process.env.PAYHERE_SANDBOX === 'true',
  });
}
