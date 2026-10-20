import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Lock, CheckCircle2, Building2, Wallet } from 'lucide-react'
import { PageHeader, Button, Field, Img, EmptyState } from '../components/ui'
import { OrderSummary, useTotals } from './Cart'
import { useApp } from '../context/AppContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Checkout() {
  useDocumentTitle('Checkout')
  const coupon = sessionStorage.getItem('xb-coupon') || ''
  const { items, total } = useTotals(coupon)
  const { clearCart, user } = useApp()
  const navigate = useNavigate()
  const [method, setMethod] = useState('card')
  const [form, setForm] = useState({ name: user.name || '', email: user.email || '', country: 'Nigeria', card: '', expiry: '', cvc: '' })
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k) => (e) => {
    let v = e.target.value
    if (k === 'card') v = v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
    if (k === 'expiry') v = v.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2')
    if (k === 'cvc') v = v.replace(/\D/g, '').slice(0, 4)
    setForm({ ...form, [k]: v })
  }
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (method === 'card') {
      if (form.card.replace(/\s/g, '').length < 16) e.card = 'Card number must be 16 digits'
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Use MM/YY'
      if (form.cvc.length < 3) e.cvc = '3 or 4 digits'
    }
    setErrors(e); return !Object.keys(e).length
  }
  const pay = (e) => {
    e.preventDefault()
    if (!validate()) return
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setDone(true); clearCart(); sessionStorage.removeItem('xb-coupon') }, 1600)
  }

  if (done) return (
    <div className="container-x flex min-h-[70vh] items-center justify-center pt-24">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card max-w-md p-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}><CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" /></motion.div>
        <h1 className="mt-4 font-serif text-3xl font-bold">Payment successful</h1>
        <p className="mt-2 text-muted dark:text-stone-400">Your courses are ready. A receipt has been sent to {form.email}.</p>
        <div className="mt-6 flex flex-col gap-3"><Button to="/dashboard/courses" size="lg">Go to my courses</Button><Button to="/courses" variant="ghost">Keep browsing</Button></div>
      </motion.div>
    </div>
  )

  return (
    <>
      <PageHeader title="Checkout" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <div className="container-x py-12">
        {items.length === 0 ? (
          <EmptyState icon={CreditCard} title="Nothing to check out" text="Add a course to your cart first." action={<Button to="/courses">Browse courses</Button>} />
        ) : (
          <form onSubmit={pay} noValidate className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              <section className="card p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold">Billing details</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
                  <Field label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
                  <Field as="select" label="Country" value={form.country} onChange={set('country')} className="sm:col-span-2">
                    {['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United Kingdom', 'United States', 'Canada'].map((c) => <option key={c}>{c}</option>)}
                  </Field>
                </div>
              </section>
              <section className="card p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold">Payment method</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Payment method">
                  {[['card', 'Card', CreditCard], ['bank', 'Bank transfer', Building2], ['paypal', 'PayPal', Wallet]].map(([id, label, I]) => (
                    <button type="button" key={id} role="radio" aria-checked={method === id} onClick={() => setMethod(id)} className={`flex items-center gap-3 rounded-xl border-2 p-4 text-sm font-semibold transition ${method === id ? 'border-wine bg-wine-rose/50 dark:bg-wine/15' : 'border-stone-200 hover:border-wine/50 dark:border-night-line'}`}><I className="h-5 w-5 text-wine dark:text-rose-200" />{label}</button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={method} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
                    {method === 'card' && (
                      <div className="grid gap-4 sm:grid-cols-4">
                        <Field label="Card number" inputMode="numeric" placeholder="4242 4242 4242 4242" value={form.card} onChange={set('card')} error={errors.card} className="sm:col-span-4" autoComplete="cc-number" />
                        <Field label="Expiry" placeholder="MM/YY" value={form.expiry} onChange={set('expiry')} error={errors.expiry} className="sm:col-span-2" autoComplete="cc-exp" />
                        <Field label="CVC" placeholder="123" value={form.cvc} onChange={set('cvc')} error={errors.cvc} className="sm:col-span-2" autoComplete="cc-csc" />
                      </div>
                    )}
                    {method === 'bank' && <p className="rounded-xl bg-cream p-4 text-sm dark:bg-night">After placing your order you will receive account details by email. Access unlocks once the transfer is confirmed, usually within an hour.</p>}
                    {method === 'paypal' && <p className="rounded-xl bg-cream p-4 text-sm dark:bg-night">You will be redirected to PayPal to complete your purchase securely.</p>}
                  </motion.div>
                </AnimatePresence>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted dark:text-stone-400"><Lock className="h-3.5 w-3.5" />This is a demo. No real payment is taken.</p>
              </section>
            </div>
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="card space-y-3 p-6">
                {items.map((c) => <div key={c.id} className="flex items-center gap-3"><Img src={c.image} alt="" className="h-12 w-16 rounded-lg object-cover" /><p className="flex-1 text-sm font-medium leading-snug">{c.title}</p><p className="text-sm font-bold">{c.price === 0 ? 'Free' : `$${c.price.toFixed(2)}`}</p></div>)}
              </div>
              <OrderSummary coupon={coupon}>
                <Button type="submit" size="lg" className="mt-6 w-full" disabled={processing}>
                  {processing ? <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} className="h-4 w-4 rounded-full border-2 border-white border-t-transparent" />Processing…</> : <><Lock className="h-4 w-4" />Pay ${total.toFixed(2)}</>}
                </Button>
                <p className="mt-3 text-center text-xs text-muted">By paying you agree to our <Link to="/terms" className="underline">terms</Link>.</p>
              </OrderSummary>
            </aside>
          </form>
        )}
      </div>
    </>
  )
}
