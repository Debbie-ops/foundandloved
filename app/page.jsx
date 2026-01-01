"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/sections/HeroSection"
import MissionSection from "@/components/sections/MissionSection"
import ServicesSection from "@/components/sections/ServicesSection"
import StoriesSection from "@/components/sections/StoriesSection"
import CTASection from "@/components/sections/CTASection"
import ContactSection from "@/components/sections/ContactSection"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")
  const [visibleElements, setVisibleElements] = useState(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-animate]")
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75) {
          setVisibleElements((prev) => new Set(prev).add(el.id || ""))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="bg-background text-foreground">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <HeroSection />
        <MissionSection />
        
        <CTASection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

//<StoriesSection />
//<ServicesSection />
