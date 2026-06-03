'use client'
import Link from 'next/link'
export default function Cancel() {
  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '2rem' }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '4px solid #e53935', borderRadius: 16, padding: '3rem', maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✕</div>
        <h1 style={{ marginBottom: '0.75rem' }}>Payment Cancelled</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>No charge was made. Your cart is still saved.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/cart" className="btn-primary">Back to Cart</Link>
          <Link href="/shop" style={{ padding: '0.875rem 1.5rem', border: '1px solid var(--border)', borderRadius: 8, fontWeight: 600 }}>Browse More</Link>
        </div>
      </div>
    </main>
  )
}
