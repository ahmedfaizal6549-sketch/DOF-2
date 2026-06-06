'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from './CartContext'

export default function Nav() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      if (navRef.current) {
        gsap.fromTo(navRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        )
      }
    }
    loadGSAP()
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleSearchToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSearchOpen(prev => !prev)
    if (!searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 250)
    }
  }

  useEffect(() => {
    const handleClick = () => setSearchOpen(false)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="nav" ref={navRef} style={{ opacity: 0 }}>
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            <span className="nav-brand-logo">
              <img src="/assets/dof-logo-square.png" alt="DOF" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </span>
            <span className="nav-brand-text">Dept. of Fragrance</span>
          </Link>
          <ul className="nav-links">
            <li><Link className={`nav-link${isActive('/') ? ' active' : ''}`} href="/">Home</Link></li>
            <li><Link className={`nav-link${isActive('/shop') ? ' active' : ''}`} href="/shop">Shop</Link></li>
            <li><Link className={`nav-link${isActive('/category') ? ' active' : ''}`} href="/category">Category</Link></li>
            <li><Link className={`nav-link${isActive('/about') ? ' active' : ''}`} href="/about">About</Link></li>
          </ul>
          <div className="nav-actions">
            <div className={`nav-search${searchOpen ? ' open' : ''}`} onClick={e => e.stopPropagation()}>
              <button className="nav-search-toggle" aria-label="Search" onClick={handleSearchToggle}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7"/>
                  <path d="M21 21l-4.3-4.3"/>
                </svg>
              </button>
              <input ref={searchInputRef} type="text" placeholder="Search fragrances..." />
            </div>
            <button className="nav-icon-btn" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
            <Link href="/cart" className="nav-icon-btn" aria-label="Cart" style={{ position: "relative" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2l3 6h6l3-6"/>
                <path d="M5 8h14l-1 12H6L5 8z"/>
              </svg>
              <span className="nav-cart-count" style={{ display: cartCount > 0 ? 'grid' : 'none' }}>{cartCount}</span>
            </Link>
            <button className="nav-hamburger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-top">
          <Link href="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
            <span className="nav-brand-logo">
              <img src="/assets/dof-logo-square.png" alt="DOF" />
            </span>
            <span className="nav-brand-text">Dept. of Fragrance</span>
          </Link>
          <button className="mobile-menu-close nav-icon-btn" aria-label="Close" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="mobile-menu-links">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/category" onClick={() => setMenuOpen(false)}>Category</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </div>
      </div>
    </>
  )
}
