import '@fontsource-variable/onest'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/pixelify-sans'
import './styles/global.less'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, type HydrationState, RouterProvider } from 'react-router-dom'
import { AppErrorBoundary } from './components/shared/AppErrorBoundary.tsx'
import { routes, wikiRouteId } from './routes.tsx'
import { loadWikiDoc } from './wiki/content.ts'

const container = document.getElementById('root')
if (!container) {
  throw new Error('#root element is missing from index.html')
}

// A wiki page was prerendered with its loader's data. Fetching that data again
// before hydrating gives the router the same state the prerender had, so React
// takes over the markup instead of drawing a loading state over it.
async function hydrationState(): Promise<HydrationState | undefined> {
  if (!window.location.pathname.startsWith('/wiki')) return undefined
  const doc = await loadWikiDoc(window.location.pathname)
  if (doc) return { loaderData: { [wikiRouteId]: doc } }
  return {
    loaderData: {},
    errors: {
      [wikiRouteId]: { status: 404, statusText: 'Not Found', internal: false, data: null },
    },
  }
}

const router = createBrowserRouter(routes, { hydrationData: await hydrationState() })

const app = (
  <StrictMode>
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  </StrictMode>
)

// A built page arrives already rendered by tools/prerender.mjs, so React takes
// over that markup instead of drawing it again. The dev server sends an empty
// root, which is rendered from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
