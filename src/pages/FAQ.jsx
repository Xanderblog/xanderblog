import { useState } from 'react'
import { Search, HelpCircle } from 'lucide-react'
import { PageHeader, AccordionItem, EmptyState, Button } from '../components/ui'
import { faqs } from '../data/misc'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function FAQ() {
  useDocumentTitle('FAQ')
  const [q, setQ] = useState('')
  const [topic, setTopic] = useState('All')
  const topics = ['All', ...new Set(faqs.map((f) => f.topic))]
  const list = faqs.filter((f) => (topic === 'All' || f.topic === topic) && (f.q + f.a).toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <PageHeader title="Frequently asked questions" subtitle="Quick answers about courses, payments, certificates and teaching." crumbs={[{ label: 'FAQ' }]}>
        <div className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 dark:bg-night-card">
          <Search className="ml-3 h-5 w-5 text-wine" aria-hidden />
          <label htmlFor="faq-search" className="sr-only">Search questions</label>
          <input id="faq-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="flex-1 bg-transparent px-2 py-2.5 text-ink outline-none dark:text-white" />
        </div>
      </PageHeader>
      <div className="container-x max-w-3xl py-16">
        <div className="mb-8 flex flex-wrap gap-2">
          {topics.map((t) => <button key={t} onClick={() => setTopic(t)} aria-pressed={topic === t} className={`rounded-full px-4 py-2 text-sm font-medium ${topic === t ? 'bg-wine text-white' : 'bg-white hover:bg-wine-rose dark:bg-night-card dark:hover:bg-night-line'}`}>{t}</button>)}
        </div>
        {list.length ? (
          <div className="card overflow-hidden" key={q + topic}>
            {list.map((f, i) => <AccordionItem key={f.q} title={f.q} defaultOpen={i === 0 && !!q}><p className="leading-relaxed text-muted dark:text-stone-400">{f.a}</p></AccordionItem>)}
          </div>
        ) : <EmptyState icon={HelpCircle} title="No matching questions" text="Try another word, or ask us directly." action={<Button to="/contact">Contact support</Button>} />}
        <div className="mt-12 rounded-2xl bg-wine-rose p-8 text-center dark:bg-night-card">
          <h2 className="font-serif text-2xl font-bold">Still have a question?</h2>
          <p className="mt-2 text-muted dark:text-stone-400">Our support team replies within one working day.</p>
          <Button to="/contact" className="mt-5">Contact support</Button>
        </div>
      </div>
    </>
  )
}
