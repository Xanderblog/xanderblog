import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ShoppingCart, Moon, Sun, ChevronDown, LayoutDashboard, BookOpen, Heart, Settings, LogOut, LogIn, X } from 'lucide-react'
import Logo from './Logo'
import Icon from './ui/Icon'
import { useApp } from '../context/AppContext'
import { useScrolled } from '../hooks/useScrolled'
import { categories } from '../data/categories'
import { courses } from '../data/courses'
import { Img } from './ui'

const links = [
  { to: '/courses', label: 'Courses', mega: true },
  { to: '/blog', label: 'Blog' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef(null)
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50) }, [open])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const submit = (e) => { e.preventDefault(); if (!q.trim()) return; navigate(`/search?q=${encodeURIComponent(q.trim())}`); onClose(); setQ('') }
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] bg-wine-deep/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} className="container-x pt-28" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={submit} role="search" className="mx-auto flex max-w-2xl items-center gap-3 rounded-2xl bg-white p-3 shadow-lift dark:bg-night-card">
              <Search className="ml-2 h-5 w-5 text-wine" aria-hidden />
              <label htmlFor="global-search" className="sr-only">Search courses and articles</label>
              <input id="global-search" ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses, articles, topics…" className="flex-1 bg-transparent py-2 text-lg outline-none" />
              <button type="button" onClick={onClose} aria-label="Close search" className="rounded-lg p-2 hover:bg-wine-rose dark:hover:bg-night-line"><X className="h-5 w-5" /></button>
            </form>
            <div className="mx-auto mt-4 flex max-w-2xl flex-wrap gap-2">
              {['React', 'Python', 'Figma', 'SEO', 'Flutter'].map((t) => (
                <button key={t} onClick={() => { navigate(`/search?q=${t}`); onClose() }} className="rounded-full bg-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/25">{t}</button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const scrolled = useScrolled(20)
  const { theme, toggleTheme, cart, user, logout } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const userRef = useRef(null)

  useEffect(() => { setMobileOpen(false); setMega(false); setUserMenu(false) }, [location.pathname])
  useEffect(() => {
    const onClick = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserMenu(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : '' }, [mobileOpen])

  const navLinkClass = ({ isActive }) => `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-wine dark:text-rose-200' : 'text-ink/80 hover:text-wine dark:text-stone-300 dark:hover:text-rose-200'}`

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${scrolled ? 'bg-cream/80 py-2 shadow-soft backdrop-blur-xl dark:bg-night/80' : 'bg-cream py-4 dark:bg-night'}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-lg focus:bg-wine focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <nav className="container-x flex items-center justify-between gap-4" aria-label="Main">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.to} className="relative" onMouseEnter={() => l.mega && setMega(true)} onMouseLeave={() => l.mega && setMega(false)}>
                {l.mega ? (
                  <div className="flex items-center">
                    <NavLink to={l.to} className={navLinkClass}>{l.label}</NavLink>
                    <button onClick={() => setMega(!mega)} aria-expanded={mega} aria-label="Show course categories" className="-ml-2 rounded p-1 text-ink/70 dark:text-stone-300">
                      <ChevronDown className={`h-4 w-4 transition-transform ${mega ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                ) : <NavLink to={l.to} className={navLinkClass}>{l.label}</NavLink>}
                {l.mega && (
                  <AnimatePresence>
                    {mega && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3">
                        <div className="grid grid-cols-3 gap-6 rounded-2xl bg-white p-6 shadow-lift dark:bg-night-card">
                          <div className="col-span-2 grid grid-cols-2 gap-1">
                            {categories.map((c) => (
                              <Link key={c.id} to={`/courses?category=${c.id}`} className="flex items-start gap-3 rounded-xl p-3 hover:bg-wine-rose dark:hover:bg-night-line">
                                <span className="rounded-lg p-2 text-white" style={{ background: c.color }}><Icon name={c.icon} className="h-4 w-4" /></span>
                                <span><span className="block text-sm font-semibold">{c.name}</span><span className="block text-xs text-muted dark:text-stone-400">{courses.filter((x) => x.category === c.id).length} courses</span></span>
                              </Link>
                            ))}
                          </div>
                          <div className="rounded-xl bg-wine-rose p-4 dark:bg-night-line">
                            <p className="text-xs font-semibold text-wine dark:text-rose-200">Most popular</p>
                            <Img src={courses[0].image} alt="" className="mt-3 aspect-video w-full rounded-lg object-cover" />
                            <p className="mt-3 font-serif text-sm font-bold">{courses[0].title}</p>
                            <Link to={`/courses/${courses[0].id}`} className="mt-2 inline-block text-xs font-semibold text-wine underline dark:text-rose-200">View course</Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="rounded-xl p-2.5 hover:bg-wine-rose dark:hover:bg-night-line"><Search className="h-5 w-5" /></button>
            <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} className="rounded-xl p-2.5 hover:bg-wine-rose dark:hover:bg-night-line">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="block">
                  {theme === 'dark' ? <Sun className="h-5 w-5 text-gold" /> : <Moon className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Link to="/cart" aria-label={`Cart, ${cart.length} items`} className="relative rounded-xl p-2.5 hover:bg-wine-rose dark:hover:bg-night-line">
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span key={cart.length} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-wine-deep">{cart.length}</motion.span>
                )}
              </AnimatePresence>
            </Link>
            {user.loggedIn ? (
              <div className="relative hidden sm:block" ref={userRef}>
                <button onClick={() => setUserMenu(!userMenu)} aria-expanded={userMenu} aria-label="Account menu" className="flex items-center gap-1 rounded-full p-0.5 ring-2 ring-transparent hover:ring-wine-rose">
                  <Img src={user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                </button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl bg-white shadow-lift dark:bg-night-card">
                      <div className="border-b border-wine-rose p-4 dark:border-night-line"><p className="font-semibold">{user.name}</p><p className="truncate text-xs text-muted dark:text-stone-400">{user.email}</p></div>
                      {[[LayoutDashboard, 'Dashboard', '/dashboard'], [BookOpen, 'My courses', '/dashboard/courses'], [Heart, 'Wishlist', '/dashboard/wishlist'], [Settings, 'Profile settings', '/dashboard/settings']].map(([I, label, to]) => (
                        <Link key={to} to={to} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-wine-rose dark:hover:bg-night-line"><I className="h-4 w-4 text-wine dark:text-rose-200" />{label}</Link>
                      ))}
                      <button onClick={logout} className="flex w-full items-center gap-3 border-t border-wine-rose px-4 py-2.5 text-sm hover:bg-wine-rose dark:border-night-line dark:hover:bg-night-line"><LogOut className="h-4 w-4 text-wine dark:text-rose-200" />Log out</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden items-center gap-2 rounded-xl bg-wine px-4 py-2.5 text-sm font-semibold text-white hover:bg-wine-light sm:flex"><LogIn className="h-4 w-4" />Log in</Link>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} className="relative h-10 w-10 rounded-xl hover:bg-wine-rose lg:hidden dark:hover:bg-night-line">
              <motion.span animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }} className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded bg-current" />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded bg-current" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }} className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded bg-current" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[65] bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}>
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-cream px-6 pb-8 pt-24 dark:bg-night">
              <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }} className="space-y-1">
                {[...links, { to: '/categories', label: 'Categories' }, { to: '/faq', label: 'FAQ' }, { to: '/contact', label: 'Contact' }].map((l) => (
                  <motion.li key={l.to} variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                    <NavLink to={l.to} className={({ isActive }) => `block rounded-xl px-4 py-3 font-medium ${isActive ? 'bg-wine text-white' : 'hover:bg-wine-rose dark:hover:bg-night-line'}`}>{l.label}</NavLink>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-6 border-t border-wine-rose pt-6 dark:border-night-line">
                {user.loggedIn ? (
                  <>
                    <Link to="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-wine-rose dark:hover:bg-night-line"><Img src={user.avatar} alt="" className="h-8 w-8 rounded-full" /><span className="font-medium">My dashboard</span></Link>
                    <button onClick={logout} className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-wine-rose dark:hover:bg-night-line"><LogOut className="h-4 w-4" />Log out</button>
                  </>
                ) : (
                  <div className="grid gap-2">
                    <Link to="/login" className="rounded-xl border-2 border-wine px-4 py-3 text-center font-semibold text-wine dark:text-rose-200">Log in</Link>
                    <Link to="/signup" className="rounded-xl bg-wine px-4 py-3 text-center font-semibold text-white">Sign up free</Link>
                  </div>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
