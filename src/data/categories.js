export const categories = [
  { id: 'web-development', name: 'Web Development', icon: 'Code2', color: '#722F37', description: 'HTML, CSS, JavaScript, React and full-stack frameworks.' },
  { id: 'mobile-development', name: 'Mobile Development', icon: 'Smartphone', color: '#9B3B47', description: 'Build apps for iOS and Android with Flutter and React Native.' },
  { id: 'data-science', name: 'Data Science', icon: 'BarChart3', color: '#4A0E1C', description: 'Python, statistics, machine learning and data visualisation.' },
  { id: 'design', name: 'UI/UX Design', icon: 'Palette', color: '#C9A227', description: 'Interface design, Figma, research and design systems.' },
  { id: 'business', name: 'Business', icon: 'Briefcase', color: '#722F37', description: 'Entrepreneurship, management and strategy.' },
  { id: 'marketing', name: 'Digital Marketing', icon: 'Megaphone', color: '#9B3B47', description: 'SEO, social media, content and paid ads.' },
  { id: 'photography', name: 'Photography', icon: 'Camera', color: '#4A0E1C', description: 'Composition, lighting, editing and gear.' },
  { id: 'finance', name: 'Finance', icon: 'Wallet', color: '#C9A227', description: 'Personal finance, investing and accounting basics.' },
]
export const getCategory = (id) => categories.find((c) => c.id === id)
