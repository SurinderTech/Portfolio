'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import Timeline from './components/sections/Timeline'
import Skills from './components/sections/Skills'
import Gallery from './components/sections/Gallery'
import UseCases from './components/sections/UseCases'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import OrderModal from './components/OrderModal'
import Chatbot from './components/Chatbot'

export default function Home() {
  const [orderOpen, setOrderOpen] = useState(false)
  const [defaultService, setDefaultService] = useState<string | undefined>()

  const openOrder = (service?: string) => {
    setDefaultService(service)
    setOrderOpen(true)
  }

  return (
    <main className="min-h-screen bg-bg text-text overflow-x-hidden">
      <Navbar />

      <Hero onOrder={() => openOrder()} />
      <Marquee />
      <About />
      <Services onOrder={openOrder} />
      <Projects onOrder={openOrder} />
      <Timeline />
      <Skills />
      <UseCases onOrder={openOrder} />
      <Testimonials />
      <Gallery onOrder={openOrder} />
      <Contact />
      <Footer />

      {/* Order Modal */}
      <AnimatePresence>
        {orderOpen && (
          <OrderModal
            onClose={() => setOrderOpen(false)}
            defaultService={defaultService}
          />
        )}
      </AnimatePresence>

      {/* AI Chatbot */}
      <Chatbot />
    </main>
  )
}
