
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const NotFound = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple/5 to-white">
      <div className="container-tight">
        <div className={`glass-card max-w-2xl mx-auto p-8 md:p-12 text-center ${isRTL ? "rtl" : ""}`}>
          <div className="mb-6">
            <span className="inline-block h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl font-display font-bold text-primary">404</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            {isRTL ? "الصفحة غير موجودة" : "Page Not Found"}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {isRTL 
              ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
              : "The page you're looking for doesn't exist or has been moved."}
          </p>
          <Button 
            as="link" 
            href="/" 
            size="lg" 
            icon={<Home size={18} />}
            className="bg-secondary hover:bg-secondary/90 text-white"
          >
            {isRTL ? "العودة إلى الصفحة الرئيسية" : "Return to Homepage"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
