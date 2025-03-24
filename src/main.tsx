
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'

// Your Clerk Publishable Key - in production this should be an environment variable
const PUBLISHABLE_KEY = "pk_test_ZW5nYWdpbmctYm9hLTk0LmNsZXJrLmFjY291bnRzLmRldiQ"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key")
}

// Render the app with proper provider nesting
const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
  <BrowserRouter>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/admin/sign-in"
      signUpUrl="/admin/sign-up"
      afterSignInUrl="/admin/dashboard"
      afterSignUpUrl="/admin/dashboard"
      signInFallbackRedirectUrl="/admin/dashboard"
      signUpFallbackRedirectUrl="/admin/dashboard"
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  </BrowserRouter>
);
