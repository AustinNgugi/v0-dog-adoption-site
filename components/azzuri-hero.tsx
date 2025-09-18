import { Heart } from "lucide-react"

export function AzzuriHero() {
  return (
    <div className="hero-section">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--primary-color)]">
        <Heart className="inline-block h-8 w-8 text-red-500 mr-2" />
        Find Your Perfect Companion
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Every dog deserves a loving home. Discover amazing dogs waiting for adoption!
      </p>
    </div>
  )
}
