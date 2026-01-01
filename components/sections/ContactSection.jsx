import { CONTACT_INFO } from "@/lib/constants"
import { Mail, MapPin, Phone } from "lucide-react"

const CONTACT_ICONS = {
  phone: Phone,
  email: Mail,
  address: MapPin,
}

export default function ContactSection() {
  const renderContactValue = (contact) => {
    if (contact.label.toLowerCase() === "phone") {
      return (
        <a
          href={`tel:${contact.value}`}
          className="text-foreground/70 hover:text-primary transition-colors"
        >
          {contact.value}
        </a>
      )
    }

    if (contact.label.toLowerCase() === "email") {
      return (
        <a
          href={`mailto:${contact.value}`}
          className="text-foreground/70 hover:text-primary transition-colors"
        >
          {contact.value}
        </a>
      )
    }

    return <span className="text-foreground/70">{contact.value}</span>
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-muted/30">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center fade-in-up mb-16" data-animate id="contact-title">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">📞</span>
            <span className="font-semibold text-primary">Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h2>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {CONTACT_INFO.map((contact, idx) => (
            <div
              key={idx}
              className="group scale-in text-center bg-white rounded-2xl p-6 border border-border"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {(() => {
                const Icon = CONTACT_ICONS[contact.label.toLowerCase()]
                return Icon ? (
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                    <Icon className="h-7 w-7" />
                  </span>
                ) : null
              })()}
              <h3 className="text-lg font-semibold mb-2">{contact.label}</h3>
              <p>{renderContactValue(contact)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
