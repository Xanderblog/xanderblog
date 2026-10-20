import { avatar, img } from './images'

export const testimonials = [
  { id: 1, name: 'Ifeoma Nwosu', role: 'Frontend Developer at Paystack', avatar: avatar(49), rating: 5, text: 'I went from copying tutorials to shipping features at work in six months. The React course and the blog articles were my daily routine.' },
  { id: 2, name: 'Carlos Mendes', role: 'Freelance Flutter Developer', avatar: avatar(13), rating: 5, text: 'The Flutter course paid for itself with my first client project. Daniel explains things the way a senior colleague would.' },
  { id: 3, name: 'Hannah Lee', role: 'Data Analyst', avatar: avatar(41), rating: 5, text: 'Priya made statistics feel approachable for the first time. I switched careers from retail to analytics.' },
  { id: 4, name: 'Samuel Adeyemi', role: 'Founder, Kora Foods', avatar: avatar(60), rating: 4, text: 'The startup and marketing courses gave me a plan I could follow on weekends while keeping my job.' },
  { id: 5, name: 'Elena Petrova', role: 'Product Designer', avatar: avatar(48), rating: 5, text: 'My portfolio case studies came straight out of the UI/UX masterclass. Two offers within a month.' },
  { id: 6, name: 'Yusuf Bello', role: 'University Student', avatar: avatar(52), rating: 5, text: 'The free courses are better than some paid ones I tried. The certificates helped me land an internship.' },
]

export const stats = [
  { label: 'Students learning', value: 128000, suffix: '+' },
  { label: 'Courses available', value: 340, suffix: '' },
  { label: 'Expert instructors', value: 85, suffix: '' },
  { label: 'Average rating', value: 4.8, suffix: '/5', decimals: 1 },
]

export const plans = [
  { id: 'free', name: 'Free', monthly: 0, yearly: 0, description: 'Start learning with free courses and articles.', features: ['Access to free courses', 'All blog articles', 'Community Q&A', 'Mobile access'], cta: 'Start for free' },
  { id: 'pro', name: 'Pro', monthly: 19, yearly: 15, popular: true, description: 'Unlimited courses for serious learners.', features: ['Everything in Free', 'All 340+ courses', 'Certificates of completion', 'Downloadable resources', 'Offline viewing'], cta: 'Get Pro' },
  { id: 'premium', name: 'Premium', monthly: 39, yearly: 31, description: 'Mentorship and career support on top of Pro.', features: ['Everything in Pro', 'Monthly 1:1 mentor call', 'Portfolio and CV review', 'Private career community', 'Priority support'], cta: 'Get Premium' },
]

export const comparison = [
  { feature: 'Free courses', free: true, pro: true, premium: true },
  { feature: 'Blog articles', free: true, pro: true, premium: true },
  { feature: 'All premium courses', free: false, pro: true, premium: true },
  { feature: 'Certificates', free: false, pro: true, premium: true },
  { feature: 'Downloadable resources', free: false, pro: true, premium: true },
  { feature: 'Offline viewing', free: false, pro: true, premium: true },
  { feature: '1:1 mentor calls', free: false, pro: false, premium: 'Monthly' },
  { feature: 'Portfolio review', free: false, pro: false, premium: true },
  { feature: 'Support', free: 'Community', pro: 'Email', premium: 'Priority' },
]

export const faqs = [
  { q: 'How do I enrol in a course?', a: 'Open any course page and select "Enrol now" for free courses or "Add to cart" for paid ones. After checkout, the course appears in your dashboard under My Courses.', topic: 'Courses' },
  { q: 'Do I get lifetime access?', a: 'Yes. Courses you buy individually are yours for life, including future updates. Subscription plans give access for as long as your plan is active.', topic: 'Courses' },
  { q: 'Are the certificates recognised?', a: 'Certificates show that you completed the course and its projects. Many students add them to LinkedIn and CVs. They are not accredited university qualifications.', topic: 'Certificates' },
  { q: 'Can I learn on my phone?', a: 'Yes. The site works on any modern phone, and Pro members can download lessons for offline viewing in our mobile apps.', topic: 'Platform' },
  { q: 'What payment methods do you accept?', a: 'We accept debit and credit cards, bank transfer and PayPal in most countries. Prices are shown in USD and converted by your bank.', topic: 'Payments' },
  { q: 'Can I get a refund?', a: 'Individual course purchases can be refunded within 30 days if you have watched less than 30% of the content.', topic: 'Payments' },
  { q: 'How do I become an instructor?', a: 'Visit the Become an Instructor page and submit the application form. Our team reviews every application within five working days.', topic: 'Instructors' },
  { q: 'Can I switch between monthly and yearly billing?', a: 'Yes. You can switch at any time from Profile Settings. The change applies from your next billing date.', topic: 'Payments' },
  { q: 'Do courses have deadlines?', a: 'No. All courses are self-paced, so you can start, pause and finish whenever it suits you.', topic: 'Courses' },
]

export const team = [
  { name: 'Xander Omotunmise', role: 'Founder & Lead Engineer', avatar: avatar(68) },
  { name: 'Bisi Adewale', role: 'Head of Content', avatar: avatar(43) },
  { name: 'Ethan Clarke', role: 'Head of Design', avatar: avatar(57) },
  { name: 'Zainab Musa', role: 'Community Lead', avatar: avatar(38) },
]

export const timeline = [
  { year: '2021', title: 'A blog in a bedroom', text: 'XanderBlog started as a personal blog sharing web development notes with a handful of readers.' },
  { year: '2022', title: 'First course', text: 'Readers asked for structure, so we launched our first video course. 2,000 students joined in the first month.' },
  { year: '2024', title: 'Opening to instructors', text: 'We invited practitioners from design, data and business to teach. The catalogue grew to 100 courses.' },
  { year: '2026', title: '128,000 learners', text: 'Today learners from over 90 countries use XanderBlog to change careers, start businesses and keep growing.' },
]

export const values = [
  { icon: 'Target', title: 'Practical first', text: 'Every lesson leads to something you can build, use or show.' },
  { icon: 'Heart', title: 'Respect for learners', text: 'No filler, no dark patterns, no pressure. Just good teaching.' },
  { icon: 'Globe', title: 'Open to everyone', text: 'Free courses and articles so cost is never the first barrier.' },
  { icon: 'Sparkles', title: 'Always improving', text: 'Courses are updated as tools and industries change.' },
]

export const dashboardData = {
  enrolled: [
    { courseId: 'react-complete-guide', progress: 68, lastLesson: 'Custom hooks' },
    { courseId: 'python-data-science', progress: 34, lastLesson: 'Key ideas explained' },
    { courseId: 'ui-ux-design-masterclass', progress: 100, lastLesson: 'Next steps and resources' },
    { courseId: 'personal-finance-basics', progress: 12, lastLesson: 'How this course works' },
  ],
  weekly: [
    { day: 'Mon', minutes: 45 }, { day: 'Tue', minutes: 30 }, { day: 'Wed', minutes: 75 },
    { day: 'Thu', minutes: 20 }, { day: 'Fri', minutes: 60 }, { day: 'Sat', minutes: 90 }, { day: 'Sun', minutes: 40 },
  ],
  certificates: [
    { id: 'XB-2026-0912', courseId: 'ui-ux-design-masterclass', date: 'Sep 30, 2026' },
    { id: 'XB-2026-0418', courseId: 'javascript-from-zero', date: 'Apr 18, 2026' },
  ],
  purchases: [
    { id: 'INV-10482', date: 'Oct 2, 2026', item: 'The Complete React Developer Course', amount: 49.99, method: 'Visa •••• 4417', status: 'Paid' },
    { id: 'INV-10311', date: 'Aug 21, 2026', item: 'Python for Data Science and Machine Learning', amount: 54.99, method: 'Mastercard •••• 2280', status: 'Paid' },
    { id: 'INV-10102', date: 'Jun 5, 2026', item: 'UI/UX Design Masterclass with Figma', amount: 44.99, method: 'PayPal', status: 'Paid' },
    { id: 'INV-09870', date: 'Mar 12, 2026', item: 'Pro plan (monthly)', amount: 19.0, method: 'Visa •••• 4417', status: 'Refunded' },
  ],
}

export const authImage = img.auth
