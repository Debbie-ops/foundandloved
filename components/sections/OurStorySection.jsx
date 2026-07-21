"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHILDREN_WE_SERVE = [
  "Children whose parents or guardians are temporarily unable to care for them.",
  "Children referred through Social Welfare Services.",
  "Children who have been separated from their families and are awaiting reunification.",
  "Vulnerable children requiring a safe and stable environment during periods of crisis.",
];

export default function OurStorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-story-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      aria-labelledby="why-we-exist-title"
      className="overflow-hidden bg-background px-4 py-20 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <div data-story-reveal>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Why We Exist
            </p>
          </div>

          <div className="max-w-4xl">
            <h2
              id="why-we-exist-title"
              data-story-reveal
              className="text-5xl font-black leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              A safe place during difficult times.
            </h2>
            <p
              data-story-reveal
              className="mt-8 max-w-3xl text-lg leading-9 text-foreground/80 md:text-lg md:leading-10"
            >
              Many children in Zambia find themselves without immediate family
              care through circumstances beyond their control.
            </p>

            <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-foreground/70 md:text-lg md:leading-9">
              <p data-story-reveal>
              Some children live with their mothers in correctional facilities
              during infancy and early childhood. As they grow older, they can
              no longer remain in these facilities due to space limitations and
              child welfare considerations. Until their parents are released or
              suitable family arrangements can be made, they require a safe and
              nurturing environment.
              </p>
              <p data-story-reveal>
                Other children arrive after being separated from their families
                and are placed in temporary care while authorities work to reunite
                them with their parents or guardians.
              </p>
            </div>

            <p
              data-story-reveal
              className="mt-8 max-w-3xl border-l-4 border-secondary pl-5 text-xl font-semibold leading-8 text-foreground sm:pl-7 md:text-2xl md:leading-9"
            >
                Found &amp; Loved Children&apos;s Home exists to ensure that these
                children experience care, protection and love during these
                uncertain moments in their lives.
              </p>
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[2.5rem] bg-[#f76a12] px-7 py-14 text-white sm:rounded-[3.5rem] sm:px-12 lg:mt-20 lg:px-16 lg:py-16">
          {/* Puzzle-like cut-outs reveal the section background beneath. */}
          <span
            aria-hidden="true"
            className="absolute -top-8 left-[18%] h-16 w-16 rounded-full bg-background sm:-top-10 sm:h-20 sm:w-20"
          />
          <span
            aria-hidden="true"
            className="absolute -left-7 top-[38%] h-14 w-14 rounded-full bg-background sm:-left-10 sm:h-20 sm:w-20"
          />
          <span
            aria-hidden="true"
            className="absolute -right-10 top-[62%] h-20 w-20 rounded-full bg-background sm:-right-14 sm:h-28 sm:w-28"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-9 left-[58%] h-[4.5rem] w-[4.5rem] rounded-full bg-background sm:-bottom-12 sm:h-24 sm:w-24"
          />
          <span
            aria-hidden="true"
            className="absolute right-[8%] top-8 h-4 w-4 rounded-full bg-background sm:h-6 sm:w-6"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-[8%] left-[5%] h-3 w-3 rounded-full bg-background sm:h-5 sm:w-5"
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <div data-story-reveal>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">
                Who We Serve
              </p>
            </div>

            <div>
              <p data-story-reveal className="mb-6 max-w-2xl text-lg leading-8 text-white/80">
                Found &amp; Loved Children&apos;s Home provides temporary care for
                children including:
              </p>

              <ol className="border-t border-white/35">
                {CHILDREN_WE_SERVE.map((item, index) => (
                  <li
                    key={item}
                    data-story-reveal
                    className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/35 py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
                  >
                    <span className="pt-1 text-xs font-bold tracking-[0.15em] text-white/55">
                      0{index + 1}
                    </span>
                    <p className="text-lg font-semibold leading-7 sm:text-xl sm:leading-8">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div
            data-story-reveal
            className="relative z-10 mt-10 pt-9 lg:ml-[calc(27.5%+2.5rem)]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              Our commitment
            </p>
            <p className="mt-4 max-w-4xl text-2xl font-bold leading-9 text-white sm:text-3xl sm:leading-10">
              Our goal is always to act in the best interests of each child,
              while supporting appropriate family reunification whenever
              possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
