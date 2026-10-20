import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Trash2, ShoppingCart, Tag, Heart, ShieldCheck } from 'lucide-react'
import { PageHeader, Button, Img, EmptyState, StarRating } from '../components/ui'
import { CourseCard } from '../components/Cards'
import { getCourse, courses } from '../data/courses'
import { getInstructor } from '../data/instructors'
import { useApp } from '../context/AppContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const COUPONS = { XANDER20: 0.2, LEARN10: 0.1 }

export function useTotals(coupon) {
  const { cart } = useApp()
  const items = cart.map(getCourse).filter(Boolean)
  const subtotal = items.reduce((n, c) => n + c.price, 0)
  const original = items.reduce((n, c) => n + (c.oldPrice || c.price), 0)
  const discount = coupon ? subtotal * (COUPONS[coupon] || 0) : 0
  return { items, subtotal, original, discount, total: subtotal - discount }
}

export function OrderSummary({ coupon, children }) {
  const { items, subtotal, original, discount, total } = useTotals(coupon)
  return (
    <div className="card p-6">
      <h2 className="font-serif text-xl font-bold">Order summary</h2>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between"><dt className="text-muted dark:text-stone-400">Original price ({items.length} {items.length === 1 ? 'course' : 'courses'})</dt><dd className="line-through">${original.toFixed(2)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted dark:text-stone-400">Sale price</dt><dd>${subtotal.toFixed(2)}</dd></div>
        {discount > 0 && <div className="flex justify-between text-emerald-700 dark:text-emerald-400"><dt>Coupon {coupon}</dt><dd>−${discount.toFixed(2)}</dd></div>}
        <div className="flex justify-between border-t border-wine-rose pt-3 text-lg font-bold dark:border-night-line"><dt>Total</dt><dd className="text-wine dark:text-rose-200">${total.toFixed(2)}</dd></div>
      </dl>
      {children}
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted dark:text-stone-400"><ShieldCheck className="h-4 w-4" />30-day money-back guarantee</p>
    </div>
  )
}

export default function Cart() {
  useDocumentTitle('Cart')
  const { cart, removeFromCart, toggleWishlist, toast } = useApp()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [coupon, setCoupon] = useState(() => sessionStorage.getItem('xb-coupon') || '')
  const [err, setErr] = useState('')
  const { items } = useTotals(coupon)
  const apply = (e) => {
    e.preventDefault()
    const c = code.trim().toUpperCase()
    if (!COUPONS[c]) return setErr('This code is not valid. Try XANDER20.')
    setErr(''); setCoupon(c); sessionStorage.setItem('xb-coupon', c); toast(`Coupon applied: ${COUPONS[c] * 100}% off`)
  }
  const suggestions = courses.filter((c) => !cart.includes(c.id)).slice(0, 3)

  return (
    <>
      <PageHeader title="Shopping cart" crumbs={[{ label: 'Cart' }]} />
      <div className="container-x py-12">
        {items.length === 0 ? (
          <EmptyState icon={ShoppingCart} title="Your cart is empty" text="Find a course you like and add it here. Free courses can be started right away." action={<Button to="/courses">Browse courses</Button>} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-4 font-semibold">{items.length} {items.length === 1 ? 'course' : 'courses'} in cart</p>
              <ul className="space-y-4">
                <AnimatePresence>
                  {items.map((c) => (
                    <motion.li key={c.id} layout exit={{ opacity: 0, x: -40 }} className="card flex flex-col gap-4 p-4 sm:flex-row">
                      <Img src={c.image} alt="" className="aspect-video w-full rounded-xl object-cover sm:w-44" />
                      <div className="flex-1">
                        <Link to={`/courses/${c.id}`} className="font-serif text-lg font-bold hover:text-wine">{c.title}</Link>
                        <p className="text-sm text-muted dark:text-stone-400">By {getInstructor(c.instructorId).name}</p>
                        <div className="mt-1"><StarRating value={c.rating} count={c.reviews} size={12} /></div>
                        <p className="mt-1 text-xs text-muted dark:text-stone-400">{c.hours} hours · {c.lessons} lessons · {c.level}</p>
                        <div className="mt-3 flex gap-4 text-sm">
                          <button onClick={() => removeFromCart(c.id)} className="flex items-center gap-1 font-medium text-wine hover:underline dark:text-rose-200"><Trash2 className="h-4 w-4" />Remove</button>
                          <button onClick={() => { toggleWishlist(c.id); removeFromCart(c.id) }} className="flex items-center gap-1 font-medium text-muted hover:underline"><Heart className="h-4 w-4" />Move to wishlist</button>
                        </div>
                      </div>
                      <div className="text-right"><p className="text-xl font-bold text-wine dark:text-rose-200">{c.price === 0 ? 'Free' : `$${c.price.toFixed(2)}`}</p>{c.oldPrice > 0 && <p className="text-sm text-muted line-through">${c.oldPrice.toFixed(2)}</p>}</div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <OrderSummary coupon={coupon}>
                <Button size="lg" className="mt-6 w-full" onClick={() => navigate('/checkout')}>Proceed to checkout</Button>
              </OrderSummary>
              <form onSubmit={apply} className="card p-6" noValidate>
                <label htmlFor="coupon" className="flex items-center gap-2 font-semibold"><Tag className="h-4 w-4 text-wine dark:text-rose-200" />Have a coupon?</label>
                <div className="mt-3 flex gap-2">
                  <input id="coupon" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" aria-invalid={!!err} className={`min-w-0 flex-1 rounded-xl border bg-white px-4 py-2.5 text-sm uppercase outline-none dark:bg-night ${err ? 'border-red-400' : 'border-stone-200 focus:border-wine dark:border-night-line'}`} />
                  <Button type="submit" variant="outline">Apply</Button>
                </div>
                {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
                {coupon && <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-400">{coupon} applied. <button type="button" onClick={() => { setCoupon(''); sessionStorage.removeItem('xb-coupon') }} className="underline">Remove</button></p>}
              </form>
            </aside>
          </div>
        )}
        <section className="mt-20">
          <h2 className="mb-6 font-serif text-2xl font-bold">You might also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{suggestions.map((c) => <CourseCard key={c.id} course={c} />)}</div>
        </section>
      </div>
    </>
  )
}
