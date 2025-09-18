"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"

export function OrderSummary() {
  const { items, getTotalPrice, getTotalItems } = useCart()

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.16 // 16% VAT
  const deliveryFee = subtotal > 2000 ? 0 : 150 // Free delivery over KES 2000
  const total = subtotal + tax + deliveryFee

  return (
    <div className="space-y-6">
      <Card className="cafe-card">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">KES {(item.price * item.quantity).toFixed(0)}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({getTotalItems()} items)</span>
              <span>KES {subtotal.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>VAT (16%)</span>
              <span>KES {tax.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `KES ${deliveryFee.toFixed(0)}`}
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">KES {total.toFixed(0)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="cafe-card">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Delivery Information</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>Delivery within 5km of cafe</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕒</span>
              <span>Estimated delivery: 30-45 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>We'll call you when your order is ready</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
