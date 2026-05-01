'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display font-black text-3xl mb-4">
              <span className="text-accent">S</span>
              <span className="text-text">K</span>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-xs">
              AI & Automation expert helping businesses save time, generate leads, and scale with intelligent technology.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/919797486509"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-xs text-muted hover:text-green-400 hover:border-green-400 transition-all"
                title="WhatsApp"
              >
                W
              </a>
              <a
                href="mailto:surinderkumar3182@gmail.com"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-xs text-muted hover:text-accent hover:border-accent transition-all"
                title="Email"
              >
                @
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-xs text-muted hover:text-blue-400 hover:border-blue-400 transition-all"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-xs text-muted hover:text-text hover:border-text transition-all"
                title="GitHub"
              >
                G
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest text-muted uppercase mb-4">Services</h4>
            <ul className="space-y-2">
              {['AI Chatbots', 'n8n Automation', 'AI Agents', 'Modern Websites', 'Custom Software', 'PPT Design'].map(s => (
                <li key={s}>
                  <a href="#services" className="text-sm text-muted hover:text-text transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest text-muted uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Projects', href: '#projects' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Contact', href: '#contact' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted hover:text-text transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/919797486509"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  📱 WhatsApp Me
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {year} Surinder Kumar. All rights reserved.
          </p>
          <p className="text-xs text-muted flex items-center gap-2">
            Built with
            <span className="text-accent">▲</span> Next.js +
            <span className="text-blue-400">⚡</span> FastAPI +
            <span className="text-pink-400">✨</span> Framer Motion
          </p>
          <p className="text-xs text-muted">
            <span className="text-green-400">●</span> Available for new projects
          </p>
        </div>
      </div>
    </footer>
  )
}
