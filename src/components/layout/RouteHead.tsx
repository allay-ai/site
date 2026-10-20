import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { headTags, pageFor } from '../../data/pages.ts'

/**
 * Replaces the route's <head> tags and <html lang> after every navigation. It
 * renders nothing: the tags come from the same `headTags` that wrote the first
 * ones into the prerendered page.
 */
export function RouteHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = pageFor(pathname)
    const template = document.createElement('template')
    template.innerHTML = headTags(page)
    for (const stale of document.head.querySelectorAll('[data-route-head]')) {
      stale.remove()
    }
    document.head.append(template.content)
    document.documentElement.lang = page.lang
  }, [pathname])

  return null
}
