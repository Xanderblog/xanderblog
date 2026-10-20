import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Clock, Calendar, Twitter, Facebook, Linkedin, Link2, MessageSquare } from 'lucide-react'
import { Breadcrumbs, Badge, Img, Button, Field, StaggerGrid, StaggerItem } from '../components/ui'
import { ArticleCard } from '../components/Cards'
import { getArticle, articles, commentsFor } from '../data/articles'
import { getInstructor } from '../data/instructors'
import { getCategory } from '../data/categories'
import { useApp } from '../context/AppContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

export default function BlogArticle() {
  const { id } = useParams()
  const article = getArticle(id)
  const { toast, user } = useApp()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [activeId, setActiveId] = useState('')
  const [comments, setComments] = useState(commentsFor())
  const [text, setText] = useState('')
  const [err, setErr] = useState('')
  useDocumentTitle(article?.title)

  useEffect(() => {
    if (!article) return
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)), { rootMargin: '-30% 0px -60% 0px' })
    article.content.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [article])

  if (!article) return <NotFound />
  const author = getInstructor(article.authorId)
  const related = articles.filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t)))).concat(articles.filter((a) => a.id !== article.id)).filter((a, i, arr) => arr.findIndex((x) => x.id === a.id) === i).slice(0, 3)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const copy = async () => { try { await navigator.clipboard.writeText(url); toast('Link copied') } catch { toast('Copy the link from your address bar', 'info') } }
  const post = (e) => {
    e.preventDefault()
    if (text.trim().length < 3) return setErr('Write at least a few words before posting.')
    setErr(''); setComments([{ id: Date.now(), name: user.name, avatar: user.avatar, date: 'just now', text }, ...comments]); setText(''); toast('Comment posted')
  }
  const shareLinks = [
    [Twitter, 'Share on X', `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`],
    [Facebook, 'Share on Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`],
    [Linkedin, 'Share on LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`],
  ]

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[75] h-1 origin-left bg-gradient-to-r from-wine to-gold" aria-hidden />
      <article>
        <header className="container-x max-w-4xl pb-10 pt-32 text-center">
          <div className="flex justify-center"><Breadcrumbs items={[{ label: 'Blog', to: '/blog' }, { label: getCategory(article.category).name }]} /></div>
          <Badge className="mt-6">{getCategory(article.category).name}</Badge>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-serif text-3xl font-bold leading-tight md:text-5xl">{article.title}</motion.h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted dark:text-stone-400">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-muted dark:text-stone-400">
            <Link to={`/instructors/${author.id}`} className="flex items-center gap-2 font-semibold text-ink hover:text-wine dark:text-white"><Img src={author.avatar} alt="" className="h-9 w-9 rounded-full" />{author.name}</Link>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{article.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{article.readTime} min read</span>
          </div>
        </header>
        <div className="container-x max-w-5xl"><Img src={article.image.replace('w=800', 'w=1400')} alt="" className="aspect-[21/9] w-full rounded-2xl object-cover shadow-soft" /></div>

        <div className="container-x grid max-w-6xl gap-12 py-14 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <nav aria-label="Table of contents">
                <p className="mb-3 text-sm font-semibold">On this page</p>
                <ul className="space-y-1 border-l-2 border-wine-rose dark:border-night-line">
                  {article.content.map((s) => (
                    <li key={s.id}><a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) }}
                      className={`-ml-0.5 block border-l-2 py-1.5 pl-4 text-sm transition ${activeId === s.id ? 'border-wine font-semibold text-wine dark:border-rose-200 dark:text-rose-200' : 'border-transparent text-muted hover:text-wine dark:text-stone-400'}`}>{s.heading}</a></li>
                  ))}
                </ul>
              </nav>
              <div>
                <p className="mb-3 text-sm font-semibold">Share</p>
                <div className="flex gap-2">
                  {shareLinks.map(([I, label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full bg-wine-rose p-2.5 text-wine transition hover:bg-wine hover:text-white dark:bg-night-line dark:text-rose-200"><I className="h-4 w-4" /></a>)}
                  <button onClick={copy} aria-label="Copy link" className="rounded-full bg-wine-rose p-2.5 text-wine transition hover:bg-wine hover:text-white dark:bg-night-line dark:text-rose-200"><Link2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 max-w-[68ch]">
            <div className="prose-xb">
              {article.content.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id}>{s.heading}</h2>
                  {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                  {s.quote && <blockquote className="my-8 border-l-4 border-gold bg-wine-rose/50 py-4 pl-6 pr-4 font-serif text-xl italic text-wine dark:bg-night-card dark:text-rose-200">{s.quote}</blockquote>}
                </section>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">{article.tags.map((t) => <Badge key={t} tone="gray">#{t}</Badge>)}</div>
            <div className="mt-6 flex gap-2 lg:hidden">
              {shareLinks.map(([I, label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full bg-wine-rose p-2.5 text-wine dark:bg-night-line dark:text-rose-200"><I className="h-4 w-4" /></a>)}
              <button onClick={copy} aria-label="Copy link" className="rounded-full bg-wine-rose p-2.5 text-wine dark:bg-night-line dark:text-rose-200"><Link2 className="h-4 w-4" /></button>
            </div>

            <div className="card mt-12 flex flex-col gap-5 p-6 sm:flex-row">
              <Img src={author.avatar} alt={author.name} className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
              <div>
                <p className="text-xs font-semibold text-wine dark:text-rose-200">Written by</p>
                <Link to={`/instructors/${author.id}`} className="font-serif text-xl font-bold hover:text-wine">{author.name}</Link>
                <p className="mt-2 text-sm leading-relaxed text-muted dark:text-stone-400">{author.bio}</p>
                <Button to={`/instructors/${author.id}`} variant="ghost" size="sm" className="mt-3 -ml-3">View profile and courses</Button>
              </div>
            </div>

            <section className="mt-14" aria-labelledby="comments-title">
              <h2 id="comments-title" className="flex items-center gap-2 font-serif text-2xl font-bold"><MessageSquare className="h-6 w-6 text-wine dark:text-rose-200" />{comments.length} comments</h2>
              <form onSubmit={post} className="mt-6" noValidate>
                <Field as="textarea" label="Join the discussion" value={text} onChange={(e) => setText(e.target.value)} error={err} placeholder="Share a thought or ask a question…" />
                <Button type="submit" className="mt-3">Post comment</Button>
              </form>
              <ul className="mt-8 space-y-4">
                {comments.map((c) => (
                  <motion.li key={c.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card flex gap-4 p-5">
                    <Img src={c.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full" />
                    <div><p className="text-sm"><strong>{c.name}</strong> <span className="text-muted dark:text-stone-400">· {c.date}</span></p><p className="mt-1 text-sm leading-relaxed">{c.text}</p></div>
                  </motion.li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
      <section className="bg-white py-20 dark:bg-night-card/40">
        <div className="container-x">
          <h2 className="mb-8 font-serif text-3xl font-bold">Keep reading</h2>
          <StaggerGrid className="grid gap-6 md:grid-cols-3">{related.map((a) => <StaggerItem key={a.id}><ArticleCard article={a} /></StaggerItem>)}</StaggerGrid>
        </div>
      </section>
    </>
  )
}
