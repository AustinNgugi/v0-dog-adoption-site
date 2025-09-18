"use client"

import { CafeNavbar } from "@/components/cafe-navbar"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { CafeFooter } from "@/components/cafe-footer"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <div className="min-h-screen">
      <CafeNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            Your Cart
          </h1>
          <p className="text-lg text-muted-foreground">
            {totalItems > 0 ? `${totalItems} item${totalItems > 1 ? "s" : ""} in your cart` : "Your cart is empty"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h3 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any delicious items to your cart yet. Browse our menu to get started!
            </p>
            <Link href="/menu">
              <Button className="btn-order">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems />
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
      <CafeFooter />
    </div>
  )
}
