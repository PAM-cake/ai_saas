/**
 * Nav Items Component
 * Navigation menu items with active state highlighting
 * Displays links to main sections of the application
 */

"use client"
import Link from "next/link" 
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

/**
 * Navigation items configuration
 * Defines the main navigation links and their destinations
 */
const navItems = [
    {label: 'Home', href:"/"},
    {label: "Companions", href:"/companions"},
    {label: "My Journey", href:"/my-journey"},
]

/**
 * Nav Items component that renders the main navigation menu
 * Highlights the active link based on current path
 * @returns A navigation menu with links to main sections
 */
const Navitems = () => {
    const pathname = usePathname() 

  return (
    <nav className="flex items-center gap-4">
        {/* Map through navigation items to create links */}
        {navItems.map(({label, href}) => (
            <Link
                href={href}
                key={label}
                className={cn(pathname === href && "text-primary font-semibold")}>
                {label}
            </Link>
        ))}
    </nav>
  )
}

export default Navitems