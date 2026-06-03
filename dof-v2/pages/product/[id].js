import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart';
import { products, getProductById } from '@/lib/products';

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } });

export default function ProductPage({ product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return <div style={{ textAlign: 'center', padding: '4rem' }}>Product not found. <Link href="/shop">Back to shop</Link></div>;

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <motion.div {...fade()}>
        <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--secondary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '2rem', padding: '0.5rem 1rem', background: 'var(--bg)', borderRadius: 8 }}>
          ← Back to Shop
        </Link>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }} className="product-grid">
        {/* Image */}
        <motion.div {...fade(0.1)}>
          <div style={{ background: 'linear-gradient(135deg,#f7f3ef,#ede8e2)', borderRadius: 16, aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12rem', marginBottom: '1rem', border: '1px solid var(--border)' }}>
            🧴
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ padding: '0.5rem 1rem', background: 'var(--accent)', color: '#fff', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700 }}>{product.category.toUpperCase()}</span>
            <span style={{ padding: '0.5rem 1rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 20, fontSize: '0.8rem', color: product.stock > 10 ? 'var(--success)' : 'var(--error)', fontWeight: 600 }}>
              {product.stock > 10 ? '✓ In Stock' : `Only ${product.stock} left`}
            </span>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div {...fade(0.2)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 700, marginBottom: '0.5rem' }}>{product.brand}</p>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{product.name}</h1>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{'★'.repeat(Math.floor(product.rating))}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>({product.reviews} reviews)</span>
            </div>
          </div>

          <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid var(--accent)' }}>
            <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--primary)' }}>Rs. {product.price.toLocaleString()}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 4 }}>+ Free delivery to Colombo</div>
          </div>

          <p style={{ color: 'var(--text)', lineHeight: 1.8, fontSize: '0.95rem' }}>{product.description}</p>

          {/* Notes */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--secondary)' }}>Fragrance Profile</h3>
            {Object.entries(product.profileNotes).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ width: 90, fontWeight: 600, fontSize: '0.875rem', color: 'var(--secondary)', textTransform: 'capitalize', flexShrink: 0 }}>{k}:</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text)' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
            {[['Longevity', product.longevity], ['Projection', product.projection], ['Size', product.bottleSize]].map(([l, v]) => (
              <div key={l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.875rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: 4 }}>{l}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Quantity + Add */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, marginRight: '0.5rem' }}>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 40, background: 'var(--bg)', fontSize: '1.2rem', color: 'var(--secondary)' }}>−</button>
                <span style={{ width: 48, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ width: 40, height: 40, background: 'var(--bg)', fontSize: '1.2rem', color: 'var(--secondary)' }}>+</button>
              </div>
            </div>
            <motion.button onClick={handleAdd} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '1rem', background: added ? 'var(--success)' : 'var(--primary)', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: '1rem' }}>
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </motion.button>
            <Link href="/cart" style={{ padding: '1rem', background: 'var(--bg)', color: 'var(--secondary)', borderRadius: 10, fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', border: '1px solid var(--border)' }}>
              View Cart →
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const product = getProductById(params.id);
  if (!product) return { notFound: true };
  return { props: { product } };
}

export async function getStaticPaths() {
  return { paths: products.map(p => ({ params: { id: p.id.toString() } })), fallback: false };
}
