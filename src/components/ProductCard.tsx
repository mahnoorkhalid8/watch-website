"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import WishlistButton from "./WishlistButton";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  slug?: { current: string };
  image?: any;
}

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.image ? urlFor(product.image).width(800).url() : "/placeholder.png";

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Card
      className="p-4 flex flex-col hover:shadow-lg transition-shadow duration-200 group"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div
        className="relative w-full h-56 rounded-xl overflow-hidden mb-4"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <WishlistButton product={product as any} variant="icon" />
      </div>

      <h3
        className="text-lg font-semibold line-clamp-1"
        data-aos="fade-up" data-aos-delay="300"
      >
        {product.name}
      </h3>

      <div
        className="mt-1 flex items-center gap-2"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {product.discountedPrice ? (
          <>
            <p className="text-primary font-bold">${product.discountedPrice}</p>
            <p className="text-sm text-muted-foreground line-through">${product.price}</p>
          </>
        ) : (
          <p className="text-primary font-bold">${product.price ?? 0}</p>
        )}
      </div>

      <p
        className="text-sm text-gray-500 line-clamp-2 mt-2"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        {product.description}
      </p>

      <div
        className="mt-auto pt-4"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <Link href={`/category/${product.slug?.current || product._id}`}>
          <Button size="lg" className="w-full bg-black hover:scale-105 transition-transform duration-300">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
