import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart';

export default function Success() {
  const clearCart = useCartStore(s => s.clearCart);
  useEffect(() => { clearCart(); }, []);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: 560, margin: '4rem auto', textAlign: 'center', background: 'var(--surface)', borderRadius: 16, padding: '3rem', border: '1px solid var(--border)', borderTop: '4px solid var(--success)' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e8f5e9', color: 'var(--success)', fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>✓</div>
      <h1 style={{ marginBottom: '0.75rem' }}>Order Confirmed!</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.7 }}>Thank you! Your order is placed. Check your email for confirmation — we'll ship within 2 business days.</p>
      <Link href="/shop" style={{ display: 'inline-block', padding: '0.875rem 2rem', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 700 }}>Continue Shopping</Link>
    </motion.div>
  );
}
