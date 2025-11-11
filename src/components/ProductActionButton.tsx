"use client";

import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton  from "@/components/WishlistButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductActionButtons({ product }: { product: any }) {
    const handleAddTtoCart = () => {
        toast.success(`${product.name} added to cart!`);
    };

    const handleAddTtoWishlist = () => {
        toast.success(`${product.name} added to wishlist!`);
    };

    return (
        <div className="flex gap-4">
            <div onClick={handleAddTtoCart}>
                <AddToCartButton product={product} />
            </div>

            <div onClick={handleAddTtoWishlist}>
                <WishlistButton product={product} variant="full" />
            </div>
            <ToastContainer />
        </div>
    );
}