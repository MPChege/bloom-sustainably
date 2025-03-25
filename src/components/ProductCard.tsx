
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import FlowerRequestForm from './FlowerRequestForm';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  category: string;
  description: string;
  headSize?: string;
  stemLength?: string;
  colors?: string[];
  className?: string;
  price?: number; // Added price as an optional prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  category,
  description,
  headSize,
  stemLength,
  colors,
  className,
  price
}) => {
  const { t, isRTL } = useLanguage();
  const currency = useCurrency();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <>
      <div className={`group relative bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg border border-purple/10 ${className}`}>
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs font-medium">
              {category}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-medium">{name}</h3>
          
          {/* Preview of specs - truncated view */}
          <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
            <p className="line-clamp-2">{description}</p>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={() => setOpenDetailsDialog(true)}
              className="w-full py-2 px-4 bg-purple/10 hover:bg-purple/20 text-purple rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={16} />
              View Details
            </button>
            
            <button
              onClick={() => setOpenDialog(true)}
              className="w-full py-2.5 px-4 bg-secondary hover:bg-secondary/90 text-white rounded-md transition-colors"
            >
              Request Flowers
            </button>
          </div>
        </div>
      </div>

      {/* Flower Details Dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>Detailed flower specifications</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <img 
                src={image} 
                alt={name} 
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-1">Category</h4>
                <p className="text-sm text-muted-foreground">{category}</p>
              </div>
              
              {headSize && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Head Size</h4>
                  <p className="text-sm text-muted-foreground">{headSize}</p>
                </div>
              )}
              
              {stemLength && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Stem Length</h4>
                  <p className="text-sm text-muted-foreground">{stemLength}</p>
                </div>
              )}
              
              {colors && colors.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Available Colors</h4>
                  <div className="flex flex-wrap gap-1">
                    {colors.map((color, index) => (
                      <span 
                        key={index}
                        className="inline-block px-2 py-0.5 text-xs bg-purple/10 rounded-full"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => {
                setOpenDetailsDialog(false);
                setOpenDialog(true);
              }}
              className="w-full py-2.5 px-4 bg-secondary hover:bg-secondary/90 text-white rounded-md transition-colors"
            >
              Request This Flower
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Form Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Request Flowers</DialogTitle>
            <DialogDescription>Fill out the form below to request {name}</DialogDescription>
          </DialogHeader>
          <FlowerRequestForm 
            flowerName={name} 
            onClose={() => setOpenDialog(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
