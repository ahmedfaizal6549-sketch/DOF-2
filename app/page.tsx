'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'

const testimonials = [
  {
    img: 'https://images.unsplash.com/photo-1590156206657-aec5fa1e2e8b?w=900&auto=format&fit=crop&q=80',
    quote: 'Hawas Fire is everything I\'d hoped for — and at half what I\'d been quoted in Colombo. Authenticity check at delivery sealed it. I\'ve already bought two more.',
    stars: '★★★★★',
    author: 'Tharindu W. — Colombo',
  },
  {
    img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&auto=format&fit=crop&q=80',
    quote: 'Khamrah Waha is my new winter signature. Lasts the whole day, gets compliments at every meeting. DOF\'s batch verification gave me real confidence.',
    stars: '★★★★★',
    author: 'Anushka S. — Kandy',
  },
  {
    img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=900&auto=format&fit=crop&q=80',
    quote: 'Picked up Asad Elixir and Vintage Radio in the same order — both gorgeous, both well below retail. The packaging actually feels considered.',
    stars: '★★★★★',
    author: 'Dilshan P. — Negombo',
  },
]

export default function HomePage() {
  const { addToCart } = useCart()
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Hero title words stagger in
      gsap.fromTo('.hero-word',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      )

      // Hero subtitle fade up
      gsap.fromTo('.hero-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.8 }
      )

      // Hero CTA buttons scale in
      gsap.fromTo('.hero-cta .btn',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)', delay: 1.0 }
      )

      // Stats count up
      gsap.utils.toArray('.stat-num').forEach(el => {
        ScrollTrigger.create({
          trigger: el as Element,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const target = el as HTMLElement
            const text = target.textContent || '0'
            const hasPlus = text.includes('+')
            const hasPercent = text.includes('%')
            const hasK = text.includes('K')
            const hasH = text.includes('H')

            // If non-numeric stat like "24H", just show it as-is
            if (hasH) return

            const numStr = text.replace(/[^0-9.]/g, '')
            const endVal = parseFloat(numStr)

            const counter = { val: 0 }
            gsap.to(counter, {
              val: endVal,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                const v = Math.round(counter.val)
                let display = hasK ? `${v}K` : String(v)
                if (hasPlus) display += '+'
                if (hasPercent) display += '%'
                target.textContent = display
              }
            })
          }
        })
      })

      // Popular cards ScrollTrigger
      ScrollTrigger.batch('.large-card, .small-card', {
        onEnter: batch => gsap.fromTo(batch,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
        ),
        once: true, start: 'top 85%'
      })

      // Scroll reveal for other elements
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

  const showTestimonial = (i: number) => {
    setTestimonialIndex((i + testimonials.length) % testimonials.length)
  }

  return (
    <main style={{ paddingTop: 0 }}>
      {/* ===== HERO CHECKER ===== */}
      <section className="hero-checker" style={{ padding: 0 }}>
        {/* Cell 1: Text */}
        <div className="hero-cell hero-cell-text">
          <span className="eyebrow hero-word">New Arrivals</span>
          <h1 className="hero-title">
            <span className="hero-word" style={{ display: 'block' }}>Dept. of</span>
            <span className="accent hero-word">Fragrance</span>
          </h1>
          <p className="hero-sub">
            100% Authentic, 100% You — Niche &amp; designer scents at sub-retail prices, sourced and shipped from Sri Lanka.
          </p>
          <div className="hero-cta">
            <Link href="/shop" className="btn btn-primary">Explore</Link>
            <Link href="/shop" className="btn btn-outlined">Shop Now</Link>
          </div>
        </div>

        {/* Cell 2: Bottle image */}
        <div className="hero-cell hero-cell-image" style={{ background: 'linear-gradient(180deg, #f5efe0 0%, #ece4d0 100%)' }}>
          <img
            src="/assets/products/hawas-fire.png"
            alt="Rasasi Hawas Fire"
            style={{ objectFit: 'contain', padding: '32px', mixBlendMode: 'multiply' }}
          />
        </div>

        {/* Cell 3: Product image */}
        <div className="hero-cell hero-cell-image" style={{ background: 'linear-gradient(180deg, #f5efe0 0%, #ece4d0 100%)' }}>
          <img
            src="/assets/products/hawas-elixir.webp"
            alt="Rasasi Hawas Elixir"
            style={{ objectFit: 'contain', padding: '32px', mixBlendMode: 'multiply' }}
          />
        </div>

        {/* Cell 4: Info panel */}
        <div className="hero-cell hero-cell-info">
          <h3>Best-Selling<br />Must-Haves</h3>
          <p>The scents our community keeps coming back for — Hawas, Khamrah, REBEL, Vulcan Feu. Hand-picked, authenticity-verified, ready to ship.</p>
          <Link href="/shop" className="link">
            See New Arrivals <span className="arrow">→</span>
          </Link>
          <div className="nav-arrows">
            <button className="circle-btn" aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className="circle-btn" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat reveal">
              <div className="stat-num">100+</div>
              <div className="stat-label">Flavors &amp; Scents</div>
            </div>
            <div className="stat reveal">
              <div className="stat-num">24H</div>
              <div className="stat-label">Hours Longevity</div>
            </div>
            <div className="stat reveal">
              <div className="stat-num">7.8K+</div>
              <div className="stat-label">Shop Online</div>
            </div>
            <div className="stat reveal">
              <div className="stat-num">100%</div>
              <div className="stat-label">Authentic Sourcing</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MOST POPULAR ===== */}
      <section className="popular">
        <div className="container">
          <div className="popular-head reveal">
            <h2 className="section-head">Most Popular Perfumes</h2>
            <div className="controls">
              <button className="circle-btn lg" aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button className="circle-btn lg" aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="popular-large">
            <Link className="large-card" href="/shop">
              <img src="/assets/products/hawas-fire.png" alt="Rasasi Hawas Fire" />
              <div className="overlay">
                <span className="cat">Spice &amp; Oud</span>
                <h3 className="name">Rasasi Hawas Fire</h3>
                <div className="row">
                  <span className="stars">★★★★★</span>
                  <span className="price">Rs. 16,990</span>
                </div>
              </div>
              <button className="btn btn-primary add" onClick={e => { e.preventDefault(); addToCart() }}>
                Add to Cart
              </button>
            </Link>
            <Link className="large-card" href="/shop">
              <img src="/assets/products/lionheart.webp" alt="Armaf Lionheart Man" />
              <div className="overlay">
                <span className="cat">Aromatic · Leather</span>
                <h3 className="name">Armaf Lionheart</h3>
                <div className="row">
                  <span className="stars">★★★★★</span>
                  <span className="price">Rs. 16,500</span>
                </div>
              </div>
              <button className="btn btn-primary add" onClick={e => { e.preventDefault(); addToCart() }}>
                Add to Cart
              </button>
            </Link>
            <Link className="large-card" href="/shop">
              <img src="/assets/products/khamrah-qahwa.webp" alt="Lattafa Khamrah Qahwa" />
              <div className="overlay">
                <span className="cat">Sweet Gourmand</span>
                <h3 className="name">Khamrah Qahwa</h3>
                <div className="row">
                  <span className="stars">★★★★☆</span>
                  <span className="price">Rs. 11,000</span>
                </div>
              </div>
              <button className="btn btn-primary add" onClick={e => { e.preventDefault(); addToCart() }}>
                Add to Cart
              </button>
            </Link>
          </div>

          <div className="popular-small">
            <Link className="small-card" href="/shop">
              <span className="circle"><img src="/assets/products/asad.png" alt="" /></span>
              <span className="name">Lattafa Asad</span>
              <span className="desc">Lattafa&apos;s powerhouse — saffron, ambroxan, leather. Rs. 7,490.</span>
            </Link>
            <Link className="small-card" href="/shop">
              <span className="circle"><img src="/assets/products/9pm-rebel.png" alt="" /></span>
              <span className="name">Afnan 9pm REBEL</span>
              <span className="desc">Smoky tobacco vanilla, after-dark only. Rs. 13,990.</span>
            </Link>
            <Link className="small-card" href="/shop">
              <span className="circle"><img src="/assets/products/hayaati.webp" alt="" /></span>
              <span className="name">Lattafa Hayaati</span>
              <span className="desc">Apple, cinnamon, vanilla — cozy after-hours. Rs. 7,890.</span>
            </Link>
            <Link className="small-card" href="/shop">
              <span className="circle"><img src="/assets/products/hawas-elixir.webp" alt="" /></span>
              <span className="name">Hawas Elixir</span>
              <span className="desc">Honeyed tobacco — Rasasi&apos;s gold edition. Rs. 17,500.</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT TEASER ===== */}
      <section className="about-teaser">
        <div className="container">
          <div className="grid">
            <div className="media reveal" style={{ background: 'linear-gradient(180deg, #f5efe0 0%, #ece4d0 100%)' }}>
              <img
                src="/assets/products/hawas-for-him.png"
                alt="About Dept. of Fragrance"
                style={{ objectFit: 'contain', padding: '32px', mixBlendMode: 'multiply' }}
              />
            </div>
            <div className="copy reveal">
              <span className="eyebrow">About Us</span>
              <h2>The New<br />Our Story</h2>
              <p>Dept. of Fragrance is a Sri Lankan boutique built around a single idea: designer &amp; niche scents should be authentic, traceable, and priced for the people who actually wear them.</p>
              <p>We source directly from authorised distributors in the UAE and Europe — Lattafa, Afnan, Rasasi, Armaf, French Avenue, Rayhaan, Riffs — and pass the savings forward. No grey market. No imitations.</p>
              <p>Every bottle ships with batch verification. If it doesn&apos;t match, you don&apos;t pay.</p>
              <Link href="/about" className="btn btn-outlined">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ESSENCES ===== */}
      <section>
        <div className="container">
          <h2 className="section-head reveal">The Essences of Dept. of Fragrance</h2>
          <div className="essences-grid">
            <div className="essence-block reveal">
              <div className="media" style={{ background: 'linear-gradient(180deg, #f5efe0 0%, #ece4d0 100%)' }}>
                <img
                  src="/assets/products/khamrah-qahwa.webp"
                  alt="Lattafa Khamrah Qahwa"
                  style={{ objectFit: 'contain', padding: '16px', mixBlendMode: 'multiply' }}
                />
              </div>
              <div className="copy">
                <span className="label">— Sourcing</span>
                <h3>Authentic, High-Quality Ingredients</h3>
                <p>Every fragrance in our catalogue is sourced direct from the brand&apos;s authorised distribution channels — Lattafa, Afnan, Rasasi. Batch codes are verified before they reach you.</p>
              </div>
            </div>
            <div className="essence-block reveal">
              <div className="media" style={{ background: 'linear-gradient(180deg, #f5efe0 0%, #ece4d0 100%)' }}>
                <img
                  src="/assets/products/hawas-elixir.webp"
                  alt="Rasasi Hawas Elixir"
                  style={{ objectFit: 'contain', padding: '16px', mixBlendMode: 'multiply' }}
                />
              </div>
              <div className="copy">
                <span className="label">— Performance</span>
                <h3>Long-Lasting Scent Fragrance</h3>
                <p>EDP concentrations across the catalogue mean 8–12 hours of projection on skin. The Hawas line and Khamrah Waha routinely last a full day at the office.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO PANEL ===== */}
      <section style={{ padding: 0 }}>
        <div className="video-panel reveal">
          <img
            className="bg"
            src="https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=1800&auto=format&fit=crop&q=80"
            alt="Memorable occasion"
          />
          <div className="content">
            <button className="play-btn" aria-label="Play">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4l14 8-14 8V4z"/>
              </svg>
            </button>
            <h2>Elevate Your<br />Memorable Occasion</h2>
          </div>
        </div>
        <div className="video-caption">
          <div className="container">
            <div className="inner">
              <p>Enhance your most memorable occasions with the right fragrance — a wedding, a graduation, the first day in a new city. Find a scent that becomes part of the memory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECIAL PRODUCTS ===== */}
      <section style={{ paddingBottom: '96px' }}>
        <div className="container">
          <h2 className="section-head reveal" style={{ marginBottom: '64px' }}>Special Products</h2>
        </div>

        <div className="special-block reveal">
          <div className="special-media" style={{ background: 'linear-gradient(135deg, #f5efe0 0%, #ece4d0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/assets/products/hawas-fire.png" alt="Rasasi Hawas Fire" style={{ width: '50%', height: '100%', objectFit: 'contain', padding: '24px', mixBlendMode: 'multiply' }} />
            <img src="/assets/products/hawas-for-him.png" alt="Rasasi Hawas For Him" style={{ width: '50%', height: '100%', objectFit: 'contain', padding: '24px', mixBlendMode: 'multiply' }} />
          </div>
          <div className="special-copy">
            <span className="eyebrow">For Him</span>
            <h3>Men&apos;s Fragrance Collection</h3>
            <p>Powerhouse openings, long-haul drydowns. The Hawas series, Afnan 9pm REBEL, Rayhaan Wolf — built for first-impression weight.</p>
            <Link href="/shop?cat=men" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>

        <div className="special-block flip reveal">
          <div className="special-media" style={{ background: 'linear-gradient(135deg, #f5efe0 0%, #ece4d0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/assets/products/hayaati.webp" alt="Lattafa Hayaati" style={{ width: '50%', height: '100%', objectFit: 'contain', padding: '24px', mixBlendMode: 'multiply' }} />
            <img src="/assets/products/liquid-brun.jpg" alt="French Avenue Liquid BRUN" style={{ width: '50%', height: '100%', objectFit: 'contain', padding: '24px', mixBlendMode: 'multiply' }} />
          </div>
          <div className="special-copy">
            <span className="eyebrow">For Her</span>
            <h3>Women&apos;s Fragrance Collection</h3>
            <p>Armaf Maleka, Khamrah Waha, Vintage Radio — feminine signatures with bite. Florals that don&apos;t apologise, gourmands that don&apos;t cloy.</p>
            <Link href="/shop?cat=women" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>

        <div className="special-block reveal">
          <div className="special-media" style={{ background: 'linear-gradient(135deg, #f5efe0 0%, #ece4d0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/assets/products/vintage-radio.webp" alt="Lattafa Vintage Radio" style={{ width: '50%', height: '100%', objectFit: 'contain', padding: '24px', mixBlendMode: 'multiply' }} />
            <img src="/assets/products/khamrah-qahwa.webp" alt="Lattafa Khamrah Qahwa" style={{ width: '50%', height: '100%', objectFit: 'contain', padding: '24px', mixBlendMode: 'multiply' }} />
          </div>
          <div className="special-copy">
            <span className="eyebrow">For All</span>
            <h3>Unisex Fragrance Collection</h3>
            <p>French Avenue Vulcan Feu, Liquid BRUN, Riffs Freeze — modern shared scents. No gendered marketing. Wear what works on you.</p>
            <Link href="/shop?cat=unisex" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-head reveal">People Using Our Beautiful Product</h2>

          <div className="testimonial-card reveal">
            <div className="media">
              <img
                src={testimonials[testimonialIndex].img}
                alt="Customer"
              />
            </div>
            <div className="quote-body">
              <span className="big-quote">&ldquo;</span>
              <blockquote>{testimonials[testimonialIndex].quote}</blockquote>
              <div className="stars">{testimonials[testimonialIndex].stars}</div>
              <div className="author">{testimonials[testimonialIndex].author}</div>
            </div>
          </div>

          <div className="testimonial-nav">
            <button className="circle-btn" aria-label="Previous" onClick={() => showTestimonial(testimonialIndex - 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <div className="dots">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`dot${i === testimonialIndex ? ' active' : ''}`}
                  onClick={() => showTestimonial(i)}
                />
              ))}
            </div>
            <button className="circle-btn" aria-label="Next" onClick={() => showTestimonial(testimonialIndex + 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
