import { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: unknown[];
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in their child
 * component tree, logs those errors, and displays a fallback UI.
 * 
 * Features:
 * - Custom fallback UI support
 * - Error logging callback
 * - Reset on prop changes
 * - Development mode error details
 * - Local retry functionality
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log to error reporting service
    this.props.onError?.(error, errorInfo);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    // Reset error boundary if any resetKeys change
    if (
      this.props.resetKeys &&
      this.state.hasError &&
      this.hasResetKeysChanged(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.reset();
    }
  }

  private hasResetKeysChanged(prevKeys?: unknown[], nextKeys?: unknown[]): boolean {
    return (
      prevKeys !== nextKeys &&
      JSON.stringify(prevKeys) !== JSON.stringify(nextKeys)
    );
  }

  private reset = () => {
    const resetState: State = {
      hasError: false
    };
    this.setState(resetState);
  };

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>We apologize for the inconvenience. You can try:</p>
          <div className="error-actions">
            <button onClick={this.reset} className="retry-button">
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="refresh-button"
            >
              Refresh Page
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="error-details">
              <h3>Error Details</h3>
              <pre className="error-message">
                {this.state.error.toString()}
              </pre>
              {this.state.errorInfo && (
                <pre className="error-stack">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
