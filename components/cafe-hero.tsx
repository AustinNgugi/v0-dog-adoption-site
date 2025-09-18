import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CafeHero() {
  return (
    <section className="hero-section relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Welcome to <span className="text-primary">Sweeven</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Experience the perfect blend of artisanal coffee, fresh pastries, and warm hospitality. Order online for
            pickup or delivery and enjoy cafe-quality treats from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="btn-order w-full sm:w-auto">
                Order Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="btn-secondary w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl"></div>
      </div>
    </section>
  )
}
