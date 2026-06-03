'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/products'
import { useCart } from '@/components/CartContext'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Back */}
        <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '2rem', opacity: 0.8 }}>
          ← Back to Shop
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="product-detail-grid">
          {/* Image */}
          <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', aspectRatio: '1' }}>
            <Image src={product.image} alt={product.name} width={400} height={400} style={{ objectFit: 'contain', maxHeight: 360, width: 'auto' }} />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)', fontWeight: 700 }}>{product.cat}</span>
              <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', margin: '0.5rem 0', lineHeight: 1.2 }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>{product.stars}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({product.reviews} reviews)</span>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid var(--gold)' }}>
              {product.priceOld && (
                <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 4 }}>{product.priceOld}</div>
              )}
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold)' }}>{product.price}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Free delivery · Colombo</div>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>{product.notes}</p>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: 40, height: 40, background: 'var(--surface)', color: 'var(--gold)', fontSize: '1.25rem', border: 'none', cursor: 'pointer' }}>−</button>
                <span style={{ width: 48, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  style={{ width: 40, height: 40, background: 'var(--surface)', color: 'var(--gold)', fontSize: '1.25rem', border: 'none', cursor: 'pointer' }}>+</button>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={handleAdd}
                style={{ padding: '1rem', background: added ? '#4caf50' : 'var(--gold)', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: '1rem', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <Link href="/cart"
                style={{ padding: '1rem', background: 'transparent', color: 'var(--gold)', borderRadius: 10, fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', border: '1px solid var(--border)' }}>
                View Cart →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </main>
  )
}
