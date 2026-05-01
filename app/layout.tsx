import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Surinder Kumar — AI & Automation Expert',
  description: 'Premium AI Chatbots, Automation, Websites & Custom Software. Convert your business ideas into reality.',
  keywords: 'AI chatbot, automation, website development, n8n, Next.js, Python',
  openGraph: {
    title: 'Surinder Kumar — AI & Automation Expert',
    description: 'Premium AI solutions, automation & modern websites.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
