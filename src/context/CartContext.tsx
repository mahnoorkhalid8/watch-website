"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity?: number;
}

interface createContextTyp {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: ()=> void;
}

const CartContext = createContext<createContextTyp | undefined> (undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const sorted = localStorage.getItem("cart");
        if (sorted) setCart(JSON.parse(sorted));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item._id === product._id);
            if (existing) {
                return prev.map((item) => 
                    item._id === product._id
                        ? {...item, quantity: (item.quantity || 1) +1 }
                        : item
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item._id !== id));
    };

    const clearCart = () => setCart([]);

    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default  function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
}