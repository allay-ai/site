import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ErrorScreen } from '../components/shared/ErrorScreen.tsx'
import { NotFoundPage } from './NotFoundPage.tsx'

type Headline = {
  kicker: string
  title: string
  description: string
}

function headlineFor(error: unknown): Headline {
  if (isRouteErrorResponse(error)) {
    return {
      kicker: String(error.status),
      title: error.statusText || 'The site could not load that',
      description: 'The server answered with an error instead of this page.',
    }
  }

  return {
    kicker: 'Error',
    title: 'This page broke on the way in',
    description: 'The site hit a bug while showing this page. It’s not something you did.',
  }
}

function detailFor(error: unknown): string | undefined {
  if (isRouteErrorResponse(error)) {
    const data = typeof error.data === 'string' ? error.data : ''
    return `${error.status} ${error.statusText}\n${data}`.trim()
  }

  if (error instanceof Error) {
    // A production stack is minified noise. The message survives the build and
    // is the part worth pasting into an issue.
    return import.meta.env.DEV && error.stack ? error.stack : error.message
  }

  return error === null || error === undefined ? undefined : String(error)
}

export function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />
  }

  const headline = headlineFor(error)

  return (
    <ErrorScreen
      kicker={headline.kicker}
      title={headline.title}
      description={headline.description}
      detail={detailFor(error)}
      onRetry={() => window.location.reload()}
    />
  )
}
