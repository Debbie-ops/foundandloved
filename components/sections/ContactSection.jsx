"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_INFO } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ICONS = { phone: Phone, email: Mail, address: MapPin };

const CONTACT_CONTEXT = {
  phone: "General enquiries and urgent coordination",
  email: "Partnerships, volunteering and donations",
  address: "Visits to the safe home are by prior arrangement",
};

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-contact-reveal]", {
        autoAlpha: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const email =
    CONTACT_INFO.find((item) => item.label.toLowerCase() === "email")?.value ??
    "hello@foundandloved.org";

  const renderContactValue = (contact) => {
    const type = contact.label.toLowerCase();
    const href =
      type === "phone"
        ? `tel:${contact.value.replace(/\s/g, "")}`
        : type === "email"
          ? `mailto:${contact.value}`
          : null;

    if (!href) return <span>{contact.value}</span>;

    return (
      <a
        href={href}
        className="group inline-flex items-center gap-2 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-primary"
      >
        {contact.value}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-background px-4 py-20 md:py-24"
    >
      <span aria-hidden="true" className="absolute -right-20 top-12 h-56 w-56 rounded-full bg-[#f76a12]/20 sm:-right-24 sm:h-72 sm:w-72" />
      <span aria-hidden="true" className="absolute -left-12 top-[48%] h-24 w-24 rounded-full bg-[#f76a12] sm:-left-16 sm:h-32 sm:w-32" />
      <span aria-hidden="true" className="absolute bottom-16 right-[7%] h-5 w-5 rounded-full bg-[#f76a12] sm:h-8 sm:w-8" />
      <span aria-hidden="true" className="absolute right-[28%] top-16 h-3 w-3 rounded-full bg-[#f76a12] sm:h-5 sm:w-5" />

      <div className="relative z-10 w-full">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div data-contact-reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Contact us
            </p>
            <h2 id="contact-title" className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Let&apos;s make a difference, together.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-foreground/70">
              Whether you want to volunteer, support our work, explore a
              partnership or simply learn more, we would be glad to hear from you.
            </p>
            <a href={`mailto:${email}`} className="mt-7 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 font-semibold text-background transition-transform hover:-translate-y-0.5">
              Start a conversation
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <div className="pt-1 lg:pt-8">
            <div className="space-y-7">
              {CONTACT_INFO.map((contact) => {
                const type = contact.label.toLowerCase();
                const Icon = CONTACT_ICONS[type];

                return (
                  <div key={contact.label} data-contact-reveal className="flex items-start gap-4 sm:gap-5">
                    {Icon && (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f76a12] text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
                        {contact.label}
                      </p>
                      <div className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">
                        {renderContactValue(contact)}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-foreground/60">
                        {CONTACT_CONTEXT[type]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div data-contact-reveal className="relative mt-8 overflow-hidden rounded-[2rem] bg-[#f76a12] px-6 py-7 text-white sm:rounded-[2.75rem] sm:px-8">
              <span aria-hidden="true" className="absolute -right-7 -top-7 h-16 w-16 rounded-full bg-background" />
              <span aria-hidden="true" className="absolute -bottom-5 left-[22%] h-10 w-10 rounded-full bg-background" />
              <div className="relative z-10 grid gap-5 sm:grid-cols-2 sm:gap-8">
                <div>
                  <h3 className="font-bold">Plan your visit</h3>
                  <p className="mt-1 text-sm leading-6 text-white/80">
                    To protect the children in our care, all visits must be arranged with our team in advance.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Child safeguarding</h3>
                  <p className="mt-1 text-sm leading-6 text-white/80">
                    Please do not send sensitive information about a child through public channels. Contact us directly so we can guide you safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-contact-reveal className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/55">
          <p>Found and Loved Safe Home &middot; Chunga, Lusaka, Zambia</p>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#f76a12]" />
          <p>Every &middot; Child &middot; Matters</p>
        </div>
      </div>
    </section>
  );
}
