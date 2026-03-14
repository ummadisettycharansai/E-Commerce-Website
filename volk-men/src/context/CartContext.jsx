import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('volk_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('volk_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size, color, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.variant.size === size && item.variant.color === color);
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, variant: { size, color } }];
    });
  };

  const removeFromCart = (id, size, color) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.variant.size === size && item.variant.color === color)));
  };

  const updateQuantity = (id, size, color, quantity) => {
    setCart(prev => prev.map(item => 
      (item.id === id && item.variant.size === size && item.variant.color === color) 
      ? { ...item, quantity: Math.max(1, quantity) } 
      : item
    ));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
