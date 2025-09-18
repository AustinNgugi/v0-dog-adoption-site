"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export function CartSummary() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.16 // 16% VAT for Kenya
  const deliveryFee = subtotal > 2000 ? 0 : 150 // Free delivery over 2000 KES, otherwise 150 KES
  const total = subtotal + tax + deliveryFee

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <Card className="cafe-card">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({getTotalItems()} items)</span>
              <span>KES {subtotal.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (16% VAT)</span>
              <span>KES {tax.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `KES ${deliveryFee.toFixed(0)}`}
              </span>
            </div>

            {subtotal < 2000 && deliveryFee > 0 && (
              <p className="text-sm text-muted-foreground">
                Add KES {(2000 - subtotal).toFixed(0)} more for free delivery
              </p>
            )}
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">KES {total.toFixed(0)}</span>
          </div>

          <div className="space-y-2">
            <Link href="/checkout" className="w-full">
              <Button className="btn-order w-full">Proceed to Checkout</Button>
            </Link>

            <Button variant="outline" className="w-full btn-secondary bg-transparent" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="cafe-card">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Pickup Information</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>📍 123 Coffee Street</p>
            <p>🕒 Ready in 15-20 minutes</p>
            <p>📞 (555) 123-4567</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
