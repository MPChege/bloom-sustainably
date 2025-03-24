
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './index.css'

// Use lazy loading for the main App component
const App = lazy(() => import('./App.tsx'))

// Render with Suspense for better loading experience
createRoot(document.getElementById("root")!).render(
  <Suspense fallback={
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Credible Blooms...</p>
      </div>
    </div>
  }>
    <App />
  </Suspense>
);
