import React from 'react';
import { useCartStore } from '../store/useCartStore';

export const useCart = () => {
  const store = useCartStore();
  return {
    items: store.items,
    addToCart: store.addToCart,
    removeFromCart: (id: string, size?: string) => store.removeFromCart(id, size),
    updateQuantity: (id: string, quantity: number, size?: string) => store.updateQuantity(id, quantity, size),
    clearCart: store.clearCart,
    getTotalItems: store.getItemsCount,
    getTotalPrice: store.getTotalPrice,
    isLoading: false
  };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};