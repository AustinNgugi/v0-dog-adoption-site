import { AzzuriNavbar } from "@/components/azzuri-navbar"
import { AzzuriHero } from "@/components/azzuri-hero"
import { DogBrowser } from "@/components/dog-browser"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AzzuriNavbar />
      <main className="container mx-auto px-4">
        <AzzuriHero />
        <DogBrowser />
      </main>
    </div>
  )
}
