import { useState } from 'react'
import { Camera } from 'lucide-react'
import { Field, Button, Img, Tabs } from '../../components/ui'
import { useApp } from '../../context/AppContext'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-wine-rose py-4 last:border-0 dark:border-night-line">
      <div><p className="font-medium">{label}</p><p className="text-sm text-muted dark:text-stone-400">{desc}</p></div>
      <button role="switch" aria-checked={checked} aria-label={label} onClick={onChange} className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-wine' : 'bg-stone-300 dark:bg-night-line'}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  )
}

export default function ProfileSettings() {
  useDocumentTitle('Profile settings')
  const { user, updateUser, toast, theme, toggleTheme } = useApp()
  const [tab, setTab] = useState('profile')
  const [f, setF] = useState({ name: user.name, email: user.email, headline: 'Full-stack developer', bio: '' })
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [e, setE] = useState({})
  const [prefs, setPrefs] = useState({ news: true, reminders: true, replies: false })

  const saveProfile = (ev) => {
    ev.preventDefault()
    const err = {}
    if (f.name.trim().length < 2) err.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = 'Enter a valid email address'
    setE(err)
    if (Object.keys(err).length) return
    updateUser({ name: f.name, email: f.email }); toast('Profile saved')
  }
  const savePw = (ev) => {
    ev.preventDefault()
    const err = {}
    if (!pw.current) err.current = 'Enter your current password'
    if (pw.next.length < 8) err.next = 'Use at least 8 characters'
    if (pw.next !== pw.confirm) err.confirm = 'Passwords do not match'
    setE(err)
    if (Object.keys(err).length) return
    setPw({ current: '', next: '', confirm: '' }); toast('Password updated')
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold">Profile settings</h1>
      <Tabs className="mt-6" active={tab} onChange={(t) => { setTab(t); setE({}) }} tabs={[{ id: 'profile', label: 'Profile' }, { id: 'security', label: 'Password' }, { id: 'prefs', label: 'Preferences' }]} />
      <div className="card mt-6 p-6 md:p-8">
        {tab === 'profile' && (
          <form onSubmit={saveProfile} noValidate>
            <div className="mb-8 flex items-center gap-5">
              <div className="relative"><Img src={user.avatar} alt="" className="h-20 w-20 rounded-full object-cover" /><button type="button" onClick={() => toast('Photo upload is not available in the demo', 'info')} aria-label="Change photo" className="absolute -bottom-1 -right-1 rounded-full bg-wine p-2 text-white shadow"><Camera className="h-3.5 w-3.5" /></button></div>
              <div><p className="font-semibold">Profile photo</p><p className="text-sm text-muted dark:text-stone-400">JPG or PNG, at least 400×400px</p></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={f.name} onChange={(ev) => setF({ ...f, name: ev.target.value })} error={e.name} />
              <Field label="Email" type="email" value={f.email} onChange={(ev) => setF({ ...f, email: ev.target.value })} error={e.email} />
              <Field label="Headline" value={f.headline} onChange={(ev) => setF({ ...f, headline: ev.target.value })} className="sm:col-span-2" />
              <Field as="textarea" label="Bio" value={f.bio} onChange={(ev) => setF({ ...f, bio: ev.target.value })} placeholder="A few words about you" className="sm:col-span-2" />
            </div>
            <Button type="submit" className="mt-6">Save changes</Button>
          </form>
        )}
        {tab === 'security' && (
          <form onSubmit={savePw} noValidate className="max-w-md space-y-4">
            <Field label="Current password" type="password" value={pw.current} onChange={(ev) => setPw({ ...pw, current: ev.target.value })} error={e.current} autoComplete="current-password" />
            <Field label="New password" type="password" value={pw.next} onChange={(ev) => setPw({ ...pw, next: ev.target.value })} error={e.next} autoComplete="new-password" />
            <Field label="Confirm new password" type="password" value={pw.confirm} onChange={(ev) => setPw({ ...pw, confirm: ev.target.value })} error={e.confirm} autoComplete="new-password" />
            <Button type="submit">Update password</Button>
          </form>
        )}
        {tab === 'prefs' && (
          <div>
            <Toggle label="Dark mode" desc="Use a dark theme across the site" checked={theme === 'dark'} onChange={toggleTheme} />
            <Toggle label="Weekly newsletter" desc="One useful article every Monday" checked={prefs.news} onChange={() => setPrefs({ ...prefs, news: !prefs.news })} />
            <Toggle label="Learning reminders" desc="A nudge when you haven't learned in 3 days" checked={prefs.reminders} onChange={() => setPrefs({ ...prefs, reminders: !prefs.reminders })} />
            <Toggle label="Q&A replies" desc="Email me when someone replies to my question" checked={prefs.replies} onChange={() => setPrefs({ ...prefs, replies: !prefs.replies })} />
            <Button className="mt-6" onClick={() => toast('Preferences saved')}>Save preferences</Button>
          </div>
        )}
      </div>
    </div>
  )
}
