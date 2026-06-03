'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'

export default function Success() {
  const { clearCart } = useCart()
  useEffect(() => { clearCart() }, [])
  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '2rem' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '4px solid #4caf50', borderRadius: 16, padding: '3rem', maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, background: 'rgba(76,175,80,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#4caf50', margin: '0 auto 1.5rem' }}>✓</div>
        <h1 style={{ marginBottom: '0.75rem' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>Thank you! Check your email for confirmation. We'll ship within 2 business days to Colombo.</p>
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    </main>
  )
}
