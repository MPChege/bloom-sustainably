
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  // Show loading state while auth is being checked
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Redirect to sign in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/admin/sign-in" replace />;
  }
  
  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
