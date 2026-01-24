import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-8 rounded-lg border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
            <h1 className="text-3xl font-bold mb-4 text-primary-500">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-300 mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            {this.state.error && (
              <details className="mb-6">
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-primary-500 transition-colors">
                  Error details
                </summary>
                <pre className="mt-2 p-4 bg-black/30 rounded text-xs text-red-400 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full px-8 py-3 bg-primary-600 text-gray-900 rounded-lg font-mono hover:bg-[rgb(37 99 235)] transition-all duration-300 hover:scale-[1.02]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
