import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartApi } from '../api/cart';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size: string;
  color: string;
  product: { id: string; name: string; slug: string; price: number; salePrice?: number; images: string[]; stock: number; };
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, quantity: number) => void;
  clearItems: () => void;
  toggleCart: () => void;
  syncWithServer: () => Promise<void>;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setItems: (items) => set({ items }),
      addItem: (item) => set((s) => {
        const existing = s.items.find((i) => i.productId === item.productId && i.size === item.size && i.color === item.color);
        if (existing) return { items: s.items.map((i) => i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i) };
        return { items: [...s.items, item] };
      }),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQty: (id, quantity) => set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, quantity } : i) })),
      clearItems: () => set({ items: [] }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      syncWithServer: async () => {
        try {
          const items = await cartApi.getCart();
          set({ items });
        } catch {}
      },
      total: () => get().items.reduce((sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);
