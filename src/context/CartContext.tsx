import React from 'react';
import { useCartStore } from '../store/useCartStore';

export const useCart = () => {
  const store = useCartStore();
  return {
    items: store.items,
    addToCart: store.addToCart,
    removeFromCart: (id: string) => store.removeFromCart(id),
    updateQuantity: (id: string, quantity: number) => store.updateQuantity(id, quantity),
    clearCart: store.clearCart,
    getTotalItems: store.getItemsCount,
    getTotalPrice: store.getTotalPrice,
    isLoading: false
  };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};