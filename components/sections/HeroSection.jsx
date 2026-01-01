import Link from "next/link"

export default function CTASection() {
  return (
    <section 
      className="py-80 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/DSC02566.jpg?height=400&width=1200&query=warm+children+home+community+care)'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-4xl mx-auto text-center fade-in-up" data-animate id="cta-section">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Make a{" "}
          <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">Real Difference</span>
        </h2>
        <p className="text-xl text-white/90 mb-12 leading-relaxed">
          Every contribution, whether financial, time, or support, directly impacts a child's life. Join us in creating
          a safe haven for vulnerable children.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/*<button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            <span className="text-xl">dY'?</span>
            Donate Now
          </button>*/}
          <Link
            href="/our-story"
            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-xl">Our Story</span>
             
          </Link>
        </div>
      </div>
    </section>
  )
}
