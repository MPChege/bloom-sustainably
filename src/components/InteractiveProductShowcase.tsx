
import { useState, useRef, useEffect } from "react";
import { Rotate3D, PlusCircle, MinusCircle, Info, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import OptimizedImage from "./OptimizedImage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

// Product with rotation views
interface ShowcaseProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  rotationViews: string[];
  features: string[];
  category: string;
}

// Sample products
const showcaseProducts: ShowcaseProduct[] = [
  {
    id: 101,
    name: "Premium Red Rose Bouquet",
    description: "An elegant arrangement of our finest Crimson Queen roses, perfect for special occasions and romantic gestures.",
    price: 49.99,
    rotationViews: [
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=45",
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=90",
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=135",
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=180",
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=225",
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=270",
      "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=315",
    ],
    features: [
      "12 Premium Red Roses",
      "Elegant Arrangement",
      "7-10 Days Vase Life",
      "Free Care Instructions",
      "Includes Flower Food Packet"
    ],
    category: "Premium Bouquets"
  },
  {
    id: 102,
    name: "Pink & White Mixed Arrangement",
    description: "A delightful combination of Pink Perfection and Snow White roses in a stunning mixed arrangement.",
    price: 59.99,
    rotationViews: [
      "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=45",
      "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=90",
      "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=135",
      "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=180",
      "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=225",
      "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=270",
      "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=315",
    ],
    features: [
      "8 Pink & 8 White Roses",
      "Premium Vase Included",
      "7-10 Days Vase Life",
      "Free Care Instructions",
      "Perfect for Special Occasions"
    ],
    category: "Mixed Arrangements"
  },
  {
    id: 103,
    name: "Luxury White Rose Bridal Bouquet",
    description: "A spectacular bridal bouquet featuring our premium Snow White roses, perfect for your special day.",
    price: 79.99,
    rotationViews: [
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=45",
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=90",
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=135",
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=180",
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=225",
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=270",
      "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&viewAngle=315",
    ],
    features: [
      "18 Premium White Roses",
      "Hand-tied Design",
      "Satin Ribbon Wrap",
      "Bridal Consultation Included",
      "Wedding Day Delivery"
    ],
    category: "Bridal Collection"
  }
];

const InteractiveProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { addItem } = useCart();

  const product = showcaseProducts[activeProduct];
  const totalViews = product.rotationViews.length;

  // Handle drag rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX;
    if (Math.abs(deltaX) > 30) {
      const direction = deltaX > 0 ? -1 : 1; // Reverse direction for natural feel
      const newRotation = (currentRotation + direction + totalViews) % totalViews;
      setCurrentRotation(newRotation);
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Use effect for cleanup
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('mouseup', handleMouseUpGlobal);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);

  // Reset rotation and zoom when changing products
  useEffect(() => {
    setCurrentRotation(0);
    setZoomLevel(1);
    setShowInfo(false);
  }, [activeProduct]);

  // Add to cart
  const handleAddToCart = (id: number, name: string, price: number) => {
    addItem({
      id,
      name,
      price,
      image: product.rotationViews[0]
    });
    
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  // Zoom functions
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 1));
  };

  // Toggle product info
  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };

  // Manual rotation buttons
  const rotateProduct = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentRotation((prev) => (prev + 1) % totalViews);
    } else {
      setCurrentRotation((prev) => (prev - 1 + totalViews) % totalViews);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Interactive Product Showcase</h2>
        <p className="text-muted-foreground">
          Explore our premium flower arrangements in 3D - drag to rotate and see from all angles.
        </p>
      </div>

      {/* Product selection tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
        {showcaseProducts.map((product, index) => (
          <button
            key={product.id}
            className={cn(
              "px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors",
              activeProduct === index
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
            onClick={() => setActiveProduct(index)}
          >
            {product.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
        {/* 3D Showcase */}
        <div 
          ref={showcaseRef}
          className="relative bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Drag indicator */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center z-10">
            <Rotate3D className="h-4 w-4 mr-1 text-primary" />
            <span className="text-xs">Drag to rotate</span>
          </div>
          
          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button 
              className="bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition-colors"
              onClick={handleZoomIn}
            >
              <PlusCircle className="h-5 w-5 text-primary" />
            </button>
            <button 
              className="bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition-colors"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
            >
              <MinusCircle className={cn("h-5 w-5", zoomLevel <= 1 ? "text-gray-400" : "text-primary")} />
            </button>
            <button 
              className={cn(
                "bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center hover:bg-white transition-colors",
                showInfo && "bg-primary text-white hover:bg-primary/90"
              )}
              onClick={toggleInfo}
            >
              <Info className="h-5 w-5" />
            </button>
          </div>

          {/* 3D rotation view */}
          <div 
            className="relative"
            style={{ 
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {product.rotationViews.map((src, index) => (
              <div 
                key={index}
                className={cn(
                  "w-full h-full transition-opacity duration-300 absolute top-0 left-0",
                  currentRotation === index ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <OptimizedImage 
                  src={src}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-contain"
                  width={600}
                  height={600}
                  priority={index === currentRotation}
                  transform3d={true}
                />
              </div>
            ))}
          </div>

          {/* Rotation indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
            {product.rotationViews.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  currentRotation === index ? "bg-primary scale-150" : "bg-gray-300 hover:bg-gray-400"
                )}
                onClick={() => setCurrentRotation(index)}
              />
            ))}
          </div>

          {/* Rotation buttons */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white"
            onClick={() => rotateProduct('prev')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white"
            onClick={() => rotateProduct('next')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Info overlay */}
          {showInfo && (
            <motion.div 
              className="absolute inset-0 bg-black/70 text-white flex flex-col justify-center p-6 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
              <p className="mb-4">{product.description}</p>
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="bg-primary text-white hover:bg-primary/90"
                onClick={() => handleAddToCart(product.id, product.name, product.price)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <button 
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={toggleInfo}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Features:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-primary text-white hover:bg-primary/90 flex-1"
                onClick={() => handleAddToCart(product.id, product.name, product.price)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                Customize Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* How to use the 3D viewer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-8">
        <div className="bg-purple-50 p-4 rounded-lg">
          <Rotate3D className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="font-medium">Drag to Rotate</p>
          <p className="text-sm text-gray-500">Click and drag left or right to rotate the arrangement.</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <PlusCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="font-medium">Zoom Controls</p>
          <p className="text-sm text-gray-500">Use the + and - buttons to zoom in and out for details.</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <Info className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="font-medium">View Details</p>
          <p className="text-sm text-gray-500">Click the info button to see additional product details.</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveProductShowcase;
