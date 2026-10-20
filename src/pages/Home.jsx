import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, PlayCircle, ArrowRight, ChevronLeft, ChevronRight, Award, Mail, Star, BookOpen } from 'lucide-react'
import { Button, Img, Reveal, SectionHeading, StaggerGrid, StaggerItem } from '../components/ui'
import Icon from '../components/ui/Icon'
import { CourseCard, ArticleCard, InstructorCard, TestimonialCard } from '../components/Cards'
import { courses } from '../data/courses'
import { articles } from '../data/articles'
import { instructors } from '../data/instructors'
import { categories } from '../data/categories'
import { testimonials, stats } from '../data/misc'
import { img } from '../data/images'
import { useCountUp } from '../hooks/useCountUp'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useApp } from '../context/AppContext'

const headline = 'Learn the skills that move your career forward'.split(' ')

function Hero() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const submit = (e) => { e.preventDefault(); navigate(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/courses') }
  return (
    <section className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      <motion.div aria-hidden animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-16 top-32 h-48 w-48 rounded-[40%] bg-wine-rose dark:bg-wine/20" />
      <motion.div aria-hidden animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[42%] top-24 h-6 w-6 rounded-full bg-gold" />
      <motion.div aria-hidden animate={{ y: [0, -14, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-16 left-[45%] h-10 w-10 rotate-45 rounded-lg border-4 border-wine/30" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full bg-wine-rose px-4 py-1.5 text-sm font-medium text-wine dark:bg-wine/25 dark:text-rose-200">
            <Award className="h-4 w-4" /> Trusted by 128,000 learners in 90 countries
          </motion.span>
          <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl dark:text-white">
            {headline.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 max-w-xl text-lg leading-relaxed text-muted dark:text-stone-400">
            Practical courses and in-depth articles from engineers, designers and founders who do this work every day. Start free, learn at your pace.
          </motion.p>
          <motion.form onSubmit={submit} role="search" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-soft dark:bg-night-card">
            <Search className="ml-3 h-5 w-5 shrink-0 text-wine" aria-hidden />
            <label htmlFor="hero-search" className="sr-only">What do you want to learn?</label>
            <input id="hero-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="What do you want to learn?" className="min-w-0 flex-1 bg-transparent px-2 py-2.5 outline-none" />
            <Button type="submit">Search</Button>
          </motion.form>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-6 flex flex-wrap gap-3">
            <Button to="/courses" size="lg">Browse courses <ArrowRight className="h-4 w-4" /></Button>
            <Button to="/blog" size="lg" variant="outline"><BookOpen className="h-4 w-4" /> Read the blog</Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-wine" aria-hidden />
          <Img src={img.hero} alt="Students learning together around a laptop" className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift" />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-6 bottom-16 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lift dark:bg-night-card">
            <span className="rounded-xl bg-gold/20 p-2.5"><Star className="h-5 w-5 fill-gold text-gold" /></span>
            <div><p className="text-lg font-bold">4.8 / 5</p><p className="text-xs text-muted dark:text-stone-400">from 62k reviews</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -right-4 top-12 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lift dark:bg-night-card">
            <span className="rounded-xl bg-wine-rose p-2.5 dark:bg-wine/30"><PlayCircle className="h-5 w-5 text-wine dark:text-rose-200" /></span>
            <div><p className="text-sm font-bold">New this week</p><p className="text-xs text-muted dark:text-stone-400">12 lessons added</p></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ s }) {
  const [ref, display] = useCountUp(s.value, 1800, s.decimals || 0)
  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-4xl font-bold text-white md:text-5xl">{display}{s.suffix}</p>
      <p className="mt-2 text-sm text-white/70">{s.label}</p>
    </div>
  )
}

function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = testimonials.length
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((x) => (x + 1) % n), 5500)
    return () => clearInterval(t)
  }, [paused, n])
  const go = (d) => setI((x) => (x + d + n) % n)
  return (
    <section className="bg-wine-rose/50 py-24 dark:bg-night-card/40" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-x">
        <SectionHeading center title="What our learners say" subtitle="Real stories from people who used XanderBlog to change jobs, start businesses and grow." />
        <div className="relative mx-auto max-w-3xl" aria-roledescription="carousel" aria-label="Testimonials">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.4 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3}
                onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1) }}
                className="cursor-grab active:cursor-grabbing" aria-live="polite">
                <TestimonialCard t={testimonials[i]} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="rounded-full bg-white p-2.5 shadow-soft hover:bg-wine hover:text-white dark:bg-night-card"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex gap-2">
              {testimonials.map((t, k) => (
                <button key={t.id} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} aria-current={k === i} className={`h-2.5 rounded-full transition-all ${k === i ? 'w-8 bg-wine' : 'w-2.5 bg-wine/25'}`} />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="rounded-full bg-white p-2.5 shadow-soft hover:bg-wine hover:text-white dark:bg-night-card"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const { toast } = useApp()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email, like name@example.com')
    setError(''); setEmail(''); toast('Subscribed. Your first article arrives on Monday.')
  }
  return (
    <section className="py-24">
      <Reveal className="container-x">
        <div className="card mx-auto grid max-w-5xl items-center gap-8 p-8 md:grid-cols-[auto_1fr] md:p-12">
          <div className="mx-auto rounded-2xl bg-wine-rose p-5 dark:bg-wine/25"><Mail className="h-10 w-10 text-wine dark:text-rose-200" /></div>
          <div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">One useful article every Monday</h2>
            <p className="mt-2 text-muted dark:text-stone-400">Join 40,000 readers getting practical lessons on code, design and business. No spam, unsubscribe any time.</p>
            <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row" noValidate>
              <div className="flex-1">
                <label htmlFor="nl-email" className="sr-only">Email address</label>
                <input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-cream px-4 py-3 outline-none focus:ring-4 dark:bg-night ${error ? 'border-red-400 focus:ring-red-100' : 'border-stone-200 focus:border-wine focus:ring-wine-rose dark:border-night-line'}`} />
                {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
              </div>
              <Button type="submit" variant="gold" size="lg">Subscribe</Button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  useDocumentTitle('')
  const featured = courses.filter((c) => c.bestseller).slice(0, 4)
  return (
    <>
      <Hero />
      <section className="bg-wine-deep py-16">
        <div className="container-x grid grid-cols-2 gap-10 md:grid-cols-4">{stats.map((s) => <Stat key={s.label} s={s} />)}</div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading title="Featured courses" subtitle="Our most-loved courses this month, chosen by completion rate and reviews." action={<Button to="/courses" variant="ghost">View all courses <ArrowRight className="h-4 w-4" /></Button>} />
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((c) => <StaggerItem key={c.id}><CourseCard course={c} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-white py-24 dark:bg-night-card/40">
        <div className="container-x">
          <SectionHeading center title="Popular categories" subtitle="Pick a direction and start with a free lesson." />
          <StaggerGrid className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((c) => (
              <StaggerItem key={c.id}>
                <Link to={`/courses?category=${c.id}`} className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-wine-rose bg-cream p-6 transition hover:-translate-y-1 hover:border-wine hover:shadow-lift dark:border-night-line dark:bg-night">
                  <span className="rounded-xl p-3 text-white transition-transform group-hover:scale-110" style={{ background: c.color }}><Icon name={c.icon} className="h-6 w-6" /></span>
                  <span><span className="block font-semibold">{c.name}</span><span className="text-sm text-muted dark:text-stone-400">{courses.filter((x) => x.category === c.id).length} courses</span></span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHeading title="Latest from the blog" subtitle="Free, in-depth articles to keep learning between lessons." action={<Button to="/blog" variant="ghost">All articles <ArrowRight className="h-4 w-4" /></Button>} />
          <StaggerGrid className="grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => <StaggerItem key={a.id}><ArticleCard article={a} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-white py-24 dark:bg-night-card/40">
        <div className="container-x">
          <SectionHeading title="Learn from top instructors" subtitle="Practitioners with years of real-world experience." action={<Button to="/instructors" variant="ghost">Meet all instructors <ArrowRight className="h-4 w-4" /></Button>} />
          <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.slice(0, 4).map((i) => <StaggerItem key={i.id}><InstructorCard instructor={i} courseCount={courses.filter((c) => c.instructorId === i.id).length} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </section>

      <Testimonials />
      <Newsletter />

      <section className="pb-24">
        <Reveal className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] bg-wine px-8 py-16 text-center text-white md:px-16">
            <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
            <div aria-hidden className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold/20 blur-2xl" />
            <h2 className="relative mx-auto max-w-2xl font-serif text-3xl font-bold md:text-5xl">Start learning today, for free</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">Create an account in 30 seconds and get instant access to free courses and every blog article.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/signup" variant="gold" size="lg">Create free account</Button>
              <Button to="/pricing" variant="light" size="lg">See pricing</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
