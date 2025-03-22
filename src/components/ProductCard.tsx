
import { cn } from "@/lib/utils";
import { useState } from "react";
import Button from "./Button";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import OptimizedImage from "./OptimizedImage";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

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
  const [hovered, setHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    addItem({ id, name, image, price });
    toast.success(`Added ${name} to your cart!`);
  };

  const handleViewDetails = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div 
        className={cn(
          "group glass-card overflow-hidden transition-all duration-500 hover:shadow-lg hover:translate-y-[-5px] card-3d",
          hovered ? "scale-105" : "scale-100",
          className
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: hovered ? "perspective(1000px) rotateY(10deg)" : "perspective(1000px) rotateY(0deg)",
          transition: "transform 0.6s ease-out, scale 0.4s ease-out",
        }}
      >
        <div className="relative h-64 overflow-hidden">
          <OptimizedImage 
            src={image}
            alt={name}
            className={cn(
              "w-full h-full transition-transform duration-700",
              hovered ? "scale-110" : "scale-100"
            )}
            width={400}
            height={256}
            transform3d={true}
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
          
          {/* 3D hover effect overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 transition-opacity duration-300",
              hovered ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-serif font-medium mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-grow"
              onClick={handleViewDetails}
            >
              <Eye size={16} className="mr-1" />
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

      {/* Product Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">{name}</DialogTitle>
            <DialogDescription>
              {category} - {formatPrice(price)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="overflow-hidden rounded-lg">
              <OptimizedImage 
                src={image}
                alt={name}
                className="w-full h-auto object-cover transform-gpu hover:scale-110 transition-transform duration-700"
                width={350}
                height={350}
                transform3d={true}
              />
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium mb-2">Product Details</h3>
                <p className="text-sm text-gray-600 mb-4">{description}</p>
                <div className="bg-muted/50 p-3 rounded-md mb-4">
                  <h4 className="font-medium text-sm mb-1">Care Instructions</h4>
                  <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                    <li>Keep in fresh water and change daily</li>
                    <li>Cut stems at an angle before placing in water</li>
                    <li>Keep away from direct sunlight and heat sources</li>
                    <li>Remove leaves that will be below the water line</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-2 mt-auto">
                <Button 
                  size="md" 
                  variant="outline"
                  className="flex-grow"
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  size="md" 
                  className="flex-grow bg-secondary hover:bg-secondary/90 text-white" 
                  onClick={() => {
                    handleAddToCart();
                    setDialogOpen(false);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
