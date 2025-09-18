import { Card, CardContent } from "@/components/ui/card"
import { Search, Heart, Home, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse & Search",
    description: "Explore our available dogs and find ones that match your lifestyle and preferences.",
  },
  {
    icon: Heart,
    title: "Meet & Greet",
    description: "Schedule a visit to meet your potential new family member and see if it's a perfect match.",
  },
  {
    icon: Home,
    title: "Application",
    description: "Complete our adoption application and provide references for a smooth process.",
  },
  {
    icon: CheckCircle,
    title: "Welcome Home",
    description: "Once approved, take your new best friend home and start your journey together!",
  },
]

export function AdoptionProcess() {
  return (
    <section id="process" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            {"Simple "}
            <span className="text-primary">{"Adoption Process"}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {
              "We've made adopting a dog as easy as possible. Follow these four simple steps to find your new best friend."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center relative">
              <CardContent className="p-8 space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground text-pretty">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">{"Questions About Adoption?"}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
            {
              "Our team is here to help you through every step of the adoption process. Don't hesitate to reach out with any questions."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+1234567890" className="text-primary hover:underline font-medium">
              {"Call us: (123) 456-7890"}
            </a>
            <span className="hidden sm:inline text-muted-foreground">{"•"}</span>
            <a href="mailto:adopt@pawsandhearts.org" className="text-primary hover:underline font-medium">
              {"Email: adopt@pawsandhearts.org"}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
