"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const groupRef = useRef(null);
  const w1 = useRef(null);
  const w2 = useRef(null);
  const w3 = useRef(null);
  const para = useRef(null);

  useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const mm = gsap.matchMedia();

  const ctx = gsap.context(() => {
    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        const { isMobile, isTablet } = context.conditions;

        const offscreenY = isMobile ? 120 : isTablet ? 160 : 200;

        const tl = gsap.timeline({
          defaults: { ease: "power1.out", force3D: true },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + Math.round(window.innerHeight * 2.4),
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        // --- Initial states ---
        // LOVE is visible from the start
        gsap.set(w1.current, {
          y: 0,
          autoAlpha: 1,
          willChange: "transform, opacity",
        });
        // SERVE & RESTORE start offscreen and hidden
        gsap.set(w2.current, {
          y: offscreenY,
          autoAlpha: 0,
          willChange: "transform, opacity",
        });
        gsap.set(w3.current, {
          y: offscreenY,
          autoAlpha: 0,
          willChange: "transform, opacity",
        });

        // Paragraph stays hidden initially
        gsap.set(para.current, {
          y: 80,
          autoAlpha: 0,
          willChange: "transform, opacity",
        });

        // --- Timeline ---
        // SERVE appears from below
        tl.to(w2.current, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.15);
        // RESTORE appears from below
        tl.to(w3.current, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.35);

        // Move the whole group up
        const moveUp = Math.round(window.innerHeight * 0.85);
        tl.to(
          groupRef.current,
          { y: `-=${moveUp}`, duration: 0.8, ease: "power2.out" },
          1.0
        );

        // Paragraph slides in
        tl.to(para.current, { y: 0, autoAlpha: 1, duration: 0.7 }, 1.4);

        // Hold
        tl.to({}, { duration: 0.3 });
      }
    );
  }, section);

  return () => {
    ctx.revert();
    mm.revert();
  };
}, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative h-[clamp(38rem,82svh,52rem)] overflow-hidden bg-[#f76a12]"
    >
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="h-full w-full max-w-6xl px-4 py-12 lg:px-6">
          <div className="relative flex h-full flex-col items-center justify-center">
            <div
              ref={groupRef}
              className="flex w-full flex-nowrap items-baseline justify-center gap-2 sm:gap-3 md:gap-8 lg:gap-12"
            >
              <div
                ref={w1}
                className="inline-block text-[clamp(1.3rem,6.25vw,2.75rem)] font-black leading-none tracking-tight text-white drop-shadow-lg md:text-[clamp(3.5rem,10vw,9rem)]"
              >
                EVERY
              </div>
              <div
                ref={w2}
                className="inline-block text-[clamp(1.3rem,6.25vw,2.75rem)] font-black leading-none tracking-tight text-white drop-shadow-lg md:text-[clamp(3.5rem,10vw,9rem)]"
              >
                CHILD
              </div>
              <div
                ref={w3}
                className="inline-block text-[clamp(1.3rem,6.25vw,2.75rem)] font-black leading-none tracking-tight text-white drop-shadow-lg md:text-[clamp(3.5rem,10vw,9rem)]"
              >
                MATTERS
              </div>
            </div>

            <div
              ref={para}
              className="mission-paragraph absolute z-30 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl text-center text-sm leading-6 md:text-xl md:leading-relaxed text-white/90"
            >
              <p className="leading-relaxed">
                Found & Loved Children's Home was established by a compassionate Zambian couple in Chunga, Lusaka, after witnessing the growing number of vulnerable children who had nowhere safe to call home.

                What began as a small act of kindness, opening their home to a few children in need, grew into a registered children's home recognized by Zambia's Ministry of Community Development and other relevant regulatory authorities.

                Today, Found & Loved Children's Home provides care for approximately 20 children, offering them not only shelter but also love, stability, education, and hope for a brighter future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
