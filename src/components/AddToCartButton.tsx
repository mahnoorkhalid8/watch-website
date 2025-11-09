"use client";

import useCart from "@/context/CartContext";

interface AddToCartButtonProps {
    product: {
        _id: string;
        name: string;
        price: number;
        imageUrl?: string;
    };
}

export default function AddToCartButton ({product}: AddToCartButtonProps) {
    const { addToCart } = useCart();

    return(
        <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Add To Cart
        </button>
    );
}