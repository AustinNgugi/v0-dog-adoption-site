import { Button } from "@/components/ui/button"
import { Heart, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">{"Paws & Hearts"}</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#dogs" className="text-foreground hover:text-primary transition-colors">
              {"Find Dogs"}
            </a>
            <a href="#process" className="text-foreground hover:text-primary transition-colors">
              {"Adoption Process"}
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              {"About Us"}
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              {"Contact"}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden sm:inline-flex">{"Donate Now"}</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
