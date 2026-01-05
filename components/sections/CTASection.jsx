import Link from "next/link"

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-white rounded-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center fade-in-up" data-animate id="cta-section">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Make a{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Real Difference</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-12 leading-relaxed">
          Our certified residential home in Chunga currently supports <strong>30+</strong> children who are temporarily separated
          from their parents due to incarceration. Operating under the approval of relevant authorities, we provide structured
          care, education, and supervision while prioritising family tracing and safe reunification.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/*<button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <span className="text-xl">dY'?</span>
            Donate Now
          </button>*/}
          <Link
            href="/gallery"
            className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-xl"></span>
            Our Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
