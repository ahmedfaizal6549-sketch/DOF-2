'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/CartContext'

function makeOrderId() {
  return `DOF-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('Colombo')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0)

  const handleCheckout = async () => {
    if (!firstName || !lastName || !email || !phone) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const orderId = makeOrderId()
      const amount = totalPrice.toFixed(2)
      const itemTitles = cartItems.map(i => `${i.name} x${i.quantity}`).join(', ')

      const hashRes = await fetch('/api/payhere-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, amount, currency: 'LKR' }),
      })
      const hashData = await hashRes.json()
      if (hashData.error) { setError(hashData.error); setLoading(false); return }

      const baseUrl = hashData.sandbox
        ? 'https://sandbox.payhere.lk/pay/checkout'
        : 'https://www.payhere.lk/pay/checkout'

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = baseUrl

      const fields: Record<string, string> = {
        merchant_id: hashData.merchant_id,
        return_url: `${window.location.origin}/checkout/success`,
        cancel_url: `${window.location.origin}/checkout/cancel`,
        notify_url: `${window.location.origin}/api/payhere-notify`,
        order_id: orderId,
        items: itemTitles.slice(0, 255),
        currency: 'LKR',
        amount,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address: address || 'Sri Lanka',
        city,
        country: 'Sri Lanka',
        hash: hashData.hash,
        custom_1: email,
      }

      Object.entries(fields).forEach(([k, v]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = k
        input.value = v
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch {
      setError('Checkout failed. Please try again.')
      setLoading(false)
    }
  }

  if (cartItems.length === 0) return (
    <main style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
      <div className="container">
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🛒</div>
        <h2 style={{ marginBottom: '0.75rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Discover your signature scent.</p>
        <Link href="/shop" className="btn-primary">Browse Fragrances</Link>
      </div>
    </main>
  )

  return (
    <main style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
          Your Cart <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)' }}>({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
        </h1>

        {/* Items */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: '2rem', overflow: 'hidden' }}>
          {cartItems.map((item, i) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto auto auto', gap: '1rem', alignItems: 'center', padding: '1.25rem', borderBottom: i < cartItems.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 80, height: 80, background: 'var(--bg)', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain', padding: '0.5rem' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.cat}</p>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.price} each</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  style={{ width: 32, height: 32, background: 'var(--bg)', border: 'none', cursor: 'pointer', color: 'var(--gold)', fontSize: '1rem' }}>−</button>
                <span style={{ width: 36, textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: 32, height: 32, background: 'var(--bg)', border: 'none', cursor: 'pointer', color: 'var(--gold)', fontSize: '1rem' }}>+</button>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', minWidth: 100, textAlign: 'right' }}>
                Rs. {(parseInt(item.price.replace(/\D/g, '')) * item.quantity).toLocaleString()}
              </span>
              <button onClick={() => removeFromCart(item.id)}
                style={{ width: 30, height: 30, background: 'rgba(229,57,53,0.1)', color: '#e53935', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>✕</button>
            </div>
          ))}
        </div>

        {/* Checkout grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="checkout-grid">
          {/* Customer Details */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Your Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <input placeholder="First name *" value={firstName} onChange={e => setFirstName(e.target.value)}
                style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg)', color: 'inherit', width: '100%' }} />
              <input placeholder="Last name *" value={lastName} onChange={e => setLastName(e.target.value)}
                style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg)', color: 'inherit', width: '100%' }} />
            </div>
            {[
              { ph: 'Email *', val: email, set: setEmail, type: 'email' },
              { ph: 'Phone * (07X XXXXXXX)', val: phone, set: setPhone, type: 'tel' },
              { ph: 'Address', val: address, set: setAddress, type: 'text' },
              { ph: 'City', val: city, set: setCity, type: 'text' },
            ].map(({ ph, val, set, type }) => (
              <input key={ph} type={type} placeholder={ph} value={val} onChange={e => set(e.target.value)}
                style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg)', color: 'inherit', width: '100%', marginBottom: '0.75rem', display: 'block' }} />
            ))}
          </div>

          {/* Summary + Pay */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Order Summary</h3>
            {[['Subtotal', `Rs. ${totalPrice.toLocaleString()}`], ['Shipping (Colombo)', 'Free'], ['Total', `Rs. ${totalPrice.toLocaleString()}`]].map(([l, v], i) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', fontWeight: i === 2 ? 700 : 400, fontSize: i === 2 ? '1.2rem' : '0.95rem' }}>
                <span>{l}</span><span style={{ color: i === 2 ? 'var(--gold)' : 'inherit' }}>{v}</span>
              </div>
            ))}
            {error && <p style={{ color: '#e53935', fontSize: '0.85rem', background: 'rgba(229,57,53,0.08)', padding: '0.75rem', borderRadius: 6 }}>{error}</p>}
            <button onClick={handleCheckout} disabled={loading}
              style={{ padding: '1rem', background: loading ? 'var(--text-muted)' : 'var(--gold)', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: '1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 'auto' }}>
              {loading ? 'Redirecting to PayHere...' : `Pay Rs. ${totalPrice.toLocaleString()} →`}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>🔒 Secured by PayHere · Visa · Mastercard · eZcash · Genie</p>
            <Link href="/shop" style={{ textAlign: 'center', color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600 }}>← Continue Shopping</Link>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:640px){.checkout-grid{grid-template-columns:1fr !important}}`}</style>
    </main>
  )
}
