import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "San Francisco, CA",
    text: "Adopting Max from Paws & Hearts was the best decision we ever made. The staff was incredibly helpful and made sure we were a perfect match. Max has brought so much joy to our family!",
    dogName: "Max",
    rating: 5,
  },
  {
    name: "Michael Chen",
    location: "Oakland, CA",
    text: "The adoption process was smooth and the team really cared about finding the right home for each dog. Luna has been an amazing addition to our family and gets along great with our kids.",
    dogName: "Luna",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    location: "Berkeley, CA",
    text: "I was nervous about adopting my first dog, but the team at Paws & Hearts guided me through everything. Rocky is now my best friend and I couldn't imagine life without him!",
    dogName: "Rocky",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            {"Happy "}
            <span className="text-primary">{"Adoption Stories"}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {"Hear from families who found their perfect companions through our adoption program."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-8 space-y-6">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                <blockquote className="text-muted-foreground text-pretty leading-relaxed">
                  {`"${testimonial.text}"`}
                </blockquote>

                <div className="space-y-1">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  <div className="text-sm text-primary font-medium">
                    {"Adopted "}
                    {testimonial.dogName}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
