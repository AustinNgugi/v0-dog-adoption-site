"use client"

import { useState, useEffect } from "react"
import { Search, X, Heart, RotateCcw, Cake, Mails as Mars, Menu as Venus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import dogsData from "@/data/dogs.json"

interface Dog {
  name: string
  age: number
  gender: string
  picture: string
}

export function DogBrowser() {
  const [dogs] = useState<Dog[]>(dogsData)
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>(dogs)
  const [adoptedDogs, setAdoptedDogs] = useState<Dog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [ageFilter, setAgeFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("adoptedDogs")
    if (saved) {
      setAdoptedDogs(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const filtered = dogs.filter((dog) => {
      const matchesSearch = searchTerm === "" || dog.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesAge = ageFilter === "all" || getAgeCategory(dog.age) === ageFilter
      const matchesGender = genderFilter === "all" || dog.gender.toLowerCase() === genderFilter

      return matchesSearch && matchesAge && matchesGender
    })

    // Apply sorting
    switch (sortBy) {
      case "age-asc":
        filtered.sort((a, b) => a.age - b.age)
        break
      case "age-desc":
        filtered.sort((a, b) => b.age - a.age)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    setFilteredDogs(filtered)
  }, [dogs, searchTerm, ageFilter, genderFilter, sortBy])

  const getAgeCategory = (age: number) => {
    if (age <= 2) return "puppy"
    if (age <= 5) return "young"
    return "adult"
  }

  const adoptDog = (dog: Dog) => {
    if (adoptedDogs.some((adopted) => adopted.name === dog.name)) {
      toast({
        title: "Already in cart!",
        description: `${dog.name} is already in your adoption cart.`,
        variant: "destructive",
      })
      return
    }

    const newAdoptedDogs = [...adoptedDogs, dog]
    setAdoptedDogs(newAdoptedDogs)
    localStorage.setItem("adoptedDogs", JSON.stringify(newAdoptedDogs))

    // Dispatch custom event for navbar
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to cart! 🎉",
      description: `${dog.name} has been added to your adoption cart.`,
    })
  }

  const returnDog = (dog: Dog) => {
    const newAdoptedDogs = adoptedDogs.filter((adopted) => adopted.name !== dog.name)
    setAdoptedDogs(newAdoptedDogs)
    localStorage.setItem("adoptedDogs", JSON.stringify(newAdoptedDogs))

    // Dispatch custom event for navbar
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Removed from cart",
      description: `${dog.name} has been removed from your cart.`,
    })
  }

  const clearSearch = () => {
    setSearchTerm("")
    setAgeFilter("all")
    setGenderFilter("all")
    setSortBy("default")
  }

  const maleCount = dogs.filter((dog) => dog.gender.toLowerCase() === "male").length
  const femaleCount = dogs.filter((dog) => dog.gender.toLowerCase() === "female").length

  return (
    <div id="dogs">
      {/* Search Section */}
      <div className="search-section">
        <h3 className="text-2xl font-bold text-center mb-6 text-[var(--primary-color)]">
          <Search className="inline-block h-6 w-6 mr-2" />
          Find Your Dog
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <div className="flex">
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-r-none"
              />
              <Button variant="outline" onClick={clearSearch} className="rounded-l-none border-l-0 bg-transparent">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Select value={ageFilter} onValueChange={setAgeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Ages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="puppy">Puppy (0-2 years)</SelectItem>
              <SelectItem value="young">Young (3-5 years)</SelectItem>
              <SelectItem value="adult">Adult (6+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`filter-btn ${genderFilter === "all" ? "active" : ""}`}
            onClick={() => setGenderFilter("all")}
          >
            All Dogs
          </button>
          <button
            className={`filter-btn ${genderFilter === "male" ? "active" : ""}`}
            onClick={() => setGenderFilter("male")}
          >
            Male
          </button>
          <button
            className={`filter-btn ${genderFilter === "female" ? "active" : ""}`}
            onClick={() => setGenderFilter("female")}
          >
            Female
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">{dogs.length}</div>
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
          <div className="stat-number">{adoptedDogs.length}</div>
          <div>Adopted</div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Sort: Recommended</SelectItem>
            <SelectItem value="age-asc">Age: Youngest</SelectItem>
            <SelectItem value="age-desc">Age: Oldest</SelectItem>
            <SelectItem value="name-asc">Name: A → Z</SelectItem>
            <SelectItem value="name-desc">Name: Z → A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dogs Grid */}
      {filteredDogs.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h4 className="text-xl font-semibold mb-2">No dogs found</h4>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredDogs.map((dog, index) => (
            <Card key={`${dog.name}-${index}`} className="azzuri-card fade-in">
              <div className="relative">
                <img
                  src={dog.picture || "/placeholder.svg"}
                  alt={`Picture of ${dog.name}`}
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <h5 className="text-xl font-bold mb-3 text-[var(--primary-color)]">{dog.name}</h5>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="info-badge">
                    <Cake className="inline-block h-4 w-4 mr-1" />
                    {dog.age} years
                  </span>
                  <span className="info-badge">
                    {dog.gender.toLowerCase() === "male" ? (
                      <Mars className="inline-block h-4 w-4 mr-1" />
                    ) : (
                      <Venus className="inline-block h-4 w-4 mr-1" />
                    )}
                    {dog.gender}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="btn-adopt flex items-center" onClick={() => adoptDog(dog)}>
                    <Heart className="h-4 w-4 mr-1" />
                    Adopt Me
                  </button>
                  <button className="btn-return flex items-center" onClick={() => returnDog(dog)}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Return
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
