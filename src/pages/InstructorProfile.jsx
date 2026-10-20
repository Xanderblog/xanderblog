import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Globe, Users, Star, BookOpen, MessageSquare } from 'lucide-react'
import { Breadcrumbs, Badge, Img, StaggerGrid, StaggerItem, StarRating, Reveal } from '../components/ui'
import { CourseCard, ArticleCard } from '../components/Cards'
import { getInstructor } from '../data/instructors'
import { courses } from '../data/courses'
import { articles } from '../data/articles'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

const socialIcons = { twitter: Twitter, linkedin: Linkedin, github: Github, website: Globe }

export default function InstructorProfile() {
  const { id } = useParams()
  const inst = getInstructor(id)
  useDocumentTitle(inst?.name)
  if (!inst) return <NotFound />
  const theirCourses = courses.filter((c) => c.instructorId === inst.id)
  const theirArticles = articles.filter((a) => a.authorId === inst.id)
  return (
    <>
      <section className="bg-wine-deep pb-32 pt-28 text-white">
        <div className="container-x"><Breadcrumbs light items={[{ label: 'Instructors', to: '/instructors' }, { label: inst.name }]} /></div>
      </section>
      <div className="container-x -mt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card flex flex-col gap-8 p-8 md:flex-row md:p-10">
          <Img src={inst.avatar} alt={inst.name} className="h-40 w-40 shrink-0 rounded-2xl border-4 border-white object-cover shadow-lift dark:border-night-card" />
          <div className="flex-1">
            <h1 className="font-serif text-3xl font-bold md:text-4xl">{inst.name}</h1>
            <p className="mt-1 text-lg text-muted dark:text-stone-400">{inst.title}</p>
            <div className="mt-4 flex flex-wrap gap-2">{inst.expertise.map((e) => <Badge key={e}>{e}</Badge>)}</div>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted dark:text-stone-400">{inst.bio}</p>
            <div className="mt-6 flex gap-2">
              {Object.entries(inst.socials).map(([k, href]) => { const I = socialIcons[k]; return <a key={k} href={href} onClick={(e) => e.preventDefault()} aria-label={k} className="rounded-full bg-wine-rose p-2.5 text-wine transition hover:bg-wine hover:text-white dark:bg-night-line dark:text-rose-200"><I className="h-4 w-4" /></a> })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 self-start md:w-64">
            {[[Users, inst.students.toLocaleString(), 'Students'], [MessageSquare, inst.reviews.toLocaleString(), 'Reviews'], [BookOpen, theirCourses.length, 'Courses'], [Star, inst.rating, 'Rating']].map(([I, v, l]) => (
              <div key={l} className="rounded-xl bg-cream p-4 text-center dark:bg-night"><I className="mx-auto h-5 w-5 text-wine dark:text-rose-200" /><p className="mt-2 font-bold">{v}</p><p className="text-xs text-muted dark:text-stone-400">{l}</p></div>
            ))}
          </div>
        </motion.div>

        <section className="mt-16">
          <h2 className="mb-8 font-serif text-3xl font-bold">Courses by {inst.name.split(' ')[0]}</h2>
          {theirCourses.length ? <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{theirCourses.map((c) => <StaggerItem key={c.id}><CourseCard course={c} /></StaggerItem>)}</StaggerGrid> : <p className="text-muted">New courses are on the way.</p>}
        </section>
        {theirArticles.length > 0 && (
          <Reveal as="section" className="mt-16">
            <h2 className="mb-8 font-serif text-3xl font-bold">Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">{theirArticles.slice(0, 3).map((a) => <ArticleCard key={a.id} article={a} />)}</div>
          </Reveal>
        )}
      </div>
    </>
  )
}
