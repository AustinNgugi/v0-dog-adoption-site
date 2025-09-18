import { CafeNavbar } from "@/cafe-website/components/cafe-navbar"
import { CafeHero } from "@/cafe-website/components/cafe-hero"
import { FeaturedItems } from "@/cafe-website/components/featured-items"
import { AboutSection } from "@/cafe-website/components/about-section"
import { CafeFooter } from "@/cafe-website/components/cafe-footer"

export default function CafeHomePage() {
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
