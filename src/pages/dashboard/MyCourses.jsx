import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { ProgressBar, Img, Button, Tabs, EmptyState, Badge } from '../../components/ui'
import { dashboardData } from '../../data/misc'
import { getCourse } from '../../data/courses'
import { getInstructor } from '../../data/instructors'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function MyCourses() {
  useDocumentTitle('My courses')
  const [tab, setTab] = useState('all')
  const list = dashboardData.enrolled.filter((e) => tab === 'all' || (tab === 'done' ? e.progress === 100 : e.progress < 100))
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold">My courses</h1>
      <Tabs className="mt-6" active={tab} onChange={setTab} tabs={[{ id: 'all', label: 'All' }, { id: 'progress', label: 'In progress' }, { id: 'done', label: 'Completed' }]} />
      {list.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {list.map((e) => { const c = getCourse(e.courseId); return (
            <article key={c.id} className="card overflow-hidden">
              <Link to={`/courses/${c.id}`} tabIndex={-1} aria-hidden><Img src={c.image} alt="" className="aspect-video w-full object-cover" /></Link>
              <div className="p-5">
                {e.progress === 100 && <Badge tone="green" className="mb-2">Completed</Badge>}
                <h2 className="font-serif text-lg font-bold"><Link to={`/courses/${c.id}`} className="hover:text-wine">{c.title}</Link></h2>
                <p className="text-sm text-muted dark:text-stone-400">{getInstructor(c.instructorId).name}</p>
                <ProgressBar value={e.progress} showLabel className="mt-4" />
                <Button to={`/learn/${c.id}`} className="mt-4 w-full" variant={e.progress === 100 ? 'outline' : 'primary'}>{e.progress === 100 ? 'Review course' : e.progress === 0 ? 'Start course' : 'Continue'}</Button>
              </div>
            </article>) })}
        </div>
      ) : <div className="mt-6"><EmptyState icon={BookOpen} title="Nothing here yet" text="Courses you enrol in will show up here." action={<Button to="/courses">Find a course</Button>} /></div>}
    </div>
  )
}
