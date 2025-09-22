import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const WishlistContext = createContext();

// Provider
export const WishlistProvider = ({ children }) => {
  // Initialize wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add to wishlist
  const addToWishlist = (item) => {
    if (!wishlist.find((w) => w.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook
export const useWishlist = () => useContext(WishlistContext);
