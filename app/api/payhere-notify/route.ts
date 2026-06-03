import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const get = (k: string) => body.get(k)?.toString() ?? ''

  const merchant_id = get('merchant_id')
  const order_id = get('order_id')
  const payhere_amount = get('payhere_amount')
  const payhere_currency = get('payhere_currency')
  const status_code = get('status_code')
  const md5sig = get('md5sig')

  const secretHash = crypto.createHash('md5').update(process.env.PAYHERE_MERCHANT_SECRET!).digest('hex').toUpperCase()
  const localSig = crypto.createHash('md5')
    .update(`${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${secretHash}`)
    .digest('hex').toUpperCase()

  if (localSig !== md5sig) return new NextResponse('Invalid signature', { status: 400 })

  if (status_code === '2') {
    console.log(`✅ Payment SUCCESS: order ${order_id}, ${payhere_amount} ${payhere_currency}`)
  } else {
    console.log(`⚠️ Payment status ${status_code} for order ${order_id}`)
  }

  return new NextResponse('OK', { status: 200 })
}
