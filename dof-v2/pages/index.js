import { motion } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/lib/products';

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function Home() {
  const featured = products.slice(0, 4);
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Hero */}
      <motion.section variants={fade} style={{ background: 'linear-gradient(135deg,#f7f3ef,#faf9f7)', borderRadius: 16, padding: '4rem 3rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700, marginBottom: '1rem' }}>New Arrivals · Authentic · Sri Lanka</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', marginBottom: '1rem', lineHeight: 1.1 }}>Dept. of<br/>Fragrance</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: 420, marginBottom: '2rem', lineHeight: 1.7 }}>100% authentic niche & designer scents at sub-retail prices. Sourced from the UAE and Europe, shipped across Sri Lanka.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{ padding: '0.875rem 2rem', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem' }}>Shop Now</Link>
            <Link href="/about" style={{ padding: '0.875rem 2rem', background: 'transparent', color: 'var(--secondary)', borderRadius: 8, fontWeight: 600, fontSize: '0.95rem', border: '2px solid var(--border)' }}>Our Story</Link>
          </div>
        </div>
        <div style={{ fontSize: '8rem', userSelect: 'none' }} className="hero-emoji">🧴</div>
      </motion.section>

      {/* Stats */}
      <motion.div variants={fade} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '4rem', textAlign: 'center' }}>
        {[['100+','Fragrances'],['24hr','Longevity'],['100%','Authentic'],['Free','Delivery*']].map(([v,l]) => (
          <div key={l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.5rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--accent)' }}>{v}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </motion.div>

      {/* Featured */}
      <motion.section variants={fade}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem' }}>Most Popular</h2>
          <Link href="/shop" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>See All →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '1.5rem' }}>
          {featured.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', transition: 'var(--transition)', display: 'block' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div style={{ height: 200, background: '#f7f3ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>🧴</div>
              <div style={{ padding: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{p.brand}</p>
                <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>Rs. {p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
      <style>{`@media(max-width:600px){.hero-emoji{display:none}}`}</style>
    </motion.div>
  );
}
