"use client"
import { CafeNavbar } from "@/components/cafe-navbar"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import { CafeFooter } from "@/components/cafe-footer"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, getTotalItems } = useCart()
  const totalItems = getTotalItems()

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <CafeNavbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h3 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You need items in your cart before you can checkout.
            </p>
            <Link href="/menu">
              <Button className="btn-order">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Menu
              </Button>
            </Link>
          </div>
        </main>
        <CafeFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <CafeNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Checkout</h1>
          <p className="text-lg text-muted-foreground">
            Complete your order of {totalItems} item{totalItems > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CheckoutForm />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </main>
      <CafeFooter />
    </div>
  )
}
