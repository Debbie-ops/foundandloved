import { FOOTER_SECTIONS } from "@/lib/constants"
import Link from "next/link";
import Image from "next/image";


export default function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <Link
            href="/"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Image
              src="/logo2.png" // path inside /public
              alt="Found and Loved Safe Home Logo"
              width={70}
              height={70}
              className="group-hover:scale-105 transition-transform"
              priority
            />

            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Found and Loved Safe Home
            </span>
          </Link>

          {/* Links Columns */}
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-foreground/60 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
          <p>&copy; 2025 Found and Loved Safe Home. Dedicated to every child's bright future. </p>
        </div>
      </div>
    </footer>
  )
}
