
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const AdminSignIn = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to admin dashboard if already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/admin/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-cream/30">
      <div className="glass-panel p-8 w-full max-w-md">
        <h1 className="text-2xl font-serif font-medium mb-6 text-center">Admin Login</h1>
        <p className="text-center text-muted-foreground mb-8">
          Please sign in to access the admin area
        </p>
        <SignIn />
      </div>
    </div>
  );
};

export default AdminSignIn;
