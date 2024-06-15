import React, { createContext, useState, useEffect } from "react";

export const SelectedProductContext = createContext();

export const SelectedProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(
    JSON.parse(localStorage.getItem("selectedProduct")) || {}
  );

  useEffect(() => {
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  useEffect(() => {
    console.log("Product ID: ", selectedProduct);
  }, [selectedProduct]);

  return (
    <SelectedProductContext.Provider
      value={{ selectedProduct, setSelectedProduct }}
    >
      {children}
    </SelectedProductContext.Provider>
  );
};
