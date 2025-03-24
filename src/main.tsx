
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

// Your Clerk Publishable Key - in production this should be an environment variable
const PUBLISHABLE_KEY = "pk_test_ZW5nYWdpbmctYm9hLTk0LmNsZXJrLmFjY291bnRzLmRldiQ"

// Render the app - simplifying the loading approach
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
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
  </StrictMode>
);
