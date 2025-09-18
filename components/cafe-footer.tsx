import Link from "next/link"

export function CafeFooter() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">Sweeven</span>
            </div>
            <p className="text-muted-foreground mb-4 text-pretty">
              Your neighborhood cafe serving exceptional coffee, fresh pastries, and warm hospitality since 2018.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>123 Coffee Street</p>
              <p>Downtown, City 12345</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/menu" className="block text-muted-foreground hover:text-primary transition-colors">
                Menu
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/cart" className="block text-muted-foreground hover:text-primary transition-colors">
                Cart
              </Link>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hours</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Mon - Fri</span>
                <span>7AM - 8PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>8AM - 9PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>8AM - 6PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Sweeven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
