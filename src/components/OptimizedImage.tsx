
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  transform3d?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onClick,
  style,
  transform3d = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : "");

  useEffect(() => {
    // Only load non-priority images when they might be needed
    if (!priority && !imageSrc) {
      const timer = setTimeout(() => {
        setImageSrc(src);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [priority, imageSrc, src]);

  // Extract dimensions from URL if using Unsplash
  const optimizedSrc = src.includes("unsplash.com") 
    ? src.replace(/w=\d+/, `w=${width || 800}`).replace(/q=\d+/, "q=75") 
    : src;

  const transform3dStyles = transform3d ? {
    transform: "perspective(1000px) rotateX(5deg) rotateY(5deg)",
    transition: "transform 0.5s ease-out",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
    ...style
  } : style;

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        transform3d && "transform-gpu hover:scale-105 transition-transform duration-500",
        className
      )}
      style={{ 
        height: height ? `${height}px` : "auto",
        ...transform3dStyles
      }}
    >
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      {imageSrc && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            transform3d && "hover:scale-105 transition-all duration-500"
          )}
          width={width}
          height={height}
          onLoad={() => setIsLoaded(true)}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
