"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import OurStorySection from "@/components/sections/OurStorySection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("[data-animate]");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setVisibleElements((prev) => new Set(prev).add(el.id || ""));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background text-foreground">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <HeroSection className="h-[200vh] bg-gray-200/">
        </HeroSection>
        <MissionSection />
        <OurStorySection />
        <CTASection />
        <ContactSection />
      </main>
      
      {/*<Footer />*/}
    </div>
  );
}
