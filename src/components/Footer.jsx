import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Send, Apple, Play } from 'lucide-react'
import Logo from './Logo'
import { useApp } from '../context/AppContext'

const cols = [
  { title: 'Learn', links: [['All courses', '/courses'], ['Categories', '/categories'], ['Blog', '/blog'], ['Pricing', '/pricing']] },
  { title: 'Company', links: [['About us', '/about'], ['Instructors', '/instructors'], ['Become an instructor', '/become-instructor'], ['Contact', '/contact']] },
  { title: 'Support', links: [['FAQ', '/faq'], ['Terms of service', '/terms'], ['Privacy policy', '/privacy'], ['My dashboard', '/dashboard']] },
]

export default function Footer() {
  const { toast } = useApp()
  const [email, setEmail] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email address', 'error')
    toast('Subscribed. Check your inbox to confirm.'); setEmail('')
  }
  return (
    <footer className="bg-wine-deep text-white/80">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">Online courses and practical articles from people who do the work. Learn at your own pace, on any device.</p>
          <form onSubmit={submit} className="mt-6">
            <label htmlFor="footer-email" className="text-sm font-semibold text-white">Get one useful article a week</label>
            <div className="mt-2 flex max-w-sm gap-2">
              <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold" />
              <button type="submit" aria-label="Subscribe" className="rounded-xl bg-gold px-4 text-wine-deep hover:brightness-105"><Send className="h-4 w-4" /></button>
            </div>
          </form>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="lg:col-span-2">
            <h3 className="font-serif text-lg font-semibold text-white">{c.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map(([label, to]) => <li key={to}><Link to={to} className="hover:text-gold">{label}</Link></li>)}
            </ul>
          </div>
        ))}
        <div className="lg:col-span-2">
          <h3 className="font-serif text-lg font-semibold text-white">Get the app</h3>
          <div className="mt-4 flex flex-col gap-3">
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/30 px-4 py-2 hover:border-gold">
              <Apple className="h-6 w-6" /><span className="leading-tight"><span className="block text-[10px] text-white/60">Download on the</span><span className="text-sm font-semibold text-white">App Store</span></span>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/30 px-4 py-2 hover:border-gold">
              <Play className="h-6 w-6" /><span className="leading-tight"><span className="block text-[10px] text-white/60">Get it on</span><span className="text-sm font-semibold text-white">Google Play</span></span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} XanderBlog by XandermediaTechnology. All rights reserved.</p>
          <div className="flex gap-2">
            {[[Facebook, 'Facebook'], [Twitter, 'Twitter'], [Instagram, 'Instagram'], [Linkedin, 'LinkedIn'], [Youtube, 'YouTube']].map(([I, label]) => (
              <a key={label} href="#" onClick={(e) => e.preventDefault()} aria-label={label} className="rounded-full bg-white/10 p-2 transition hover:-translate-y-0.5 hover:bg-gold hover:text-wine-deep"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
