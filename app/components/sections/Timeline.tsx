'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    step: '01',
    title: 'Order',
    description: 'Choose your service, fill in your requirements. Takes 2 minutes.',
    icon: '📋',
  },
  {
    step: '02',
    title: 'Planning',
    description: 'I review your requirements and send a detailed proposal within 24 hours.',
    icon: '🗺️',
  },
  {
    step: '03',
    title: 'Development',
    description: 'I build your solution with daily progress updates. You\'re always in the loop.',
    icon: '⚙️',
  },
  {
    step: '04',
    title: 'Delivery',
    description: 'Final delivery with full documentation, source code, and deployment support.',
    icon: '🚀',
  },
]

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="section-label mb-4">HOW IT WORKS</p>
          <h2 className="font-display text-5xl lg:text-7xl font-black">
            Simple{' '}
            <span className="italic gradient-text">Process</span>
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-accent via-accent2 to-accent"
            />
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-center gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row pl-20 md:pl-0`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <div className={`inline-block px-3 py-1 rounded-full border border-border text-xs font-mono text-muted mb-3 ${
                    i % 2 === 0 ? '' : ''
                  }`}>
                    STEP {step.step}
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted leading-relaxed max-w-sm">{step.description}</p>
                </div>

                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3 }}
                    className="w-14 h-14 rounded-full bg-surface border-2 border-accent flex items-center justify-center text-2xl z-10 relative"
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Spacer for other side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
