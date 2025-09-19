"use client"

import React, { useRef } from "react"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Link from 'next/link'
import Image from 'next/image'

export default function ParallaxPage() {
  const parallax = useRef<any>()

  return (
    <div className="min-h-screen bg-amber-50 text-foreground">
      <nav className="p-6 container mx-auto flex justify-between items-center z-30 relative">
        <h2 className="text-xl font-bold">Sweeven Parallax</h2>
        <div className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <button
            className="px-3 py-1 rounded bg-amber-600 text-white"
            onClick={() => parallax.current?.scrollTo(0)}
          >
            Top
          </button>
        </div>
      </nav>

      <div style={{ height: 'calc(100vh - 72px)' }} className="relative">
        <Parallax pages={3} ref={parallax} style={{ height: '100%' }}>
          {/* Deep background image (slow) */}
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              // deep cozy cafe interior (remote image)
              backgroundImage: "url('https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(2px) saturate(0.95)',
              transform: 'scale(1.05)'
            }}
          />

          {/* Mid layer with stronger blur and overlay */}
          {/* mid image layer with gentle movement to add depth */}
          <ParallaxLayer
            offset={0}
            speed={0.18}
            factor={3}
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1800&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.55,
              filter: 'blur(4px) saturate(0.9)'
            }}
          />

          {/* soft overlay gradient for legibility */}
          <ParallaxLayer
            offset={0}
            speed={0.2}
            factor={3}
            style={{
              background: 'linear-gradient(180deg, rgba(255,250,240,0.3), rgba(255,255,255,0.6))',
              backdropFilter: 'blur(6px)'
            }}
          />

          {/* Page 1 content */}
          <ParallaxLayer offset={0} speed={0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-center p-6 max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-extrabold text-amber-700 drop-shadow-md">Welcome to Sweeven</h1>
              <p className="mt-4 text-lg md:text-xl text-amber-600">Experience artisan coffee and cozy moments.</p>
              <div className="mt-6 flex justify-center gap-4">
                <button className="px-5 py-2 rounded bg-amber-600 text-white" onClick={() => parallax.current?.scrollTo(1)}>Our Menu</button>
                <button className="px-5 py-2 rounded border" onClick={() => parallax.current?.scrollTo(2)}>Visit Us</button>
              </div>
            </div>
          </ParallaxLayer>

          {/* Page 2 content */}
          <ParallaxLayer offset={1} speed={0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="max-w-3xl text-center p-8 bg-white/60 backdrop-blur-md rounded-xl shadow-xl">
              <h2 className="text-3xl font-semibold">Our Menu</h2>
              <p className="mt-2 text-muted-foreground">Try our finest coffees and pastries, curated daily.</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white/80 rounded-lg">
                  <div className="w-full h-32 relative rounded overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60" alt="espresso" fill className="object-cover" />
                  </div>
                  <h4 className="mt-2 font-semibold">Signature Espresso</h4>
                </div>
                <div className="p-4 bg-white/80 rounded-lg">
                  <div className="w-full h-32 relative rounded overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=60" alt="croissant" fill className="object-cover" />
                  </div>
                  <h4 className="mt-2 font-semibold">Artisan Croissant</h4>
                </div>
                <div className="p-4 bg-white/80 rounded-lg">
                  <div className="w-full h-32 relative rounded overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60" alt="avocado" fill className="object-cover" />
                  </div>
                  <h4 className="mt-2 font-semibold">Avocado Toast</h4>
                </div>
              </div>
            </div>
          </ParallaxLayer>

          {/* Page 3 content */}
          <ParallaxLayer offset={2} speed={0.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-center p-6">
              <h2 className="text-4xl font-bold">Visit Us</h2>
              <p className="mt-2 text-muted-foreground">Order online or drop by the cafe for a warm cup.</p>
              <div className="mt-6">
                <button className="px-6 py-3 rounded bg-amber-600 text-white" onClick={() => parallax.current?.scrollTo(0)}>Back to top</button>
              </div>
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    </div>
  )
}
