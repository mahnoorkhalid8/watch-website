"use client";

import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { client, urlFor } from "@/lib/sanity";
import { useSearchParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  slug?: { current: string };
  image?: any;
}

export default function CategoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        setLoading(true);
        
        const query = category
          ? `*[_type == "product" && category == "${category}"] | order(_createdAt desc){
                _id, name, description, price, discountedPrice, slug, category, image
            }`
          : `*[_type == "product"] | order(_createdAt desc){
                _id, name, description, price, discountedPrice, slug, category, image
            }`;

        console.log("🧠 GROQ query:", query);
        const data: Product[] = await client.fetch(query);
        console.log("Fetched products:", data);

        setProducts(data || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

      fetchProducts();
    }, [category]);

    if (loading) {
    return (
      <main className="max-w-6xl mx-auto p-10 text-center">
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 via-slate-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Sidebar />
        </aside>
        <section className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-8 capitalize">
            {category || "All"} Watches
          </h1>

          {products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}