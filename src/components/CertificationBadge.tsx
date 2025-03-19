
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
        boxShadow: isHovered ? "0 10px 20px rgba(93, 75, 140, 0.2)" : "0 4px 6px rgba(93, 75, 140, 0.1)",
        background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(252,248,255,0.7))",
        border: "1px solid rgba(230, 57, 70, 0.1)"
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
