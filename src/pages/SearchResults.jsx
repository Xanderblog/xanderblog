import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX, Search } from 'lucide-react'
import { PageHeader, Tabs, EmptyState, Button, StaggerGrid, StaggerItem } from '../components/ui'
import { CourseCard, ArticleCard } from '../components/Cards'
import { courses } from '../data/courses'
import { articles } from '../data/articles'
import { getCategory } from '../data/categories'
import { getInstructor } from '../data/instructors'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const match = (q, ...fields) => fields.join(' ').toLowerCase().includes(q.toLowerCase())

export default function SearchResults() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const [input, setInput] = useState(q)
  const [tab, setTab] = useState('all')
  useEffect(() => { setInput(q) }, [q])
  useDocumentTitle(q ? `Search: ${q}` : 'Search')
  const cs = q ? courses.filter((c) => match(q, c.title, c.subtitle, getCategory(c.category).name, getInstructor(c.instructorId).name, c.learn.join(' '))) : []
  const as = q ? articles.filter((a) => match(q, a.title, a.excerpt, a.tags.join(' '), getCategory(a.category).name)) : []
  const total = cs.length + as.length
  return (
    <>
      <PageHeader title={q ? `Results for “${q}”` : 'Search'} subtitle={q ? `${total} results across courses and articles` : 'Search courses and articles'} crumbs={[{ label: 'Search' }]}>
        <form onSubmit={(e) => { e.preventDefault(); setParams(input.trim() ? { q: input.trim() } : {}) }} role="search" className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 dark:bg-night-card">
          <Search className="ml-3 h-5 w-5 text-wine" aria-hidden />
          <label htmlFor="search-page" className="sr-only">Search</label>
          <input id="search-page" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Try React, SEO or photography" className="flex-1 bg-transparent px-2 py-2.5 text-ink outline-none dark:text-white" />
          <Button type="submit">Search</Button>
        </form>
      </PageHeader>
      <div className="container-x py-12">
        {!q || total === 0 ? (
          <EmptyState icon={SearchX} title={q ? `No results for “${q}”` : 'Start typing to search'} text={q ? 'Check the spelling, or try a broader word like "design" or "python".' : 'Find courses, instructors and articles in one place.'} action={<Button to="/courses">Browse all courses</Button>} />
        ) : (
          <>
            <Tabs active={tab} onChange={setTab} tabs={[{ id: 'all', label: `All (${total})` }, { id: 'courses', label: `Courses (${cs.length})` }, { id: 'articles', label: `Articles (${as.length})` }]} />
            {(tab === 'all' || tab === 'courses') && cs.length > 0 && (
              <section className="mt-10">
                {tab === 'all' && <h2 className="mb-6 font-serif text-2xl font-bold">Courses</h2>}
                <StaggerGrid key={q + tab} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{cs.map((c) => <StaggerItem key={c.id}><CourseCard course={c} /></StaggerItem>)}</StaggerGrid>
              </section>
            )}
            {(tab === 'all' || tab === 'articles') && as.length > 0 && (
              <section className="mt-12">
                {tab === 'all' && <h2 className="mb-6 font-serif text-2xl font-bold">Articles</h2>}
                <StaggerGrid key={q + tab + 'a'} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{as.map((a) => <StaggerItem key={a.id}><ArticleCard article={a} /></StaggerItem>)}</StaggerGrid>
              </section>
            )}
            {tab !== 'all' && (tab === 'courses' ? cs : as).length === 0 && <div className="mt-10"><EmptyState icon={SearchX} title={`No ${tab} match “${q}”`} text="Check the other tab for results." /></div>}
          </>
        )}
      </div>
    </>
  )
}
