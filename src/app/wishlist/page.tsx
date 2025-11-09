"use client";

import useWishlist, { WishlistItem}  from "@/context/WishlistContext";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import useCart from "@/context/CartContext";
import WishlistButton from "@/components/WishlistButton";

export default function WishlistPage() {
    const { wishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (item: WishlistItem) => {
        addToCart(item as any);
        alert(`${item.name} has been added to your cart!`);
    };

    const handlRemoveFromWishlist = (item: WishlistItem) => {
        alert(`${item.name} has been removed from your Wishlist!`);
    };

    return (
        <main className="max-w-6xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold m-10 text-gray-800">Your Wishlist ({wishlist.length} Items)</h1>
            {wishlist.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-xl text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-4 stroke-1 fill-gray-200"/>
                    <p className="text-xl font-semibold">Your Wishlist is Empty!</p>
                    <p className="mt-2">Find a watch you love and add it here!</p>
                    <Link href="/category" className="mt-4 inline-block text-blue-600 hover:underline">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {wishlist.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col sm:flex-row text-center bg-white p-4 sm:p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg"
                        >
                            <div className="relative w-24 h-24  sm:w-32 sm:h-32 flex-shrink-0">
                                <Image
                                    src={item.image ? urlFor(item.image).url() : "/placeholder.png"}
                                    alt={item.name}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="100px"
                                />
                            </div>

                            <div className="flex-grow sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                                <Link
                                    href={`/product/${item.slug?.current || item._id}`}
                                    className="hover:text-blue-600"
                                >
                                    <h2 className="text-xl font-semibold line-clamp-1">{item.name}</h2>
                                </Link>

                                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                                    <p className="text-lg font-bold text-gray-900">
                                        ${item.discountedPrice || item.price}
                                    </p>
                                    {item.discountedPrice && (
                                        <p className="text-sm text-gray-500 line-through">
                                            ${item.price}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex sm:ml-auto gap-3 mt-4 sm:mt-0">
                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="flex items-center gap-2 text-sm bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transitiion"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add To Cart
                                </button>
                                <div
                                    onClick={()=> handlRemoveFromWishlist(item)}
                                    className="flex items-center gap-2 text-sm bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transitiion"
                                >
                                    <WishlistButton product={item} variant="full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}