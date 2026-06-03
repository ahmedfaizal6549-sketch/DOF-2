import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) => set((state) => {
    const existing = state.items.find((i) => i.id === product.id);
    if (existing) return { items: state.items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i) };
    return { items: [...state.items, { ...product, quantity }] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => ({ items: state.items.map((i) => i.id === id ? { ...i, quantity } : i) })),
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
