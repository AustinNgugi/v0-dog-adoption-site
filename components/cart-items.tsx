"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (id: number, change: number) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change)
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Order Items</h2>

      {items.map((item) => (
        <Card key={item.id} className="cafe-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-primary font-semibold">KES {item.price.toFixed(0)}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="h-8 w-8 flex-shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="h-8 w-8 flex-shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right min-w-[4rem]">
                <p className="font-semibold text-primary">KES {(item.price * item.quantity).toFixed(0)}</p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
