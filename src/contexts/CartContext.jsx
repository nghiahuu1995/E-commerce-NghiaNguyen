// CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const totalPrice = cartItems
    .reduce((acc, item) => parseFloat(item.price * item.quantity) + acc, 0)
    .toFixed(2);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
