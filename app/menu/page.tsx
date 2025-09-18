import { CafeNavbar } from "@/components/cafe-navbar"
import { MenuBrowser } from "@/components/menu-browser"
import { CafeFooter } from "@/components/cafe-footer"

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      <CafeNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our full range of artisanal coffee, fresh pastries, and delicious meals
          </p>
        </div>
        <MenuBrowser />
      </main>
      <CafeFooter />
    </div>
  )
}
