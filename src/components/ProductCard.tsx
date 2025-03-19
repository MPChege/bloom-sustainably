
import { cn } from "@/lib/utils";
import { useState } from "react";
import Button from "./Button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import OptimizedImage from "./OptimizedImage";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  className?: string;
}

const ProductCard = ({ id, name, image, category, description, price, className }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    addItem({ id, name, image, price });
    toast.success(`Added ${name} to your cart!`);
  };

  return (
    <div 
      className={cn(
        "group glass-card overflow-hidden transition-all duration-300 hover:shadow-md card-3d",
        className
      )}
    >
      <div className="relative h-64 overflow-hidden">
        <OptimizedImage 
          src={image}
          alt={name}
          className="w-full h-full"
          width={400}
          height={256}
          onClick={() => {}}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary/90">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-white">
            {formatPrice(price)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-medium mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-grow">
            {t('product.viewDetails')}
          </Button>
          <Button 
            size="sm" 
            className="bg-secondary hover:bg-secondary/90 text-white" 
            onClick={handleAddToCart}
            icon={<ShoppingCart size={16} />}
          >
            {t('product.addToCart')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
