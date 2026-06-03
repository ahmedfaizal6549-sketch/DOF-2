import crypto from 'crypto';

// PayHere sends a server-to-server POST here after every payment
// This endpoint must be publicly accessible (works on Vercel automatically)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    merchant_id,
    order_id,
    payment_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
    custom_1, // we'll pass customer email here
  } = req.body;

  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
  const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const localSig = crypto
    .createHash('md5')
    .update(`${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${secretHash}`)
    .digest('hex')
    .toUpperCase();

  if (localSig !== md5sig) {
    console.error('[payhere-notify] Invalid signature');
    return res.status(400).send('Invalid signature');
  }

  // status_code 2 = success, 0 = pending, -1 = cancelled, -2 = failed, -3 = chargedback
  if (status_code === '2') {
    console.log(`[payhere-notify] ✅ Payment SUCCESS: order ${order_id}, payment ${payment_id}, amount ${payhere_amount} ${payhere_currency}`);
    // TODO: Update your database, send confirmation email, trigger fulfillment, etc.
  } else {
    console.log(`[payhere-notify] ⚠️  Payment status ${status_code} for order ${order_id}`);
  }

  res.status(200).send('OK');
}
