"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AzzuriNavbar() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const adoptedDogs = JSON.parse(localStorage.getItem("adoptedDogs") || "[]")
      setCartCount(adoptedDogs.length)
    }

    updateCartCount()

    // Listen for storage changes
    window.addEventListener("storage", updateCartCount)

    // Custom event for cart updates
    window.addEventListener("cartUpdated", updateCartCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [])

  return (
    <nav className="azzuri-navbar sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <Heart className="h-6 w-6" />
            <span>Azzuri Dog Adoption</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="#dogs" className="text-white hover:text-orange-200 transition-colors">
              Browse Dogs
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="text-white hover:text-orange-200 hover:bg-white/10">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
