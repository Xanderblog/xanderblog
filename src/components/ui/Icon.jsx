import { Code2, Smartphone, BarChart3, Palette, Briefcase, Megaphone, Camera, Wallet, Target, Heart, Globe, Sparkles, BookOpen } from 'lucide-react'

const map = { Code2, Smartphone, BarChart3, Palette, Briefcase, Megaphone, Camera, Wallet, Target, Heart, Globe, Sparkles }

export default function Icon({ name, ...props }) {
  const C = map[name] || BookOpen
  return <C aria-hidden {...props} />
}
