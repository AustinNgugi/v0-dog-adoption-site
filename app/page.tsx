import { CafeNavbar } from "@/components/cafe-navbar"
import { CafeHero } from "@/components/cafe-hero"
import { FeaturedItems } from "@/components/featured-items"
import { AboutSection } from "@/components/about-section"
import { CafeFooter } from "@/components/cafe-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <CafeNavbar />
      <main>
        <CafeHero />
        <div className="container mx-auto px-4">
          <FeaturedItems />
          <AboutSection />
        </div>
      </main>
      <CafeFooter />
    </div>
  )
}
