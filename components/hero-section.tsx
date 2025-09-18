import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                {"Find Your "}
                <span className="text-primary">{"Forever Friend"}</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-lg">
                {"Every dog deserves a loving home. Browse our rescued dogs and discover your perfect companion today."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                {"Browse Dogs"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                {"Learn More"}
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{"500+"}</div>
                <div className="text-sm text-muted-foreground">{"Dogs Rescued"}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{"350+"}</div>
                <div className="text-sm text-muted-foreground">{"Happy Families"}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{"5 Years"}</div>
                <div className="text-sm text-muted-foreground">{"Of Service"}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-card">
              <img
                src="/happy-family-with-golden-retriever-dog-in-park.jpg"
                alt="Happy family with their adopted dog"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
              <div className="text-sm font-medium">{"New Arrivals"}</div>
              <div className="text-2xl font-bold">{"12 Dogs"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
