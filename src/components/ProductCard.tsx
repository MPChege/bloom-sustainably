
import { cn } from "@/lib/utils";
import { useState } from "react";
import Button from "./Button";

interface ProductCardProps {
  name: string;
  image: string;
  category: string;
  description: string;
  className?: string;
}

const ProductCard = ({ name, image, category, description, className }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "group glass-card overflow-hidden transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-sage/20 animate-pulse" 
          style={{ display: imageLoaded ? 'none' : 'block' }} 
        />
        <img 
          src={image} 
          alt={name} 
          className={cn(
            "w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary/90">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-medium mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        <Button variant="outline" size="sm" fullWidth>
          Request Quote
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
