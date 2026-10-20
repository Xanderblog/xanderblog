import { NavLink, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutDashboard, BookOpen, Award, Heart, Receipt, Settings, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Img } from '../components/ui'

const items = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/courses', label: 'My courses', icon: BookOpen },
  { to: '/dashboard/certificates', label: 'Certificates', icon: Award },
  { to: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/dashboard/purchases', label: 'Purchase history', icon: Receipt },
  { to: '/dashboard/settings', label: 'Profile settings', icon: Settings },
]

export default function DashboardLayout() {
  const { user, logout } = useApp()
  const outlet = useOutlet()
  const location = useLocation()
  return (
    <div className="container-x grid gap-8 pb-20 pt-28 lg:grid-cols-[260px_1fr]">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <div className="card p-5">
          <div className="mb-5 hidden items-center gap-3 border-b border-wine-rose pb-5 lg:flex dark:border-night-line">
            <Img src={user.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
            <div className="min-w-0"><p className="truncate font-semibold">{user.name}</p><p className="truncate text-xs text-muted dark:text-stone-400">Pro member</p></div>
          </div>
          <nav aria-label="Dashboard" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto lg:flex-col">
            {items.map(({ to, label, icon: I, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-wine text-white' : 'hover:bg-wine-rose dark:hover:bg-night-line'}`}>
                <I className="h-4 w-4" />{label}
              </NavLink>
            ))}
            <button onClick={logout} className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium hover:bg-wine-rose lg:mt-2 lg:border-t lg:border-wine-rose lg:pt-4 dark:hover:bg-night-line lg:dark:border-night-line"><LogOut className="h-4 w-4" />Log out</button>
          </nav>
        </div>
      </aside>
      <AnimatePresence mode="wait" initial={false}>
        <motion.section key={location.pathname} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="min-w-0">
          {outlet}
        </motion.section>
      </AnimatePresence>
    </div>
  )
}
