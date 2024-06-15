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
  const addToCartHandler = (addedProduct) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(
        (item) => item.product_id === addedProduct.product_id
      );
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === addedProduct.id
            ? { ...item, quantity: item.quantity + addedProduct.quantity }
            : item
        );
      } else {
        return [...prevItems, addedProduct];
      }
    });
    console.log(cartItems);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, totalPrice, addToCartHandler }}
    >
      {children}
    </CartContext.Provider>
  );
};
