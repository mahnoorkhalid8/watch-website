// "use client"

// import Link from "next/link"
// import { ShoppingCart, Menu } from "lucide-react"
// import { Button } from "./button"
// import { useState } from "react"

// const SearchBar = () => {
//   return (
//     <div className="w-full">
//       <input
//         type="search"
//         placeholder="Search watches..."
//         className="w-full px-3 py-2 border rounded bg-input text-sm"
//         aria-label="Search"
//       />
//     </div>
//   )
// }

// export const Navbar = () => {
//   const [open, setOpen] = useState(false)

//   return (
//     <header className="flex items-center justify-between px-4 py-3 border-b bg-background sticky top-0 z-50">
//       <div className="flex items-center gap-2">
//         <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setOpen(!open)}>
//           <Menu size={20} />
//         </Button>
//         <Link href="/" className="font-semibold text-lg">Watch Store</Link>
//       </div>
//       <div className="hidden md:flex flex-1 justify-center max-w-lg">
//         <SearchBar />
//       </div>
//       <div className="flex items-center gap-2">
//         <Button variant="ghost" size="sm">
//           <ShoppingCart size={20} />
//         </Button>
//       </div>
//     </header>
//   )
// }
