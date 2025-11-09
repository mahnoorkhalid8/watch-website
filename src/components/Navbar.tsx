"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, Heart } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <Link href="/" className="text-4xl font-bold tracking-wide">
            TimeAura
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/">Home</Link>
            <Link href="/category">Category</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/login">Login</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Search
              onClick={() => setShowSearch(!showSearch)}
              className="cursor-pointer"
            />
            <CartIcon />
            <Link href="/wishlist">
              <Heart className="cursor-pointer hover:text-red-500 transition"/>
            </Link>
            
            <Menu
              className="md:hidden cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden bg-slate-800 flex flex-col items-center py-4 space-y-4">
            <Link href="/">Home</Link>
            <Link href="/category">Category</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/login">Login</Link>
          </div>
        )}

        {/* SearchBar Toggle */}
        {showSearch && <SearchBar />}
      </nav>
    </div>
  );
}
