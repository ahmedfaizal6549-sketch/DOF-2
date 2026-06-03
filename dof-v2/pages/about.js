import { motion } from 'framer-motion';
import Link from 'next/link';
const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={fade} style={{ background: 'linear-gradient(135deg,#f7f3ef,#faf9f7)', borderRadius: 16, padding: '4rem 3rem', textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '1rem' }}>About Dept. of Fragrance</h1>
        <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', fontWeight: 600 }}>100% Authentic · 100% You · Built on Trust</p>
      </motion.div>

      <motion.div variants={fade} style={{ maxWidth: 680, margin: '0 auto 4rem', lineHeight: 1.8, color: 'var(--text)' }}>
        <h2 style={{ marginBottom: '1rem' }}>Our Story</h2>
        <p style={{ marginBottom: '1rem' }}>Dept. of Fragrance started with a simple frustration: premium niche fragrances were impossible to find at fair prices in Sri Lanka. Grey market sellers, inflated markups, and counterfeit bottles made the luxury fragrance space feel inaccessible.</p>
        <p style={{ marginBottom: '1rem' }}>We partnered directly with authorized distributors in the UAE and Europe. We cut out the middleman, verified every batch, and passed the savings to you. Every bottle ships with batch verification — if it doesn't match, you don't pay.</p>
      </motion.div>

      <motion.div variants={fade} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {[['✓','Authentic','Direct from authorized distributors. Zero compromises.'],['💰','Fair Pricing','Sub-retail. Direct savings passed to you.'],['🚚','Fast Shipping','Free delivery to Colombo.'],['⭐','Curated','Hand-picked by fragrance lovers.']].map(([i,t,d]) => (
          <div key={t} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{i}</div>
            <h3 style={{ marginBottom: '0.5rem' }}>{t}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{d}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fade} style={{ background: 'var(--primary)', color: '#fff', borderRadius: 16, padding: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Get In Touch</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[['📧','Email','hello@deptoffragrance.lk'],['📱','WhatsApp','+94 77 123 4567'],['📍','Location','Colombo, Sri Lanka'],['🏪','Store','Majestic City, Colombo']].map(([i,l,v]) => (
            <div key={l}><div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{i}</div><div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>{l}</div><div style={{ fontWeight: 600 }}>{v}</div></div>
          ))}
        </div>
        <Link href="/shop" style={{ display: 'inline-block', padding: '0.875rem 2.5rem', background: 'var(--accent)', color: '#fff', borderRadius: 8, fontWeight: 700 }}>Shop Now</Link>
      </motion.div>
    </motion.div>
  );
}
