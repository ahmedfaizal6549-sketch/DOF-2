'use client'

import { useState } from 'react'
import { Product } from '@/lib/products'
import { useCart } from './CartContext'

interface ProductCardProps {
  product: Product
  className?: string
}

const heartSVG = (filled: boolean) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
)

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart, wishlistItems, toggleWishlist } = useCart()
  const [added, setAdded] = useState(false)
  const isWishlisted = wishlistItems.has(product.id)

  const handleAddToCart = () => {
    if (added) return
    addToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <article className={`product-card${className ? ' ' + className : ''}`} data-product={product.category}>
      <div className="media">
        <img src={product.image} alt={product.name} />
        <button
          className={`wishlist-btn${isWishlisted ? ' active' : ''}`}
          aria-label="Wishlist"
          onClick={handleWishlist}
        >
          {heartSVG(isWishlisted)}
        </button>
      </div>
      <div className="body">
        <span className="cat">{product.cat}</span>
        <h3 className="name">{product.name}</h3>
        <p className="notes">{product.notes}</p>
        <div className="meta">
          <span className="stars">{product.stars}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="price-row">
          <span className="price">{product.price}</span>
          {product.priceOld && <span className="price-old">{product.priceOld}</span>}
        </div>
        <button
          className="btn btn-outlined btn-block"
          onClick={handleAddToCart}
          style={{ pointerEvents: added ? 'none' : 'auto' }}
        >
          {added ? 'ADDED ✓' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
