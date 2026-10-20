import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'
import { ErrorScreen } from './ErrorScreen.tsx'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  error: Error | null
}

// The router renders its own error element for anything thrown inside a route.
// This boundary sits above the router and only catches what the router cannot:
// a failure in the router itself, or in the providers around it.
export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Allay site failed above the router', error, info.componentStack)
  }

  render() {
    const { error } = this.state

    if (!error) {
      return this.props.children
    }

    return (
      <ErrorScreen
        kicker="Error"
        title="The site failed to start"
        description="Nothing on this page loaded. Reloading usually fixes it. If it doesn’t, please report the details below in an issue."
        detail={import.meta.env.DEV && error.stack ? error.stack : error.message}
        onRetry={() => window.location.reload()}
      />
    )
  }
}
