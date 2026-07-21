"use client";

import { CONTACT_INFO } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

export default function Footer() {
  const ref = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const path = pathRef.current;
    if (!el || !path) return;

    const ctx = gsap.context(() => {
      const down =
        "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z";
      const center =
        "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z";

      // Morph on enter with slower elastic bounce
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        toggleActions: "play pause resume reverse",
        onEnter: (self) => {
          const velocity = self.getVelocity();
          // Reduce variation range for more consistent, slower bounce
          const variation = Math.min(Math.max(velocity / 15000, 0.3), 1.2);
          gsap.fromTo(
            path,
            { morphSVG: down },
            {
              duration: 3, // slower
              morphSVG: center,
              ease: `elastic.out(${0.8 + variation * 0.2}, ${0.3 + variation * 0.15})`,
              overwrite: true,
            }
          );
        },
        onEnterBack: (self) => {
          const velocity = self.getVelocity();
          const variation = Math.min(Math.max(velocity / 15000, 0.3), 1.2);
          gsap.fromTo(
            path,
            { morphSVG: down },
            {
              duration: 3,
              morphSVG: center,
              ease: `elastic.out(${0.8 + variation * 0.2}, ${0.3 + variation * 0.15})`,
              overwrite: true,
            }
          );
        },
      });

      // Fade-in content
      const card = el.querySelector(".footer-card");
      const fadeGroup = el.querySelectorAll(".fade-item");

      gsap.from(card, {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(fadeGroup, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const email =
    CONTACT_INFO.find((item) => item.label.toLowerCase() === "email")?.value ??
    "hello@foundandloved.org";

  const footerLinks = [
    { label: "Our mission", href: "/#mission" },
    { label: "Our story", href: "/#our-story" },
    { label: "Get involved", href: "/#contact" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <footer
      ref={ref}
      className="relative flex min-h-[82vh] items-end overflow-hidden bg-background"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <svg
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2278 683"
          className="absolute bottom-0 w-full h-full"
        >
          <defs>
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0.08 0" />
            </filter>
          </defs>
          <path
            ref={pathRef}
            id="bouncy-path"
            fill="#f76a12"
            d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z"
          />
          {/* Noise overlay for subtle grain */}
          <rect
            width="100%"
            height="100%"
            filter="url(#noiseFilter)"
            opacity="0.25"
            mixBlendMode="overlay"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full px-4 pb-8 pt-32 text-white sm:px-6 md:pt-40 lg:px-8">
        <div className="footer-card mx-auto max-w-6xl">
          <div className="grid gap-14 border-b border-white/30 pb-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-24">
            <div className="fade-item">
              <Link href="/" className="inline-flex items-center gap-4">
                <Image
                  src="/logo2.png"
                  alt="Found and Loved Safe Home"
                  width={72}
                  height={72}
                  className="rounded-full bg-background object-cover"
                />
                <span className="text-sm font-bold uppercase leading-5 tracking-[0.14em]">
                  Found &amp; Loved
                  <br />
                  Safe Home
                </span>
              </Link>

              <h2 className="mt-10 max-w-3xl text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl md:text-7xl">
                Every child deserves to feel safe, seen and loved.
              </h2>

              <a
                href={`mailto:${email}`}
                className="group mt-10 inline-flex items-center gap-3 border-b border-white/70 pb-2 text-lg font-semibold transition-colors hover:border-white"
              >
                {email}
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <nav className="fade-item lg:pt-3" aria-label="Footer navigation">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/65">
                Explore
              </p>
              <ul className="border-t border-white/30">
                {footerLinks.map((link) => (
                  <li key={link.label} className="border-b border-white/30">
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between py-4 text-lg font-semibold transition-opacity hover:opacity-70"
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
                  Based in
                </p>
                <p className="mt-3 text-lg font-semibold">Chunga, Lusaka, Zambia</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
                  Visits are arranged in advance to protect the privacy and
                  wellbeing of the children in our care.
                </p>
              </div>
            </nav>
          </div>

          <div className="fade-item flex flex-col gap-3 pt-6 text-xs font-medium uppercase tracking-[0.12em] text-white/65 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Found and Loved Safe Home</p>
            <p>Love &middot; Serve &middot; Restore</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
