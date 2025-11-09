
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";

type Props = { params: { slug: string } };
    
export default async function ProductDetails({ params }: Props) {
  const {slug} = params;

  if (!slug) {
    return (
      <main className="max-w-6xl mx-auto p-8 text-center">
        <p className="text-xl font-semibold text-red-600">
          Error: Product identifier is missing from the URL.
        </p>
      </main>
    );
  }

  const query = `*[_type == "product" && slug.current == $slug][0]{
        _id, name, description, price, discountedPrice, category, image, "slug": slug.current
    }`;

  const product = await client.fetch(query, { slug });
  // const product = await client.fetch(query);

  if (!product) {
    return (
      <main className="max-w-6xl mx-auto p-8 text-center">
        <p>Product not found</p>
      </main>
    );
  }

  const finalPrice = product.discountedPrice || product.price

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex justify-center items-center relative">
        <div className="absolute top-4 right-4 z-10">
          <WishlistButton product={product} variant="icon" />
        </div>
        <Image
          src={product.image ? urlFor(product.image).url() : "placeholder.png"}
          alt={product.name}
          width={600}
          height={600}
          className="shadow-md rounded-xl object-cover"
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold">{product.name}</h1>
        <p className="text-slate-600 mt-3 whitespace-pre-line">{product.description}</p>

        <p className="text-sm text-gray-500 capitalize">
          Category: {product.category}
        </p>
        <div className="flex items-center gap-3 text-3xl font-bold border-t pt-4">
          {/* <span className="text-blue-600">
            ${product.discountedPrice || product.price}
          </span> */}
          <span className="text-blue-600">
            ${finalPrice}
          </span>
          {product.discountedPrice && (
            <span className="text-gray-400 line-through text-lg">
              ${product.price}
            </span>
          )}
        </div>
        
        <div className="flex gap-4">
          <AddToCartButton product={product}/>
          <WishlistButton product={product} variant="full"/>
        </div>
      </div>
    </main>
  );
}