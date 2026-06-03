'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const categories = [
  {
    name: 'Floral Fragrance',
    count: '18 Products',
    href: '/shop?cat=floral',
    img: '/assets/products/hayaati.webp',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 10v6m11-11h-6M7 12H1m17.36-7.36l-4.24 4.24M9.88 14.12l-4.24 4.24m12.72 0l-4.24-4.24M9.88 9.88L5.64 5.64"/>
      </svg>
    ),
  },
  {
    name: 'Spice & Oud',
    count: '12 Products',
    href: '/shop?cat=spice',
    img: '/assets/products/asad.png',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c-2 2-2 4-2 6 0 4 4 8 4 14"/>
        <path d="M12 2c2 2 2 4 2 6 0 4-4 8-4 14"/>
      </svg>
    ),
  },
  {
    name: 'Citrus Fresh',
    count: '15 Products',
    href: '/shop?cat=citrus',
    img: '/assets/products/hawas-ice.png',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v20M2 12h20"/>
      </svg>
    ),
  },
  {
    name: 'Warm & Woody',
    count: '10 Products',
    href: '/shop?cat=woody',
    img: '/assets/products/vintage-radio.webp',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V8M5 12c0-2 2-4 4-4M19 12c0-2-2-4-4-4M3 18h18"/>
      </svg>
    ),
  },
  {
    name: "Men's Collection",
    count: '22 Products',
    href: '/shop?cat=men',
    img: '/assets/products/hawas-fire.png',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.3-4.3M16 6l5-5M21 1h-5v5"/>
      </svg>
    ),
  },
  {
    name: "Women's Collection",
    count: '20 Products',
    href: '/shop?cat=women',
    img: '/assets/products/azure-aoud.jpg',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6"/>
        <path d="M12 15v7M9 19h6"/>
      </svg>
    ),
  },
]

const arrivals = [
  { name: 'Lattafa Asad', cat: 'Spice · Oud', price: 'Rs. 7,490', img: '/assets/products/asad.png' },
  { name: 'Afnan 9pm REBEL', cat: 'Smoky', price: 'Rs. 13,990', img: '/assets/products/9pm-rebel.png' },
  { name: 'Rasasi Hawas Fire', cat: 'Aquatic', price: 'Rs. 16,990', img: '/assets/products/hawas-fire.png' },
  { name: 'Lattafa Khamrah Qahwa', cat: 'Gourmand', price: 'Rs. 11,000', img: '/assets/products/khamrah-qahwa.webp' },
  { name: 'Rasasi Hawas Elixir', cat: 'Honeyed', price: 'Rs. 17,500', img: '/assets/products/hawas-elixir.webp' },
  { name: 'Armaf Lionheart Man', cat: 'Leather', price: 'Rs. 16,500', img: '/assets/products/lionheart.webp' },
]

export default function CategoryPage() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Category cards stagger entrance
      ScrollTrigger.batch('.cat-card', {
        onEnter: batch => gsap.fromTo(batch,
          { y: 50, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
        ),
        once: true, start: 'top 85%'
      })

      // Scroll reveal
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add('in'), i * 60)
              io.unobserve(entry.target)
            }
          })
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
        document.querySelectorAll('.reveal').forEach(el => io.observe(el))
      } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'))
      }
    }
    loadGSAP()
  }, [])

  const scrollTrack = (dir: 'prev' | 'next') => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir === 'next' ? 300 : -300, behavior: 'smooth' })
    }
  }

  return (
    <main>
      {/* BANNER */}
      <section className="page-banner">
        <div className="container">
          <h1>Fragrance Categories</h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            Categories
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section style={{ paddingTop: '64px', paddingBottom: 0 }}>
        <div className="container">
          <div className="category-grid">
            {categories.map((cat, i) => (
              <Link key={i} className="cat-card" href={cat.href} style={{ background: 'linear-gradient(180deg, #f5efe0 0%, #ece4d0 100%)' }}>
                <img src={cat.img} alt={cat.name} style={{ objectFit: 'contain', padding: '20px', mixBlendMode: 'multiply' }} />
                <div className="wash"></div>
                <div className="overlay">
                  {cat.icon}
                  <h3>{cat.name}</h3>
                  <p className="count">{cat.count}</p>
                  <span className="view">View Collection <span className="arrow">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT */}
      <section style={{ padding: '96px 0 0' }}>
        <div className="spotlight reveal">
          <div className="media" style={{ background: 'linear-gradient(180deg, #f5efe0 0%, #ece4d0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="/assets/products/asad.png"
              alt="Featured: Spice & Oud"
              style={{ objectFit: 'contain', padding: '40px', mixBlendMode: 'multiply', width: '80%', height: '80%' }}
            />
          </div>
          <div className="panel">
            <span className="eyebrow">Featured Category</span>
            <h2>Spice<br />&amp; Oud</h2>
            <p>The Middle Eastern signature, modernised. From Lattafa&apos;s Asad to Rasasi&apos;s Hawas Fire, this is the category that built our catalogue — warm, opulent, unmistakable.</p>
            <div className="notes-tags">
              <span className="note-tag">Saffron</span>
              <span className="note-tag">Cambodian Oud</span>
              <span className="note-tag">Amber</span>
              <span className="note-tag">Leather</span>
              <span className="note-tag">Tobacco</span>
              <span className="note-tag">Resin</span>
            </div>
            <Link href="/shop?cat=spice" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
              Shop Category
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST ARRIVALS STRIP */}
      <section className="arrivals-strip">
        <div className="container">
          <div className="arrivals-head reveal">
            <h2>Latest Arrivals</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="circle-btn lg" onClick={() => scrollTrack('prev')} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button className="circle-btn lg" onClick={() => scrollTrack('next')} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="arrivals-track" ref={trackRef}>
            {arrivals.map((item, i) => (
              <article key={i} className="product-card reveal">
                <div className="media">
                  <img src={item.img} alt={item.name} />
                  <button className="wishlist-btn" aria-label="Wishlist">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </button>
                </div>
                <div className="body">
                  <span className="cat">{item.cat}</span>
                  <h3 className="name">{item.name}</h3>
                  <div className="price-row">
                    <span className="price">{item.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
