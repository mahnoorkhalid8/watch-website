"use client";

import useCart from "@/context/CartContext";

export default function CartPage() {
  const{ cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your Cart is empty!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}

                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="bg-gray-800 text-white px-6 py-2 mt-6 rounded-md"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}