'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function Counter({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = (end / duration) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <div ref={ref} className="text-center">
      <div className="stat-number gradient-text">{count}+</div>
      <div className="text-muted text-sm mt-1">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header like parthh.in */}
        <div className="text-center mb-20">
          <p className="section-label mb-4">A QUICK GLANCE</p>
          <h2 className="font-display text-5xl lg:text-7xl font-black leading-tight">
            Building the bridge between<br />
            ideas and{' '}
            <span className="italic gradient-text">experiences</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-muted leading-relaxed mb-6">
              I'm Surinder Kumar, an AI-driven developer who turns complex business challenges into automated, high-performance solutions. I specialize in AI chatbots, n8n automations, and modern web platforms.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-6">
              From building intelligent WhatsApp bots that handle customer support 24/7, to crafting premium SaaS landing pages that convert — I deliver end-to-end digital solutions that actually grow your business.
            </p>
            <p className="text-lg text-muted leading-relaxed mb-8">
              My code is built to last, helping your business reach the next level. 🚀
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/919797486509"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-medium text-sm hover:bg-green-600 transition-all"
              >
                <span>📱</span> WhatsApp Me
              </a>
              <a
                href="mailto:surinderkumar3182@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text rounded-full font-medium text-sm hover:border-accent hover:text-accent transition-all"
              >
                <span>✉️</span> Email
              </a>
            </div>
          </motion.div>

          {/* Right — Photo stack like parthh.in */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-[300px] h-[380px]">
              {/* Back card */}
              <div
                style={{ transform: 'rotate(-8deg) translate(-20px, 10px)' }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/30 to-accent2/20 border border-accent/20"
              />
              {/* Middle card */}
              <div
                style={{ transform: 'rotate(4deg) translate(10px, -5px)' }}
                className="absolute inset-0 rounded-2xl bg-surface border border-border"
              />
              {/* Front card */}
              <div className="absolute inset-0 rounded-2xl bg-surface border border-border overflow-hidden">
                <div className="h-full bg-gradient-to-br from-accent/10 via-surface to-accent2/10 flex flex-col items-center justify-center gap-4 p-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-4xl font-display font-black text-white">
                    SK
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-xl">Surinder Kumar</h3>
                    <p className="text-muted text-sm">AI & Automation Expert</p>
                    <p className="text-muted text-xs mt-1">📍 Punjab, India</p>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {['AI', 'n8n', 'Python', 'Next.js'].map(tag => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full border border-border bg-surface/80 text-muted">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400">Open for Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-border/30">
          <Counter end={10} label="Projects Completed" />
          <Counter end={6} label="Happy Clients" />
          <Counter end={98} label="Delivery Rate %" />
          <Counter end={2} label="Years Experience" />
        </div>
      </div>
    </section>
  )
}
