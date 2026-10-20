import { data, type LoaderFunctionArgs, type RouteObject } from 'react-router-dom'
import { Layout } from './components/layout/Layout.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { PrivacyPage } from './pages/PrivacyPage.tsx'
import { TermsPage } from './pages/TermsPage.tsx'
import { WikiPage } from './pages/WikiPage.tsx'
import { loadWikiDoc } from './wiki/content.ts'

/** The wiki route's id, which main.tsx names when it hands over hydration data. */
export const wikiRouteId = 'wiki-page'

async function wikiLoader({ request }: LoaderFunctionArgs) {
  const doc = await loadWikiDoc(new URL(request.url).pathname)
  if (!doc) {
    throw data(null, { status: 404, statusText: 'Not Found' })
  }
  return doc
}

const pageRoutes: RouteObject[] = [
  { path: '/', element: <HomePage locale="en" /> },
  { path: '/ru', element: <HomePage locale="ru" /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/terms', element: <TermsPage /> },
  { id: wikiRouteId, path: '/wiki/*', loader: wikiLoader, element: <WikiPage /> },
  { path: '*', element: <NotFoundPage /> },
]

// Plain route objects, so the browser router (main.tsx) and the build-time
// prerender (entry-server.tsx) render exactly the same tree.
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    // Two levels on purpose. A page that throws is caught by its own boundary
    // and rendered inside the shell, so the header and footer stay usable. A
    // header or footer that throws escapes to the layout boundary, which
    // replaces the broken shell instead of trying to render it again.
    errorElement: <ErrorPage />,
    children: pageRoutes.map((page) => ({ ...page, errorElement: <ErrorPage /> })),
  },
]
