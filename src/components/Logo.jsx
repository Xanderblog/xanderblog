import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export default function Logo({ light }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="XanderBlog home">
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${light ? 'bg-white/10' : 'bg-wine'}`}>
        <GraduationCap className={`h-5 w-5 ${light ? 'text-gold' : 'text-gold'}`} aria-hidden />
      </span>
      <span className={`font-serif text-xl font-bold ${light ? 'text-white' : 'text-wine dark:text-white'}`}>Xander<span className={light ? 'text-gold' : 'text-ink dark:text-rose-200'}>Blog</span></span>
    </Link>
  )
}
