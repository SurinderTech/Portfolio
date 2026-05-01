'use client'
import { motion } from 'framer-motion'

const useCases = [
  {
    icon: '🎓',
    type: 'Students',
    tagline: 'Stand Out. Get Hired.',
    description: 'Portfolio websites, project showcases, and AI-powered resumes that get you noticed by top companies.',
    solutions: ['Portfolio Website', 'PPT Design', 'Project Tools'],
    color: '#3b82f6',
  },
  {
    icon: '🎨',
    type: 'Creators',
    tagline: 'Automate. Scale. Monetize.',
    description: 'Social media automation, content tools, and AI assistants that help you create 10x more content.',
    solutions: ['n8n Automation', 'AI Content Tools', 'Brand Kit'],
    color: '#b5179e',
  },
  {
    icon: '🏢',
    type: 'Businesses',
    tagline: 'Save Time. Close More Deals.',
    description: 'WhatsApp bots, CRM automation, and AI customer support that runs your business while you sleep.',
    solutions: ['AI Chatbot', 'CRM Automation', 'Voice Agent'],
    color: '#e63946',
  },
]

export default function UseCases({ onOrder }: { onOrder: (service?: string) => void }) {
  return (
    <section className="py-24 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="section-label mb-4">WHO IS THIS FOR</p>
          <h2 className="font-display text-5xl lg:text-7xl font-black">
            Built For{' '}
            <span className="italic gradient-text">Everyone</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((u, i) => (
            <motion.div
              key={u.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-2xl border border-border bg-surface flex flex-col gap-4 group cursor-default"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: `${u.color}15`, border: `1px solid ${u.color}30` }}
              >
                {u.icon}
              </div>

              <div>
                <p className="section-label mb-1" style={{ color: u.color }}>{u.type}</p>
                <h3 className="font-display text-2xl font-bold mb-2">{u.tagline}</h3>
                <p className="text-muted text-sm leading-relaxed">{u.description}</p>
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                {u.solutions.map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-muted">
                    <span style={{ color: u.color }}>→</span>
                    {s}
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOrder(u.type)}
                className="mt-4 w-full py-3 rounded-xl border border-border text-sm font-medium hover:border-accent hover:text-accent transition-all"
              >
                Get Solutions →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
