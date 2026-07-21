"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Header({ activeSection, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const heroBottom = hero
        ? hero.offsetTop + hero.offsetHeight
        : window.innerHeight;
      setIsPastHero(window.scrollY >= heroBottom - 96);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-out ${
        isPastHero
          ? "top-4 left-1/2 right-auto w-[min(94vw,980px)] -translate-x-1/2 rounded-full border border-border/70 bg-background/90 shadow-2xl shadow-foreground/10 backdrop-blur-xl"
          : "top-0 left-0 right-0 w-full translate-x-0 rounded-none border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          isPastHero
            ? "max-w-none px-4 py-2 sm:px-5"
            : "max-w-7xl px-4 py-4 sm:px-6 lg:px-8"
        }`}
      >
        <Link
          href="/"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Image
            src="/logo2.png" // path inside /public
            alt="Found and Loved Safe Home Logo"
            width={isPastHero ? 44 : 60}
            height={isPastHero ? 44 : 60}
            className="group-hover:scale-105 transition-transform"
            priority
          />

          <span
            className={`font-bold text-primary transition-all duration-500 ${isPastHero ? "hidden sm:inline text-base" : "text-xl"}`}
          >
            FOUND AND LOVED SAFE HOME
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`hidden md:flex items-center transition-all duration-500 ${isPastHero ? "gap-5" : "gap-8"}`}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative group rounded-full px-2 py-1 text-sm font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  activeSection === item.id ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/#contact"
          className={`hidden md:block bg-primary text-primary-foreground rounded-full font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/30 ${
            isPastHero ? "px-4 py-2 text-sm" : "px-6 py-2"
          }`}
        >
          SUPPORT US
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden border-t border-border bg-white/95 backdrop-blur-md ${isPastHero ? "rounded-b-3xl" : ""}`}
        >
          <div className="px-4 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-primary/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
