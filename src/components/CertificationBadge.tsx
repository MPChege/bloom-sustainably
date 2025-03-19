
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CertificationBadgeProps {
  name: string;
  logo: string;
  className?: string;
}

const CertificationBadge = ({ name, logo, className }: CertificationBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "glass-card p-3 flex items-center justify-center h-20 w-24 md:h-24 md:w-28 transition-all duration-300",
        "hover:shadow-lg transform perspective-1000",
        isHovered ? "rotate-y-5 scale-110" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.1)" : "0 4px 6px rgba(0,0,0,0.05)",
      }}
    >
      <img 
        src={logo} 
        alt={`${name} certification`} 
        className={cn(
          "max-h-full max-w-full object-contain transition-transform duration-300",
          isHovered ? "scale-110" : ""
        )}
      />
    </div>
  );
};

export default CertificationBadge;
