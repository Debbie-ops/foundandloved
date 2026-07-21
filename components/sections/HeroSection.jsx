"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContactClick = (event) => {
    event.preventDefault();

    const contact = document.getElementById("contact");
    if (!contact) return;

    // Pinned GSAP sections add spacer height. Refresh first so the target's
    // document position is accurate before starting the smooth scroll.
    ScrollTrigger.refresh();

    requestAnimationFrame(() => {
      const top = window.scrollY + contact.getBoundingClientRect().top;
      window.history.pushState(null, "", "#contact");
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context((self) => {
      const copy = self.selector(".hero-copy")[0];
      const text = self.selector(".hero-title")[0];
      const sub = self.selector(".hero-sub")[0];
      const icon = self.selector("#mouse-icon")[0];
      const outline = self.selector("#outline")[0];
      const scroll = self.selector("#scroll")[0];

      const iconTl = gsap.timeline({ repeat: -1, paused: true });
      iconTl
        .to(
          scroll,
          {
            y: 20,
            autoAlpha: 0,
            transformOrigin: "50% 100%",
            duration: 0.7,
          },
          "icon",
        )
        .to(outline, { y: 8, duration: 0.7 }, "icon")
        .to(outline, { y: 0, duration: 0.7 }, "icon+=0.7");

      const tl = gsap.timeline({
        defaults: { ease: "none", transformOrigin: "50% 50%" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray(self.selector("[data-depth].hero-layer")).forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0);
        const movement = -(layer.offsetHeight * depth);
        tl.to(layer, { y: -movement }, 0);
      });

      tl.to(
        copy,
        {
          y: -hero.offsetHeight * 0.22,
          autoAlpha: 0,
          scale: 1.05,
          duration: 0.14,
        },
        0,
      )
        .to(
          icon,
          {
            y: -icon.offsetHeight * Number(icon.dataset.depth || 0),
            autoAlpha: 0,
            duration: 0.2,
          },
          0,
        );

      gsap.fromTo(
        [text, sub],
        { autoAlpha: 0, y: 4 },
        { autoAlpha: 1, y: 0, stagger: 0.2, duration: 0.75, delay: 0.2 },
      );
      gsap.fromTo(
        icon,
        { autoAlpha: 0 },
        { autoAlpha: 1, delay: 0.55, onStart: () => iconTl.play() },
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero relative min-h-screen overflow-hidden bg-background px-4 sm:px-6 lg:px-8 flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="hero-layer bg absolute inset-0 h-[115%] w-full max-w-[100vw] object-cover object-center will-change-transform"
          src="/sunset.png"
          alt=""
          aria-hidden="true"
          data-depth="0.34"
        />
        <div
          className="hero-layer snow absolute inset-0 z-[2] bg-gradient-to-r from-black/75 via-black/45 to-black/15"
          data-depth="0.24"
        />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#43200f]/55 via-transparent to-[#f76a12]/10" />
      </div>

      <div className="hero-copy hero-text relative z-10 mx-auto w-full max-w-7xl pt-24">
        <div className="max-w-4xl">
          <div
            className={`mb-7 flex items-center gap-4 transition-all duration-1000 ${
              isVisible ? "fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            {/*<span className="h-px w-10 bg-[#f76a12] sm:w-16" />*/}
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#FCEFC3] sm:text-sm">
              A safe home in Lusaka, Zambia
            </p>
          </div>
        <h1
          className={`hero-title mb-8 text-5xl font-black leading-[0.94] tracking-[-0.04em] text-white drop-shadow-2xl transition-all duration-1000 sm:text-6xl md:text-7xl lg:text-[6.6rem] ${
            isVisible ? "fade-in-up" : "opacity-0"
          }`}
          data-depth="0.64"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="block">Every child deserves</span>
          <span className="block text-[#FCEFC3]">a place to feel</span>
          <span className="relative inline-block text-[#f76a12]">
            found &amp; loved.
            <svg
              className="absolute -bottom-3 left-0 h-4 w-full text-[#FCEFC3]/70"
              viewBox="0 0 500 22"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M3 15C105 4 246 4 497 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p
          className={`hero-sub mb-10 max-w-2xl text-base leading-7 text-white/80 drop-shadow-lg transition-all duration-1000 sm:text-lg md:text-xl md:leading-8 ${
            isVisible ? "fade-in-up" : "opacity-0"
          }`}
          data-depth="0.6"
          style={{ animationDelay: "0.3s" }}
        >
          We give children affected by family separation more than shelter. We
          offer steady care, room to grow and the everyday feeling of belonging
          to a family.
        </p>

        <div
          className={`flex flex-col items-start gap-5 transition-all duration-1000 sm:flex-row sm:items-center ${
            isVisible ? "fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          {/*<Link
            href="/#mission"
            className="group flex items-center justify-center gap-3 rounded-full bg-[#FCEFC3] px-7 py-4 font-bold text-[#2a211b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Discover our story
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>*/}
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className="group flex items-center justify-center gap-3 rounded-full bg-[#FCEFC3] px-7 py-4 font-bold text-[#2a211b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Get involved
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
        <svg
          id="mouse-icon"
          data-depth="0.5"
          className="h-12 w-7 text-white/80"
          viewBox="0 0 40 75"
          aria-hidden="true"
        >
          <path
            id="outline"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeMiterlimit="10"
            d="M20.434 61.208h0c-9.665 0-17.5-7.835-17.5-17.5v-25c0-9.665 7.835-17.5 17.5-17.5h0c9.665 0 17.5 7.835 17.5 17.5v25c0 9.665-7.835 17.5-17.5 17.5z"
          />
          <circle
            id="scroll"
            fill="currentColor"
            cx="20.434"
            cy="14.626"
            r="4"
          />
        </svg>
      </div>
    </section>
  );
}
