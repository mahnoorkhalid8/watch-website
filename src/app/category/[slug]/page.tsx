import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import WishlistButton from "@/components/WishlistButton";
import ProductActionButtons from "@/components/ProductActionButton";
import { Card } from "@/components/ui/card";

type Props = {
  params: Promise<{ slug: string }>; // ✅ params is a Promise in latest Next.js
};

export const revalidate = 0;

export default async function ProductDetails({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  console.log("[product page] resolved slug:", slug);

  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id, name, description, price, discountedPrice, category, image, "slug": slug.current
  }`;

  let product = null;

  try {
    product = await client.fetch(query, { slug });
    console.log("[product page] fetched product:", product);
  } catch (err) {
    console.error("[product page] fetch error:", err);

    return (
      <main className="max-w-6xl mx-auto p-8 text-center">
        <p className="text-xl font-semibold text-red-600">
          Error fetching product.
        </p>
        <pre className="text-sm mt-4">{String(err)}</pre>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-6xl mx-auto p-8 text-center">
        <p className="text-xl font-semibold text-red-600">
          Product not found for slug: {slug}
        </p>
      </main>
    );
  }

  const finalPrice = product.discountedPrice || product.price;
  const imageUrl =
    product.image && (product.image.asset || product.image._ref)
      ? urlFor(product.image).width(1200).url()
      : "/placeholder.png";

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex justify-center items-center relative">
        <Card className="relative w-full max-w-md h-[500px] flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute top-4 right-4 z-10">
            <WishlistButton product={product} variant="icon" />
          </div>

          <Image
            src={imageUrl}
            alt={product.name || "Product"}
            width={600}
            height={600}
            className="shadow-md rounded-xl object-cover transition-transform duration-500 hover:scale-105"
          />
        </Card>     
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold">{product.name}</h1>
        <p className="text-slate-600 mt-3 whitespace-pre-line">
          {product.description}
        </p>

        <p className="text-sm text-gray-500 capitalize">
          Category: {product.category}
        </p>

        <div className="flex items-center gap-3 text-3xl font-bold border-t pt-4">
          <span className="text-blue-600">${finalPrice}</span>
          {product.discountedPrice && (
            <span className="text-gray-400 line-through text-lg">
              ${product.price}
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <ProductActionButtons product={product} />
        </div>
      </div>
    </main>
  );
}
