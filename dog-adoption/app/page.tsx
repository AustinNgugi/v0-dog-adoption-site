import { Header } from "@/dog-adoption/components/header"
import { HeroSection } from "@/dog-adoption/components/hero-section"
import { FeaturedDogs } from "@/dog-adoption/components/featured-dogs"
import { AdoptionProcess } from "@/dog-adoption/components/adoption-process"
import { Testimonials } from "@/dog-adoption/components/testimonials"
import { Footer } from "@/dog-adoption/components/footer"

export default function DogAdoptionHomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4">
          <FeaturedDogs />
          <AdoptionProcess />
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  )
}
