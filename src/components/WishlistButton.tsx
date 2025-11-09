"use client";
import useWishlist, { WishlistItem } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
    product: WishlistItem;
    variant?: "icon" | "full";
}

export default function WishlistButton({ product, variant = "icon" } : WishlistButtonProps) {
    const { addToWishlist, isInWishlist } = useWishlist();
    const isWished = isInWishlist(product._id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        addToWishlist(product);
    };
    if (variant === "full"){
        return(
            <button
                onClick={handleClick}
                className={`w-full py-2 rounded-md transition flex items-center justify-center gap-2 sm:ml-auto mt-4 sm:mt-0 
                    ${isWished ? " text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
                <Heart className="w-4 h-4 fill-current"/>
                {isWished ? "Removed From Wishlist" : "Add To Wishlist"}
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`absolute top-2 right-2 p-1 z-10 bg-transparent transition-colors border-0`}
                aria-label={isWished ? "Removed From Wishlist" : "Add To Wishlist"}
        >
            <Heart
                className={`w-5 h-5 transition-all duration-300 ${
                    isWished ? "text-red-500 fill-red-500 hover:text-red-600 hover:fill-red-600"
                    : "text-gray-500 fill-white hover:text-red-500 hover:fill-red-500"}`}
                style={{stroke: isWished ? "" : "currentcolor", strokeWidth: isWished ? 0 : 1.5}}    
            />
        </button>
    );
}