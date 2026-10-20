import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Heart, PlayCircle, Users, BookOpen, Quote } from 'lucide-react'
import { Badge, Img, StarRating } from './ui'
import { getInstructor } from '../data/instructors'
import { getCategory } from '../data/categories'
import { useApp } from '../context/AppContext'

export const price = (p) => (p === 0 ? 'Free' : `$${p.toFixed(2)}`)

export function CourseCard({ course }) {
  const { wishlist, toggleWishlist } = useApp()
  const inst = getInstructor(course.instructorId)
  const saved = wishlist.includes(course.id)
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow hover:shadow-lift dark:bg-night-card">
      <Link to={`/courses/${course.id}`} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden>
        <Img src={course.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute left-3 top-3 flex gap-2">
          {course.bestseller && <Badge tone="gold" className="!bg-gold !text-wine-deep">Bestseller</Badge>}
          {course.price === 0 && <Badge tone="green">Free</Badge>}
        </div>
      </Link>
      <button onClick={() => toggleWishlist(course.id)} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} aria-pressed={saved}
        className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-soft backdrop-blur transition hover:scale-110 dark:bg-night/80">
        <Heart className={`h-4 w-4 ${saved ? 'fill-wine text-wine' : 'text-wine'}`} />
      </button>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-wine dark:text-rose-200">{getCategory(course.category)?.name}</span>
          <span className="text-muted dark:text-stone-400">{course.level}</span>
        </div>
        <h3 className="font-serif text-lg font-bold leading-snug">
          <Link to={`/courses/${course.id}`} className="after:absolute after:inset-0 after:content-[''] hover:text-wine dark:hover:text-rose-200 focus:outline-none">{course.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-muted dark:text-stone-400">{inst?.name}</p>
        <div className="mt-2"><StarRating value={course.rating} count={course.reviews} size={14} /></div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted dark:text-stone-400">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.hours}h</span>
          <span className="flex items-center gap-1"><PlayCircle className="h-3.5 w-3.5" />{course.lessons} lessons</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{(course.students / 1000).toFixed(1)}k</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-4">
          <span className="text-xl font-bold text-wine dark:text-rose-200">{price(course.price)}</span>
          {course.oldPrice > 0 && <span className="text-sm text-muted line-through">${course.oldPrice.toFixed(2)}</span>}
        </div>
      </div>
    </motion.article>
  )
}

export function ArticleCard({ article, horizontal }) {
  const author = getInstructor(article.authorId)
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group relative flex h-full overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow hover:shadow-lift dark:bg-night-card ${horizontal ? 'flex-col sm:flex-row' : 'flex-col'}`}>
      <div className={`overflow-hidden ${horizontal ? 'aspect-[16/10] sm:aspect-auto sm:w-2/5' : 'aspect-[16/10]'}`}>
        <Img src={article.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-3 text-xs">
          <Badge>{getCategory(article.category)?.name}</Badge>
          <span className="flex items-center gap-1 text-muted dark:text-stone-400"><BookOpen className="h-3.5 w-3.5" />{article.readTime} min read</span>
        </div>
        <h3 className="font-serif text-lg font-bold leading-snug">
          <Link to={`/blog/${article.id}`} className="after:absolute after:inset-0 after:content-[''] hover:text-wine dark:hover:text-rose-200 focus:outline-none">{article.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted dark:text-stone-400">{article.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-4">
          <Img src={author?.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
          <div className="text-xs"><p className="font-semibold">{author?.name}</p><p className="text-muted dark:text-stone-400">{article.date}</p></div>
        </div>
      </div>
    </motion.article>
  )
}

export function InstructorCard({ instructor, courseCount }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="group relative flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-soft transition-shadow hover:shadow-lift dark:bg-night-card">
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-wine to-gold opacity-0 blur transition-opacity group-hover:opacity-60" />
        <Img src={instructor.avatar} alt={instructor.name} className="relative h-24 w-24 rounded-full border-4 border-white object-cover dark:border-night-card" />
      </div>
      <h3 className="font-serif text-lg font-bold">
        <Link to={`/instructors/${instructor.id}`} className="after:absolute after:inset-0 after:content-[''] hover:text-wine dark:hover:text-rose-200 focus:outline-none">{instructor.name}</Link>
      </h3>
      <p className="text-sm text-muted dark:text-stone-400">{instructor.title}</p>
      <div className="mt-3"><StarRating value={instructor.rating} size={14} /></div>
      <div className="mt-4 flex w-full justify-around border-t border-wine-rose pt-4 text-sm dark:border-night-line">
        <div><p className="font-bold">{courseCount}</p><p className="text-xs text-muted dark:text-stone-400">Courses</p></div>
        <div><p className="font-bold">{(instructor.students / 1000).toFixed(1)}k</p><p className="text-xs text-muted dark:text-stone-400">Students</p></div>
      </div>
    </motion.article>
  )
}

export function TestimonialCard({ t }) {
  return (
    <figure className="relative h-full rounded-2xl bg-white p-8 shadow-soft dark:bg-night-card">
      <Quote className="absolute right-6 top-6 h-10 w-10 text-wine-rose dark:text-night-line" aria-hidden />
      <StarRating value={t.rating} showValue={false} />
      <blockquote className="mt-4 font-serif text-lg leading-relaxed">“{t.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Img src={t.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
        <div><p className="font-semibold">{t.name}</p><p className="text-sm text-muted dark:text-stone-400">{t.role}</p></div>
      </figcaption>
    </figure>
  )
}
