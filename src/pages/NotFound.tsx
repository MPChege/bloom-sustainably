
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import OptimizedImage from "@/components/OptimizedImage";

const NotFound = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with OptimizedImage */}
      <div className="absolute inset-0 w-full h-full opacity-50">
        <OptimizedImage 
          src="/lovable-uploads/7a20dd3a-a5d2-40bb-9445-897a611f76a2.png"
          alt="Background Logo"
          className="w-full h-full object-contain"
          priority={true}
        />
      </div>
      
      {/* Blurred overlay for better text readability */}
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-white/30"
        aria-hidden="true"
      />

      <div className="container-tight relative z-10">
        <div className={`glass-card max-w-2xl mx-auto p-8 md:p-12 text-center ${isRTL ? "rtl" : ""} shadow-xl bg-white/80 backdrop-blur-md rounded-xl border border-white/30`}>
          <div className="mb-6">
            <span className="inline-block h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl font-display font-bold text-primary">404</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            {t('error.pageNotFound')}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {t('error.pageMessage')}
          </p>
          <Button 
            as="link" 
            href="/" 
            size="lg" 
            icon={<Home size={18} />}
            className="bg-secondary hover:bg-secondary/90 text-white"
          >
            {t('error.returnHome')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
