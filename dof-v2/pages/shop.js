import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/lib/products';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Shop() {
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('popular');

  let filtered = cat === 'all' ? [...products] : products.filter(p => p.category === cat);
  if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a,b) => b.rating - a.rating);
  else filtered.sort((a,b) => b.reviews - a.reviews);

  const cats = [['all','All'],['men','For Him'],['women','For Her'],['unisex','Unisex']];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Our Collection</h1>
        <p style={{ color: 'var(--muted)' }}>Authentic niche & designer fragrances, batch-verified and ready to ship.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {cats.map(([v,l]) => (
            <button key={v} onClick={() => setCat(v)} style={{ padding: '0.5rem 1.25rem', borderRadius: 24, border: '2px solid', borderColor: cat === v ? 'var(--accent)' : 'var(--border)', background: cat === v ? 'var(--accent)' : 'transparent', color: cat === v ? '#fff' : 'var(--text)', fontWeight: 600, fontSize: '0.875rem' }}>
              {l}
            </button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '0.875rem' }}>
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Grid */}
      <motion.div variants={container} initial="hidden" animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.5rem' }}>
        {filtered.map(p => (
          <motion.div key={p.id} variants={item}>
            <Link href={`/product/${p.id}`} style={{ display: 'block', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', transition: 'var(--transition)' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ height: 200, background: 'linear-gradient(135deg,#f7f3ef,#ede8e2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', position: 'relative' }}>
                🧴
                <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--primary)', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 20, fontWeight: 700, textTransform: 'uppercase' }}>{p.category}</span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{p.brand}</p>
                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', fontWeight: 600 }}>{p.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '0.875rem' }}>{'★'.repeat(Math.floor(p.rating))}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>({p.reviews})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Rs. {p.price.toLocaleString()}</span>
                  <span style={{ fontSize: '0.75rem', color: p.stock > 10 ? 'var(--success)' : 'var(--error)', fontWeight: 600 }}>
                    {p.stock > 10 ? 'In Stock' : `${p.stock} left`}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem' }}>No products found.</p>}
    </motion.div>
  );
}
