import { useState, useId, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Star, X, Home, ImageOff } from 'lucide-react'
import { useRef } from 'react'

const cx = (...c) => c.filter(Boolean).join(' ')

/* ---------- Button ---------- */
const variants = {
  primary: 'bg-wine text-white hover:bg-wine-light shadow-soft',
  gold: 'bg-gold text-wine-deep hover:brightness-105 shadow-soft',
  outline: 'border-2 border-wine text-wine hover:bg-wine hover:text-white dark:border-wine-light dark:text-rose-200 dark:hover:bg-wine-light dark:hover:text-white',
  ghost: 'text-wine hover:bg-wine-rose dark:text-rose-200 dark:hover:bg-night-line',
  light: 'bg-white text-wine-deep hover:bg-wine-rose',
}
const sizes = { sm: 'px-3.5 py-2 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' }

export function Button({ as, to, href, variant = 'primary', size = 'md', className, children, ...props }) {
  const classes = cx('inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60', variants[variant], sizes[size], className)
  const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }
  if (to) return <motion.span {...motionProps} className="inline-flex"><Link to={to} className={classes} {...props}>{children}</Link></motion.span>
  if (href) return <motion.a {...motionProps} href={href} className={classes} {...props}>{children}</motion.a>
  return <motion.button {...motionProps} className={classes} {...props}>{children}</motion.button>
}

/* ---------- Badge ---------- */
const badgeTones = {
  rose: 'bg-wine-rose text-wine dark:bg-wine/30 dark:text-rose-200',
  gold: 'bg-gold/15 text-[#8a6d12] dark:text-gold',
  wine: 'bg-wine text-white',
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  gray: 'bg-stone-100 text-muted dark:bg-night-line dark:text-stone-300',
}
export function Badge({ tone = 'rose', className, children }) {
  return <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', badgeTones[tone], className)}>{children}</span>
}

/* ---------- Star rating ---------- */
export function StarRating({ value, size = 16, showValue = true, count }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${value} out of 5`}>
      {showValue && <span className="text-sm font-bold text-[#8a6d12] dark:text-gold">{value.toFixed(1)}</span>}
      <div className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} style={{ width: size, height: size }} className={i <= Math.round(value) ? 'fill-gold text-gold' : 'text-stone-300 dark:text-stone-600'} />
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-muted dark:text-stone-400">({count.toLocaleString()})</span>}
    </div>
  )
}

/* ---------- Progress bar ---------- */
export function ProgressBar({ value, className, showLabel }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div className={className}>
      {showLabel && <div className="mb-1 flex justify-between text-xs text-muted dark:text-stone-400"><span>Progress</span><span className="font-semibold text-wine dark:text-rose-200">{value}%</span></div>}
      <div ref={ref} className="h-2 w-full overflow-hidden rounded-full bg-wine-rose dark:bg-night-line" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <motion.div className="h-full rounded-full bg-gradient-to-r from-wine to-wine-light" initial={{ width: 0 }} animate={{ width: inView ? `${value}%` : 0 }} transition={{ duration: 1.1, ease: 'easeOut' }} />
      </div>
    </div>
  )
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lift dark:bg-night-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 hover:bg-wine-rose dark:hover:bg-night-line"><X className="h-5 w-5" /></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Tabs ---------- */
export function Tabs({ tabs, active, onChange, className }) {
  const id = useId()
  return (
    <div role="tablist" className={cx('flex gap-1 overflow-x-auto border-b border-wine-rose dark:border-night-line', className)}>
      {tabs.map((t) => (
        <button key={t.id} role="tab" aria-selected={active === t.id} onClick={() => onChange(t.id)}
          className={cx('relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors', active === t.id ? 'text-wine dark:text-rose-200' : 'text-muted hover:text-wine dark:text-stone-400')}>
          {t.label}
          {active === t.id && <motion.span layoutId={`tab-${id}`} className="absolute inset-x-0 -bottom-px h-0.5 bg-wine dark:bg-rose-200" />}
        </button>
      ))}
    </div>
  )
}

/* ---------- Accordion ---------- */
export function AccordionItem({ title, children, defaultOpen = false, meta }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-wine-rose last:border-0 dark:border-night-line">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-semibold">{title}</span>
        <span className="flex items-center gap-3">
          {meta && <span className="hidden text-xs text-muted sm:inline dark:text-stone-400">{meta}</span>}
          <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown className="h-5 w-5 text-wine dark:text-rose-200" /></motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Breadcrumbs ---------- */
export function Breadcrumbs({ items, light }) {
  return (
    <nav aria-label="Breadcrumb" className={cx('flex flex-wrap items-center gap-1.5 text-sm', light ? 'text-white/70' : 'text-muted dark:text-stone-400')}>
      <Link to="/" className="flex items-center gap-1 hover:underline"><Home className="h-3.5 w-3.5" /> Home</Link>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {it.to ? <Link to={it.to} className="hover:underline">{it.label}</Link> : <span className={light ? 'text-white' : 'text-ink dark:text-stone-200'} aria-current="page">{it.label}</span>}
        </span>
      ))}
    </nav>
  )
}

/* ---------- Skeleton ---------- */
export function Skeleton({ className }) {
  return <div className={cx('animate-pulse rounded-xl bg-wine-rose/70 dark:bg-night-line', className)} />
}
export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-soft dark:bg-night-card">
      <Skeleton className="h-44 rounded-none" />
      <div className="space-y-3 p-5"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-5 w-full" /><Skeleton className="h-4 w-2/3" /></div>
    </div>
  )
}

/* ---------- Image with fallback ---------- */
export function Img({ src, alt, className, ...props }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return <div role="img" aria-label={alt} className={cx('flex items-center justify-center bg-gradient-to-br from-wine to-wine-deep text-white/60', className)}><ImageOff className="h-8 w-8" /></div>
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} {...props} />
}

/* ---------- Scroll reveal ---------- */
export function Reveal({ children, delay = 0, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </M>
  )
}
export const staggerParent = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
export const staggerChild = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }
export function StaggerGrid({ children, className }) {
  return <motion.div className={className} variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>{children}</motion.div>
}
export function StaggerItem({ children, className }) {
  return <motion.div className={className} variants={staggerChild}>{children}</motion.div>
}

/* ---------- Section heading ---------- */
export function SectionHeading({ title, subtitle, action, center }) {
  return (
    <div className={cx('mb-10 flex flex-col gap-4', center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between')}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        <h2 className="font-serif text-3xl font-bold text-ink md:text-4xl dark:text-white">{title}</h2>
        {subtitle && <p className="mt-3 text-muted dark:text-stone-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* ---------- Pagination ---------- */
export function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const go = (p) => { onChange(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <button onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page" className="rounded-xl border border-wine-rose p-2.5 disabled:opacity-40 hover:bg-wine-rose dark:border-night-line dark:hover:bg-night-line"><ChevronLeft className="h-4 w-4" /></button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => go(p)} aria-current={p === page ? 'page' : undefined}
          className={cx('h-10 w-10 rounded-xl text-sm font-semibold', p === page ? 'bg-wine text-white' : 'border border-wine-rose hover:bg-wine-rose dark:border-night-line dark:hover:bg-night-line')}>{p}</button>
      ))}
      <button onClick={() => go(page + 1)} disabled={page === pages} aria-label="Next page" className="rounded-xl border border-wine-rose p-2.5 disabled:opacity-40 hover:bg-wine-rose dark:border-night-line dark:hover:bg-night-line"><ChevronRight className="h-4 w-4" /></button>
    </nav>
  )
}

/* ---------- Empty state ---------- */
export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-wine-rose px-6 py-16 text-center dark:border-night-line">
      {Icon && <div className="mb-4 rounded-2xl bg-wine-rose p-4 text-wine dark:bg-night-line dark:text-rose-200"><Icon className="h-8 w-8" /></div>}
      <h3 className="font-serif text-xl font-bold">{title}</h3>
      {text && <p className="mt-2 max-w-sm text-muted dark:text-stone-400">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

/* ---------- Form field ---------- */
export function Field({ label, error, hint, id, as = 'input', className, ...props }) {
  const autoId = useId()
  const fid = id || autoId
  const Tag = as
  return (
    <div className={className}>
      {label && <label htmlFor={fid} className="mb-1.5 block text-sm font-semibold">{label}</label>}
      <Tag id={fid} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined}
        className={cx('w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:ring-4 dark:bg-night',
          error ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/40' : 'border-stone-200 focus:border-wine focus:ring-wine-rose dark:border-night-line dark:focus:ring-wine/30',
          as === 'textarea' && 'min-h-[120px] resize-y')} {...props} />
      {error ? <p id={`${fid}-err`} className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p> : hint ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
    </div>
  )
}

/* ---------- Page header band ---------- */
export function PageHeader({ title, subtitle, crumbs = [], children }) {
  return (
    <section className="relative overflow-hidden bg-wine-deep pb-16 pt-32 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-wine-light/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs.length ? crumbs : [{ label: title }]} light />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-serif text-4xl font-bold md:text-5xl">{title}</motion.h1>
        {subtitle && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/75">{subtitle}</motion.p>}
        {children}
      </div>
    </section>
  )
}

export { cx }
