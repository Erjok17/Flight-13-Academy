import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: any, quantity?: number, size?: string) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getItemsCount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1, size) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id && item.size === size
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          }

          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            quantity,
            image_url: product.image_url || '/images/placeholder.jpg',
            size
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeFromCart: (id, size) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.size === size))
        }));
      },

      updateQuantity: (id, quantity, size) => {
        if (quantity <= 0) {
          get().removeFromCart(id, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      getItemsCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'flight13-cart-storage'
    }
  )
);
