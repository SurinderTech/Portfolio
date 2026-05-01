'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Botpress config ──────────────────────────────────────────────────────────
// Extracted from your shareable URL:
// https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/13/08/20250313083821-3GCVNOCG.json
const BP_CONFIG_URL = 'https://files.bpcontent.cloud/2025/03/13/08/20250313083821-3GCVNOCG.json'
const BP_SCRIPT_URL = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "👋 Hi! I'm Surinder's AI assistant. Ask me anything about his services, pricing, or how to get started!" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [bpReady, setBpReady] = useState(false)
  const bottomRef = useRef(null)
  const listenerRef = useRef(null)

  // ── Load Botpress inject script once on mount ─────────────────────────────
  useEffect(() => {
    if (document.getElementById('bp-inject-script')) {
      // Already loaded — just init
      initBotpress()
      return
    }
    const script = document.createElement('script')
    script.id = 'bp-inject-script'
    script.src = BP_SCRIPT_URL
    script.async = true
    script.onload = () => initBotpress()
    document.body.appendChild(script)

    return () => {
      // Clean up listener on unmount
      if (listenerRef.current) {
        window.removeEventListener('message', listenerRef.current)
      }
    }
  }, [])

  function initBotpress() {
    if (!window.botpressWebChat) return

    // Init Botpress in HEADLESS mode — UI is fully hidden, we drive it via API
    window.botpressWebChat.init({
      configUrl: BP_CONFIG_URL,
      // Hide the Botpress default UI entirely
      hideWidget: true,
      showPoweredBy: false,
      disableAnimations: true,
      // Container that will never be visible — required by Botpress internals
      containerWidth: '0px',
      layoutWidth: '0px',
    })

    // ── Listen for bot messages coming FROM Botpress ──────────────────────
    const handler = (event) => {
      // Botpress emits postMessage events for bot replies
      if (!event.data || typeof event.data !== 'object') return

      const { name, payload } = event.data

      // v3.x event name for incoming bot message
      if (name === 'webchat:message:received' && payload?.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: payload.text }])
        setLoading(false)
      }
    }
    listenerRef.current = handler
    window.addEventListener('message', handler)
    setBpReady(true)
  }

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // ── Send a message through Botpress headless API ──────────────────────────
  const send = () => {
    if (!input.trim() || loading) return
    const text = input.trim()

    setMessages(prev => [...prev, { role: 'user', content: text }])
    setInput('')
    setLoading(true)

    if (bpReady && window.botpressWebChat) {
      // Send message into Botpress engine
      window.botpressWebChat.sendPayload({ type: 'text', text })
    } else {
      // Botpress not ready yet — show fallback
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "⚡ I'm connecting... Try again in a moment or reach me on WhatsApp: +91 97974 86509"
        }])
        setLoading(false)
      }, 1200)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="chatbot-widget">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-0 w-[340px] bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(230,57,70,0.1)' }}
          >
            {/* ── Header ── */}
            <div className="px-5 py-4 border-b border-border bg-bg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-sm font-bold text-white">
                    SK
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-bg" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Surinder's AI</p>
                  <p className="text-xs text-green-400">
                    {bpReady ? 'Online now' : 'Connecting...'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted hover:text-text transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                      ? 'bg-accent text-white rounded-br-sm'
                      : 'bg-bg border border-border text-text rounded-bl-sm'
                      }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-bg border border-border px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1.5">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                          className="w-1.5 h-1.5 bg-accent rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* ── Quick prompts (only on first open) ── */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {['Pricing?', 'AI Chatbot info', 'WhatsApp contact'].map(q => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="text-xs px-3 py-1.5 border border-border rounded-full text-muted hover:text-accent hover:border-accent transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ── */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-2.5 bg-bg border border-border rounded-xl text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
                />
                <motion.button
                  onClick={send}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center text-sm disabled:opacity-40 transition-all"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle bubble ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-xl glow-red relative"
        style={{ boxShadow: '0 8px 32px rgba(230,57,70,0.5)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-xl">✕</motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="text-2xl">🤖</motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-accent"
          />
        )}
      </motion.button>
    </div>
  )
}