// "use client"

// import Link from "next/link"
// import { cn } from "./utils"
// import { usePathname } from "next/navigation"
// import { Home, ShoppingBag, Heart } from "lucide-react"

// const items = [
//   { href: "/", label: "Home", icon: Home },
//   { href: "/categories", label: "Categories", icon: ShoppingBag },
//   { href: "/wishlist", label: "Wishlist", icon: Heart }
// ]

// export const Sidebar = () => {
//   const pathname = usePathname()

//   return (
//     <aside className="hidden md:flex flex-col h-screen w-64 bg-card p-6 border-r">
//       <h1 className="text-xl font-bold mb-8">Watch Store</h1>
//       <nav className="flex flex-col gap-2">
//         {items.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={cn(
//               "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition",
//               pathname === href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
//             )}
//           >
//             <Icon size={18} />
//             {label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   )
// }
