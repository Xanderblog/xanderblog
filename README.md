# XanderBlog

A modern e-learning platform that combines online courses with educational blog articles. Built as a front-end-only React app with realistic mock data, ready to deploy free on GitHub Pages.

![XanderBlog screenshot](docs/screenshot.png)
<!-- Add a screenshot at docs/screenshot.png after your first deploy -->

**Live demo:** https://YOUR-GITHUB-USERNAME.github.io/xanderblog/

## Features

- 20+ fully populated pages: home, course catalogue, course detail, lesson player, blog, article, categories, instructors, pricing, cart, checkout, student dashboard, auth, search, about, contact, FAQ, teach, legal and 404
- Course catalogue with filters (category, level, price, rating, duration), sorting, search and pagination
- Lesson player with progress tracking, notes, resources and Q&A (progress and notes saved in the browser)
- Blog with featured post, categories, tags, reading progress bar and live table of contents
- Working cart with coupon codes (`XANDER20`, `LEARN10`), wishlist and mock checkout with form validation
- Student dashboard with animated charts, my courses, certificates, wishlist, purchase history and settings
- Dark mode, sticky shrinking navbar with mega menu, mobile drawer, toasts, modals, skeleton loaders
- Smooth Framer Motion animations that respect `prefers-reduced-motion`
- Accessible: semantic HTML, keyboard navigation, visible focus states, skip link, ARIA labels

## Tech stack

React 18, Vite 5, Tailwind CSS 3, Framer Motion, React Router 6 (HashRouter), Lucide React.

## Folder structure

```
xanderblog/
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── public/                        # favicon, .nojekyll
├── src/
│   ├── components/
│   │   ├── ui/                    # Button, Badge, Tabs, Accordion, Modal, Field, Skeleton…
│   │   ├── Cards.jsx              # CourseCard, ArticleCard, InstructorCard, TestimonialCard
│   │   ├── Navbar.jsx  Footer.jsx  Logo.jsx  BackToTop.jsx
│   ├── context/AppContext.jsx     # theme, cart, wishlist, user, toasts
│   ├── data/                      # mock courses, articles, instructors, categories…
│   ├── hooks/                     # useCountUp, useScrolled, usePagination…
│   ├── layouts/                   # MainLayout, DashboardLayout
│   ├── pages/                     # every page, plus pages/dashboard/
│   ├── App.jsx  main.jsx  index.css
├── index.html  vite.config.js  tailwind.config.js  package.json
```

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173/xanderblog/
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Deploy to GitHub Pages

1. Create a new **public** repository named `xanderblog` on GitHub (no README, no .gitignore).
2. Push the code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: XanderBlog"
   git branch -M main
   git remote add origin https://github.com/YOUR-GITHUB-USERNAME/xanderblog.git
   git push -u origin main
   ```
3. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and watch the "Deploy to GitHub Pages" workflow.
5. When it turns green, your site is live at `https://YOUR-GITHUB-USERNAME.github.io/xanderblog/`.

Every push to `main` redeploys automatically.

> If you rename the repository, update `base` in `vite.config.js` and the favicon path in `index.html` to match.

## License

MIT © XandermediaTechnology
