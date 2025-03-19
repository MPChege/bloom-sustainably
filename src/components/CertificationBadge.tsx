
import { cn } from "@/lib/utils";

interface CertificationBadgeProps {
  name: string;
  logo: string;
  className?: string;
}

const CertificationBadge = ({ name, logo, className }: CertificationBadgeProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-3 flex items-center justify-center h-20 w-24 md:h-24 md:w-28 transition-all hover:scale-105 hover:shadow-md",
        className
      )}
    >
      <img 
        src={logo} 
        alt={`${name} certification`} 
        className="max-h-full max-w-full object-contain" 
      />
    </div>
  );
};

export default CertificationBadge;
