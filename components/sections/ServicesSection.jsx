import { SERVICES } from "@/lib/constants"
import AnimatedEmoji from "@/components/ui/AnimatedEmoji"

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center fade-in-up mb-16" data-animate id="services-title">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">🎁</span>
            <span className="font-semibold text-primary">Comprehensive Support</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What We{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Provide</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Every aspect of a child's wellbeing—physical, emotional, educational, and social
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="scale-in group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 cursor-pointer"
              data-animate
              id={`service-${idx}`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <AnimatedEmoji emoji={service.emoji} size="5xl" delay={idx * 80} className="group-hover:scale-110" />
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-foreground/70">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
