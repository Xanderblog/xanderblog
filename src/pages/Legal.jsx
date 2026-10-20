import { PageHeader } from '../components/ui'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function LegalPage({ title, updated, sections }) {
  useDocumentTitle(title)
  return (
    <>
      <PageHeader title={title} subtitle={`Last updated ${updated}`} crumbs={[{ label: title }]} />
      <div className="container-x grid max-w-6xl gap-12 py-16 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="sticky top-28 space-y-2 text-sm">
            {sections.map((s, i) => <li key={s.h}><a href={`#sec-${i}`} onClick={(e) => { e.preventDefault(); document.getElementById(`sec-${i}`)?.scrollIntoView({ behavior: 'smooth' }) }} className="text-muted hover:text-wine dark:text-stone-400">{i + 1}. {s.h}</a></li>)}
          </ul>
        </nav>
        <div className="prose-xb max-w-[68ch]">
          {sections.map((s, i) => (
            <section key={s.h}>
              <h2 id={`sec-${i}`}>{i + 1}. {s.h}</h2>
              {s.p.map((p, k) => <p key={k}>{p}</p>)}
            </section>
          ))}
          <p className="!text-base">Questions about this page? Email legal@xanderblog.com.</p>
        </div>
      </div>
    </>
  )
}

export function Terms() {
  return <LegalPage title="Terms of Service" updated="October 1, 2026" sections={[
    { h: 'Acceptance of terms', p: ['By creating an account or using XanderBlog, you agree to these terms. If you do not agree, please do not use the service.'] },
    { h: 'Your account', p: ['You are responsible for keeping your login details secure and for all activity under your account. You must be at least 16 years old, or have permission from a parent or guardian.'] },
    { h: 'Courses and content', p: ['When you enrol in a course you receive a personal, non-transferable licence to view it. You may not share, resell or redistribute course materials.', 'Instructors own the content they create. XanderBlog may update or remove content to keep the catalogue accurate and safe.'] },
    { h: 'Payments and refunds', p: ['Prices are shown before purchase. Individual course purchases can be refunded within 30 days if less than 30% of the content has been watched. Subscriptions can be cancelled at any time and remain active until the end of the billing period.'] },
    { h: 'Acceptable use', p: ['Do not post harmful, abusive or illegal content in comments or Q&A. Do not attempt to disrupt the platform or access other users’ data.'] },
    { h: 'Changes to these terms', p: ['We may update these terms. We will notify you by email or on the site before significant changes take effect.'] },
  ]} />
}

export function Privacy() {
  return <LegalPage title="Privacy Policy" updated="October 1, 2026" sections={[
    { h: 'What we collect', p: ['We collect the information you give us, such as your name, email and payment details, and information about how you use the site, such as courses viewed and lessons completed.'] },
    { h: 'How we use it', p: ['We use your information to provide courses, track your progress, process payments, send receipts and, if you opt in, send our newsletter.'] },
    { h: 'Sharing', p: ['We never sell your personal data. We share it only with service providers that help us run XanderBlog, such as payment processors and email providers, under strict agreements.'] },
    { h: 'Cookies', p: ['We use essential cookies to keep you logged in and optional analytics cookies to improve the site. You can change your cookie preferences at any time.'] },
    { h: 'Your rights', p: ['You can access, correct, export or delete your data from Profile Settings or by contacting us. We respond to requests within 30 days.'] },
    { h: 'Security', p: ['We use encryption in transit and at rest, and limit access to personal data to staff who need it.'] },
  ]} />
}
