'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const services = [
  { id: 'chatbot', label: 'AI Chatbot', icon: '🤖', price: '₹1,499' },
  { id: 'automation', label: 'n8n Automation', icon: '⚡', price: '₹999' },
  { id: 'ai-agent', label: 'AI Agent (Premium)', icon: '🧠', price: '₹4,999' },
  { id: 'website', label: 'Modern Website', icon: '🌐', price: '₹1,499' },
  { id: 'software', label: 'Custom Software', icon: '⚙️', price: '₹2,999' },
  { id: 'design', label: 'PPT / Design', icon: '🎨', price: '₹499' },
]

interface OrderModalProps {
  onClose: () => void
  defaultService?: string
}

export default function OrderModal({ onClose, defaultService }: OrderModalProps) {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(defaultService || '')
  const [form, setForm] = useState({ name: '', email: '', phone: '', requirements: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    // POST to FastAPI: /order
    try {
      await fetch('http://localhost:8000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: selected }),
      }).catch(() => {}) // graceful fallback
    } catch {}
    setSubmitted(true)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl mx-4 bg-surface border border-border rounded-3xl overflow-hidden"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent transition-all z-10"
        >
          ✕
        </button>

        {/* Progress bar */}
        {!submitted && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-border">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent2"
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        )}

        <div className="p-8 pt-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="font-display text-3xl font-bold mb-3">Order Received!</h3>
                <p className="text-muted mb-2">Thank you, <strong className="text-text">{form.name}</strong>!</p>
                <p className="text-muted mb-8">
                  I'll review your requirements and reach out within <span className="text-accent font-medium">24 hours</span> to confirm.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/919797486509?text=Hi%20Surinder%2C%20I%20just%20placed%20an%20order!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-all"
                  >
                    📱 Follow up on WhatsApp
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full py-3 border border-border rounded-xl text-sm font-medium text-muted hover:text-text transition-all"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <p className="section-label mb-2">STEP 1 OF 3</p>
                <h3 className="font-display text-3xl font-bold mb-8">Select a Service</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {services.map(s => (
                    <motion.button
                      key={s.id}
                      onClick={() => setSelected(s.label)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selected === s.label
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border bg-bg hover:border-border/80'
                      }`}
                    >
                      <div className="text-2xl mb-2">{s.icon}</div>
                      <div className="text-sm font-medium">{s.label}</div>
                      <div className="text-xs text-muted mt-1">{s.price}</div>
                    </motion.button>
                  ))}
                </div>
                <button
                  onClick={() => selected && setStep(2)}
                  disabled={!selected}
                  className="w-full py-4 bg-accent text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90 transition-all"
                >
                  Continue →
                </button>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <p className="section-label mb-2">STEP 2 OF 3</p>
                <h3 className="font-display text-3xl font-bold mb-2">Your Details</h3>
                <p className="text-muted text-sm mb-8">Service selected: <span className="text-accent">{selected}</span></p>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-widest">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-widest">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-widest">Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-border rounded-xl font-semibold text-sm text-muted hover:text-text transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => form.name && form.email && setStep(3)}
                    disabled={!form.name || !form.email}
                    className="flex-[2] py-4 bg-accent text-white rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90 transition-all"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <p className="section-label mb-2">STEP 3 OF 3</p>
                <h3 className="font-display text-3xl font-bold mb-8">Requirements</h3>
                <div className="p-4 rounded-xl border border-border bg-bg mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Service</span>
                    <span className="text-accent font-medium">{selected}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted">Name</span>
                    <span className="text-text">{form.name}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted">Email</span>
                    <span className="text-text">{form.email}</span>
                  </div>
                </div>
                <div className="mb-8">
                  <label className="block text-xs font-mono text-muted mb-2 uppercase tracking-widest">
                    Describe your requirements *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.requirements}
                    onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))}
                    placeholder="Tell me exactly what you need. The more detail, the better!"
                    className="w-full px-4 py-3 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border border-border rounded-xl font-semibold text-sm text-muted hover:text-text transition-all"
                  >
                    ← Back
                  </button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!form.requirements}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-[2] py-4 bg-accent text-white rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90 transition-all glow-red"
                  >
                    🚀 Confirm Order
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
