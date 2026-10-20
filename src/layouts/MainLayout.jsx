import { useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'

export function PageTransition({ children, k }) {
  return (
    <motion.div key={k} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export default function MainLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  const key = location.pathname.startsWith('/dashboard') ? '/dashboard' : location.pathname
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition k={key}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
