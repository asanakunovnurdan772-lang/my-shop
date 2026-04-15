import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
}

type CartState = {
  items: CartItem[]

  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items
        const existing = items.find((i) => i.id === product.id)

        if (existing) {
          set({
            items: items.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)),
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          })
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((i) => i.id !== id),
        })
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    },
  ),
)
