import { motion } from 'framer-motion'
import { PageHeader, Reveal, StaggerGrid, StaggerItem, Img, Button } from '../components/ui'
import Icon from '../components/ui/Icon'
import { team, timeline, values, stats } from '../data/misc'
import { img } from '../data/images'
import { useCountUp } from '../hooks/useCountUp'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function Stat({ s }) {
  const [ref, display] = useCountUp(s.value, 1600, s.decimals || 0)
  return <div ref={ref}><p className="font-serif text-4xl font-bold text-wine dark:text-rose-200">{display}{s.suffix}</p><p className="mt-1 text-sm text-muted dark:text-stone-400">{s.label}</p></div>
}

export default function About() {
  useDocumentTitle('About us')
  return (
    <>
      <PageHeader title="We help people learn things that matter" subtitle="XanderBlog brings together practical courses and honest articles, taught by people who do the work." crumbs={[{ label: 'About us' }]} />
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Our mission</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted dark:text-stone-400">Good education should be practical, affordable and respectful of your time. We build courses around real projects, keep lessons short, and publish free articles so anyone can start learning today, wherever they are.</p>
          <div className="mt-10 grid grid-cols-2 gap-8">{stats.map((s) => <Stat key={s.label} s={s} />)}</div>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <div aria-hidden className="absolute -inset-4 -rotate-3 rounded-[2rem] bg-wine-rose dark:bg-night-card" />
          <Img src={img.classroom} alt="A group of learners in a workshop" className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
        </Reveal>
      </section>

      <section className="bg-white py-20 dark:bg-night-card/40">
        <div className="container-x max-w-4xl">
          <h2 className="mb-14 text-center font-serif text-3xl font-bold md:text-4xl">Our story</h2>
          <ol className="relative border-l-2 border-wine-rose pl-8 md:mx-auto dark:border-night-line">
            {timeline.map((t, i) => (
              <motion.li key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.1 }} className="relative mb-12 last:mb-0">
                <span className="absolute -left-[42px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-wine ring-4 ring-cream dark:ring-night"><span className="h-2 w-2 rounded-full bg-gold" /></span>
                <p className="font-serif text-2xl font-bold text-wine dark:text-rose-200">{t.year}</p>
                <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-muted dark:text-stone-400">{t.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold md:text-4xl">What we value</h2>
        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem key={v.title} className="card h-full p-7">
              <span className="inline-flex rounded-xl bg-wine-rose p-3 text-wine dark:bg-night-line dark:text-rose-200"><Icon name={v.icon} className="h-6 w-6" /></span>
              <h3 className="mt-4 font-serif text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted dark:text-stone-400">{v.text}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="bg-wine-rose/40 py-20 dark:bg-night-card/40">
        <div className="container-x">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold md:text-4xl">The team</h2>
          <StaggerGrid className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((m) => (
              <StaggerItem key={m.name} className="group text-center">
                <div className="overflow-hidden rounded-2xl"><Img src={m.avatar.replace('200', '400')} alt={m.name} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <h3 className="mt-4 font-serif text-lg font-bold">{m.name}</h3>
                <p className="text-sm text-muted dark:text-stone-400">{m.role}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <div className="mt-14 text-center"><Button to="/contact" size="lg">Get in touch</Button></div>
        </div>
      </section>
    </>
  )
}
