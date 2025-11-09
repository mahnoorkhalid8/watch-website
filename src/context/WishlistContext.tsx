"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WishlistItem {
    _id: string;
    name: string;
    image: any;
    price: number;
    discountedPrice?: number;
    slug: { current: string };
}

interface WishlistContextType {
    wishlist: WishlistItem[]
    addToWishlist: (product: WishlistItem) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedWishlist = localStorage.getItem("watch_wishlist");
            if (storedWishlist) {
                setWishlist(JSON.parse(storedWishlist));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("watch_wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist]);

    const isInWishlist = (productId: string) => {
        return wishlist.some(item => item._id === productId);
    };

    const addToWishlist = (product: WishlistItem) => {
        setWishlist(current => {
            if (isInWishlist(product._id)) {
                return current.filter(item => item._id !== product._id);
            }
            return [...current, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist(current => current.filter(item => item._id !== productId));
    };

    return (
        <WishlistContext.Provider
            value={{wishlist, addToWishlist, removeFromWishlist, isInWishlist}}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export default function useWishlist() {
        const context = useContext(WishlistContext);
        if (context == undefined) {
            throw new Error("useWishlit must be used within a WishlistProvider");
        }
        return context;
    };