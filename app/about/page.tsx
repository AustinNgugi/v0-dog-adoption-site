"use client"

import React, { useRef } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Link from 'next/link'
import { AboutSection } from '@/components/about-section'

export default function AboutPage() {
  const parallax = useRef<any>()

  return (
    <div className="min-h-screen bg-amber-50 text-foreground">
      <nav className="p-6 container mx-auto flex justify-between items-center z-30 relative">
        <h2 className="text-xl font-bold">About Sweeven</h2>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-foreground hover:text-primary">Home</Link>
          <button
            className="px-3 py-1 rounded bg-amber-600 text-white"
            onClick={() => parallax.current?.scrollTo(0)}
          >
            Top
          </button>
        </div>
      </nav>

      <div style={{ height: 'calc(100vh - 72px)' }} className="relative">
        <Parallax pages={2} ref={parallax} style={{ height: '100%' }}>
          {/* deep coffee background */}
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={2}
            style={{
              backgroundImage: "linear-gradient(rgba(255,249,240,0.25), rgba(255,249,240,0.35)), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* sandwich layer adds subtle parallax movement */}
          <ParallaxLayer
            offset={0}
            speed={0.22}
            factor={2}
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.9,
              mixBlendMode: 'overlay'
            }}
          />

          {/* headline and touching story — foreground that scrolls faster */}
          <ParallaxLayer
            offset={0}
            speed={0.56}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="p-6 max-w-4xl">
              <div className="mx-auto bg-white/90 dark:bg-neutral-900/85 text-amber-900 rounded-2xl p-8 shadow-lg">
                <h1 className="text-5xl md:text-6xl font-extrabold text-amber-900">Our Roots, Your Cup</h1>
                <p className="mt-6 text-lg md:text-xl text-amber-800 leading-relaxed">
                  From a small kettle and a big hope, Sweeven began as a place for neighbors to gather and for stories to
                  unfold. Every bag of beans carries the hands that grew it, the early morning chats that shaped our
                  menu, and the quiet moments that remind us why we do this: to create a space where people feel seen.
                </p>
                <p className="mt-4 text-md text-amber-800/90 max-w-2xl mx-auto">We roast a little slower, listen a little longer, and pour every cup with intention. Come for the coffee; stay for the conversation.</p>
                <div className="mt-8 flex justify-center gap-4">
                  <button className="px-5 py-2 rounded bg-amber-600 text-white shadow-md hover:bg-amber-700 transition" onClick={() => parallax.current?.scrollTo(1)}>Read the story</button>
                  <Link href="/menu" className="px-5 py-2 rounded border border-amber-300 hover:bg-amber-50 transition">See menu</Link>
                  <Link href="/contact" className="px-5 py-2 rounded bg-white/80 border">Visit us</Link>
                </div>
              </div>
            </div>
          </ParallaxLayer>

          {/* second page contains the AboutSection with compact parallax inside */}
          <ParallaxLayer offset={1} speed={0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container mx-auto p-8">
              <AboutSection />
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    </div>
  )
}
