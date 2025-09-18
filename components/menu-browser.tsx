"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Minus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

const menuItems = [
  // Coffee
  {
    id: 1,
    name: "Signature Espresso",
    description: "Rich, bold espresso with notes of chocolate and caramel",
    price: 585,
    category: "coffee",
    image: "/espresso-coffee-cup-on-wooden-table.jpg",
  },
  {
    id: 2,
    name: "Caramel Latte",
    description: "Smooth espresso with steamed milk and caramel drizzle",
    price: 682,
    category: "coffee",
    image: "/caramel-latte-with-foam-art-in-white-cup.jpg",
  },
  {
    id: 3,
    name: "Cappuccino",
    description: "Classic Italian coffee with steamed milk foam",
    price: 617,
    category: "coffee",
    image: "/cappuccino-coffee-cup.png",
  },
  {
    id: 4,
    name: "Cold Brew",
    description: "Smooth, refreshing cold-brewed coffee served over ice",
    price: 552,
    category: "coffee",
    image: "/cold-brew-coffee-glass.jpg",
  },

  // Pastries
  {
    id: 5,
    name: "Artisan Croissant",
    description: "Buttery, flaky croissant baked fresh daily",
    price: 422,
    category: "pastries",
    image: "/golden-croissant-on-plate-with-coffee.jpg",
  },
  {
    id: 6,
    name: "Chocolate Muffin",
    description: "Rich chocolate muffin with chocolate chips",
    price: 487,
    category: "pastries",
    image: "/chocolate-muffin.png",
  },
  {
    id: 7,
    name: "Blueberry Scone",
    description: "Fresh blueberry scone with a light glaze",
    price: 455,
    category: "pastries",
    image: "/blueberry-scone.jpg",
  },

  // Food
  {
    id: 8,
    name: "Avocado Toast",
    description: "Smashed avocado on sourdough with cherry tomatoes",
    price: 1137,
    category: "food",
    image: "/avocado-toast-with-tomatoes-on-wooden-board.jpg",
  },
  {
    id: 9,
    name: "Grilled Sandwich",
    description: "Turkey and cheese grilled sandwich with side salad",
    price: 1235,
    category: "food",
    image: "/grilled-sandwich.png",
  },
  {
    id: 10,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan and croutons",
    price: 942,
    category: "food",
    image: "/caesar-salad.png",
  },

  // Beverages
  {
    id: 11,
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 487,
    category: "beverages",
    image: "/fresh-orange-juice.png",
  },
  {
    id: 12,
    name: "Iced Tea",
    description: "Refreshing iced tea with lemon",
    price: 383,
    category: "beverages",
    image: "/iced-tea-glass.png",
  },
]

const categories = [
  { id: "all", name: "All Items" },
  { id: "coffee", name: "Coffee" },
  { id: "pastries", name: "Pastries" },
  { id: "food", name: "Food" },
  { id: "beverages", name: "Beverages" },
]

export function MenuBrowser() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { addItem, updateQuantity, getItemQuantity } = useCart()

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
  }

  const handleQuantityChange = (itemId: number, change: number) => {
    const currentQuantity = getItemQuantity(itemId)
    const newQuantity = Math.max(0, currentQuantity + change)
    updateQuantity(itemId, newQuantity)
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="menu-section">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const quantity = getItemQuantity(item.id)

          return (
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
                  <span className="price-badge">KES {item.price.toFixed(0)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-pretty">{item.description}</p>

                {quantity === 0 ? (
                  <Button className="btn-order w-full" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="font-semibold text-primary">KES {(item.price * quantity).toFixed(0)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No items found matching your search.</p>
        </div>
      )}
    </div>
  )
}
