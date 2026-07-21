"use client";

import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import { Images } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 5;

  // Update active slide index based on scroll progress
  const updateActiveIndex = useCallback(
    (progress) => {
      const raw = progress * (totalSlides - 1);
      const index = Math.min(Math.round(raw), totalSlides - 1);
      setActiveIndex(index);
    },
    [totalSlides]
  );

  // GSAP horizontal scroll setup
  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const ctx = gsap.context(() => {
      // Helper to refresh dimensions
      const refresh = () => {
        gsap.set(strip, { x: 0 });
        const totalWidth = strip.scrollWidth;
        const scrollLength = Math.max(totalWidth - window.innerWidth, 0);
        return scrollLength;
      };

      let scrollLength = refresh();

      // Main horizontal animation
      gsap.to(strip, {
        x: () => -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollLength}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateActiveIndex(self.progress);
          },
        },
      });

      // Re-calculate on resize
      const onRefresh = () => {
        scrollLength = refresh();
        const st = ScrollTrigger.getAll().find(
          (t) => t.trigger === section
        );
        if (st) {
          st.end = `+=${scrollLength}`;
          st.refresh();
        }
      };

      ScrollTrigger.addEventListener("refreshInit", onRefresh);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", onRefresh);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [updateActiveIndex]);

  // Slides data (replace image paths with your own)
  const slides = [
    {
      id: "hero",
      image: "/classroom3.jpg",
      fallback:
        "",
      content: (
        <>
          <h2 className="text-5xl md:text-7xl text-white font-black leading-tight">
            We&apos;re Creating Change
            <br />
            <span className="text-primary">One Child at a Time</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 mt-4 max-w-2xl mx-auto">
            Every child deserves a future — we&apos;re building it, together.
          </p>
        </>
      ),
    },
    {
      id: "stat-1",
      image: "/classroom2.jpg",
      fallback:
        "",
      content: (
        <>
          <div className="text-7xl md:text-9xl font-black text-primary">20+</div>
          <p className="text-2xl text-white md:text-3xl font-bold mt-3">Children Supported</p>
          <p className="text-white/60 mt-1 max-w-md mx-auto">
            Temporarily separated from parents due to incarceration
          </p>
        </>
      ),
    },
    {
      id: "stat-2",
      image: "/volunteer3.jpg",
      fallback:
        "",
      content: (
        <>
          <div className="text-7xl md:text-9xl font-black text-primary">24/7</div>
          <p className="text-2xl md:text-3xl text-white font-bold mt-3">Care &amp; Support</p>
          <p className="text-white/60 mt-1 max-w-md mx-auto">
            Structured supervision, education, and safety around the clock
          </p>
        </>
      ),
    },
    {
      id: "stat-3",
      image: "/bed4.jpeg",
      fallback:
        "",
      content: (
        <>
          <div className="text-7xl md:text-9xl font-black text-primary"></div>
          <p className="text-2xl text-white md:text-3xl font-bold mt-3">Conducive Conditions</p>
          <p className="text-white/60 mt-1 max-w-md mx-auto">
            A safe, structured environment that nurtures growth and learning
          </p>
        </>
      ),
    },
    {
      id: "cta",
      image: "/volunteer1.jpg",
      fallback:
        "",
      content: (
        <>
          <h2 className="text-4xl md:text-6xl text-white font-black">
            Get Involved <span className="text-primary">Today</span>
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mt-4 leading-relaxed">
            Our certified residential home in Chunga currently supports{" "}
            <strong className="text-white font-semibold">30+ children</strong>{" "}
            who are temporarily separated from their parents due to incarceration.
            Operating under the approval of relevant authorities, we provide
            structured care, education, and supervision while prioritizing family
            tracing and safe reunification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary/50 text-foreground rounded-full font-semibold hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105"
            >
              Get Involved Today
            </Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background min-h-screen"
    >
      {/* Horizontal strip */}
      <div
        ref={stripRef}
        className="flex flex-nowrap h-screen will-change-transform"
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="gallery-slide relative flex-shrink-0 w-screen h-screen flex items-center justify-center overflow-hidden"
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target;
                if (!target.dataset.fallbackUsed) {
                  target.dataset.fallbackUsed = "true";
                  target.src = slide.fallback;
                }
              }}
            />
            {/* Overlay */}
            <div
              className={`absolute inset-0 ${
                idx === totalSlides - 1
                  ? "bg-black/70"
                  : "bg-gradient-to-t from-black/60 via-black/20 to-black/40"
              }`}
            />

            {/* Content */}
            <div
              className={`relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto ${
                idx === totalSlides - 1
                  ? "bg-card/40 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 sm:p-10"
                  : ""
              }`}
            >
              {slide.content}
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const strip = stripRef.current;
              if (!strip) return;
              const section = sectionRef.current;
              if (!section) return;
              const scrollAmount =
                (i / (totalSlides - 1)) * (strip.scrollWidth - window.innerWidth);
              gsap.to(window, {
                scrollTo: { y: section.offsetTop + scrollAmount * 0.3 },
                duration: 0.8,
                ease: "power2.inOut",
              });
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-primary w-6 scale-110 shadow-lg shadow-primary/30"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
        <span className="text-white/40 text-xs font-medium ml-2 min-w-[3rem] text-center">
          {activeIndex + 1} / {totalSlides}
        </span>
      </div>
    </section>
  );
}