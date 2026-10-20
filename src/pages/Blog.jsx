import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, FileX, Clock } from 'lucide-react'
import { PageHeader, Pagination, Badge, Img, EmptyState, Button, CardSkeleton, Reveal } from '../components/ui'
import { ArticleCard } from '../components/Cards'
import { articles, allTags } from '../data/articles'
import { categories, getCategory } from '../data/categories'
import { getInstructor } from '../data/instructors'
import { usePagination } from '../hooks/usePagination'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Blog() {
  useDocumentTitle('Blog')
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [tag, setTag] = useState(null)
  const [loading, setLoading] = useState(true)
  const featured = articles.find((a) => a.featured)
  const author = getInstructor(featured.authorId)
  const isFiltering = q || cat !== 'all' || tag

  const list = useMemo(() => articles.filter((a) =>
    (isFiltering || !a.featured) &&
    (!q || (a.title + a.excerpt).toLowerCase().includes(q.toLowerCase())) &&
    (cat === 'all' || a.category === cat) &&
    (!tag || a.tags.includes(tag))), [q, cat, tag, isFiltering])
  const key = JSON.stringify([q, cat, tag])
  const { page, pages, setPage, current } = usePagination(list, 6, key)
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t) }, [key, page])
  const usedCats = categories.filter((c) => articles.some((a) => a.category === c.id))

  return (
    <>
      <PageHeader title="The XanderBlog journal" subtitle="Free, practical articles on code, design, data and business. New posts every week." crumbs={[{ label: 'Blog' }]} />
      <div className="container-x py-12">
        {!isFiltering && (
          <Reveal>
            <Link to={`/blog/${featured.id}`} className="group card grid overflow-hidden md:grid-cols-2">
              <div className="overflow-hidden"><Img src={featured.image} alt="" className="h-full min-h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3"><Badge tone="gold">Featured</Badge><Badge>{getCategory(featured.category).name}</Badge></div>
                <h2 className="mt-4 font-serif text-3xl font-bold leading-tight group-hover:text-wine md:text-4xl dark:group-hover:text-rose-200">{featured.title}</h2>
                <p className="mt-4 text-muted dark:text-stone-400">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-sm"><Img src={author.avatar} alt="" className="h-10 w-10 rounded-full" /><div><p className="font-semibold">{author.name}</p><p className="flex items-center gap-1 text-muted dark:text-stone-400">{featured.date} <Clock className="ml-2 h-3.5 w-3.5" /> {featured.readTime} min</p></div></div>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Article categories">
              {[{ id: 'all', name: 'All' }, ...usedCats].map((c) => (
                <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${cat === c.id ? 'bg-wine text-white' : 'bg-white hover:bg-wine-rose dark:bg-night-card dark:hover:bg-night-line'}`}>{c.name}</button>
              ))}
            </div>
            {tag && <p className="mb-6 text-sm">Showing articles tagged <Badge>{tag}</Badge> <button onClick={() => setTag(null)} className="ml-2 font-semibold text-wine underline dark:text-rose-200">Clear tag</button></p>}
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
            ) : current.length ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <AnimatePresence>{current.map((a, i) => <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}><ArticleCard article={a} /></motion.div>)}</AnimatePresence>
              </div>
            ) : (
              <EmptyState icon={FileX} title="No articles found" text="Try another keyword, category or tag." action={<Button onClick={() => { setQ(''); setCat('all'); setTag(null) }}>Show all articles</Button>} />
            )}
            <Pagination page={page} pages={pages} onChange={setPage} />
          </div>
          <aside className="space-y-6">
            <div className="card p-6">
              <label htmlFor="blog-search" className="font-serif text-lg font-bold">Search articles</label>
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-stone-200 px-3 focus-within:border-wine dark:border-night-line">
                <Search className="h-4 w-4 text-muted" aria-hidden />
                <input id="blog-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Keyword…" className="w-full bg-transparent py-2.5 text-sm outline-none" />
              </div>
            </div>
            <div className="card p-6">
              <h2 className="font-serif text-lg font-bold">Popular tags</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {allTags.map((t) => <button key={t} onClick={() => setTag(tag === t ? null : t)} aria-pressed={tag === t} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${tag === t ? 'bg-wine text-white' : 'bg-wine-rose text-wine hover:bg-wine hover:text-white dark:bg-night-line dark:text-rose-200'}`}>#{t}</button>)}
              </div>
            </div>
            <div className="rounded-2xl bg-wine p-6 text-white">
              <h2 className="font-serif text-lg font-bold">Want structure?</h2>
              <p className="mt-2 text-sm text-white/80">Turn reading into skills with a guided course and a certificate.</p>
              <Button to="/courses" variant="gold" size="sm" className="mt-4">Browse courses</Button>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
