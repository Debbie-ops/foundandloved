export default function ContactForm() {
  return (
    <div
      className="max-w-2xl mx-auto bg-white rounded-2xl border border-border p-8 fade-in"
      data-animate
      id="contact-form"
    >
      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors bg-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors bg-white"
          />
        </div>
        <input
          type="text"
          placeholder="Subject"
          className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors bg-white"
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors bg-white resize-none"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
