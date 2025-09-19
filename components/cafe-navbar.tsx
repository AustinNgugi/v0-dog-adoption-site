"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Home, Coffee, Info, Mail, Search, User } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function CafeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <nav className="cafe-navbar sticky top-0 z-50 bg-[#FFD400] border-b border-amber-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-3 mr-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-amber-600 font-extrabold">S</span>
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-lg font-bold text-amber-900">Sweeven</span>
                <span className="text-xs text-amber-800 -mt-0.5">Artisan Coffee</span>
              </div>
            </Link>
          </div>

          {/* Center: Search (desktop) */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="w-full max-w-xl">
              <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-sm">
                <Search className="w-5 h-5 text-amber-600 mr-2" />
                <input
                  aria-label="Search"
                  placeholder="Search menu, dogs or items"
                  className="w-full outline-none text-sm text-amber-900 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="cart-badge text-xs font-bold bg-amber-600 text-white rounded-full px-2 py-0.5 absolute -top-1 -right-1">{totalItems}</span>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="hidden sm:inline-flex h-11 w-11">
              <User className="h-6 w-6 text-amber-900" />
            </Button>

            {/* Search icon on mobile */}
            <Button variant="ghost" size="icon" className="md:hidden h-11 w-11">
              <Search className="h-6 w-6 text-amber-900" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6 text-amber-900" /> : <Menu className="h-6 w-6 text-amber-900" />}
            </Button>
          </div>
        </div>

  {/* Mobile Drawer Navigation */}
  {/* aria-live region for screen reader announcements */}
  <div className="sr-only" aria-live="polite">{isMenuOpen ? 'Menu opened' : ''}</div>

  <div aria-hidden={!isMenuOpen} className={`fixed inset-0 z-50 md:hidden ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'} z-20`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* left sliding prominent sidebar */}
          <div
            role="dialog"
            aria-modal="true"
            className={`absolute left-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl p-6 overflow-auto ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'} transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-30 transition-transform duration-300 ease-in-out will-change-transform`}
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
    <div ref={containerRef} className="h-full p-4 flex flex-col bg-white overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">S</div>
          <div>
            <div className="font-extrabold text-lg">Sweeven</div>
            <div className="text-sm text-amber-700 -mt-0.5">Artisan Coffee</div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu"><X className="h-6 w-6 text-amber-900" /></Button>
      </div>

      <div className="w-full">
        <div className="divide-y divide-amber-100 bg-transparent">
          <nav className="flex flex-col gap-0">
            <Link href="/" onClick={() => onClose()} className="flex items-center gap-3 px-4 py-5 hover:bg-amber-50 text-lg font-semibold text-amber-900">
              <Home className="w-6 h-6 text-amber-600" />
              <span>Home</span>
            </Link>
            <Link href="/menu" onClick={() => onClose()} className="flex items-center gap-3 px-4 py-5 hover:bg-amber-50 text-lg font-semibold text-amber-900">
              <Coffee className="w-6 h-6 text-amber-600" />
              <span>Menu</span>
            </Link>
            <Link href="/about" onClick={() => onClose()} className="flex items-center gap-3 px-4 py-5 hover:bg-amber-50 text-lg font-semibold text-amber-900">
              <Info className="w-6 h-6 text-amber-600" />
              <span>About</span>
            </Link>
            <Link href="/contact" onClick={() => onClose()} className="flex items-center gap-3 px-4 py-5 hover:bg-amber-50 text-lg font-semibold text-amber-900">
              <Mail className="w-6 h-6 text-amber-600" />
              <span>Contact</span>
            </Link>
          </nav>

          <div className="px-4 py-5">
            <Link href="/menu" onClick={() => onClose()} className="flex items-center justify-center gap-2 w-full text-center px-4 py-3 rounded bg-amber-600 text-white font-semibold">
              <ShoppingCart className="w-5 h-5" />
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
