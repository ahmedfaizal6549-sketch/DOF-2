import { motion } from 'framer-motion';
import Link from 'next/link';
export default function Cancel() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 480, margin: '4rem auto', textAlign: 'center', background: 'var(--surface)', borderRadius: 16, padding: '3rem', border: '1px solid var(--border)', borderTop: '4px solid var(--error)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✕</div>
      <h1 style={{ marginBottom: '0.75rem' }}>Payment Cancelled</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>No charge was made. Your cart is still saved.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link href="/cart" style={{ padding: '0.875rem 1.5rem', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 700 }}>Back to Cart</Link>
        <Link href="/shop" style={{ padding: '0.875rem 1.5rem', border: '1px solid var(--border)', borderRadius: 8, fontWeight: 700 }}>Browse More</Link>
      </div>
    </motion.div>
  );
}
