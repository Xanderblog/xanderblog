import { motion } from 'framer-motion'
import { BookX, Home, Search } from 'lucide-react'
import { Button } from '../components/ui'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-24">
      {[...Array(6)].map((_, i) => (
        <motion.span key={i} aria-hidden className="absolute rounded-full bg-wine/10 dark:bg-wine/20" style={{ width: 20 + i * 14, height: 20 + i * 14, left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 22}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.3 }} />
      ))}
      <div className="container-x relative text-center">
        <div className="flex items-center justify-center font-serif text-[7rem] font-bold leading-none text-wine sm:text-[11rem] dark:text-rose-200">
          <motion.span initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', delay: 0.1 }}>4</motion.span>
          <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.3 }} className="mx-2 inline-flex">
            <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1 }} className="flex h-24 w-24 items-center justify-center rounded-full bg-gold sm:h-36 sm:w-36">
              <BookX className="h-12 w-12 text-wine-deep sm:h-20 sm:w-20" />
            </motion.span>
          </motion.span>
          <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', delay: 0.2 }}>4</motion.span>
        </div>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 font-serif text-3xl font-bold md:text-4xl">This page skipped class</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mx-auto mt-3 max-w-md text-muted dark:text-stone-400">The page you are looking for has moved or never existed. Head home or search for what you need.</motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg"><Home className="h-4 w-4" />Go home</Button>
          <Button to="/courses" size="lg" variant="outline"><Search className="h-4 w-4" />Browse courses</Button>
        </motion.div>
      </div>
    </section>
  )
}
