import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Sparkles } from 'lucide-react'
import { PageHeader, Button, Reveal, StaggerGrid, StaggerItem, AccordionItem } from '../components/ui'
import { plans, comparison, faqs } from '../data/misc'
import { useApp } from '../context/AppContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Cell = ({ v }) => v === true ? <Check className="mx-auto h-5 w-5 text-wine dark:text-rose-200" aria-label="Included" /> : v === false ? <X className="mx-auto h-5 w-5 text-stone-300 dark:text-stone-600" aria-label="Not included" /> : <span className="text-sm font-medium">{v}</span>

export default function Pricing() {
  useDocumentTitle('Pricing')
  const [yearly, setYearly] = useState(true)
  const { toast } = useApp()
  return (
    <>
      <PageHeader title="Simple, honest pricing" subtitle="Start free. Upgrade when you want unlimited courses, certificates and mentorship." crumbs={[{ label: 'Pricing' }]} />
      <div className="container-x py-16">
        <div className="mb-12 flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold ${!yearly ? 'text-wine dark:text-rose-200' : 'text-muted'}`}>Monthly</span>
          <button role="switch" aria-checked={yearly} aria-label="Bill yearly" onClick={() => setYearly(!yearly)} className={`relative h-8 w-14 rounded-full transition-colors ${yearly ? 'bg-wine' : 'bg-stone-300 dark:bg-night-line'}`}>
            <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow ${yearly ? 'right-1' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-semibold ${yearly ? 'text-wine dark:text-rose-200' : 'text-muted'}`}>Yearly <span className="ml-1 rounded-full bg-gold/20 px-2 py-0.5 text-xs text-[#8a6d12] dark:text-gold">Save 20%</span></span>
        </div>

        <StaggerGrid className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((p) => {
            const amount = yearly ? p.yearly : p.monthly
            return (
              <StaggerItem key={p.id}>
                <motion.div whileHover={{ y: -6 }} className={`relative flex h-full flex-col rounded-2xl p-8 ${p.popular ? 'bg-wine text-white shadow-lift lg:scale-105' : 'card'}`}>
                  {p.popular && <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-wine-deep"><Sparkles className="h-3.5 w-3.5" />Most popular</span>}
                  <h2 className="font-serif text-2xl font-bold">{p.name}</h2>
                  <p className={`mt-2 text-sm ${p.popular ? 'text-white/75' : 'text-muted dark:text-stone-400'}`}>{p.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-serif text-5xl font-bold">$<AnimatePresence mode="wait"><motion.span key={amount} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="inline-block">{amount}</motion.span></AnimatePresence></span>
                    <span className={p.popular ? 'text-white/70' : 'text-muted'}>/month</span>
                  </div>
                  <p className={`mt-1 text-xs ${p.popular ? 'text-white/60' : 'text-muted'}`}>{p.monthly === 0 ? 'Free forever' : yearly ? `Billed $${p.yearly * 12} yearly` : 'Billed monthly'}</p>
                  <ul className="mt-8 flex-1 space-y-3">
                    {p.features.map((f) => <li key={f} className="flex gap-3 text-sm"><Check className={`h-5 w-5 shrink-0 ${p.popular ? 'text-gold' : 'text-wine dark:text-rose-200'}`} />{f}</li>)}
                  </ul>
                  <Button variant={p.popular ? 'gold' : 'outline'} size="lg" className="mt-8 w-full" onClick={() => toast(p.monthly === 0 ? 'Your free plan is active' : `${p.name} plan selected. Continue to checkout.`)}>{p.cta}</Button>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerGrid>

        <Reveal className="mx-auto mt-24 max-w-5xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Compare plans</h2>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">Feature comparison between Free, Pro and Premium plans</caption>
              <thead><tr className="border-b border-wine-rose dark:border-night-line"><th scope="col" className="p-5 font-semibold">Feature</th>{plans.map((p) => <th key={p.id} scope="col" className={`p-5 text-center font-serif text-lg ${p.popular ? 'text-wine dark:text-rose-200' : ''}`}>{p.name}</th>)}</tr></thead>
              <tbody>
                {comparison.map((r) => (
                  <tr key={r.feature} className="border-b border-wine-rose/60 last:border-0 dark:border-night-line">
                    <th scope="row" className="p-5 text-sm font-medium">{r.feature}</th>
                    <td className="p-5 text-center"><Cell v={r.free} /></td>
                    <td className="bg-wine-rose/30 p-5 text-center dark:bg-wine/10"><Cell v={r.pro} /></td>
                    <td className="p-5 text-center"><Cell v={r.premium} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-24 max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold">Billing questions</h2>
          <div className="card overflow-hidden">{faqs.filter((f) => f.topic === 'Payments').map((f) => <AccordionItem key={f.q} title={f.q}><p className="text-sm leading-relaxed text-muted dark:text-stone-400">{f.a}</p></AccordionItem>)}</div>
        </Reveal>
      </div>
    </>
  )
}
