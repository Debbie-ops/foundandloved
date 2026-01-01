"use client"

import { MISSION_ITEMS } from "@/lib/constants"
import useParallax from "@/hooks/useParallax"
import { useEffect, useState } from "react"
import { HeartHandshake, Home, Shield, Sparkles } from "lucide-react"

const MISSION_ICONS = {
  shield: Shield,
  home: Home,
  "heart-handshake": HeartHandshake,
}

export default function MissionSection() {
  const [imageRef, parallaxOffset] = useParallax(0.3)
  const [isVisible, setIsVisible] = useState(false)

  // Optional: Trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => observer.disconnect()
  }, [imageRef])

  return (
    <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-muted/30">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Parallax Image Section - FIXED VERSION */}
          <div
            ref={imageRef}
            className="relative h-200 lg:h-[500px] overflow-hidden rounded-2xl shadow-lg sticky top-25"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/DSC02562.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed", // This creates the stagnant effect
                transform: `translateY(${parallaxOffset * -0.6}px)`, // Move background slightly
              }}
            />

            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content Section - REMAINS THE SAME */}
          <div>
            <div className={`fade-in-up ${isVisible ? "animate" : ""}`} data-animate id="mission-title">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="font-semibold text-primary">The Gap We Fill</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Many children face impossible circumstances.</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  We provide hope and stability.
                </span>
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                Thousands of children in Zambia lack safe homes, proper nutrition, education and emotional support. Found and Loved Safe Home bridges this critical gap by providing comprehensive care, professional guidance and most
                importantly, unconditional love for children in need.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                With a primary focus on children whose parents are currently in correctional care, we provide a safe, nurturing environment where they are supported and cared for until family reunification or placement with relatives is possible.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MISSION_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`scale-in bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-border ${
                isVisible ? "animate" : ""
              }`}
              data-animate
              id={`mission-item-${idx}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {(() => {
                const Icon = MISSION_ICONS[item.icon]
                return Icon ? (
                  <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </span>
                ) : null
              })()}
              <p className="text-sm font-semibold text-primary mb-2">{item.problem}</p>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
