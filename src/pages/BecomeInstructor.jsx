import { useState } from 'react'
import { Globe, DollarSign, Users, Wrench, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, Button, Field, StaggerGrid, StaggerItem, Reveal } from '../components/ui'
import { categories } from '../data/categories'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const benefits = [
  [Globe, 'Reach learners worldwide', 'Teach students in over 90 countries without leaving home.'],
  [DollarSign, 'Earn on every enrolment', 'Keep up to 70% of revenue from your course sales.'],
  [Users, 'Join a supportive community', 'Swap ideas with other instructors in our private group.'],
  [Wrench, 'Get production help', 'Free filming guides, editing tips and a course review before launch.'],
]
const steps = [
  ['Apply', 'Tell us about your expertise and the course you want to teach.'],
  ['Plan your course', 'Work with our content team on an outline and a sample lesson.'],
  ['Record and upload', 'Film your lessons using our guides, then upload them to your dashboard.'],
  ['Launch and earn', 'We review, publish and promote your course to our learners.'],
]

export default function BecomeInstructor() {
  useDocumentTitle('Become an instructor')
  const [f, setF] = useState({ name: '', email: '', category: categories[0].id, experience: '1–3 years', topic: '', bio: '', link: '' })
  const [e, setE] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (ev) => setF({ ...f, [k]: ev.target.value })
  const submit = (ev) => {
    ev.preventDefault()
    const err = {}
    if (!f.name.trim()) err.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = 'Enter a valid email address'
    if (f.topic.trim().length < 5) err.topic = 'Describe your course idea in a few words'
    if (f.bio.trim().length < 30) err.bio = 'Write at least 30 characters about your experience'
    if (f.link && !/^https?:\/\//.test(f.link)) err.link = 'Links must start with http:// or https://'
    setE(err)
    if (!Object.keys(err).length) setSent(true)
  }
  return (
    <>
      <PageHeader title="Teach on XanderBlog" subtitle="Share what you know, help people grow, and earn from your expertise." crumbs={[{ label: 'Become an instructor' }]}>
        <Button href="#apply" variant="gold" size="lg" className="mt-8">Start your application</Button>
      </PageHeader>
      <section className="container-x py-20">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold md:text-4xl">Why teach with us</h2>
        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([I, t, d]) => (
            <StaggerItem key={t} className="card h-full p-7 text-center">
              <span className="mx-auto inline-flex rounded-2xl bg-wine-rose p-4 text-wine dark:bg-night-line dark:text-rose-200"><I className="h-7 w-7" /></span>
              <h3 className="mt-4 font-serif text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted dark:text-stone-400">{d}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      <section className="bg-wine-deep py-20 text-white">
        <div className="container-x">
          <h2 className="mb-14 text-center font-serif text-3xl font-bold md:text-4xl">How it works</h2>
          <ol className="grid gap-10 md:grid-cols-4">
            {steps.map(([t, d], i) => (
              <motion.li key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative text-center">
                {i < steps.length - 1 && <span aria-hidden className="absolute left-1/2 top-7 hidden h-0.5 w-full bg-white/15 md:block" />}
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold font-serif text-2xl font-bold text-wine-deep">{i + 1}</span>
                <h3 className="mt-5 font-serif text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm text-white/70">{d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
      <section id="apply" className="container-x max-w-3xl scroll-mt-24 py-20">
        <Reveal className="card p-8 md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
                <h2 className="mt-4 font-serif text-3xl font-bold">Application received</h2>
                <p className="mx-auto mt-2 max-w-md text-muted dark:text-stone-400">Thanks, {f.name.split(' ')[0]}. Our team reviews every application within five working days and will email you at {f.email}.</p>
                <Button to="/" className="mt-6">Back to home</Button>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={submit} noValidate>
                <h2 className="font-serif text-3xl font-bold">Instructor application</h2>
                <p className="mt-2 text-muted dark:text-stone-400">Takes about five minutes.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" value={f.name} onChange={set('name')} error={e.name} autoComplete="name" />
                  <Field label="Email" type="email" value={f.email} onChange={set('email')} error={e.email} autoComplete="email" />
                  <Field as="select" label="Subject area" value={f.category} onChange={set('category')}>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Field>
                  <Field as="select" label="Teaching or industry experience" value={f.experience} onChange={set('experience')}>{['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'].map((x) => <option key={x}>{x}</option>)}</Field>
                  <Field label="Course idea" value={f.topic} onChange={set('topic')} error={e.topic} className="sm:col-span-2" placeholder="e.g. Building REST APIs with Laravel" />
                  <Field as="textarea" label="About you" value={f.bio} onChange={set('bio')} error={e.bio} className="sm:col-span-2" placeholder="Your background, what you've built, and who you want to teach" />
                  <Field label="Portfolio or LinkedIn (optional)" value={f.link} onChange={set('link')} error={e.link} className="sm:col-span-2" placeholder="https://" />
                </div>
                <Button type="submit" size="lg" className="mt-6 w-full">Submit application</Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </section>
    </>
  )
}
