import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Award, Clock, Flame, PlayCircle } from 'lucide-react'
import { ProgressBar, Img, Button } from '../../components/ui'
import { dashboardData } from '../../data/misc'
import { getCourse } from '../../data/courses'
import { useApp } from '../../context/AppContext'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

function WeeklyChart() {
  const max = Math.max(...dashboardData.weekly.map((d) => d.minutes))
  const total = dashboardData.weekly.reduce((n, d) => n + d.minutes, 0)
  return (
    <div className="card p-6">
      <div className="flex items-end justify-between">
        <div><h2 className="font-serif text-xl font-bold">Learning this week</h2><p className="text-sm text-muted dark:text-stone-400">{Math.floor(total / 60)}h {total % 60}m total, up 18% on last week</p></div>
      </div>
      <div className="mt-8 flex h-48 items-end gap-3" role="img" aria-label={`Minutes learned per day: ${dashboardData.weekly.map((d) => `${d.day} ${d.minutes}`).join(', ')}`}>
        {dashboardData.weekly.map((d, i) => (
          <div key={d.day} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end">
              <motion.div initial={{ height: 0 }} whileInView={{ height: `${(d.minutes / max) * 100}%` }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.7, ease: 'easeOut' }}
                className={`w-full rounded-t-lg ${d.minutes === max ? 'bg-gold' : 'bg-wine/80 group-hover:bg-wine'}`} />
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-wine-deep px-1.5 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100">{d.minutes}m</span>
            </div>
            <span className="text-xs text-muted dark:text-stone-400">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Donut({ value }) {
  const r = 52, c = 2 * Math.PI * r
  return (
    <div className="card flex flex-col items-center p-6">
      <h2 className="self-start font-serif text-xl font-bold">Overall progress</h2>
      <div className="relative mt-6">
        <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label={`${value}% of enrolled content completed`}>
          <circle cx="70" cy="70" r={r} fill="none" strokeWidth="14" className="stroke-wine-rose dark:stroke-night-line" />
          <motion.circle cx="70" cy="70" r={r} fill="none" strokeWidth="14" stroke="#722F37" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} whileInView={{ strokeDashoffset: c * (1 - value / 100) }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} transform="rotate(-90 70 70)" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="font-serif text-3xl font-bold">{value}%</span><span className="text-xs text-muted">complete</span></div>
      </div>
      <p className="mt-4 text-center text-sm text-muted dark:text-stone-400">Finish 2 more lessons this week to keep your streak.</p>
    </div>
  )
}

export default function Overview() {
  useDocumentTitle('Dashboard')
  const { user } = useApp()
  const enrolled = dashboardData.enrolled
  const avg = Math.round(enrolled.reduce((n, e) => n + e.progress, 0) / enrolled.length)
  const cards = [[BookOpen, enrolled.length, 'Enrolled courses'], [Award, dashboardData.certificates.length, 'Certificates'], [Clock, '42h', 'Time learned'], [Flame, '9 days', 'Current streak']]
  const inProgress = enrolled.filter((e) => e.progress < 100)
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-wine p-8 text-white">
        <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
        <h1 className="relative font-serif text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}</h1>
        <p className="relative mt-2 text-white/80">You are {100 - enrolled[0].progress}% away from finishing {getCourse(enrolled[0].courseId).title}.</p>
        <Button to={`/learn/${enrolled[0].courseId}`} variant="gold" className="relative mt-5"><PlayCircle className="h-4 w-4" />Resume learning</Button>
      </div>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {cards.map(([I, v, l], i) => (
          <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card p-5">
            <span className="inline-flex rounded-xl bg-wine-rose p-2.5 text-wine dark:bg-night-line dark:text-rose-200"><I className="h-5 w-5" /></span>
            <p className="mt-3 font-serif text-2xl font-bold">{v}</p><p className="text-sm text-muted dark:text-stone-400">{l}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_280px]"><WeeklyChart /><Donut value={avg} /></div>
      <div className="card p-6">
        <div className="flex items-center justify-between"><h2 className="font-serif text-xl font-bold">Continue learning</h2><Link to="/dashboard/courses" className="text-sm font-semibold text-wine hover:underline dark:text-rose-200">View all</Link></div>
        <ul className="mt-5 space-y-4">
          {inProgress.map((e) => { const c = getCourse(e.courseId); return (
            <li key={e.courseId} className="flex flex-col gap-4 rounded-xl p-3 hover:bg-wine-rose/40 sm:flex-row sm:items-center dark:hover:bg-night-line/40">
              <Img src={c.image} alt="" className="aspect-video w-full rounded-lg object-cover sm:w-32" />
              <div className="flex-1"><p className="font-semibold">{c.title}</p><p className="text-xs text-muted dark:text-stone-400">Last lesson: {e.lastLesson}</p><ProgressBar value={e.progress} className="mt-2" /></div>
              <Button to={`/learn/${c.id}`} variant="outline" size="sm">Continue</Button>
            </li>) })}
        </ul>
      </div>
    </div>
  )
}
