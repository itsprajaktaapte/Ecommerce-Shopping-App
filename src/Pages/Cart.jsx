import { useCart } from "../Context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6"> Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">No items added yet.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id}className="flex items-center justify-between border rounded-lg p-4 shadow-sm">
                {/* Product Info */}
                <div className="flex flex-col">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <span className="text-gray-600">${item.price}</span>
                </div>

                <div className="flex items-center gap-6">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => decreaseQty(item.id)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">
                      −
                    </button>
                    <span className="px-4 py-1">{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}className="px-3 py-1 bg-gray-200 hover:bg-gray-300">
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button onClick={() => removeFromCart(item.id)} className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total + Clear Button */}
          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <h2 className="text-xl font-bold">
              Total: $
              {cart
                .reduce((sum, item) => sum + item.price * item.qty, 0)
                .toFixed(2)}
            </h2>
            <button
              onClick={clearCart}
              className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
