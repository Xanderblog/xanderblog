import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Clock, PlayCircle, FileText, Globe, Award, Infinity as InfinityIcon, Smartphone, Heart, Share2, Users, RefreshCw, Lock, Eye } from 'lucide-react'
import { Breadcrumbs, Button, Badge, StarRating, AccordionItem, Img, Reveal, StaggerGrid, StaggerItem, Modal } from '../components/ui'
import { CourseCard, price } from '../components/Cards'
import { getCourse, courses, reviewsFor, ratingBreakdown } from '../data/courses'
import { getInstructor } from '../data/instructors'
import { getCategory } from '../data/categories'
import { useApp } from '../context/AppContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

export default function CourseDetail() {
  const { id } = useParams()
  const course = getCourse(id)
  const { addToCart, cart, wishlist, toggleWishlist, toast } = useApp()
  const navigate = useNavigate()
  const [preview, setPreview] = useState(false)
  useDocumentTitle(course?.title)
  if (!course) return <NotFound />
  const inst = getInstructor(course.instructorId)
  const cat = getCategory(course.category)
  const related = courses.filter((c) => c.category === course.category && c.id !== course.id).concat(courses.filter((c) => c.category !== course.category)).slice(0, 3)
  const inCart = cart.includes(course.id)
  const saved = wishlist.includes(course.id)
  const firstLesson = course.curriculum[0].lessons[0].id

  const enrol = () => {
    if (course.price === 0) { toast('Enrolled. Enjoy the course.'); navigate(`/learn/${course.id}/${firstLesson}`) }
    else if (inCart) navigate('/cart')
    else addToCart(course.id)
  }
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); toast('Link copied to clipboard') } catch { toast('Copy the link from your address bar', 'info') }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-wine-deep pb-16 pt-28 text-white lg:pb-24">
        <div aria-hidden className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-wine-light/25 blur-3xl" />
        <div className="container-x relative grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Breadcrumbs light items={[{ label: 'Courses', to: '/courses' }, { label: cat?.name, to: `/courses?category=${cat?.id}` }, { label: course.title }]} />
            <div className="mt-5 flex flex-wrap gap-2">
              {course.bestseller && <Badge tone="gold" className="!bg-gold !text-wine-deep">Bestseller</Badge>}
              <Badge tone="gray" className="!bg-white/10 !text-white">{course.level}</Badge>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-serif text-3xl font-bold leading-tight md:text-5xl">{course.title}</motion.h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">{course.subtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/80">
              <StarRating value={course.rating} count={course.reviews} />
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{course.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4" />Updated {course.updated}</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" />{course.language}</span>
            </div>
            <Link to={`/instructors/${inst.id}`} className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 hover:bg-white/15">
              <Img src={inst.avatar} alt="" className="h-8 w-8 rounded-full object-cover" /><span className="text-sm">Taught by <strong>{inst.name}</strong></span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-10 pb-20 lg:grid-cols-3">
        <div className="order-2 space-y-12 pt-12 lg:order-1 lg:col-span-2">
          <Reveal className="card p-8">
            <h2 className="font-serif text-2xl font-bold">What you'll learn</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {course.learn.map((l) => <li key={l} className="flex gap-3 text-sm"><Check className="mt-0.5 h-5 w-5 shrink-0 text-wine dark:text-rose-200" />{l}</li>)}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-bold">Overview</h2>
            <p className="mt-4 leading-relaxed text-muted dark:text-stone-400">{course.description}</p>
            <h3 className="mt-6 font-semibold">Requirements</h3>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted dark:text-stone-400">{course.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
          </Reveal>

          <Reveal>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <h2 className="font-serif text-2xl font-bold">Curriculum</h2>
              <p className="text-sm text-muted dark:text-stone-400">{course.curriculum.length} sections, {course.lessons} lessons, {course.hours}h total</p>
            </div>
            <div className="card overflow-hidden">
              {course.curriculum.map((s, i) => (
                <AccordionItem key={s.id} title={`${s.title}`} meta={`${s.lessons.length} lessons`} defaultOpen={i === 0}>
                  <ul className="space-y-1">
                    {s.lessons.map((l) => (
                      <li key={l.id} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm hover:bg-wine-rose/60 dark:hover:bg-night-line">
                        <span className="flex items-center gap-3">
                          {l.type === 'video' ? <PlayCircle className="h-4 w-4 text-wine dark:text-rose-200" /> : <FileText className="h-4 w-4 text-wine dark:text-rose-200" />}
                          {l.free ? <Link to={`/learn/${course.id}/${l.id}`} className="underline decoration-wine/40 underline-offset-2 hover:text-wine">{l.title}</Link> : l.title}
                        </span>
                        <span className="flex items-center gap-3 text-xs text-muted dark:text-stone-400">
                          {l.free ? <Badge tone="green">Preview</Badge> : <Lock className="h-3.5 w-3.5" />}{l.duration}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              ))}
            </div>
          </Reveal>

          <Reveal className="card p-8">
            <h2 className="font-serif text-2xl font-bold">Your instructor</h2>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row">
              <Img src={inst.avatar} alt={inst.name} className="h-28 w-28 shrink-0 rounded-2xl object-cover" />
              <div>
                <Link to={`/instructors/${inst.id}`} className="font-serif text-xl font-bold hover:text-wine">{inst.name}</Link>
                <p className="text-sm text-muted dark:text-stone-400">{inst.title}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm"><StarRating value={inst.rating} size={14} /><span>{inst.students.toLocaleString()} students</span><span>{inst.reviews.toLocaleString()} reviews</span></div>
                <p className="mt-4 text-sm leading-relaxed text-muted dark:text-stone-400">{inst.bio}</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-bold">Student reviews</h2>
            <div className="card mt-6 grid gap-8 p-8 sm:grid-cols-[auto_1fr]">
              <div className="text-center">
                <p className="font-serif text-6xl font-bold text-wine dark:text-rose-200">{course.rating.toFixed(1)}</p>
                <StarRating value={course.rating} showValue={false} />
                <p className="mt-1 text-sm text-muted dark:text-stone-400">Course rating</p>
              </div>
              <div className="space-y-2.5">
                {ratingBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-12">{r.stars} star</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-wine-rose dark:bg-night-line">
                      <motion.div className="h-full bg-gold" initial={{ width: 0 }} whileInView={{ width: `${r.pct}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
                    </div>
                    <span className="w-10 text-right text-muted dark:text-stone-400">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {reviewsFor(course.id).map((r) => (
                <div key={r.id} className="card p-6">
                  <div className="flex items-center gap-3"><Img src={r.avatar} alt="" className="h-10 w-10 rounded-full" /><div><p className="font-semibold">{r.name}</p><div className="flex items-center gap-2"><StarRating value={r.rating} showValue={false} size={12} /><span className="text-xs text-muted dark:text-stone-400">{r.date}</span></div></div></div>
                  <p className="mt-3 text-sm leading-relaxed text-muted dark:text-stone-400">{r.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <aside className="order-1 lg:order-2">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card -mt-8 overflow-hidden lg:sticky lg:top-24 lg:-mt-64">
            <button onClick={() => setPreview(true)} className="group relative block w-full" aria-label="Watch course preview">
              <Img src={course.image} alt="" className="aspect-video w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                <span className="rounded-full bg-white p-4 shadow-lift transition group-hover:scale-110"><PlayCircle className="h-8 w-8 text-wine" /></span>
              </span>
              <span className="absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-white">Preview this course</span>
            </button>
            <div className="p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl font-bold text-wine dark:text-rose-200">{price(course.price)}</span>
                {course.oldPrice > 0 && <><span className="text-muted line-through">${course.oldPrice.toFixed(2)}</span><Badge tone="gold">{Math.round((1 - course.price / course.oldPrice) * 100)}% off</Badge></>}
              </div>
              <Button onClick={enrol} size="lg" className="mt-5 w-full">{course.price === 0 ? 'Enrol for free' : inCart ? 'Go to cart' : 'Add to cart'}</Button>
              {course.price > 0 && <Button onClick={() => { if (!inCart) addToCart(course.id); navigate('/checkout') }} variant="outline" size="lg" className="mt-3 w-full">Buy now</Button>}
              <p className="mt-3 text-center text-xs text-muted dark:text-stone-400">30-day money-back guarantee</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[[Clock, `${course.hours} hours of video`], [FileText, `${course.lessons} lessons and resources`], [Smartphone, 'Access on mobile and desktop'], [InfinityIcon, 'Lifetime access'], [Award, 'Certificate of completion']].map(([I, t]) => <li key={t} className="flex items-center gap-3"><I className="h-4 w-4 text-wine dark:text-rose-200" />{t}</li>)}
              </ul>
              <div className="mt-6 flex gap-2 border-t border-wine-rose pt-5 dark:border-night-line">
                <Button variant="ghost" className="flex-1" onClick={() => toggleWishlist(course.id)} aria-pressed={saved}><Heart className={`h-4 w-4 ${saved ? 'fill-wine' : ''}`} />{saved ? 'Saved' : 'Wishlist'}</Button>
                <Button variant="ghost" className="flex-1" onClick={share}><Share2 className="h-4 w-4" />Share</Button>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>

      <section className="bg-white py-20 dark:bg-night-card/40">
        <div className="container-x">
          <h2 className="mb-8 font-serif text-3xl font-bold">Related courses</h2>
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((c) => <StaggerItem key={c.id}><CourseCard course={c} /></StaggerItem>)}</StaggerGrid>
        </div>
      </section>

      <Modal open={preview} onClose={() => setPreview(false)} title="Course preview">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-wine-deep">
          <Img src={course.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="relative text-center text-white"><Eye className="mx-auto h-10 w-10 text-gold" /><p className="mt-2 font-semibold">{course.curriculum[0].lessons[0].title}</p><p className="text-sm text-white/70">Preview video plays here</p></div>
        </div>
        <Button to={`/learn/${course.id}/${firstLesson}`} className="mt-4 w-full">Open free lesson</Button>
      </Modal>
    </>
  )
}
