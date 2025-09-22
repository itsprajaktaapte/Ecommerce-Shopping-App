import React, { memo } from "react";
import { useWishlist } from "../Context/WishlistContext";

const ItemCard = memo(({ product, addToCart, cartItems }) => {
 

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishListed = wishlist?.some((item) => item.id === product.id);

  // Optional: show quantity in cart
  const quantityInCart = cartItems?.find((item) => item.id === product.id)?.qty || 0;
  

  return (
    <div className="flex flex-col p-4 bg-white text-black rounded-2xl shadow-lg border border-green-700">
      {/* Image */}
      <div className="h-40 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="mt-2 text-lg font-semibold text-green-950 line-clamp-2">
        {product.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {product.description}
      </p>

      {/* Category + Rating */}
      <div className="mt-2 flex justify-between text-sm text-gray-700">
        <span className="italic">{product.category}</span>
        <span>⭐ {product.rating.rate}</span>
      </div>

      {/* Price + Button */}
      <div className="mt-auto flex justify-between items-center p-2">
        <span className="px-3 py-1 bg-black text-white rounded-sm font-semibold">
          ${product.price}
        </span>

        <button
          onClick={() => addToCart(product)}
          className="bg-green-950 rounded-md text-white px-3 py-1 hover:bg-green-800"
        >
          Add to cart {quantityInCart > 0 && `(${quantityInCart})`}
        </button>

        {isWishListed ? (
          <button
            className="bg-purple-500 text-black px-3 py-1 rounded"
            onClick={() => removeFromWishlist(product.id)}
          >
            Remove ❤️
          </button>
        ) : (
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => addToWishlist(product)}
          >
            ❤️ Wishlist
          </button>
        )}
      </div>
    </div>
  );
});

export default ItemCard;
