import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader, StaggerGrid, StaggerItem } from '../components/ui'
import Icon from '../components/ui/Icon'
import { categories } from '../data/categories'
import { courses } from '../data/courses'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Categories() {
  useDocumentTitle('Categories')
  return (
    <>
      <PageHeader title="Browse by category" subtitle="Eight subjects, each with beginner-friendly starting points and advanced paths." crumbs={[{ label: 'Categories' }]} />
      <div className="container-x py-16">
        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const count = courses.filter((x) => x.category === c.id).length
            const students = courses.filter((x) => x.category === c.id).reduce((n, x) => n + x.students, 0)
            return (
              <StaggerItem key={c.id}>
                <Link to={`/courses?category=${c.id}`} className="group card relative flex h-full flex-col overflow-hidden p-7 transition hover:-translate-y-1.5 hover:shadow-lift">
                  <span aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150" style={{ background: c.color }} />
                  <span className="relative w-fit rounded-2xl p-4 text-white" style={{ background: c.color }}><Icon name={c.icon} className="h-7 w-7" /></span>
                  <h2 className="relative mt-5 font-serif text-xl font-bold">{c.name}</h2>
                  <p className="relative mt-2 flex-1 text-sm text-muted dark:text-stone-400">{c.description}</p>
                  <div className="relative mt-5 flex items-center justify-between border-t border-wine-rose pt-4 text-sm dark:border-night-line">
                    <span><strong>{count}</strong> courses · {(students / 1000).toFixed(0)}k learners</span>
                    <ArrowRight className="h-4 w-4 text-wine transition-transform group-hover:translate-x-1 dark:text-rose-200" />
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerGrid>
      </div>
    </>
  )
}
