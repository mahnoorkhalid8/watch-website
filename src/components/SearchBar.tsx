"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import client, { urlFor } from "@/lib/sanity";

export interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  image: any;
  description: string;
  slug: { current: string };
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length < 2) {
        setProducts([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      try {
        const myQuery = `*[_type == "product" && name match $searchQuery] {
          _id, name, price, image, slug
          }`;

        const result: Product[] = await client.fetch(myQuery, {
          searchQuery: `${trimmedQuery}*`,
        });

        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsSearching(false);
      }
    }

    const timer = setTimeout(() => {
      fetchProducts();
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-slate-800 p-4 flex flex-col items-center relative z-50">
      <form onSubmit={handleSearch} className="flex justify-center w-full">
        <input
          type="text"
          placeholder="Search watches..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-1/2 p-2 rounded-lg text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg"
        >
          {isSearching ? "..." : "Search"}
        </button>
      </form>

      {/* search result dropdown */}
      {query.length >= 2 && !isSearching && products.length > 0 && (
        <div className="absolute top-full mt-1 w-1/2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto text-left">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setQuery("")}
            >
              {product.image && (
                <Image
                  src={urlFor(product.image).width(50).url()}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="object-contain rounded"
                />
              )}

              <div>
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Show message if searching is done and no results */}
      {query.length >= 2 && !isSearching && products.length === 0 && (
        <div className="absolute top-full mt-1 w-1/2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-left">
          <p className="text-gray-500">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
