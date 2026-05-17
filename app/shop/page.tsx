'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'

type Category = 'all' | 'men' | 'women' | 'unisex' | 'gifts' | 'new'

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [visibleProducts, setVisibleProducts] = useState(products)
  const bannerRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Banner: characters rise one by one
      if (bannerRef.current) {
        const chars = bannerRef.current.querySelectorAll('.char')
        gsap.fromTo(chars,
          { y: '110%', rotation: 6, opacity: 0 },
          { y: 0, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.055, delay: 0.12 }
        )

        // Underline draws from center
        gsap.fromTo('.banner-underline',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 1.05, transformOrigin: 'center' }
        )

        // Breadcrumb fades up
        gsap.fromTo('.breadcrumb',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 1.3 }
        )

        // Shimmer sweep (looping)
        gsap.fromTo('.banner-shimmer',
          { xPercent: -100, opacity: 0 },
          {
            xPercent: 100, opacity: 1, duration: 1.4, ease: 'power2.inOut', delay: 1.8,
            onComplete: () => {
              gsap.set('.banner-shimmer', { opacity: 0 })
              gsap.fromTo('.banner-shimmer',
                { xPercent: -100, opacity: 0 },
                { xPercent: 100, opacity: 0.8, duration: 2, ease: 'power2.inOut', repeat: -1, repeatDelay: 5, delay: 2 }
              )
            }
          }
        )
      }

      // Filter pills stagger entrance
      gsap.fromTo('.filter-pill',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.5 }
      )

      // Product grid ScrollTrigger batch
      ScrollTrigger.batch('.product-card', {
        onEnter: batch => gsap.fromTo(batch,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
        ),
        once: true,
        start: 'top 88%',
      })
    }
    loadGSAP()
  }, [])

  const handleFilterChange = async (cat: Category) => {
    if (typeof window === 'undefined') return
    setActiveFilter(cat)

    const { gsap } = await import('gsap')
    const allCards = document.querySelectorAll('.product-card')

    const hiddenCards: Element[] = []
    const visibleCards: Element[] = []

    allCards.forEach(card => {
      const cardCat = (card as HTMLElement).dataset.product
      if (cat === 'all' || cardCat === cat) {
        visibleCards.push(card)
      } else {
        hiddenCards.push(card)
      }
    })

    if (hiddenCards.length > 0) {
      gsap.to(hiddenCards, {
        opacity: 0, y: 20, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          hiddenCards.forEach(c => { (c as HTMLElement).style.display = 'none' })
        }
      })
    }

    if (visibleCards.length > 0) {
      visibleCards.forEach(c => { (c as HTMLElement).style.display = '' })
      gsap.fromTo(visibleCards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      )
    }

    // Update filtered list for rendering
    if (cat === 'all') {
      setVisibleProducts(products)
    } else {
      setVisibleProducts(products.filter(p => p.category === cat))
    }
  }

  const getSortedProducts = () => {
    let sorted = [...visibleProducts]
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')))
        break
      case 'price-desc':
        sorted.sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')))
        break
      case 'rating':
        sorted.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }
    return sorted
  }

  const filters: { label: string; value: Category }[] = [
    { label: 'All', value: 'all' },
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Unisex', value: 'unisex' },
    { label: 'Gift Sets', value: 'gifts' },
    { label: 'New Arrivals', value: 'new' },
  ]

  return (
    <main>
      {/* BANNER */}
      <section className="page-banner" ref={bannerRef}>
        <div className="container">
          <h1 className="banner-heading" aria-label="Our Collection">
            <span className="word">
              <span className="char" style={{'--i': 0} as React.CSSProperties}>O</span>
              <span className="char" style={{'--i': 1} as React.CSSProperties}>u</span>
              <span className="char" style={{'--i': 2} as React.CSSProperties}>r</span>
            </span>
            {' '}
            <span className="word">
              <span className="char" style={{'--i': 3} as React.CSSProperties}>C</span>
              <span className="char" style={{'--i': 4} as React.CSSProperties}>o</span>
              <span className="char" style={{'--i': 5} as React.CSSProperties}>l</span>
              <span className="char" style={{'--i': 6} as React.CSSProperties}>l</span>
              <span className="char" style={{'--i': 7} as React.CSSProperties}>e</span>
              <span className="char" style={{'--i': 8} as React.CSSProperties}>c</span>
              <span className="char" style={{'--i': 9} as React.CSSProperties}>t</span>
              <span className="char" style={{'--i': 10} as React.CSSProperties}>i</span>
              <span className="char" style={{'--i': 11} as React.CSSProperties}>o</span>
              <span className="char" style={{'--i': 12} as React.CSSProperties}>n</span>
            </span>
            <span className="banner-underline" aria-hidden="true"></span>
            <span className="banner-shimmer" aria-hidden="true"></span>
          </h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            Shop
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="container">
          <div className="filter-inner">
            <div className="filter-pills">
              {filters.map(f => (
                <button
                  key={f.value}
                  className={`filter-pill${activeFilter === f.value ? ' active' : ''}`}
                  onClick={() => handleFilterChange(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="filter-tools">
              <select
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Best Rated</option>
              </select>
              <div className="view-toggle">
                <button
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                  </svg>
                </button>
                <button
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                  aria-label="List"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <line x1="8" y1="6" x2="21" y2="6"/>
                    <line x1="8" y1="12" x2="21" y2="12"/>
                    <line x1="8" y1="18" x2="21" y2="18"/>
                    <circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            ref={gridRef}
            className="shop-grid"
            style={viewMode === 'list' ? { gridTemplateColumns: '1fr' } : {}}
          >
            {getSortedProducts().map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button className="page-btn icon" aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn icon" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
