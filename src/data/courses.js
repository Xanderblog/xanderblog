import { img } from './images'

// Builds a realistic curriculum from section titles
const buildCurriculum = (sections) =>
  sections.map((s, si) => ({
    id: `s${si + 1}`,
    title: s.title,
    lessons: s.lessons.map((title, li) => ({
      id: `s${si + 1}-l${li + 1}`,
      title,
      duration: `${6 + ((si * 3 + li * 7) % 14)}:${String((li * 17 + si * 11) % 60).padStart(2, '0')}`,
      free: si === 0 && li < 2,
      type: li % 4 === 3 ? 'article' : 'video',
    })),
  }))

const genericSections = (topic) => [
  { title: 'Getting started', lessons: [`Welcome to ${topic}`, 'How this course works', 'Setting up your tools', 'Your first small win'] },
  { title: 'Core foundations', lessons: ['Key ideas explained', 'Common mistakes to avoid', 'Hands-on exercise', 'Reading: reference notes'] },
  { title: 'Building a real project', lessons: ['Planning the project', 'Step-by-step build', 'Polishing the details', 'Project review checklist'] },
  { title: 'Going further', lessons: ['Advanced techniques', 'Working like a professional', 'Next steps and resources'] },
]

const raw = [
  { id: 'react-complete-guide', title: 'The Complete React Developer Course', subtitle: 'Build modern, fast web apps with React 18, hooks, routing and state management.', category: 'web-development', level: 'Intermediate', price: 49.99, oldPrice: 129.99, rating: 4.9, reviews: 4210, students: 18340, hours: 28, instructorId: 'amara-okafor', image: img.code, bestseller: true, updated: 'September 2026', language: 'English',
    learn: ['Build single-page apps with React 18 and hooks', 'Manage state with Context and reducers', 'Fetch, cache and display data from APIs', 'Structure large projects with reusable components', 'Write accessible, keyboard-friendly interfaces', 'Deploy React apps to the web for free'],
    sections: [
      { title: 'React fundamentals', lessons: ['Welcome and course map', 'What React actually does', 'JSX in ten minutes', 'Components and props', 'Cheat sheet: JSX rules'] },
      { title: 'State and hooks', lessons: ['useState in depth', 'useEffect without the confusion', 'Custom hooks', 'Reading: hooks rules'] },
      { title: 'Routing and data', lessons: ['React Router basics', 'Nested and dynamic routes', 'Fetching data the right way', 'Loading and error states'] },
      { title: 'Capstone: course marketplace', lessons: ['Planning the app', 'Building the catalog', 'Cart and checkout flow', 'Deploying to GitHub Pages'] },
    ] },
  { id: 'javascript-from-zero', title: 'JavaScript from Zero to Confident', subtitle: 'Learn the language of the web through 40 small exercises and 3 projects.', category: 'web-development', level: 'Beginner', price: 0, oldPrice: 0, rating: 4.8, reviews: 6890, students: 41200, hours: 16, instructorId: 'amara-okafor', image: img.code2, bestseller: false, updated: 'August 2026', language: 'English',
    learn: ['Understand variables, functions and objects', 'Work with arrays and loops', 'Manipulate the DOM', 'Handle events and forms', 'Use fetch and async/await', 'Debug with browser devtools'] },
  { id: 'flutter-mobile-apps', title: 'Flutter & Dart: Build Mobile Apps', subtitle: 'Ship beautiful iOS and Android apps from a single codebase.', category: 'mobile-development', level: 'Intermediate', price: 59.99, oldPrice: 149.99, rating: 4.8, reviews: 3120, students: 14800, hours: 32, instructorId: 'daniel-reyes', image: img.laptop, bestseller: true, updated: 'October 2026', language: 'English',
    learn: ['Build layouts with Flutter widgets', 'Manage state with Riverpod', 'Connect to REST APIs and Firebase', 'Add animations and gestures', 'Publish to Play Store and App Store', 'Test and debug mobile apps'] },
  { id: 'python-data-science', title: 'Python for Data Science and Machine Learning', subtitle: 'From pandas basics to your first predictive models.', category: 'data-science', level: 'Beginner', price: 54.99, oldPrice: 139.99, rating: 4.9, reviews: 7340, students: 29400, hours: 36, instructorId: 'priya-sharma', image: img.dashboard, bestseller: true, updated: 'September 2026', language: 'English',
    learn: ['Clean and analyse data with pandas', 'Visualise data with Matplotlib and Seaborn', 'Understand core statistics', 'Train regression and classification models', 'Evaluate models honestly', 'Present findings clearly'] },
  { id: 'deep-learning-essentials', title: 'Deep Learning Essentials', subtitle: 'Neural networks explained with intuition first, then code.', category: 'data-science', level: 'Advanced', price: 79.99, oldPrice: 179.99, rating: 4.7, reviews: 1890, students: 8200, hours: 24, instructorId: 'priya-sharma', image: img.analytics, bestseller: false, updated: 'July 2026', language: 'English',
    learn: ['Understand how neural networks learn', 'Build models with PyTorch', 'Work with images using CNNs', 'Handle text with transformers', 'Avoid overfitting', 'Deploy a model as an API'] },
  { id: 'ui-ux-design-masterclass', title: 'UI/UX Design Masterclass with Figma', subtitle: 'Design interfaces people enjoy using, and build a portfolio that gets interviews.', category: 'design', level: 'Beginner', price: 44.99, oldPrice: 119.99, rating: 4.8, reviews: 2940, students: 13600, hours: 20, instructorId: 'lucas-martin', image: img.design, bestseller: true, updated: 'October 2026', language: 'English',
    learn: ['Master Figma from scratch', 'Run user interviews and usability tests', 'Create wireframes and prototypes', 'Build a reusable design system', 'Apply colour and typography with confidence', 'Present case studies'] },
  { id: 'design-systems-pro', title: 'Design Systems for Product Teams', subtitle: 'Tokens, components and documentation that scale.', category: 'design', level: 'Advanced', price: 69.99, oldPrice: 149.99, rating: 4.7, reviews: 860, students: 4100, hours: 14, instructorId: 'lucas-martin', image: img.ux, bestseller: false, updated: 'June 2026', language: 'English',
    learn: ['Define design tokens', 'Build variant-rich components', 'Document usage guidelines', 'Bridge design and code', 'Run adoption across teams', 'Measure system health'] },
  { id: 'digital-marketing-2026', title: 'Digital Marketing Strategy 2026', subtitle: 'SEO, social, email and paid ads, with real budgets and real results.', category: 'marketing', level: 'Beginner', price: 39.99, oldPrice: 99.99, rating: 4.7, reviews: 3410, students: 16900, hours: 18, instructorId: 'chidinma-eze', image: img.social, bestseller: false, updated: 'September 2026', language: 'English',
    learn: ['Build a marketing plan from scratch', 'Rank on Google with practical SEO', 'Grow on Instagram, TikTok and LinkedIn', 'Write emails people open', 'Run profitable paid ads', 'Track results with analytics'] },
  { id: 'startup-fundamentals', title: 'Startup Fundamentals: Idea to First Customers', subtitle: 'Validate, launch and grow a small business without wasting money.', category: 'business', level: 'Beginner', price: 34.99, oldPrice: 89.99, rating: 4.6, reviews: 1270, students: 7600, hours: 12, instructorId: 'james-whitfield', image: img.business, bestseller: false, updated: 'May 2026', language: 'English',
    learn: ['Validate ideas before building', 'Talk to customers effectively', 'Price your product', 'Build a lean launch plan', 'Understand basic unit economics', 'Pitch to investors'] },
  { id: 'photography-masterclass', title: 'Photography Masterclass: Light and Composition', subtitle: 'Take photos you are proud of, with any camera, including your phone.', category: 'photography', level: 'Beginner', price: 29.99, oldPrice: 79.99, rating: 4.9, reviews: 2180, students: 11300, hours: 15, instructorId: 'sofia-rossi', image: img.camera, bestseller: true, updated: 'August 2026', language: 'English',
    learn: ['Understand exposure and camera modes', 'Compose with intention', 'Use natural and artificial light', 'Edit in Lightroom', 'Shoot portraits, food and travel', 'Build a consistent style'] },
  { id: 'personal-finance-basics', title: 'Personal Finance: Budget, Save, Invest', subtitle: 'A calm, practical guide to taking control of your money.', category: 'finance', level: 'Beginner', price: 0, oldPrice: 0, rating: 4.8, reviews: 5020, students: 33700, hours: 8, instructorId: 'kwame-mensah', image: img.finance, bestseller: false, updated: 'September 2026', language: 'English',
    learn: ['Create a budget you can keep', 'Build an emergency fund', 'Pay off debt strategically', 'Understand stocks, bonds and funds', 'Start investing with small amounts', 'Plan for long-term goals'] },
  { id: 'node-backend-apis', title: 'Node.js Backend: Build REST APIs', subtitle: 'Express, databases, authentication and deployment.', category: 'web-development', level: 'Intermediate', price: 52.99, oldPrice: 129.99, rating: 4.7, reviews: 1980, students: 9800, hours: 22, instructorId: 'amara-okafor', image: img.code3, bestseller: false, updated: 'October 2026', language: 'English',
    learn: ['Design clean REST endpoints', 'Work with PostgreSQL and MongoDB', 'Add JWT authentication', 'Validate input and handle errors', 'Write automated tests', 'Deploy APIs to the cloud'] },
  { id: 'accounting-small-business', title: 'Accounting for Small Business Owners', subtitle: 'Read your numbers, file with confidence and plan ahead.', category: 'finance', level: 'Intermediate', price: 37.99, oldPrice: 89.99, rating: 4.6, reviews: 740, students: 3900, hours: 10, instructorId: 'kwame-mensah', image: img.study, bestseller: false, updated: 'April 2026', language: 'English',
    learn: ['Read a profit and loss statement', 'Track cash flow', 'Separate business and personal money', 'Prepare for tax season', 'Set simple financial goals', 'Choose the right tools'] },
  { id: 'leadership-for-new-managers', title: 'Leadership for New Managers', subtitle: 'Lead your first team with clarity and confidence.', category: 'business', level: 'Intermediate', price: 42.99, oldPrice: 99.99, rating: 4.7, reviews: 990, students: 5200, hours: 9, instructorId: 'james-whitfield', image: img.classroom, bestseller: false, updated: 'July 2026', language: 'English',
    learn: ['Run effective one-on-ones', 'Give feedback that lands', 'Delegate without micromanaging', 'Handle conflict calmly', 'Set goals your team owns', 'Grow your own career'] },
]

export const courses = raw.map((c) => {
  const curriculum = buildCurriculum(c.sections || genericSections(c.title.split(':')[0]))
  const lessons = curriculum.reduce((n, s) => n + s.lessons.length, 0)
  return {
    ...c,
    curriculum,
    lessons,
    description: `${c.subtitle} This course is built around practical work: every section ends with an exercise, and you finish with a project you can show to employers or clients. Lessons are short, captions are included, and you can learn at your own pace on any device. You get lifetime access, downloadable resources and a certificate of completion.`,
    requirements: ['A computer or phone with internet access', 'Curiosity and about 3 hours a week', c.level === 'Beginner' ? 'No prior experience needed' : 'Basic familiarity with the topic'],
    durationBucket: c.hours < 10 ? 'short' : c.hours <= 20 ? 'medium' : 'long',
  }
})

export const getCourse = (id) => courses.find((c) => c.id === id)
export const levels = ['Beginner', 'Intermediate', 'Advanced']
export const reviewsFor = (courseId) => [
  { id: 1, name: 'Tunde A.', avatar: 'https://i.pravatar.cc/100?img=11', rating: 5, date: '2 weeks ago', text: 'Clear explanations and the projects actually felt like real work. I used the final project in my portfolio and got two interview calls.' },
  { id: 2, name: 'Grace M.', avatar: 'https://i.pravatar.cc/100?img=5', rating: 5, date: '1 month ago', text: 'The pace is perfect. Short lessons, no filler, and the instructor answers questions in the Q&A quickly.' },
  { id: 3, name: 'Oliver K.', avatar: 'https://i.pravatar.cc/100?img=14', rating: 4, date: '1 month ago', text: 'Very good overall. A couple of sections could use more exercises, but the resources make up for it.' },
  { id: 4, name: 'Fatima S.', avatar: 'https://i.pravatar.cc/100?img=9', rating: 5, date: '2 months ago', text: 'I tried learning this on YouTube for months. This course finally made it click.' },
]
export const ratingBreakdown = [
  { stars: 5, pct: 78 }, { stars: 4, pct: 15 }, { stars: 3, pct: 4 }, { stars: 2, pct: 2 }, { stars: 1, pct: 1 },
]
