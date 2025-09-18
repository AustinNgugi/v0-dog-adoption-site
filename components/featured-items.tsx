"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"

const featuredItems = [
  {
    id: 1,
    name: "Signature Espresso",
    description: "Rich, bold espresso with notes of chocolate and caramel",
    price: 585,
    image: "/espresso-coffee-cup-on-wooden-table.jpg",
  },
  {
    id: 2,
    name: "Artisan Croissant",
    description: "Buttery, flaky croissant baked fresh daily",
    price: 422,
    image: "/golden-croissant-on-plate-with-coffee.jpg",
  },
  {
    id: 3,
    name: "Avocado Toast",
    description: "Smashed avocado on sourdough with cherry tomatoes",
    price: 1138,
    image: "/avocado-toast-with-tomatoes-on-wooden-board.jpg",
  },
  {
    id: 4,
    name: "Caramel Latte",
    description: "Smooth espresso with steamed milk and caramel drizzle",
    price: 682,
    image: "/caramel-latte-with-foam-art-in-white-cup.jpg",
  },
]

export function FeaturedItems() {
  const { addItem } = useCart()

  const handleAddToCart = (item: (typeof featuredItems)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Items</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Discover our most popular items, crafted with love and the finest ingredients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <Card key={item.id} className="cafe-card group">
            <div className="relative overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <span className="price-badge">KES {item.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 text-pretty">{item.description}</p>
              <Button className="btn-order w-full" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
