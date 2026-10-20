import { img } from './images'

const body = (topic) => [
  { id: 'introduction', heading: 'Introduction', paragraphs: [
    `${topic} is one of those subjects that looks simple from the outside and gets deep quickly once you start. In this article we will walk through the ideas that matter most, the mistakes beginners make, and a practical way to get better week by week.`,
    'You do not need any special tools to follow along. A notebook, an open mind and about fifteen minutes is enough.' ] },
  { id: 'why-it-matters', heading: 'Why it matters', paragraphs: [
    'Most people learn by collecting tips. The people who actually improve learn by building a mental model first, then testing it with small experiments. That shift alone saves months of frustration.',
    'When you understand why something works, you can adapt it to new situations instead of memorising rules that break the moment conditions change.' ] },
  { id: 'a-practical-approach', heading: 'A practical approach', paragraphs: [
    'Start with one small, finishable project. Give yourself a deadline of one week. Write down what you expect to happen before you begin, then compare it with what actually happened.',
    'Keep a short learning log: three lines per day about what you tried, what surprised you and what you want to try next. After a month, this log becomes the most valuable resource you own.' ],
    quote: 'Progress comes from finishing small things, not from planning big things.' },
  { id: 'common-mistakes', heading: 'Common mistakes', paragraphs: [
    'Trying to learn everything at once. Switching resources every few days. Waiting until you feel ready. Each of these feels productive but quietly slows you down.',
    'Pick one resource, stay with it for a few weeks, and only move on once you have built something with what you learned.' ] },
  { id: 'conclusion', heading: 'Conclusion', paragraphs: [
    'Getting good is less about talent and more about consistent, deliberate practice. Choose your first small project today, and come back to this article when you finish it.' ] },
]

const raw = [
  { id: 'how-to-learn-to-code-in-2026', title: 'How to Learn to Code in 2026 Without Burning Out', excerpt: 'A realistic plan for beginners: what to learn first, how long it takes, and how to stay motivated.', category: 'web-development', tags: ['Beginners', 'Career', 'JavaScript'], authorId: 'amara-okafor', date: 'Oct 14, 2026', readTime: 8, image: img.code4, featured: true },
  { id: 'react-server-components-explained', title: 'React Server Components, Explained Simply', excerpt: 'What they are, when they help, and when a classic single-page app is still the better choice.', category: 'web-development', tags: ['React', 'Performance'], authorId: 'amara-okafor', date: 'Oct 9, 2026', readTime: 10, image: img.code },
  { id: 'flutter-vs-react-native', title: 'Flutter vs React Native: An Honest Comparison', excerpt: 'We built the same app twice. Here is what we learned about speed, tooling and developer happiness.', category: 'mobile-development', tags: ['Flutter', 'React Native', 'Mobile'], authorId: 'daniel-reyes', date: 'Oct 3, 2026', readTime: 12, image: img.laptop },
  { id: 'data-science-portfolio-projects', title: '7 Data Science Portfolio Projects That Get Noticed', excerpt: 'Skip the Titanic dataset. These projects show recruiters you can solve real problems.', category: 'data-science', tags: ['Portfolio', 'Python', 'Career'], authorId: 'priya-sharma', date: 'Sep 28, 2026', readTime: 9, image: img.analytics },
  { id: 'color-theory-for-ui-designers', title: 'Colour Theory for UI Designers', excerpt: 'How to build palettes that are accessible, on-brand and pleasant to look at for hours.', category: 'design', tags: ['Colour', 'Accessibility', 'UI'], authorId: 'lucas-martin', date: 'Sep 22, 2026', readTime: 7, image: img.design },
  { id: 'seo-basics-for-small-businesses', title: 'SEO Basics Every Small Business Should Know', excerpt: 'The 20% of SEO work that brings 80% of the results, explained without jargon.', category: 'marketing', tags: ['SEO', 'Small Business'], authorId: 'chidinma-eze', date: 'Sep 15, 2026', readTime: 6, image: img.marketing },
  { id: 'validating-a-startup-idea', title: 'Validating a Startup Idea in Two Weeks', excerpt: 'A step-by-step method to test demand before you write a line of code or spend on ads.', category: 'business', tags: ['Startups', 'Strategy'], authorId: 'james-whitfield', date: 'Sep 8, 2026', readTime: 8, image: img.business },
  { id: 'phone-photography-tips', title: '12 Phone Photography Tips from a Professional', excerpt: 'Your phone is a better camera than you think. These habits make the difference.', category: 'photography', tags: ['Mobile', 'Composition'], authorId: 'sofia-rossi', date: 'Sep 1, 2026', readTime: 5, image: img.camera },
  { id: 'building-an-emergency-fund', title: 'Building an Emergency Fund on a Tight Budget', excerpt: 'Practical steps to start saving even when money feels stretched.', category: 'finance', tags: ['Saving', 'Budgeting'], authorId: 'kwame-mensah', date: 'Aug 25, 2026', readTime: 6, image: img.finance },
  { id: 'study-techniques-that-work', title: 'Study Techniques That Are Backed by Research', excerpt: 'Spaced repetition, active recall and interleaving: what they are and how to use them.', category: 'business', tags: ['Learning', 'Productivity'], authorId: 'priya-sharma', date: 'Aug 18, 2026', readTime: 7, image: img.study },
  { id: 'accessibility-checklist', title: 'A Front-End Accessibility Checklist', excerpt: 'Twenty checks you can run in an afternoon to make your site usable by everyone.', category: 'web-development', tags: ['Accessibility', 'HTML'], authorId: 'amara-okafor', date: 'Aug 11, 2026', readTime: 9, image: img.tech },
  { id: 'writing-ux-copy', title: 'Writing Interface Copy People Actually Read', excerpt: 'Short, clear words make products easier to use. Here is how to write them.', category: 'design', tags: ['UX Writing', 'UI'], authorId: 'lucas-martin', date: 'Aug 4, 2026', readTime: 6, image: img.writing },
]

export const articles = raw.map((a) => ({ ...a, content: body(a.title.split(':')[0]) }))
export const getArticle = (id) => articles.find((a) => a.id === id)
export const allTags = [...new Set(raw.flatMap((a) => a.tags))]
export const commentsFor = () => [
  { id: 1, name: 'Ngozi P.', avatar: 'https://i.pravatar.cc/100?img=23', date: '3 days ago', text: 'This is exactly what I needed this week. The learning log idea is brilliant.' },
  { id: 2, name: 'Marcus T.', avatar: 'https://i.pravatar.cc/100?img=33', date: '5 days ago', text: 'Great article. Would love a follow-up with example projects for each stage.' },
  { id: 3, name: 'Aisha B.', avatar: 'https://i.pravatar.cc/100?img=26', date: '1 week ago', text: 'Shared this with my study group. Clear and practical.' },
]
