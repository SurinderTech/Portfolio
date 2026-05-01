'use client'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'AutoFlow CRM',
    emoji: '🔄',
    description: 'A full-stack CRM automation system with n8n workflows, email sequences, lead scoring, and AI-powered follow-ups. Reduced manual work by 80% for a real estate client.',
    tags: ['n8n', 'FastAPI', 'Next.js', 'PostgreSQL', 'AI'],
    gradient: 'from-red-900/40 to-orange-900/20',
    accentColor: '#e63946',
    live: '#',
  },
  {
    title: 'SmartBot WhatsApp',
    emoji: '🤖',
    description: 'AI-powered WhatsApp chatbot handling 500+ customer queries/day. Integrated GPT-4, appointment booking, payment links, and product catalog browsing.',
    tags: ['WhatsApp API', 'GPT-4', 'Python', 'Twilio', 'FastAPI'],
    gradient: 'from-purple-900/40 to-pink-900/20',
    accentColor: '#b5179e',
    live: '#',
  },
  {
    title: 'SaaS Landing Kit',
    emoji: '🌐',
    description: 'Premium Next.js SaaS landing page template with animated hero, pricing tables, testimonials, and 94+ Lighthouse score. Used by 12+ startups.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind', 'TypeScript'],
    gradient: 'from-blue-900/40 to-cyan-900/20',
    accentColor: '#0ea5e9',
    live: '#',
  },
  {
    title: 'AI Voice Agent',
    emoji: '🎙️',
    description: 'Autonomous voice AI agent for inbound customer calls. Understands Hindi + English, handles FAQs, and escalates complex issues to human agents.',
    tags: ['ElevenLabs', 'Whisper', 'LangChain', 'FastAPI'],
    gradient: 'from-green-900/40 to-teal-900/20',
    accentColor: '#10b981',
    live: '#',
  },
]

export default function Projects({ onOrder }: { onOrder: (service?: string) => void }) {
  return (
    <section id="projects" className="py-24 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="section-label mb-4">VENTURE SHOWCASE</p>
          <h2 className="font-display text-5xl lg:text-7xl font-black leading-tight">
            WORK THAT{' '}
            <span className="italic gradient-text">SPEAKS</span>
          </h2>
        </div>

        <div className="space-y-12">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Text side */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-accent rounded-full" />
                  <h3 className="font-display text-3xl font-bold">{p.title}</h3>
                </div>
                <p className="text-muted leading-relaxed mb-6">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(tag => (
                    <span key={tag} className="pill text-xs">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={p.live}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border rounded-full text-sm font-medium hover:border-accent hover:text-accent transition-all"
                  >
                    🔗 Live Preview
                  </a>
                  <button
                    onClick={() => onOrder('Custom Project')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent/90 transition-all"
                  >
                    Order Similar →
                  </button>
                </div>
              </div>

              {/* Visual card side */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 3 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl overflow-hidden border border-border bg-gradient-to-br ${p.gradient} h-64 flex items-center justify-center`}
                >
                  {/* Mock UI inside */}
                  <div className="absolute inset-0 p-6">
                    {/* Fake browser bar */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/60"/>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60"/>
                      <div className="w-3 h-3 rounded-full bg-green-500/60"/>
                      <div className="flex-1 ml-2 h-5 bg-surface/60 rounded-md"/>
                    </div>
                    {/* Fake content */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[1,2,3].map(n => (
                        <div key={n} className="h-16 bg-surface/40 rounded-lg border border-white/5"/>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-surface/40 rounded w-3/4"/>
                      <div className="h-3 bg-surface/40 rounded w-1/2"/>
                      <div className="h-3 bg-surface/40 rounded w-2/3"/>
                    </div>
                  </div>

                  <span className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity z-10">
                    {p.emoji}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors text-sm">
            See more projects →
          </a>
        </div>
      </div>
    </section>
  )
}
