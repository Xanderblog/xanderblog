import { useEffect, useMemo, useState } from 'react'

export function usePagination(items, perPage, resetKey) {
  const [page, setPage] = useState(1)
  const pages = Math.max(1, Math.ceil(items.length / perPage))
  useEffect(() => setPage(1), [resetKey])
  const current = useMemo(() => items.slice((page - 1) * perPage, page * perPage), [items, page, perPage])
  return { page, pages, setPage, current }
}
