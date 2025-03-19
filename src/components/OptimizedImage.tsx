
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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
    
    // Only load non-priority images when they might be needed
    if (!priority && !imageSrc) {
      const timer = setTimeout(() => {
        setImageSrc(src);
      }, 100);
      return () => clearTimeout(timer);
    }
    
    // If priority changed to true, load the image
    if (priority && !imageSrc) {
      setImageSrc(src);
    }
  }, [priority, imageSrc, src]);

  // Extract dimensions from URL if using Unsplash
  // Use lower quality images for faster loading
  const optimizedSrc = src.includes("unsplash.com") 
    ? src.replace(/w=\d+/, `w=${width || 400}`).replace(/q=\d+/, "q=60") 
    : src;

  const transform3dStyles = transform3d ? {
    transform: "perspective(1000px) rotateX(3deg) rotateY(3deg)",
    transition: "transform 0.5s ease-out",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    ...style
  } : style;

  // Fallback for error loading
  const handleError = () => {
    console.log("Error loading image:", optimizedSrc);
    setHasError(true);
    setIsLoaded(true); // Consider it "loaded" to remove skeleton
  };

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
      
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
          {alt || "Image failed to load"}
        </div>
      ) : imageSrc && (
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
          onError={handleError}
          onClick={onClick}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
