'use client'
import { motion } from 'framer-motion'

const skills = [
  { label: 'Python', icon: '🐍' },
  { label: 'Next.js', icon: '▲' },
  { label: 'FastAPI', icon: '⚡' },
  { label: 'React', icon: '⚛️' },
  { label: 'n8n', icon: '🔄' },
  { label: 'LangChain', icon: '🦜' },
  { label: 'GPT-4', icon: '🤖' },
  { label: 'TypeScript', icon: '📘' },
  { label: 'Tailwind CSS', icon: '🎨' },
  { label: 'PostgreSQL', icon: '🐘' },
  { label: 'SQLite', icon: '🗄️' },
  { label: 'Framer Motion', icon: '🎭' },
  { label: 'Docker', icon: '🐳' },
  { label: 'GitHub', icon: '🐙' },
  { label: 'WhatsApp API', icon: '📱' },
  { label: 'Twilio', icon: '📞' },
  { label: 'ElevenLabs', icon: '🎙️' },
  { label: 'Whisper AI', icon: '👂' },
  { label: 'Linux', icon: '🐧' },
  { label: 'Vercel', icon: '▲' },
]

const benefits = [
  { label: 'Fast Delivery', icon: '🚀' },
  { label: 'Secure', icon: '🔒' },
  { label: 'Scalable', icon: '📈' },
  { label: 'Clean Code', icon: '✨' },
  { label: 'Mobile-First', icon: '📱' },
  { label: 'SEO Ready', icon: '🔍' },
  { label: '24/7 Support', icon: '🛟' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-border/30 relative">
      {/* Dark flower/blob decorative element like parthh.in */}
      <div className="flex justify-center mb-12">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-surface via-border to-surface border border-border/30 opacity-60"/>
          {[0,60,120,180,240,300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x = 50 + 35 * Math.cos(rad)
            const y = 50 + 35 * Math.sin(rad)
            return (
              <div
                key={i}
                className="absolute w-14 h-14 rounded-full bg-surface border border-border/50"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `spin ${8 + i}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                  opacity: 0.4 + i * 0.1,
                }}
              />
            )
          })}
          <div className="absolute inset-0 flex items-center justify-center text-3xl">⚡</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="section-label mb-4">MY SKILLSET</p>
        <h2 className="font-display text-5xl lg:text-7xl font-black leading-tight mb-16">
          The Magic{' '}
          <span className="italic gradient-text">Behind</span>
        </h2>

        {/* Tech pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skills.map((skill, i) => (
            <motion.span
              key={skill.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{ scale: 1.08, borderColor: '#e63946', color: '#e63946' }}
              className="pill cursor-default"
            >
              <span className="text-base">{skill.icon}</span>
              {skill.label}
            </motion.span>
          ))}
        </div>

        {/* Benefits pills */}
        <p className="section-label mb-6">WHAT YOU GET</p>
        <div className="flex flex-wrap justify-center gap-3">
          {benefits.map((b, i) => (
            <motion.span
              key={b.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium"
            >
              <span>{b.icon}</span>
              {b.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
