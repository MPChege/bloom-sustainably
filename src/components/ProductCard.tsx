
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import FlowerRequestForm from './FlowerRequestForm';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  category: string;
  description: string;
  headSize?: string;
  stemLength?: string;
  colors?: string[];
  className?: string; // Added className to props
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
  className
}) => {
  const { t, isRTL } = useLanguage();
  const currency = useCurrency();
  const [openDialog, setOpenDialog] = useState(false);

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
          
          {(headSize || stemLength || colors) && (
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              {headSize && (
                <p>Head Size: {headSize}</p>
              )}
              {stemLength && (
                <p>Stem Length: {stemLength}</p>
              )}
              {colors && colors.length > 0 && (
                <div className="flex items-center gap-1">
                  <span>Colors:</span>
                  <div className="flex gap-1">
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
            </div>
          )}
          
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="mt-4">
            <button
              onClick={() => setOpenDialog(true)}
              className="w-full py-2.5 px-4 bg-secondary hover:bg-secondary/90 text-white rounded-md transition-colors"
            >
              Request Flowers
            </button>
          </div>
        </div>
      </div>

      {/* Request Form Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
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
