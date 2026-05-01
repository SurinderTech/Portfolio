'use client'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Rajesh Verma',
    role: 'Business Owner, Delhi',
    avatar: 'RV',
    color: '#e63946',
    text: 'Surinder built a WhatsApp bot for my restaurant that handles 200+ orders daily. Best investment I ever made. Saved me 3 employees worth of work.',
    stars: 5,
  },
  {
    name: 'Priya Singh',
    role: 'Startup Founder, Bangalore',
    avatar: 'PS',
    color: '#b5179e',
    text: 'The SaaS landing page he built converts at 12%. I\'ve worked with 5 developers before — none came close to his quality and speed.',
    stars: 5,
  },
  {
    name: 'Amit Sharma',
    role: 'E-commerce Seller',
    avatar: 'AS',
    color: '#0ea5e9',
    text: 'n8n automation he set up saves me 4 hours every day. Lead nurturing, inventory alerts, email sequences — all automated. Incredible.',
    stars: 5,
  },
  {
    name: 'Neha Gupta',
    role: 'Content Creator',
    avatar: 'NG',
    color: '#10b981',
    text: 'Got a portfolio + AI chatbot done in 4 days. The rotating wheel section alone got me 3 client inquiries in the first week!',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="section-label mb-4">WHAT OTHERS SAY</p>
          <h2 className="font-display text-5xl lg:text-7xl font-black">
            The Voices{' '}
            <span className="italic gradient-text">Behind</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-border bg-surface flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-muted leading-relaxed text-sm">"{t.text}"</p>

              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
