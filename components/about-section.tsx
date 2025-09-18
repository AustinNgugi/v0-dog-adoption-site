export function AboutSection() {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-6 text-pretty">
            Founded in 2018, Sweeven has been serving the community with exceptional coffee and fresh, locally-sourced
            ingredients. Our passion for quality and commitment to sustainability drives everything we do.
          </p>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            From our signature espresso blends to our artisanal pastries, every item is crafted with care and attention
            to detail. We believe that great coffee brings people together and creates lasting memories.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground">Years Serving</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Menu Items</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="/sweeven-cafe-interior-with-people-enjoying-coffee.jpg"
            alt="Sweeven Cafe Interior"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </section>
  )
}
