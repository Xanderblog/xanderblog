import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X, SearchX } from 'lucide-react'
import { PageHeader, Pagination, CardSkeleton, EmptyState, Button } from '../components/ui'
import { CourseCard } from '../components/Cards'
import { courses, levels } from '../data/courses'
import { categories } from '../data/categories'
import { usePagination } from '../hooks/usePagination'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const durations = [{ id: 'short', label: 'Under 10 hours' }, { id: 'medium', label: '10–20 hours' }, { id: 'long', label: 'Over 20 hours' }]
const sorts = [{ id: 'popular', label: 'Most popular' }, { id: 'rating', label: 'Highest rated' }, { id: 'newest', label: 'Newest' }, { id: 'price-asc', label: 'Price: low to high' }, { id: 'price-desc', label: 'Price: high to low' }]

function FilterGroup({ title, children }) {
  return (
    <fieldset className="border-b border-wine-rose pb-5 last:border-0 dark:border-night-line">
      <legend className="mb-3 font-semibold">{title}</legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  )
}
function Check({ checked, onChange, label, type = 'checkbox', name }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input type={type} name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-[#722F37]" />
      <span>{label}</span>
    </label>
  )
}

export default function Courses() {
  useDocumentTitle('Courses')
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [cats, setCats] = useState(params.get('category') ? [params.get('category')] : [])
  const [lvls, setLvls] = useState([])
  const [priceF, setPriceF] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [durs, setDurs] = useState([])
  const [sort, setSort] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [drawer, setDrawer] = useState(false)

  useEffect(() => { const c = params.get('category'); setCats(c ? [c] : []) }, [params])

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])
  const filtered = useMemo(() => {
    let list = courses.filter((c) =>
      (!query || (c.title + c.subtitle).toLowerCase().includes(query.toLowerCase())) &&
      (!cats.length || cats.includes(c.category)) &&
      (!lvls.length || lvls.includes(c.level)) &&
      (priceF === 'all' || (priceF === 'free' ? c.price === 0 : c.price > 0)) &&
      c.rating >= minRating &&
      (!durs.length || durs.includes(c.durationBucket)))
    const s = { popular: (a, b) => b.students - a.students, rating: (a, b) => b.rating - a.rating, newest: (a, b) => b.id.localeCompare(a.id), 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price }
    return [...list].sort(s[sort])
  }, [query, cats, lvls, priceF, minRating, durs, sort])

  const filterKey = JSON.stringify([query, cats, lvls, priceF, minRating, durs, sort])
  const { page, pages, setPage, current } = usePagination(filtered, 6, filterKey)
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t) }, [filterKey, page])

  const clearAll = () => { setQuery(''); setCats([]); setLvls([]); setPriceF('all'); setMinRating(0); setDurs([]); setParams({}) }
  const activeCount = cats.length + lvls.length + durs.length + (priceF !== 'all') + (minRating > 0)

  const filters = (
    <div className="space-y-5">
      <FilterGroup title="Category">{categories.map((c) => <Check key={c.id} label={c.name} checked={cats.includes(c.id)} onChange={() => toggle(cats, setCats, c.id)} />)}</FilterGroup>
      <FilterGroup title="Level">{levels.map((l) => <Check key={l} label={l} checked={lvls.includes(l)} onChange={() => toggle(lvls, setLvls, l)} />)}</FilterGroup>
      <FilterGroup title="Price">{[['all', 'All'], ['free', 'Free'], ['paid', 'Paid']].map(([v, l]) => <Check key={v} type="radio" name="price" label={l} checked={priceF === v} onChange={() => setPriceF(v)} />)}</FilterGroup>
      <FilterGroup title="Rating">{[[0, 'Any rating'], [4.5, '4.5 and up'], [4.7, '4.7 and up'], [4.8, '4.8 and up']].map(([v, l]) => <Check key={v} type="radio" name="rating" label={l} checked={minRating === v} onChange={() => setMinRating(v)} />)}</FilterGroup>
      <FilterGroup title="Duration">{durations.map((d) => <Check key={d.id} label={d.label} checked={durs.includes(d.id)} onChange={() => toggle(durs, setDurs, d.id)} />)}</FilterGroup>
      {activeCount > 0 && <button onClick={clearAll} className="text-sm font-semibold text-wine underline dark:text-rose-200">Clear all filters</button>}
    </div>
  )

  return (
    <>
      <PageHeader title="Explore courses" subtitle={`${courses.length} practical courses across ${categories.length} subjects. Filter by what matters to you.`} crumbs={[{ label: 'Courses' }]}>
        <div className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 dark:bg-night-card">
          <Search className="ml-3 h-5 w-5 text-wine" aria-hidden />
          <label htmlFor="course-search" className="sr-only">Search courses</label>
          <input id="course-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or topic" className="flex-1 bg-transparent px-2 py-2.5 text-ink outline-none dark:text-white" />
          {query && <button onClick={() => setQuery('')} aria-label="Clear search" className="rounded-lg p-2 text-muted hover:bg-wine-rose"><X className="h-4 w-4" /></button>}
        </div>
      </PageHeader>
      <div className="container-x grid gap-8 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block"><div className="card sticky top-24 p-6">{filters}</div></aside>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted dark:text-stone-400" aria-live="polite">Showing <strong className="text-ink dark:text-white">{filtered.length}</strong> courses</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setDrawer(true)} className="flex items-center gap-2 rounded-xl border border-wine-rose bg-white px-4 py-2.5 text-sm font-semibold lg:hidden dark:border-night-line dark:bg-night-card">
                <SlidersHorizontal className="h-4 w-4" /> Filters {activeCount > 0 && <span className="rounded-full bg-wine px-2 text-xs text-white">{activeCount}</span>}
              </button>
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-wine-rose bg-white px-4 py-2.5 text-sm outline-none focus:border-wine dark:border-night-line dark:bg-night-card">
                {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}</div>
          ) : current.length ? (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {current.map((c, i) => (
                  <motion.div key={c.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }} exit={{ opacity: 0 }}><CourseCard course={c} /></motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState icon={SearchX} title="No courses match these filters" text="Remove a filter or try a broader search term." action={<Button onClick={clearAll}>Clear all filters</Button>} />
          )}
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      </div>
      <AnimatePresence>
        {drawer && (
          <motion.div className="fixed inset-0 z-[75] bg-black/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)}>
            <motion.div role="dialog" aria-label="Filters" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} onClick={(e) => e.stopPropagation()} className="absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-cream p-6 dark:bg-night">
              <div className="mb-6 flex items-center justify-between"><h2 className="font-serif text-xl font-bold">Filters</h2><button onClick={() => setDrawer(false)} aria-label="Close filters" className="rounded-lg p-1.5 hover:bg-wine-rose"><X className="h-5 w-5" /></button></div>
              {filters}
              <Button className="mt-6 w-full" onClick={() => setDrawer(false)}>Show {filtered.length} courses</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
