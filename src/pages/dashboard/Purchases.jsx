import { Download } from 'lucide-react'
import { Badge } from '../../components/ui'
import { dashboardData } from '../../data/misc'
import { useApp } from '../../context/AppContext'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function Purchases() {
  useDocumentTitle('Purchase history')
  const { toast } = useApp()
  const total = dashboardData.purchases.filter((p) => p.status === 'Paid').reduce((n, p) => n + p.amount, 0)
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold">Purchase history</h1>
      <p className="mt-1 text-muted dark:text-stone-400">${total.toFixed(2)} spent on learning this year</p>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Your past purchases</caption>
          <thead className="border-b border-wine-rose bg-wine-rose/40 dark:border-night-line dark:bg-night-line/50">
            <tr>{['Invoice', 'Date', 'Item', 'Method', 'Amount', 'Status', ''].map((h) => <th key={h} scope="col" className="px-5 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {dashboardData.purchases.map((p) => (
              <tr key={p.id} className="border-b border-wine-rose/60 last:border-0 hover:bg-wine-rose/20 dark:border-night-line dark:hover:bg-night-line/30">
                <td className="px-5 py-4 font-mono text-xs">{p.id}</td>
                <td className="px-5 py-4 text-muted dark:text-stone-400">{p.date}</td>
                <td className="px-5 py-4 font-medium">{p.item}</td>
                <td className="px-5 py-4 text-muted dark:text-stone-400">{p.method}</td>
                <td className="px-5 py-4 font-semibold">${p.amount.toFixed(2)}</td>
                <td className="px-5 py-4"><Badge tone={p.status === 'Paid' ? 'green' : 'gray'}>{p.status}</Badge></td>
                <td className="px-5 py-4"><button onClick={() => toast(`Receipt ${p.id} downloaded`)} aria-label={`Download receipt ${p.id}`} className="rounded-lg p-2 text-wine hover:bg-wine-rose dark:text-rose-200 dark:hover:bg-night-line"><Download className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
