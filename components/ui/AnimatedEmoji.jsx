export default function AnimatedEmoji({ emoji, size = "4xl", delay = 0, className = "" }) {
  return (
    <span className={`inline-block text-${size} float-emoji ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {emoji}
    </span>
  )
}
