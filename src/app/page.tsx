"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { client, urlFor } from "@/lib/sanity";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import AddToCartButton from "@/components/AddToCartButton";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  slug: { current: string };
  image: any;
  category: string;
}

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "product"] | order(_createdAt desc){
        _id, name, description, price, discountedPrice, slug, category, image
        
      }`;

      try {
        const data: Product[] = await client.fetch(query);
        console.log("Total Products Fetched:", data.length); 
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    fetchData();
  }, []);

  const categories = [
    { name: "women", display: "Women's Watch Collection" },
    { name: "men", display: "Men's Watch Collection" },
    { name: "kids", display: "Kid's Watch Collection" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-100  w-full mx-auto px-4 sm:px-6 py-10">
      {/* Hero section */}
      <section className="flex flex-col md:flex-row gap-20 items-center justify-between">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
            Crafted Timepieces - Precision & Style
          </h1>
          <p className="mt-4 text-gray-600 text-xl">
            Discover our curated collection of watches blends craftsmanship with
            modern design. Choose a style that tells your story.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href="/product"
              className="px-4 py-2 rounded bg-slate-800 text-white"
            >
              Shop Now
            </Link>

            <Link href="/about" className="px-4 py-2 rounded border">
              Learn More
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex relative h-80 md:h-96 rounded-lg overflow-hidden mt-10 md:mt-0 w-full md:w-1/2"
        >
          <Image
            src={"/placeholder.png"}
            alt="Hero watch"
            width={800}
            height={800}
            className="rounded-xl shadow-lg mx-auto object-cover"
          />
        </motion.div>
      </section>

      {/* Full screen section linking to category */}

      <section className="space-y-20 mt-10 px-6 py-12">

          {categories.map((cat) => {
          const productForCategory = allProducts.find(
            (p) => p.category?.toLowerCase() === cat.name
          );

          const imgSrc = productForCategory?.image
            ? urlFor(productForCategory.image).url()
            : "/placeholder.png";

          const description = `Discover exclusive pieces made for ${
            cat.name === "kids" ? "little wrists" : cat.name
          }.`;

            return (
              <Link
                key={cat.name}
                href={`/product?cat=${cat.name}`}
                className="block"
              >
                <div className="flex flex-col md:flex-row justify-center items-center p-8 w-full">
                  <div className="flex flex-col justify-center items-center p-6 text-center md:w-1/3">
                    <h2 className="text-4xl font-bold text-gray-800 capitalize">{cat.display}</h2>
                    <p className="text-slate-700 mt-4 text-lg">{description}</p>
                  </div>
                
                {/* animated image block */}
                <motion.div
                  className="w-full md:w-2/3 h-[400px] relative overflow-hidden rounded-2xl shadow-md cursor-pointer border-5"
                  transition={{ type: "spring", stiffness: 200 }}
                  initial={{ scale: 1.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={imgSrc}
                    alt={cat.display}
                    className="object-contain p-4 rounded-xl"
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    fill
                  />
                  
                <div className="absolute inset-0 transition duration-300 bg-black/10 hover:bg-black/0"></div>
              </motion.div>
              </div>
            </Link>
          );
        })};
      </section>

      {/* Pagination for featured products list */}
      <section className="mt-12 max-w-6xl mx-auto px-4">
        <FeaturedPagination products={allProducts} />
      </section>
    </main>
  );
}

function FeaturedPagination({ products }: { products: Product[] }) {

  if (!products || products.length === 0){
    return <div className="text-center text-lg text-gray-500 py-10">Loading featured watchces...</div>
  }
  const perPage = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / perPage));

  if (page > totalPages) {
    setPage(totalPages);
  }

  const start = (page - 1) * perPage;
  const pageItems = products.slice(start, start + perPage);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">New Arrivals</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pageItems.map((p) => (
          <div
            key={p._id}
            className="border rounded-xl p-4 shadow-lg hover:shadow-xl transistion-all duration-300 bg-white"
          >
            <Link href={`product/${p.slug?.current || "#"}`} passHref>
              <div className="w-full h-56 relative mb-4">
                <Image
                  src={p.image ? urlFor(p.image).url() : "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-56 object-cover rounded-md mb-4"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </Link>
            
            <h3 className="text-lg font-semibold">{p.name}</h3>
            {p.discountedPrice ? (
              <div className="flex items-center gap-2">
                <p className="text-red-500 font-bold">${p.discountedPrice}</p>
                <p className="text-gray-600 line-through text-sm">${p.price}</p>
              </div>
            ) : (
              <p className="text-gray-800 font-semibold">${p.price}</p>
            )}
            
            <div className="mt-3">
              <AddToCartButton product={p} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
