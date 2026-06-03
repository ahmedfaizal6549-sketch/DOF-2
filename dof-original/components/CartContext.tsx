'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Product } from '@/lib/products'

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartCount: number
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalPrice: number
  wishlistItems: Set<number>
  toggleWishlist: (id: number) => void
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalPrice: 0,
  wishlistItems: new Set(),
  toggleWishlist: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const saved = localStorage.getItem('dof-cart-items')
    if (saved) setCartItems(JSON.parse(saved))
    const wishlist = JSON.parse(localStorage.getItem('dof-wishlist') || '[]') as number[]
    setWishlistItems(new Set(wishlist))
  }, [])

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('dof-cart-items', JSON.stringify(items))
    setCartItems(items)
  }

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      const next = existing
        ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
        : [...prev, { ...product, quantity }]
      localStorage.setItem('dof-cart-items', JSON.stringify(next))
      return next
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => {
      const next = prev.filter(i => i.id !== id)
      localStorage.setItem('dof-cart-items', JSON.stringify(next))
      return next
    })
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setCartItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, quantity } : i)
      localStorage.setItem('dof-cart-items', JSON.stringify(next))
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    localStorage.removeItem('dof-cart-items')
    setCartItems([])
  }, [])

  const toggleWishlist = useCallback((id: number) => {
    setWishlistItems(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem('dof-wishlist', JSON.stringify(Array.from(next)))
      return next
    })
  }, [])

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = cartItems.reduce((s, i) => {
    const num = parseInt(i.price.replace(/\D/g, ''))
    return s + num * i.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, wishlistItems, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
