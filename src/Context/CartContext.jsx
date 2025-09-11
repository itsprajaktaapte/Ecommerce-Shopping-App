import React, { createContext, useContext, useState } from "react";

// create context  - createContext()
const CartContext = createContext();

// export context -
// By putting cart, addToCart, removeFromCart in the Provider, all components can share the same logic and data.
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      //  Check if this product already exists in the cart
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If it exists, return a new array where only that product's qty is increased
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      // If it does not exist, add it as a brand new item with qty = 1
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
         {
        if (item.id === id)
         {
          // create a new object for this item with increased qty
          return { ...item, qty: item.qty + 1 };
         }
        // keep other items unchanged
        return item;
          });
      return newCart;
    });
  };

  const decreaseQty = (id) =>{
  setCart((prevCart) => 
    {
    const afterDecrease = prevCart.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });

    // remove items whose qty dropped to 0
    const filtered = afterDecrease.filter((item) => item.qty > 0);
    return filtered;
  });
};
  // clearing cart items
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart,increaseQty,decreaseQty,}}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook to use context - useContext(CartContext)
export const useCart = () => useContext(CartContext);
