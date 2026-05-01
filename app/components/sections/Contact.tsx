'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: POST to FastAPI backend
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label mb-4">LET'S TALK</p>
            <h2 className="font-display text-5xl lg:text-6xl font-black leading-tight mb-8">
              Start Your{' '}
              <span className="italic gradient-text">Project</span>
            </h2>

            <p className="text-muted leading-relaxed mb-8">
              Got an idea? Let's turn it into reality. I respond within 24 hours.
              Book a free consultation call or just message me on WhatsApp.
            </p>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/919797486509?text=Hi%20Surinder,%20I%20want%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-full font-semibold text-base hover:bg-green-600 transition-all mb-6 w-full justify-center"
            >
              <span className="text-2xl">📱</span>
              WhatsApp — +91 97974 86509
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-3 px-8 py-4 border border-border text-text rounded-full font-semibold text-base hover:border-accent hover:text-accent transition-all mb-8 w-full justify-center"
            >
              <span>📅</span>
              Book Free Consultation
            </motion.a>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted">
                <span className="text-accent">✉️</span>
                <a href="mailto:surinderkumar3182@gmail.com" className="hover:text-text transition-colors">
                  surinderkumar3182@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <span className="text-accent">📍</span>
                <span>Punjab, India</span>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <span className="text-accent">⏱️</span>
                <span>Typically responds within 2 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-border bg-surface"
          >
            <h3 className="font-display text-2xl font-bold mb-6">Send a Message</h3>

            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-5xl mb-4">✅</div>
                <h4 className="font-bold text-xl mb-2">Message Sent!</h4>
                <p className="text-muted">I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text text-sm placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text text-sm placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-widest">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-text text-sm placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent/90 transition-all glow-red"
                >
                  Send Message →
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
