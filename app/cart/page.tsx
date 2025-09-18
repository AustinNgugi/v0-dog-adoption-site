"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { AzzuriNavbar } from "@/components/azzuri-navbar"

interface Dog {
  name: string
  age: number
  gender: string
  picture: string
}

export default function CartPage() {
  const [adoptedDogs, setAdoptedDogs] = useState<Dog[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("adoptedDogs")
    if (saved) {
      setAdoptedDogs(JSON.parse(saved))
    }
  }, [])

  const removeDogFromCart = (index: number) => {
    const dogName = adoptedDogs[index]?.name || "Dog"
    const newAdoptedDogs = adoptedDogs.filter((_, i) => i !== index)
    setAdoptedDogs(newAdoptedDogs)
    localStorage.setItem("adoptedDogs", JSON.stringify(newAdoptedDogs))

    // Dispatch custom event for navbar
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Removed from cart",
      description: `${dogName} has been removed from your cart.`,
    })
  }

  const clearCart = () => {
    if (adoptedDogs.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Your cart is already empty!",
        variant: "destructive",
      })
      return
    }

    if (confirm("Are you sure you want to remove all dogs from your cart?")) {
      setAdoptedDogs([])
      localStorage.setItem("adoptedDogs", JSON.stringify([]))

      // Dispatch custom event for navbar
      window.dispatchEvent(new Event("cartUpdated"))

      toast({
        title: "Cart cleared",
        description: "All dogs have been removed from your cart.",
      })
    }
  }

  const proceedToAdoption = () => {
    if (adoptedDogs.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Your cart is empty!",
        variant: "destructive",
      })
      return
    }

    const dogNames = adoptedDogs.map((dog) => dog.name).join(", ")
    const totalDogs = adoptedDogs.length

    let message = `🎉 Congratulations! You've chosen to adopt ${totalDogs} wonderful dog${totalDogs > 1 ? "s" : ""}:\n\n`
    message += `${dogNames}\n\n`
    message += `📍 Next Steps:\n`
    message += `• Visit us at Ruiru Town to complete the adoption process\n`
    message += `• Bring a valid ID and proof of residence\n`
    message += `• Our team will guide you through the final paperwork\n`
    message += `• Prepare your home for your new furry friend${totalDogs > 1 ? "s" : ""}!\n\n`
    message += `Thank you for choosing to give these dogs a loving home! ❤️`

    if (confirm(message + "\n\nWould you like to clear your cart now?")) {
      setAdoptedDogs([])
      localStorage.setItem("adoptedDogs", JSON.stringify([]))

      // Dispatch custom event for navbar
      window.dispatchEvent(new Event("cartUpdated"))

      toast({
        title: "Thank you! 🐕❤️",
        description: "We look forward to seeing you at Ruiru Town!",
      })
    }
  }

  const maleCount = adoptedDogs.filter((dog) => dog.gender.toLowerCase() === "male").length
  const femaleCount = adoptedDogs.filter((dog) => dog.gender.toLowerCase() === "female").length
  const averageAge =
    adoptedDogs.length > 0 ? (adoptedDogs.reduce((sum, dog) => sum + dog.age, 0) / adoptedDogs.length).toFixed(1) : 0

  return (
    <div className="min-h-screen">
      <AzzuriNavbar />

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--primary-color)]">
            <ShoppingCart className="inline-block h-8 w-8 mr-2" />
            Your Adoption Cart
          </h1>
          <p className="text-xl text-gray-600">Review the dogs you've chosen to adopt</p>
        </div>

        {adoptedDogs.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Your cart is empty</h4>
            <p className="text-gray-600 mb-6">Add some adorable dogs to adopt!</p>
            <Link href="/">
              <Button className="btn-adopt">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Dogs
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {adoptedDogs.map((dog, index) => (
                <Card key={`${dog.name}-${index}`} className="azzuri-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <img
                        src={dog.picture || "/placeholder.svg"}
                        alt={`Picture of ${dog.name}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />

                      <div className="flex-1 text-center md:text-left">
                        <h5 className="text-xl font-bold mb-2 text-[var(--primary-color)]">{dog.name}</h5>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                          <span className="info-badge">{dog.age} years old</span>
                          <span className="info-badge">{dog.gender}</span>
                        </div>
                        <p className="text-gray-600">
                          <Heart className="inline-block h-4 w-4 text-red-500 mr-1" />
                          Ready for a loving home
                        </p>
                      </div>

                      <Button variant="destructive" onClick={() => removeDogFromCart(index)} className="rounded-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cart Summary */}
            <Card className="azzuri-card mb-8">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-[var(--primary-color)]">Cart Summary</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="stat-item">
                    <div className="stat-number">{adoptedDogs.length}</div>
                    <div>Total Dogs</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{maleCount}</div>
                    <div>Male Dogs</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{femaleCount}</div>
                    <div>Female Dogs</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{averageAge}</div>
                    <div>Average Age</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={clearCart} className="btn-return bg-transparent">
                    Clear Cart
                  </Button>
                  <Button onClick={proceedToAdoption} className="btn-adopt">
                    Proceed to Adoption
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
