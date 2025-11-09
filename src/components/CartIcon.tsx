"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  return (
    <Link href="/cart">
      <ShoppingCart className="cursor-pointer hover:text-blue-400" />
    </Link>
  );
}
