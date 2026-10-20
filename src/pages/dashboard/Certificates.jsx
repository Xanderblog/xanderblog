import { Award, Download, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui'
import { dashboardData } from '../../data/misc'
import { getCourse } from '../../data/courses'
import { getInstructor } from '../../data/instructors'
import { useApp } from '../../context/AppContext'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function Certificates() {
  useDocumentTitle('Certificates')
  const { user, toast } = useApp()
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold">Certificates</h1>
      <p className="mt-1 text-muted dark:text-stone-400">Download and share proof of the courses you have completed.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {dashboardData.certificates.map((cert, i) => { const c = getCourse(cert.courseId); return (
          <motion.article key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card overflow-hidden">
            <div className="relative m-4 rounded-xl border-4 border-double border-gold bg-cream p-6 text-center dark:bg-night">
              <Award className="mx-auto h-10 w-10 text-gold" />
              <p className="mt-2 text-xs font-semibold text-wine dark:text-rose-200">Certificate of completion</p>
              <p className="mt-3 font-serif text-2xl font-bold">{user.name}</p>
              <p className="mt-1 text-sm text-muted dark:text-stone-400">has successfully completed</p>
              <p className="mt-1 font-serif text-lg font-semibold text-wine dark:text-rose-200">{c.title}</p>
              <div className="mt-5 flex justify-between text-xs text-muted dark:text-stone-400"><span>{cert.date}</span><span>{getInstructor(c.instructorId).name}</span><span>{cert.id}</span></div>
            </div>
            <div className="flex gap-2 px-4 pb-4">
              <Button className="flex-1" onClick={() => toast('Certificate PDF download started')}><Download className="h-4 w-4" />Download PDF</Button>
              <Button variant="outline" onClick={() => toast('Shareable link copied')}><Share2 className="h-4 w-4" />Share</Button>
            </div>
          </motion.article>) })}
      </div>
    </div>
  )
}
