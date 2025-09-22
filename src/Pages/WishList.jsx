import React from "react";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";

const WishList = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">Your Wishlist is Empty</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-3"
            />
            <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">${product.price}</p>
            <div className="flex gap-2 mt-auto">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="bg-orange-400 text-white px-3 py-1 rounded-md hover:bg-red-700"
                onClick={() => removeFromWishlist(product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
