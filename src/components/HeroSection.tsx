
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import OptimizedImage from "./OptimizedImage";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  children?: React.ReactNode;
  height?: "full" | "large" | "medium" | "small";
  overlay?: "none" | "light" | "medium" | "dark";
  textAlignment?: "left" | "center" | "right";
  textColor?: "light" | "dark";
}

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  children,
  height = "large",
  overlay = "medium",
  textAlignment = "center",
  textColor = "light",
}: HeroSectionProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
  }, [backgroundImage]);

  const heightClasses = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]",
    small: "min-h-[40vh]",
  };

  const overlayClasses = {
    none: "",
    light: "bg-black/20",
    medium: "bg-black/40",
    dark: "bg-black/60",
  };

  const textAlignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const textColorClasses = {
    light: "text-white",
    dark: "text-gray-900",
  };

  return (
    <section 
      className={cn(
        "relative flex items-center justify-center w-full overflow-hidden",
        heightClasses[height]
      )}
    >
      {/* Background image with blur effect while loading */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-[1.02]",
          imageLoaded ? "blur-0" : "blur-md"
        )}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      
      {/* Overlay */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full",
          overlayClasses[overlay]
        )}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className={cn(
          "flex flex-col max-w-5xl mx-auto",
          textAlignmentClasses[textAlignment]
        )}>
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in",
              textColorClasses[textColor]
            )}
          >
            {title}
          </h1>
          
          {subtitle && (
            <p 
              className={cn(
                "text-xl md:text-2xl mb-8 max-w-2xl opacity-90 animate-fade-up stagger-1",
                textColorClasses[textColor]
              )}
            >
              {subtitle}
            </p>
          )}
          
          <div className="animate-fade-up stagger-2">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
