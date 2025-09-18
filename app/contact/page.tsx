import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react"

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Amazing coffee and pastries! The atmosphere at Sweeven is so cozy and welcoming. My go-to spot for morning coffee.",
    date: "2 weeks ago",
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment: "Best espresso in town! The baristas really know their craft. The avocado toast is also incredible.",
    date: "1 month ago",
  },
  {
    name: "Emma Wilson",
    rating: 4,
    comment: "Great place to work remotely. Fast WiFi, comfortable seating, and excellent coffee. Highly recommend!",
    date: "3 weeks ago",
  },
  {
    name: "David Ochieng",
    rating: 5,
    comment:
      "Sweeven has become my daily ritual. The staff is friendly and the quality is consistently excellent. Love this place!",
    date: "1 week ago",
  },
  {
    name: "Grace Wanjiku",
    rating: 5,
    comment:
      "Perfect spot for meetings and catching up with friends. The caramel latte is my favorite. Great service too!",
    date: "2 months ago",
  },
  {
    name: "James Kimani",
    rating: 4,
    comment:
      "Delicious food and great coffee. The delivery service is also very reliable. Will definitely order again!",
    date: "3 weeks ago",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-balance">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We'd love to hear from you! Whether you have questions about our menu, want to place a large order, or just
            want to say hello.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">0112824050</p>
                    <p className="text-sm text-muted-foreground">Call us for orders and inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">austinngugi000@gmail.com</p>
                    <p className="text-sm text-muted-foreground">Send us your questions anytime</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">Kiambu, Tatu City near Ruiru</p>
                    <p className="text-sm text-muted-foreground">Visit us for the full Sweeven experience</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
                      <p>Saturday: 8:00 AM - 9:00 PM</p>
                      <p>Sunday: 8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span className="font-semibold">KES 150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Free Delivery:</span>
                    <span className="font-semibold">Orders over KES 2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Time:</span>
                    <span className="font-semibold">30-45 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone (Optional)
                  </label>
                  <Input id="phone" type="tel" placeholder="Your phone number" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What's this about?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Tell us how we can help you..." rows={5} />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Don't just take our word for it - hear from our amazing customers who love Sweeven!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 text-pretty">"{review.comment}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{review.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
