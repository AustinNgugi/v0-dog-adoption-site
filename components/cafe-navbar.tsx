"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function CafeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <nav className="cafe-navbar sticky top-0 z-50 backdrop-blur-sm bg-white/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-sm">S</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-foreground">Sweeven</span>
              <span className="text-xs text-muted-foreground -mt-0.5">Artisan Coffee</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-amber-600 transition-colors px-3 py-2 rounded-md hover:bg-amber-50">Home</Link>
            <Link href="/menu" className="text-foreground hover:text-amber-600 transition-colors px-3 py-2 rounded-md hover:bg-amber-50">Menu</Link>
            <Link href="/about" className="text-foreground hover:text-amber-600 transition-colors px-3 py-2 rounded-md hover:bg-amber-50">About</Link>
            <Link href="/contact" className="text-foreground hover:text-amber-600 transition-colors px-3 py-2 rounded-md hover:bg-amber-50">Contact</Link>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-11 w-11 sm:h-9 sm:w-9">
                <ShoppingCart className="h-6 w-6 sm:h-5 sm:w-5" />
                {totalItems > 0 && (
                  <span className="cart-badge text-xs font-bold bg-amber-600 text-white rounded-full px-2 py-0.5 absolute -top-1 -right-1">{totalItems}</span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-11 w-11"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

  {/* Mobile Drawer Navigation */}
  {/* aria-live region for screen reader announcements */}
  <div className="sr-only" aria-live="polite">{isMenuOpen ? 'Menu opened' : ''}</div>

  <div aria-hidden={!isMenuOpen} className={`fixed inset-0 z-40 md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'} z-10`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* drawer */}
          <div
            role="dialog"
            aria-modal="true"
            className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-20 transition-transform duration-300 ease-in-out will-change-transform`}
            style={{ touchAction: 'manipulation' }}
          >
            <MobileMenuContent onClose={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenuContent({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const focusable = el.querySelectorAll<HTMLElement>("a,button,[tabindex]:not([tabindex='-1'])")
    const first = focusable[0]
    first?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusableArr = Array.from(focusable)
        const idx = focusableArr.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && idx === 0) {
          e.preventDefault()
          focusableArr[focusableArr.length - 1].focus()
        } else if (!e.shiftKey && idx === focusableArr.length - 1) {
          e.preventDefault()
          focusableArr[0].focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div ref={containerRef} className="h-full p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
          <div>
            <div className="font-bold">Sweeven</div>
            <div className="text-xs text-muted-foreground">Artisan Coffee</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu"><X className="h-5 w-5" /></Button>
      </div>

      <div className="w-full">
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <nav className="flex flex-col gap-2">
            <Link href="/" className="block py-3 px-3 rounded-md hover:bg-amber-50 bg-white">Home</Link>
            <Link href="/menu" className="block py-3 px-3 rounded-md hover:bg-amber-50 bg-white">Menu</Link>
            <Link href="/about" className="block py-3 px-3 rounded-md hover:bg-amber-50 bg-white">About</Link>
            <Link href="/contact" className="block py-3 px-3 rounded-md hover:bg-amber-50 bg-white">Contact</Link>
          </nav>
        </div>

        <div className="mt-4">
          <Link href="/menu" className="block w-full text-center px-4 py-2 rounded bg-amber-600 text-white">Order Now</Link>
        </div>
      </div>
    </div>
  )
}
