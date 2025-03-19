
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sage/5">
      <div className="container-tight">
        <div className="glass-card max-w-2xl mx-auto p-8 md:p-12 text-center">
          <div className="mb-6">
            <span className="inline-block h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl font-display font-bold text-primary">404</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            as="link" 
            href="/" 
            size="lg" 
            icon={<Home size={18} />}
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
