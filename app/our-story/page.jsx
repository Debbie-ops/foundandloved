"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const STORY_SECTIONS = [
  {
    id: "story-roots",
    eyebrow: "Our Story",
    title: "A home and school rooted in Chunga",
    description:
      "Found and Loved Safe Home is based in Chunga, with a family home and a school a few meters away. The school serves children living at the home and also welcomes community learners who want access to the same education facilities.",
    image: "/classroom2.jpg",
    imageAlt: "Children gathered at school in Chunga",
    imagePosition: "left",
  },
  {
    id: "story-leadership",
    eyebrow: "Leadership",
    title: "A couple called to serve",
    description:
      "The home is run by two owners, a couple who have dedicated their lives to caring for children in difficult circumstances. They work in partnership with social welfare services in Zambia to keep every child safe and supported.",
    image: "/volunteer2.jpg",
    imageAlt: "Caregivers standing with children at the home",
    imagePosition: "right",
  },
  {
    id: "story-support",
    eyebrow: "How We Sustain",
    title: "Donations that keep the home running",
    description:
      "Daily operations are funded by donations from well wishers and small jobs around the community. Every contribution helps with food, school materials, and upkeep, and goes a long way in making life comfortable for the children.",
    image: "/bed1.jpeg",
    imageAlt: "Community members supporting the home",
    imagePosition: "left",
  },
  {
    id: "story-growth",
    eyebrow: "Looking Ahead",
    title: "Preparing for a growing community",
    description:
      "As the number of children in the home and school continues to grow, the owners are exploring larger housing and expanded school facilities. Support from donors helps make these next steps possible.",
    image: "/infrustructure1.jpg",
    imageAlt: "Construction work for future facilities",
    imagePosition: "right",
  },
]

export default function OurStoryPage() {
  const router = useRouter()
  const [visibleSections, setVisibleSections] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.2 }
    )

    const elements = document.querySelectorAll("[data-reveal]")
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const handleNavigate = (sectionId) => {
    router.push(`/#${sectionId}`)
  }

  const isVisible = (id) => visibleSections.has(id)

  return (
    <div className="bg-white text-foreground">
      <Header activeSection="home" onNavigate={handleNavigate} />

      <main>
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div
            id="story-hero"
            data-reveal
            className={`max-w-4xl mx-auto text-center ${
              isVisible("story-hero") ? "fade-in-up" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              A safe home where children can breathe, learn, and belong
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Established in 2019 our work centers on a home and school in Chunga, Zambia.  How it is sustained,
              how the school serves both the home and the community, and what growth is needed next.
            </p>
          </div>
        </section>

        {STORY_SECTIONS.map((section) => (
          <section
            key={section.id}
            className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/60"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                id={`${section.id}-image`}
                data-reveal
                className={`relative min-h-[320px] lg:min-h-[460px] rounded-3xl overflow-hidden shadow-lg ${
                  section.imagePosition === "right" ? "lg:order-2" : ""
                } ${
                  isVisible(`${section.id}-image`)
                    ? section.imagePosition === "right"
                      ? "slide-in-right"
                      : "slide-in-left"
                    : "opacity-0"
                }`}
              >
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={section.id === "story-roots"}
                />
              </div>
              <div
                id={`${section.id}-text`}
                data-reveal
                className={`max-w-xl ${
                  section.imagePosition === "right" ? "lg:order-1" : ""
                } ${
                  isVisible(`${section.id}-text`) ? "fade-in-up" : "opacity-0 translate-y-6"
                }`}
                style={{ animationDelay: "120ms" }}
              >
                <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
                  {section.eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">{section.description}</p>
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  )
}
