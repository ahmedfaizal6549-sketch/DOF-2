import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/cart';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const totalItems = useCartStore((s) => s.getTotalItems());

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.01em', color: 'var(--primary)' }}>
            <span style={{ fontSize: '1.5rem' }}>🧴</span> Dept. of Fragrance
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={{ fontWeight: 500, color: router.pathname === l.href ? 'var(--accent)' : 'var(--text)', fontSize: '0.95rem', borderBottom: router.pathname === l.href ? '2px solid var(--accent)' : '2px solid transparent', paddingBottom: '2px' }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/cart" style={{ position: 'relative', width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', borderRadius: '50%', fontSize: '1.25rem' }}>
              🛒
              {mounted && totalItems > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--accent)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItems}</span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', display: 'none', flexDirection: 'column', gap: 5, padding: 4 }} className="mobile-menu-btn" aria-label="Menu">
              <span style={{ width: 22, height: 2, background: 'var(--primary)', display: 'block', borderRadius: 2 }} />
              <span style={{ width: 22, height: 2, background: 'var(--primary)', display: 'block', borderRadius: 2 }} />
              <span style={{ width: 22, height: 2, background: 'var(--primary)', display: 'block', borderRadius: 2 }} />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} style={{ display: 'block', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', fontWeight: 500 }}>{l.label}</Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main */}
      <main style={{ flex: 1, maxWidth: 1100, width: '100%', margin: '0 auto', padding: '2.5rem 1.25rem' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--primary)', color: 'rgba(255,255,255,0.8)', textAlign: 'center', padding: '1.5rem', fontSize: '0.875rem' }}>
        © 2026 Dept. of Fragrance · Made in Sri Lanka 🇱🇰
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
