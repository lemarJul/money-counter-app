import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import { AppThemeProvider } from './theme/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
