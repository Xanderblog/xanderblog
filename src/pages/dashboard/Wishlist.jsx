import { Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { EmptyState, Button } from '../../components/ui'
import { CourseCard } from '../../components/Cards'
import { getCourse } from '../../data/courses'
import { useApp } from '../../context/AppContext'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function Wishlist() {
  useDocumentTitle('Wishlist')
  const { wishlist, addToCart } = useApp()
  const items = wishlist.map(getCourse).filter(Boolean)
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold">Wishlist</h1>
      <p className="mt-1 text-muted dark:text-stone-400">{items.length} saved {items.length === 1 ? 'course' : 'courses'}</p>
      {items.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {items.map((c) => (
              <motion.div key={c.id} layout exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col gap-3">
                <CourseCard course={c} />
                {c.price > 0 && <Button variant="outline" size="sm" onClick={() => addToCart(c.id)}>Add to cart</Button>}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : <div className="mt-6"><EmptyState icon={Heart} title="Your wishlist is empty" text="Tap the heart on any course to save it for later." action={<Button to="/courses">Browse courses</Button>} /></div>}
    </div>
  )
}
