import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { SUCCESS_STORIES } from "@/lib/constants";

export default function StoriesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const reveals = el.querySelectorAll(".fade-in-up, [data-animate]");
      gsap.from(reveals, {
        autoAlpha: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background min-h-screen flex items-center"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full mb-6 transition-all duration-1000 ${
              isVisible ? "fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="font-semibold text-primary">Real Impact</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${
              isVisible ? "fade-in-up" : "opacity-0"
            }`}
            data-animate
            id="stories-title"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-foreground">Success</span>
            <br />
            <span className="text-primary">Stories</span>
          </h2>
          <p
            className={`text-xl text-foreground/70 max-w-2xl mx-auto transition-all duration-1000 ${
              isVisible ? "fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            Real children, real transformations, real hope
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUCCESS_STORIES.map((story, idx) => (
            <div
              key={idx}
              className={`group glow-border rounded-2xl p-8 hover-lift transition-all duration-500 ${
                isVisible ? "fade-in-up" : "opacity-0"
              }`}
              data-animate
              id={`story-${idx}`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary font-semibold text-xl">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {story.name}
                  </h3>
                  <p className="text-foreground/60">Age {story.age}</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed italic">
                {story.story}
              </p>
              <div className="pt-4 border-t border-primary/20">
                <p className="text-sm font-semibold text-primary">
                  {story.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
