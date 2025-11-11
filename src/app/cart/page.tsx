"use client";

import useCart from "@/context/CartContext";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const{ cart, removeFromCart, clearCart } = useCart();
  const typedCart = cart as CartItem[];

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your Cart is empty!</p>
      ) : (
        <>
          {typedCart.map((item) => {
            const itemImageUrl = item.image ? urlFor(item.image).width(100).height(100).url() : null;

            return (
              <div key={item._id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  {itemImageUrl && (
                    <Image
                      src={itemImageUrl}
                      alt={item.name}
                      width={64}
                      height={64}
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
            );
          })}
          <button
            onClick={clearCart}
            className="bg-gray-800 text-white px-6 py-2 mt-6 rounded-md"
          >
            Clear Cart
          </button>
        </>
      )};
    </div>
  );
}