import { useState } from 'react'
import { Search, UserX } from 'lucide-react'
import { PageHeader, StaggerGrid, StaggerItem, EmptyState, Button } from '../components/ui'
import { InstructorCard } from '../components/Cards'
import { instructors } from '../data/instructors'
import { courses } from '../data/courses'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Instructors() {
  useDocumentTitle('Instructors')
  const [q, setQ] = useState('')
  const list = instructors.filter((i) => (i.name + i.title + i.expertise.join(' ')).toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <PageHeader title="Our instructors" subtitle="Engineers, designers, analysts and founders who teach what they practise every day." crumbs={[{ label: 'Instructors' }]} />
      <div className="container-x py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-muted dark:text-stone-400">{list.length} instructors</p>
          <div className="flex w-full max-w-sm items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 focus-within:border-wine dark:border-night-line dark:bg-night-card">
            <Search className="h-4 w-4 text-muted" aria-hidden />
            <label htmlFor="inst-search" className="sr-only">Search instructors</label>
            <input id="inst-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or skill" className="w-full bg-transparent py-2.5 text-sm outline-none" />
          </div>
        </div>
        {list.length ? (
          <StaggerGrid key={q} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((i) => <StaggerItem key={i.id}><InstructorCard instructor={i} courseCount={courses.filter((c) => c.instructorId === i.id).length} /></StaggerItem>)}
          </StaggerGrid>
        ) : <EmptyState icon={UserX} title="No instructors found" text="Try a different name or skill." action={<Button onClick={() => setQ('')}>Show all instructors</Button>} />}
        <div className="mt-20 rounded-2xl bg-wine-rose p-10 text-center dark:bg-night-card">
          <h2 className="font-serif text-2xl font-bold">Have expertise to share?</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted dark:text-stone-400">Join our instructors and reach learners in over 90 countries.</p>
          <Button to="/become-instructor" className="mt-5">Apply to teach</Button>
        </div>
      </div>
    </>
  )
}
