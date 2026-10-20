import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { PageHeader, Field, Button, StaggerGrid, StaggerItem, Reveal } from '../components/ui'
import { useApp } from '../context/AppContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const info = [
  [Mail, 'Email us', 'hello@xanderblog.com', 'We reply within one working day'],
  [Phone, 'Call us', '+234 800 000 0000', 'Mon–Fri, 9am to 5pm WAT'],
  [MapPin, 'Visit us', 'Port Harcourt, Rivers State', 'Nigeria'],
  [Clock, 'Support hours', '24/7 help centre', 'Live chat on weekdays'],
]

export default function Contact() {
  useDocumentTitle('Contact')
  const { toast } = useApp()
  const [f, setF] = useState({ name: '', email: '', subject: 'General question', message: '' })
  const [e, setE] = useState({})
  const [sending, setSending] = useState(false)
  const submit = (ev) => {
    ev.preventDefault()
    const err = {}
    if (!f.name.trim()) err.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = 'Enter a valid email address'
    if (f.message.trim().length < 10) err.message = 'Write at least 10 characters so we can help'
    setE(err)
    if (Object.keys(err).length) return
    setSending(true)
    setTimeout(() => { setSending(false); setF({ name: '', email: '', subject: 'General question', message: '' }); toast('Message sent. We will reply within one working day.') }, 900)
  }
  const set = (k) => (ev) => setF({ ...f, [k]: ev.target.value })
  return (
    <>
      <PageHeader title="Contact us" subtitle="Questions about a course, your account or partnerships? Send us a message." crumbs={[{ label: 'Contact' }]} />
      <div className="container-x py-16">
        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {info.map(([I, t, v, s]) => (
            <StaggerItem key={t} className="card h-full p-6">
              <span className="inline-flex rounded-xl bg-wine p-3 text-white"><I className="h-5 w-5" /></span>
              <h2 className="mt-4 font-semibold">{t}</h2>
              <p className="mt-1 font-serif text-lg text-wine dark:text-rose-200">{v}</p>
              <p className="text-sm text-muted dark:text-stone-400">{s}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal className="card p-8">
            <h2 className="font-serif text-2xl font-bold">Send a message</h2>
            <form onSubmit={submit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Name" value={f.name} onChange={set('name')} error={e.name} autoComplete="name" />
              <Field label="Email" type="email" value={f.email} onChange={set('email')} error={e.email} autoComplete="email" />
              <Field as="select" label="Subject" value={f.subject} onChange={set('subject')} className="sm:col-span-2">
                {['General question', 'Course support', 'Billing', 'Partnerships', 'Press'].map((s) => <option key={s}>{s}</option>)}
              </Field>
              <Field as="textarea" label="Message" value={f.message} onChange={set('message')} error={e.message} className="sm:col-span-2" />
              <Button type="submit" size="lg" className="sm:col-span-2" disabled={sending}><Send className="h-4 w-4" />{sending ? 'Sending…' : 'Send message'}</Button>
            </form>
          </Reveal>
          <Reveal delay={0.1} className="card relative min-h-[420px] overflow-hidden">
            <div className="absolute inset-0 bg-wine-rose dark:bg-night-line" aria-hidden>
              <svg className="h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#722F37" strokeOpacity="0.15" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path d="M0 260 C150 200 250 320 420 240 S700 180 900 260" stroke="#9B3B47" strokeOpacity="0.35" strokeWidth="14" fill="none" />
                <path d="M200 0 L260 500" stroke="#C9A227" strokeOpacity="0.35" strokeWidth="8" fill="none" />
              </svg>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <span className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 animate-ping rounded-full bg-wine/40" />
              <MapPin className="h-12 w-12 fill-wine text-white drop-shadow-lg" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-4 shadow-soft backdrop-blur dark:bg-night-card/95">
              <p className="font-semibold">XanderBlog HQ</p><p className="text-sm text-muted dark:text-stone-400">Port Harcourt, Rivers State, Nigeria</p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
