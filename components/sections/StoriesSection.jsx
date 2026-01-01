import { SUCCESS_STORIES } from "@/lib/constants"
import AnimatedEmoji from "@/components/ui/AnimatedEmoji"

export default function StoriesSection() {
  return (
    <section id="stories" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-muted/30">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center fade-in-up mb-16" data-animate id="stories-title">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">⭐</span>
            <span className="font-semibold text-primary">Real Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">Real children, real transformations, real hope</p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUCCESS_STORIES.map((story, idx) => (
            <div
              key={idx}
              className="slide-in-left bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300"
              data-animate
              id={`story-${idx}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <AnimatedEmoji emoji={story.emoji} size="5xl" delay={idx * 100} />
                <div>
                  <h3 className="text-2xl font-bold">{story.name}</h3>
                  <p className="text-foreground/60">Age {story.age}</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed italic">{story.story}</p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold text-primary">{story.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
