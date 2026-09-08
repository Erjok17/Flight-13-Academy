import { create } from 'zustand';
import { persist, type PersistStorage } from 'zustand/middleware';

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

// Resolves which storage slot the cart should read/write to, based on
// whoever is currently logged in. Logged-out visitors get a shared "guest"
// cart; each logged-in account gets its own isolated cart.
const getCartStorageKey = () => {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user?.id) return `flight13-cart-storage-${user.id}`;
    }
  } catch (e) {
    // fall through to guest key
  }
  return 'flight13-cart-storage-guest';
};

const dynamicStorage: PersistStorage<Pick<CartState, 'items'>> = {
  getItem: (_name) => {
    const raw = localStorage.getItem(getCartStorageKey());
    return raw ? JSON.parse(raw) : null;
  },
  setItem: (_name, value) => {
    localStorage.setItem(getCartStorageKey(), JSON.stringify(value));
  },
  removeItem: (_name) => {
    localStorage.removeItem(getCartStorageKey());
  },
};

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
      name: 'flight13-cart-storage',
      storage: dynamicStorage,
    }
  )
);

// Call this immediately after localStorage's 'user' key changes (login,
// logout, or switching accounts) so the cart reloads from the correct
// per-account slot without needing a full page refresh.
export const reloadCartForCurrentUser = () => {
  useCartStore.persist.rehydrate();
};