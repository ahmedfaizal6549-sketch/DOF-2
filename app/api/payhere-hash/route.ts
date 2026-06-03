import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const { order_id, amount, currency = 'LKR' } = await req.json()
  if (!order_id || !amount) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const merchantId = process.env.PAYHERE_MERCHANT_ID!
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!

  const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
  const amountFormatted = parseFloat(amount).toFixed(2)
  const rawHash = `${merchantId}${order_id}${amountFormatted}${currency}${secretHash}`
  const hash = crypto.createHash('md5').update(rawHash).digest('hex').toUpperCase()

  return NextResponse.json({
    hash,
    merchant_id: merchantId,
    order_id,
    amount: amountFormatted,
    currency,
    sandbox: process.env.PAYHERE_SANDBOX === 'true',
  })
}
