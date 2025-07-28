import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { SessionProvider } from './context/SessionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <TaskProvider>
          <SessionProvider>
            <App />
          </SessionProvider>
        </TaskProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
