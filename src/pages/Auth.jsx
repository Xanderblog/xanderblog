import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, ArrowLeft, CheckCircle2, Quote } from 'lucide-react'
import Logo from '../components/Logo'
import { Button, Field, Img } from '../components/ui'
import { authImage, testimonials } from '../data/misc'
import { useApp } from '../context/AppContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const emailOk = (e) => /^\S+@\S+\.\S+$/.test(e)

function AuthShell({ title, subtitle, children }) {
  const t = testimonials[0]
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-wine-deep lg:block">
        <Img src={authImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <motion.div aria-hidden animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute right-16 top-24 h-40 w-40 rounded-[40%] bg-wine-light/40 blur-xl" />
        <motion.div aria-hidden animate={{ y: [0, 18, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-40 left-20 h-16 w-16 rounded-full bg-gold/40" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo light />
          <div>
            <svg viewBox="0 0 320 200" className="mb-10 w-80" aria-hidden>
              <rect x="40" y="40" width="240" height="140" rx="16" fill="#722F37" />
              <rect x="60" y="60" width="200" height="90" rx="8" fill="#F5E6E8" />
              <circle cx="160" cy="105" r="22" fill="#C9A227" />
              <path d="M153 94 L171 105 L153 116 Z" fill="#4A0E1C" />
              <rect x="120" y="180" width="80" height="8" rx="4" fill="#9B3B47" />
              <path d="M160 10 L120 26 L160 42 L200 26 Z" fill="#C9A227" />
              <rect x="196" y="26" width="3" height="20" fill="#C9A227" />
            </svg>
            <Quote className="h-10 w-10 text-gold" aria-hidden />
            <blockquote className="mt-4 max-w-md font-serif text-2xl leading-snug">{t.text}</blockquote>
            <div className="mt-6 flex items-center gap-3"><Img src={t.avatar} alt="" className="h-12 w-12 rounded-full" /><div><p className="font-semibold">{t.name}</p><p className="text-sm text-white/70">{t.role}</p></div></div>
          </div>
          <p className="text-sm text-white/50">© {new Date().getFullYear()} XanderBlog</p>
        </div>
      </div>
      <div className="flex flex-col bg-cream px-6 py-10 dark:bg-night sm:px-12">
        <div className="flex items-center justify-between lg:justify-end">
          <span className="lg:hidden"><Logo /></span>
          <Link to="/" className="flex items-center gap-1 text-sm text-muted hover:text-wine"><ArrowLeft className="h-4 w-4" />Back to site</Link>
        </div>
        <motion.main id="main" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-2 text-muted dark:text-stone-400">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.main>
      </div>
    </div>
  )
}

function PasswordField({ label, value, onChange, error, autoComplete, hint }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Field label={label} type={show ? 'text' : 'password'} value={value} onChange={onChange} error={error} autoComplete={autoComplete} hint={hint} />
      <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-[38px] rounded p-1 text-muted hover:text-wine">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
    </div>
  )
}

function SocialButtons() {
  const { toast } = useApp()
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {['Google', 'GitHub'].map((p) => (
          <button key={p} type="button" onClick={() => toast(`${p} sign-in is not available in the demo`, 'info')} className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-semibold transition hover:border-wine dark:border-night-line dark:bg-night-card">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-wine text-[10px] font-bold text-white">{p[0]}</span>{p}
          </button>
        ))}
      </div>
      <div className="my-6 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-stone-200 dark:bg-night-line" />or continue with email<span className="h-px flex-1 bg-stone-200 dark:bg-night-line" /></div>
    </>
  )
}

function Spinner() { return <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} className="h-4 w-4 rounded-full border-2 border-white border-t-transparent" /> }

export function Login() {
  useDocumentTitle('Log in')
  const { login, toast } = useApp()
  const navigate = useNavigate()
  const [f, setF] = useState({ email: '', password: '', remember: true })
  const [e, setE] = useState({})
  const [loading, setLoading] = useState(false)
  const submit = (ev) => {
    ev.preventDefault()
    const err = {}
    if (!emailOk(f.email)) err.email = 'Enter a valid email address'
    if (f.password.length < 6) err.password = 'Password must be at least 6 characters'
    setE(err)
    if (Object.keys(err).length) return
    setLoading(true)
    setTimeout(() => { login(f.email); toast('Welcome back'); navigate('/dashboard') }, 900)
  }
  return (
    <AuthShell title="Welcome back" subtitle="Log in to continue where you left off.">
      <SocialButtons />
      <form onSubmit={submit} noValidate className="space-y-4">
        <Field label="Email" type="email" value={f.email} onChange={(ev) => setF({ ...f, email: ev.target.value })} error={e.email} autoComplete="email" placeholder="you@example.com" />
        <PasswordField label="Password" value={f.password} onChange={(ev) => setF({ ...f, password: ev.target.value })} error={e.password} autoComplete="current-password" />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={f.remember} onChange={(ev) => setF({ ...f, remember: ev.target.checked })} className="h-4 w-4 accent-[#722F37]" />Remember me</label>
          <Link to="/forgot-password" className="font-semibold text-wine hover:underline dark:text-rose-200">Forgot password?</Link>
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <><Spinner />Logging in…</> : 'Log in'}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted dark:text-stone-400">New to XanderBlog? <Link to="/signup" className="font-semibold text-wine hover:underline dark:text-rose-200">Create a free account</Link></p>
    </AuthShell>
  )
}

export function SignUp() {
  useDocumentTitle('Sign up')
  const { updateUser, toast } = useApp()
  const navigate = useNavigate()
  const [f, setF] = useState({ name: '', email: '', password: '', agree: false })
  const [e, setE] = useState({})
  const [loading, setLoading] = useState(false)
  const strength = [/.{8,}/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(f.password)).length
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
  const submit = (ev) => {
    ev.preventDefault()
    const err = {}
    if (f.name.trim().length < 2) err.name = 'Enter your name'
    if (!emailOk(f.email)) err.email = 'Enter a valid email address'
    if (f.password.length < 8) err.password = 'Use at least 8 characters'
    if (!f.agree) err.agree = 'Accept the terms to continue'
    setE(err)
    if (Object.keys(err).length) return
    setLoading(true)
    setTimeout(() => { updateUser({ name: f.name, email: f.email, loggedIn: true }); toast('Account created. Welcome to XanderBlog'); navigate('/dashboard') }, 900)
  }
  return (
    <AuthShell title="Create your account" subtitle="Free courses and every article, ready in 30 seconds.">
      <SocialButtons />
      <form onSubmit={submit} noValidate className="space-y-4">
        <Field label="Full name" value={f.name} onChange={(ev) => setF({ ...f, name: ev.target.value })} error={e.name} autoComplete="name" placeholder="Your name" />
        <Field label="Email" type="email" value={f.email} onChange={(ev) => setF({ ...f, email: ev.target.value })} error={e.email} autoComplete="email" placeholder="you@example.com" />
        <div>
          <PasswordField label="Password" value={f.password} onChange={(ev) => setF({ ...f, password: ev.target.value })} error={e.password} autoComplete="new-password" />
          {f.password && (
            <div className="mt-2">
              <div className="flex gap-1">{[0, 1, 2, 3].map((i) => <motion.span key={i} className="h-1.5 flex-1 rounded-full" animate={{ backgroundColor: i < strength ? ['#dc2626', '#f59e0b', '#C9A227', '#16a34a'][strength - 1] : '#e7e5e4' }} />)}</div>
              <p className="mt-1 text-xs text-muted">Password strength: {labels[strength]}</p>
            </div>
          )}
        </div>
        <div>
          <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={f.agree} onChange={(ev) => setF({ ...f, agree: ev.target.checked })} className="mt-0.5 h-4 w-4 accent-[#722F37]" aria-invalid={!!e.agree} /><span>I agree to the <Link to="/terms" className="font-semibold text-wine underline dark:text-rose-200">Terms of Service</Link> and <Link to="/privacy" className="font-semibold text-wine underline dark:text-rose-200">Privacy Policy</Link></span></label>
          {e.agree && <p className="mt-1 text-xs font-medium text-red-600">{e.agree}</p>}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <><Spinner />Creating account…</> : 'Create account'}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted dark:text-stone-400">Already have an account? <Link to="/login" className="font-semibold text-wine hover:underline dark:text-rose-200">Log in</Link></p>
    </AuthShell>
  )
}

export function ForgotPassword() {
  useDocumentTitle('Reset password')
  const [email, setEmail] = useState('')
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const submit = (ev) => {
    ev.preventDefault()
    if (!emailOk(email)) return setErr('Enter the email you signed up with')
    setErr(''); setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 900)
  }
  return (
    <AuthShell title={sent ? 'Check your inbox' : 'Reset your password'} subtitle={sent ? `We sent a reset link to ${email}. It expires in 30 minutes.` : 'Enter your email and we will send you a link to choose a new password.'}>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
            <Button to="/login" size="lg" className="mt-6 w-full">Back to log in</Button>
            <button onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-wine hover:underline dark:text-rose-200">Use a different email</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="space-y-4" exit={{ opacity: 0 }}>
            <Field label="Email" type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} error={err} autoComplete="email" placeholder="you@example.com" />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? <><Spinner />Sending…</> : <><Mail className="h-4 w-4" />Send reset link</>}</Button>
            <p className="text-center text-sm"><Link to="/login" className="font-semibold text-wine hover:underline dark:text-rose-200">Back to log in</Link></p>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthShell>
  )
}
