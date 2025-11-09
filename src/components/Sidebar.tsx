"use client";

import { useRouter } from "next/navigation";
import { Card } from "./ui/card";

export default function Sidebar() {
  const router = useRouter();

  const categories = [
    { name: "Men", slug: "men" },
    { name: "Women", slug: "women" },
    { name: "Kids", slug: "kids" },
  ];


  return (
    <Card className=" bg-slate-800 text-white rounded-lg">
      <h2 className="font-semibold text-lg mb-3">Categories</h2>
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.slug}
            onClick={() => router.push(`/category?cat=${cat.slug}`)}
            className="cursor-pointer hover:text-blue-400 transition"
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </Card>
  );
}
