'use client'
import { motion } from 'framer-motion'

const services = [
  {
    icon: '🤖',
    title: 'AI Chatbots',
    description: 'Smart WhatsApp & website chatbots that handle support, sales, and lead generation 24/7. Powered by GPT and custom trained on your data.',
    price: '₹1,499',
    delivery: '3–5 days',
    tags: ['WhatsApp Bot', 'GPT-4', 'Lead Gen'],
    highlight: false,
  },
  {
    icon: '⚡',
    title: 'n8n Automation',
    description: 'End-to-end workflow automation — from email sequences to CRM sync, scraping, and multi-step AI agent pipelines.',
    price: '₹999',
    delivery: '2–4 days',
    tags: ['n8n', 'Zapier', 'Make.com'],
    highlight: false,
  },
  {
    icon: '🧠',
    title: 'AI Agents (Premium)',
    description: 'Voice AI agents, customer support systems, and multi-step autonomous agents. Your highest ROI investment.',
    price: '₹4,999',
    delivery: '7–10 days',
    tags: ['Voice AI', 'LangChain', 'Agents'],
    highlight: true,
  },
  {
    icon: '🌐',
    title: 'Modern Websites',
    description: 'SaaS landing pages, portfolio sites, and business websites built with Next.js. Conversion-focused, blazing fast.',
    price: '₹1,499',
    delivery: '4–7 days',
    tags: ['Next.js', 'Tailwind', 'Framer'],
    highlight: false,
  },
  {
    icon: '⚙️',
    title: 'Custom Software',
    description: 'Admin dashboards, PDF tools, calculators, and custom SaaS tools. Built to scale with your business.',
    price: '₹2,999',
    delivery: '7–14 days',
    tags: ['FastAPI', 'React', 'SQLite'],
    highlight: false,
  },
  {
    icon: '🎨',
    title: 'Design & PPT',
    description: 'Premium presentation design, social media creatives, and brand kits that make you look like a Fortune 500.',
    price: '₹499',
    delivery: '1–2 days',
    tags: ['Figma', 'Canva', 'Brand'],
    highlight: false,
  },
]

export default function Services({ onOrder }: { onOrder: (service?: string) => void }) {
  return (
    <section id="services" className="py-24 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-4">WHAT I BUILD</p>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-5xl lg:text-7xl font-black leading-tight">
              Services That{' '}
              <span className="italic gradient-text">Convert</span>
            </h2>
            <a href="#pricing" className="hidden md:flex items-center gap-2 text-sm text-muted hover:text-text transition-colors">
              See Pricing →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`service-card relative p-6 rounded-2xl border bg-surface flex flex-col gap-4 ${s.highlight
                  ? 'border-accent/60 glow-red'
                  : 'border-border hover:border-border/80'
                }`}
            >
              {s.highlight && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                  ⭐ Most Popular
                </div>
              )}

              <div className="flex items-start justify-between">
                <span className="text-3xl">{s.icon}</span>
                <div className="text-right">
                  <div className="text-lg font-bold text-text">{s.price}</div>
                  <div className="text-xs text-muted">{s.delivery}</div>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {s.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                onClick={() => onOrder(s.title)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all mt-2 ${s.highlight
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'border border-border text-text hover:border-accent hover:text-accent'
                  }`}
              >
                Order Now →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
