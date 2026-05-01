'use client'

const items = [
  '🤖 AI Chatbots',
  '🌐 Websites',
  '⚡ Automation',
  '🧠 AI Agents',
  '⚙️ Custom Software',
  '📊 n8n Workflows',
  '🎨 PPT Design',
  '🔗 CRM Automation',
  '💬 WhatsApp Bots',
  '📱 SaaS Platforms',
]

const itemsReverse = [
  '🚀 Fast Delivery',
  '🔒 Secure & Scalable',
  '💡 Smart Solutions',
  '🎯 Conversion Focused',
  '🛠️ Clean Code',
  '📈 Business Growth',
  '🌟 Premium Quality',
  '⏱️ On-Time Delivery',
  '💸 Affordable Pricing',
  '🤝 Dedicated Support',
]

function MarqueeRow({ items, speed = 30, reverse = false }: { items: string[], speed?: number, reverse?: boolean }) {
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-8 items-center w-max"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-wide text-muted whitespace-nowrap flex items-center gap-2"
          >
            {item}
            <span className="text-accent/50 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="w-full py-4 border-y border-border/50 overflow-hidden relative">
      {/* Top red line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="space-y-3">
        <MarqueeRow items={items} speed={28} />
        <MarqueeRow items={itemsReverse} speed={22} reverse />
      </div>

      {/* Bottom red line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
    </div>
  )
}
