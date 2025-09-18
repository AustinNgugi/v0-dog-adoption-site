import { Button } from "@/components/ui/button"
import { Heart, Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">{"Paws & Hearts"}</span>
            </div>
            <p className="text-muted-foreground text-pretty">
              {"Connecting loving families with rescue dogs since 2019. Every dog deserves a forever home."}
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">{"Adopt"}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"Browse Dogs"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"Adoption Process"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"Adoption Fees"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"Success Stories"}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">{"Support"}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"Donate"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"Volunteer"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"Foster"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  {"Sponsor a Dog"}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold">{"Contact"}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>{"123 Rescue Street"}</li>
              <li>{"San Francisco, CA 94102"}</li>
              <li>
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  {"(123) 456-7890"}
                </a>
              </li>
              <li>
                <a href="mailto:info@pawsandhearts.org" className="hover:text-primary transition-colors">
                  {"info@pawsandhearts.org"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>{"© 2024 Paws & Hearts. All rights reserved. Made with ❤️ for rescue dogs."}</p>
        </div>
      </div>
    </footer>
  )
}
