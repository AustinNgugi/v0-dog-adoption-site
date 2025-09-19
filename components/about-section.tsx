"use client"

import React, { useRef } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Image from 'next/image'

export function AboutSection() {
  const parallax = useRef<any>()

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-6">Our Story</h2>
          <p className="text-lg text-muted-foreground mb-6 text-pretty">
            Founded in 2018, Sweeven has been serving the community with exceptional coffee and fresh, locally-sourced
            ingredients. Our passion for quality and commitment to sustainability drives everything we do.
          </p>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            From our signature espresso blends to our artisanal pastries, every item is crafted with care and attention
            to detail. We believe that great coffee brings people together and creates lasting memories.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center mt-6">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-amber-700">5+</div>
              <div className="text-sm text-muted-foreground">Years Serving</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-amber-700">10k+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold text-amber-700">50+</div>
              <div className="text-sm text-muted-foreground">Menu Items</div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* compact parallax box to give depth to the about image */}
          <div className="rounded-2xl shadow-2xl w-full h-96 overflow-hidden relative border border-amber-100">
            <Parallax pages={1} ref={parallax} style={{ height: '100%' }}>
              {/* far background: cozy interior (optimized Image layers) */}
              <ParallaxLayer offset={0} speed={0} factor={1}>
                <div className="absolute inset-0 -z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1600&q=60"
                    alt="cozy interior"
                    fill
                    className="object-cover"
                  />
                </div>
              </ParallaxLayer>

              {/* mid background: close-up coffee for parallax movement */}
              <ParallaxLayer offset={0} speed={0.3} factor={1}>
                <div className="absolute inset-0 -z-5 opacity-90">
                  <Image
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=60"
                    alt="coffee closeup"
                    fill
                    className="object-cover"
                  />
                </div>
              </ParallaxLayer>

              {/* foreground content card centered */}
              <ParallaxLayer
                offset={0}
                speed={0.6}
                factor={1}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div className="bg-white/80 backdrop-blur-md rounded-lg p-5 w-4/5 text-center shadow">
                  <h3 className="text-lg md:text-xl font-semibold text-amber-900">Sweeven Cafe</h3>
                  <p className="text-sm text-muted-foreground mt-1">Warm space. Fresh coffee. Friendly faces.</p>
                </div>
              </ParallaxLayer>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
