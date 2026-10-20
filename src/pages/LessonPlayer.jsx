import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Circle, ChevronLeft, ChevronRight, Play, Pause, Volume2, Maximize, Settings, FileText, Download, PanelRightClose, PanelRightOpen, MessageSquare, ThumbsUp, Moon, Sun } from 'lucide-react'
import { Tabs, Button, Img, Field, ProgressBar } from '../components/ui'
import { getCourse } from '../data/courses'
import { getInstructor } from '../data/instructors'
import { useApp } from '../context/AppContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

const questions = [
  { id: 1, name: 'Kemi O.', avatar: 'https://i.pravatar.cc/100?img=20', time: '2 days ago', text: 'Is there a way to apply this to an existing project rather than starting fresh?', votes: 14, replies: 3 },
  { id: 2, name: 'Daniel P.', avatar: 'https://i.pravatar.cc/100?img=8', time: '1 week ago', text: 'The resource link for the starter files worked perfectly, thanks. Will there be a part two?', votes: 6, replies: 1 },
]

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams()
  const course = getCourse(courseId)
  const navigate = useNavigate()
  const { toast, theme, toggleTheme } = useApp()
  const [done, setDone] = useLocalStorage(`xb-progress-${courseId}`, [])
  const [notes, setNotes] = useLocalStorage(`xb-notes-${courseId}`, {})
  const [tab, setTab] = useState('notes')
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [sidebar, setSidebar] = useState(true)
  const [draft, setDraft] = useState('')
  const [question, setQuestion] = useState('')
  const [qs, setQs] = useState(questions)

  const flat = useMemo(() => course ? course.curriculum.flatMap((s) => s.lessons.map((l) => ({ ...l, section: s.title }))) : [], [course])
  const idx = Math.max(0, flat.findIndex((l) => l.id === lessonId))
  const lesson = flat[idx]
  useDocumentTitle(lesson ? `${lesson.title} — ${course.title}` : 'Lesson')

  useEffect(() => { setT(0); setPlaying(false); setDraft(notes[lesson?.id] || '') }, [lesson?.id]) // eslint-disable-line
  useEffect(() => {
    if (!playing) return
    const i = setInterval(() => setT((x) => { if (x >= 100) { setPlaying(false); return 100 } return x + 0.5 }), 100)
    return () => clearInterval(i)
  }, [playing])
  useEffect(() => { if (t >= 100 && lesson && !done.includes(lesson.id)) { setDone([...done, lesson.id]); toast('Lesson complete') } }, [t]) // eslint-disable-line
  useEffect(() => { if (window.innerWidth < 1024) setSidebar(false) }, [])

  if (!course) return <NotFound />
  const inst = getInstructor(course.instructorId)
  const progress = Math.round((done.length / flat.length) * 100)
  const go = (i) => i >= 0 && i < flat.length && navigate(`/learn/${course.id}/${flat[i].id}`)
  const toggleDone = (id) => setDone(done.includes(id) ? done.filter((d) => d !== id) : [...done, id])
  const [mins, secs] = lesson.duration.split(':').map(Number)
  const total = mins * 60 + secs
  const cur = Math.floor((t / 100) * total)
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="flex min-h-screen flex-col bg-cream dark:bg-night">
      <header className="sticky top-0 z-40 flex items-center gap-4 bg-wine-deep px-4 py-3 text-white">
        <Link to={`/courses/${course.id}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-white/10"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Back to course</span></Link>
        <div className="hidden h-6 w-px bg-white/20 sm:block" />
        <p className="min-w-0 flex-1 truncate font-serif font-semibold">{course.title}</p>
        <div className="hidden w-48 items-center gap-3 md:flex">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15"><motion.div className="h-full bg-gold" animate={{ width: `${progress}%` }} /></div>
          <span className="text-xs">{progress}%</span>
        </div>
        <button onClick={toggleTheme} aria-label="Toggle dark mode" className="rounded-lg p-2 hover:bg-white/10">{theme === 'dark' ? <Sun className="h-4 w-4 text-gold" /> : <Moon className="h-4 w-4" />}</button>
        <button onClick={() => setSidebar(!sidebar)} aria-label={sidebar ? 'Hide lesson list' : 'Show lesson list'} className="rounded-lg p-2 hover:bg-white/10">{sidebar ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}</button>
      </header>

      <div className="flex flex-1">
        <main id="main" className="min-w-0 flex-1">
          <div className="relative aspect-video max-h-[70vh] w-full bg-black">
            <Img src={course.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'} className="rounded-full bg-white/95 p-5 shadow-lift">
                {playing ? <Pause className="h-8 w-8 text-wine" /> : <Play className="h-8 w-8 translate-x-0.5 text-wine" />}
              </motion.button>
            </div>
            <div className="absolute left-4 top-4 rounded-lg bg-black/50 px-3 py-1.5 text-sm text-white backdrop-blur">{lesson.section}</div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-white">
              <input type="range" min={0} max={100} step={0.5} value={t} onChange={(e) => setT(Number(e.target.value))} aria-label="Seek" className="w-full accent-[#C9A227]" />
              <div className="mt-1 flex items-center gap-4 text-sm">
                <button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button>
                <Volume2 className="h-5 w-5" aria-hidden />
                <span className="tabular-nums">{fmt(cur)} / {lesson.duration}</span>
                <span className="ml-auto flex gap-3"><Settings className="h-5 w-5" aria-hidden /><Maximize className="h-5 w-5" aria-hidden /></span>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted dark:text-stone-400">Lesson {idx + 1} of {flat.length}</p>
                <h1 className="mt-1 font-serif text-2xl font-bold md:text-3xl">{lesson.title}</h1>
              </div>
              <Button variant={done.includes(lesson.id) ? 'outline' : 'primary'} onClick={() => toggleDone(lesson.id)}>
                <CheckCircle2 className="h-4 w-4" />{done.includes(lesson.id) ? 'Completed' : 'Mark as complete'}
              </Button>
            </div>
            <div className="mt-6 flex justify-between gap-3">
              <Button variant="ghost" onClick={() => go(idx - 1)} disabled={idx === 0}><ChevronLeft className="h-4 w-4" />Previous lesson</Button>
              <Button variant="ghost" onClick={() => go(idx + 1)} disabled={idx === flat.length - 1}>Next lesson<ChevronRight className="h-4 w-4" /></Button>
            </div>

            <Tabs className="mt-8" active={tab} onChange={setTab} tabs={[{ id: 'notes', label: 'Notes' }, { id: 'resources', label: 'Resources' }, { id: 'qa', label: `Q&A (${qs.length})` }]} />
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="py-6">
                {tab === 'notes' && (
                  <div>
                    <Field as="textarea" label={`Your notes for this lesson (at ${fmt(cur)})`} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write down key ideas, questions or code snippets…" />
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-muted">Notes are saved in this browser.</p>
                      <Button onClick={() => { setNotes({ ...notes, [lesson.id]: draft }); toast('Note saved') }}>Save note</Button>
                    </div>
                  </div>
                )}
                {tab === 'resources' && (
                  <ul className="space-y-3">
                    {[['Lesson slides', 'PDF, 2.4 MB'], ['Starter files', 'ZIP, 840 KB'], ['Cheat sheet', 'PDF, 310 KB']].map(([n, m]) => (
                      <li key={n} className="card flex items-center justify-between p-4">
                        <span className="flex items-center gap-3"><span className="rounded-lg bg-wine-rose p-2 dark:bg-night-line"><FileText className="h-5 w-5 text-wine dark:text-rose-200" /></span><span><span className="block font-medium">{n}</span><span className="text-xs text-muted dark:text-stone-400">{m}</span></span></span>
                        <Button variant="ghost" size="sm" onClick={() => toast(`${n} download started`)}><Download className="h-4 w-4" />Download</Button>
                      </li>
                    ))}
                  </ul>
                )}
                {tab === 'qa' && (
                  <div>
                    <form onSubmit={(e) => { e.preventDefault(); if (!question.trim()) return toast('Write your question first', 'error'); setQs([{ id: Date.now(), name: 'You', avatar: 'https://i.pravatar.cc/100?img=68', time: 'just now', text: question, votes: 0, replies: 0 }, ...qs]); setQuestion(''); toast('Question posted') }} className="flex gap-3">
                      <label htmlFor="ask" className="sr-only">Ask a question</label>
                      <input id="ask" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={`Ask ${inst.name.split(' ')[0]} or other students…`} className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-wine focus:ring-4 focus:ring-wine-rose dark:border-night-line dark:bg-night-card" />
                      <Button type="submit">Post</Button>
                    </form>
                    <ul className="mt-6 space-y-4">
                      {qs.map((q) => (
                        <li key={q.id} className="card flex gap-4 p-5">
                          <Img src={q.avatar} alt="" className="h-10 w-10 rounded-full" />
                          <div className="flex-1"><p className="text-sm"><strong>{q.name}</strong> <span className="text-muted dark:text-stone-400">· {q.time}</span></p><p className="mt-1 text-sm">{q.text}</p>
                            <div className="mt-2 flex gap-4 text-xs text-muted dark:text-stone-400"><span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" />{q.votes}</span><span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{q.replies} replies</span></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <AnimatePresence initial={false}>
          {sidebar && (
            <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 360, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.25 }}
              className="fixed inset-y-0 right-0 top-[56px] z-30 w-[360px] max-w-[90vw] shrink-0 overflow-hidden border-l border-wine-rose bg-white lg:sticky lg:h-[calc(100vh-56px)] dark:border-night-line dark:bg-night-card">
              <div className="h-full w-[360px] max-w-[90vw] overflow-y-auto">
                <div className="border-b border-wine-rose p-5 dark:border-night-line">
                  <h2 className="font-serif text-lg font-bold">Course content</h2>
                  <ProgressBar value={progress} showLabel className="mt-3" />
                </div>
                {course.curriculum.map((s) => (
                  <div key={s.id}>
                    <p className="bg-wine-rose/50 px-5 py-3 text-sm font-semibold dark:bg-night-line/60">{s.title}</p>
                    <ul>
                      {s.lessons.map((l) => {
                        const active = l.id === lesson.id
                        const isDone = done.includes(l.id)
                        return (
                          <li key={l.id} className={`flex items-start gap-3 px-5 py-3 text-sm ${active ? 'bg-wine/10 dark:bg-wine/25' : 'hover:bg-wine-rose/40 dark:hover:bg-night-line/40'}`}>
                            <button onClick={() => toggleDone(l.id)} aria-label={isDone ? `Mark ${l.title} incomplete` : `Mark ${l.title} complete`} className="mt-0.5">
                              {isDone ? <CheckCircle2 className="h-5 w-5 text-wine dark:text-rose-200" /> : <Circle className="h-5 w-5 text-stone-300 dark:text-stone-600" />}
                            </button>
                            <Link to={`/learn/${course.id}/${l.id}`} aria-current={active ? 'true' : undefined} className="flex-1">
                              <span className={active ? 'font-semibold text-wine dark:text-rose-200' : ''}>{l.title}</span>
                              <span className="mt-0.5 block text-xs text-muted dark:text-stone-400">{l.type === 'video' ? 'Video' : 'Reading'} · {l.duration}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
