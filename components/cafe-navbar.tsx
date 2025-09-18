"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function CafeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <nav className="cafe-navbar sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">Sweeven</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/menu" className="text-foreground hover:text-primary transition-colors">
              Menu
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-11 w-11 sm:h-9 sm:w-9">
                <ShoppingCart className="h-6 w-6 sm:h-5 sm:w-5" />
                {totalItems > 0 && <span className="cart-badge text-xs font-bold">{totalItems}</span>}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-11 w-11"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-foreground hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
