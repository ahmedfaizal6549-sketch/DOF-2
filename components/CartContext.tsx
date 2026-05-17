'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface CartContextType {
  cartCount: number
  addToCart: () => void
  wishlistItems: Set<number>
  toggleWishlist: (id: number) => void
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
  wishlistItems: new Set(),
  toggleWishlist: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistItems, setWishlistItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const count = parseInt(localStorage.getItem('dof-cart') || '0', 10)
    setCartCount(count)
    const wishlist = JSON.parse(localStorage.getItem('dof-wishlist') || '[]') as number[]
    setWishlistItems(new Set(wishlist))
  }, [])

  const addToCart = useCallback(() => {
    setCartCount(prev => {
      const next = prev + 1
      localStorage.setItem('dof-cart', String(next))
      return next
    })
  }, [])

  const toggleWishlist = useCallback((id: number) => {
    setWishlistItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      localStorage.setItem('dof-wishlist', JSON.stringify(Array.from(next)))
      return next
    })
  }, [])

  return (
    <CartContext.Provider value={{ cartCount, addToCart, wishlistItems, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
