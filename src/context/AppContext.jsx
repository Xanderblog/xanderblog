import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('xb-theme', prefersDark ? 'dark' : 'light')
  const [cart, setCart] = useLocalStorage('xb-cart', ['flutter-mobile-apps', 'photography-masterclass'])
  const [wishlist, setWishlist] = useLocalStorage('xb-wishlist', ['deep-learning-essentials', 'design-systems-pro'])
  const [user, setUser] = useLocalStorage('xb-user', { name: 'Xander Omotunmise', email: 'xander@example.com', avatar: 'https://i.pravatar.cc/200?img=68', loggedIn: true })
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    cart,
    addToCart: (id) => {
      if (cart.includes(id)) return toast('This course is already in your cart', 'info')
      setCart([...cart, id]); toast('Added to cart')
    },
    removeFromCart: (id) => { setCart(cart.filter((c) => c !== id)); toast('Removed from cart', 'info') },
    clearCart: () => setCart([]),
    wishlist,
    toggleWishlist: (id) => {
      if (wishlist.includes(id)) { setWishlist(wishlist.filter((w) => w !== id)); toast('Removed from wishlist', 'info') }
      else { setWishlist([...wishlist, id]); toast('Saved to wishlist') }
    },
    user,
    login: (email) => setUser({ ...user, email, loggedIn: true }),
    logout: () => { setUser({ ...user, loggedIn: false }); toast('Logged out', 'info') },
    updateUser: (data) => setUser({ ...user, ...data }),
    toast,
  }), [theme, cart, wishlist, user, toast, setTheme, setCart, setWishlist, setUser])

  return (
    <AppContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = t.type === 'success' ? CheckCircle2 : t.type === 'error' ? AlertTriangle : Info
            return (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="flex items-center gap-3 rounded-xl bg-wine-deep px-4 py-3 text-sm text-white shadow-lift">
                <Icon className={`h-5 w-5 ${t.type === 'error' ? 'text-red-300' : 'text-gold'}`} aria-hidden />
                <span>{t.message}</span>
                <button onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))} aria-label="Dismiss notification" className="ml-1 rounded p-0.5 hover:bg-white/10"><X className="h-4 w-4" /></button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
