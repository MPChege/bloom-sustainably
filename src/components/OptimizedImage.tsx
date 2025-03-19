
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
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onClick,
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

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{ height: height ? `${height}px` : "auto" }}
    >
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      {imageSrc && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
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
