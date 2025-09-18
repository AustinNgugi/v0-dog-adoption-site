import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin } from "lucide-react"

const featuredDogs = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "3 years",
    size: "Large",
    personality: ["Friendly", "Energetic", "Good with kids"],
    image: "/smiling-golden-retriever.png",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Border Collie Mix",
    age: "2 years",
    size: "Medium",
    personality: ["Smart", "Loyal", "Active"],
    image: "/border-collie-mix-dog-black-and-white.jpg",
    location: "Oakland, CA",
  },
  {
    id: 3,
    name: "Charlie",
    breed: "Labrador Mix",
    age: "4 years",
    size: "Large",
    personality: ["Gentle", "Calm", "Great with seniors"],
    image: "/chocolate-labrador-mix-dog-sitting.jpg",
    location: "Berkeley, CA",
  },
  {
    id: 4,
    name: "Bella",
    breed: "Beagle",
    age: "1 year",
    size: "Small",
    personality: ["Playful", "Curious", "Good with cats"],
    image: "/beagle-puppy-dog-cute.jpg",
    location: "San Jose, CA",
  },
]

export function FeaturedDogs() {
  return (
    <section id="dogs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            {"Meet Our "}
            <span className="text-primary">{"Amazing Dogs"}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {"Each of these wonderful dogs is looking for their forever home. Could one of them be your perfect match?"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDogs.map((dog) => (
            <Card key={dog.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={dog.image || "/placeholder.svg"}
                  alt={`${dog.name} - ${dog.breed}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{dog.name}</h3>
                    <Badge variant="secondary">{dog.size}</Badge>
                  </div>
                  <p className="text-muted-foreground">{`${dog.breed} • ${dog.age}`}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {dog.location}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">{"Personality:"}</div>
                  <div className="flex flex-wrap gap-1">
                    {dog.personality.map((trait) => (
                      <Badge key={trait} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  {"Meet "}
                  {dog.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            {"View All Dogs"}
          </Button>
        </div>
      </div>
    </section>
  )
}
