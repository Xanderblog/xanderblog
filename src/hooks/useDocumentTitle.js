import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | XanderBlog` : 'XanderBlog — Learn, Read, Grow'
  }, [title])
}
