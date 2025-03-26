
import { useState, useEffect, useRef } from "react";
import { Globe, Map, Navigation, Flower, ChevronRight, ChevronLeft } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const VirtualTour = () => {
  const [activeZone, setActiveZone] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Farm zones data
  const farmZones = [
    {
      id: 0,
      name: "Red Rose Fields",
      description: "Our red rose fields stretch across 20 hectares at 2050m above sea level, creating the perfect conditions for growing premium roses with vibrant colors and exceptional vase life.",
      image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75",
      facts: [
        "Over 15 varieties of red roses",
        "Temperature maintained at 18-22°C",
        "Drip irrigation system conserves 60% water"
      ]
    },
    {
      id: 1,
      name: "Pink Rose Greenhouse",
      description: "Our state-of-the-art greenhouses provide controlled environments for our delicate pink roses, protecting them from extreme weather while optimizing growth conditions.",
      image: "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75",
      facts: [
        "Humidity controlled at 65-75%",
        "Solar-powered ventilation system",
        "Rainwater harvesting for irrigation"
      ]
    },
    {
      id: 2,
      name: "White Rose Section",
      description: "Our white roses are grown in specialized zones with meticulous care to maintain their pristine appearance. Each bloom is carefully monitored for perfect symmetry and petal count.",
      image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75",
      facts: [
        "Specialized soil pH monitoring",
        "Hand-pollination techniques",
        "Advanced pest management systems"
      ]
    },
    {
      id: 3,
      name: "Processing Facility",
      description: "Our modern processing facility ensures that each flower is handled with care from harvest to packaging. Temperature-controlled rooms and specialized equipment maintain freshness throughout the process.",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75",
      facts: [
        "Cold chain management system",
        "Quality control at 5 different stages",
        "Biodegradable packaging materials"
      ]
    }
  ];

  // Simulate loading time for 3D scene
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Navigate to next or previous zone
  const navigateZone = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setActiveZone((prev) => (prev + 1) % farmZones.length);
    } else {
      setActiveZone((prev) => (prev - 1 + farmZones.length) % farmZones.length);
    }
  };

  // 3D rotation effect based on mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/5 to-transparent">
      <HeroSection
        title="Virtual Farm Tour"
        subtitle="Experience our rose farm through an immersive virtual tour"
        backgroundImage="https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75"
        height="medium"
        overlay="medium"
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Tour Navigation */}
        <div className="mb-12 text-center">
          <div className="inline-flex bg-purple-200/30 rounded-full p-1.5 backdrop-blur-sm">
            {farmZones.map((zone) => (
              <button
                key={zone.id}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeZone === zone.id 
                    ? "bg-primary text-white shadow-md" 
                    : "text-primary/70 hover:bg-purple-200/50"
                )}
                onClick={() => setActiveZone(zone.id)}
              >
                {zone.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Tour Experience */}
        <div 
          ref={containerRef}
          className="relative aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-xl mb-12"
          style={{
            perspective: "1000px",
          }}
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
              <div className="text-center">
                <Globe className="h-16 w-16 animate-pulse text-primary/70 mx-auto mb-4" />
                <p className="text-lg font-medium text-primary/80">Loading 3D Experience...</p>
              </div>
            </div>
          ) : (
            <>
              <div 
                className="absolute inset-0 transition-transform duration-500 ease-out"
                style={{
                  transform: `
                    perspective(1000px) 
                    rotateX(${mousePosition.y * -5}deg) 
                    rotateY(${mousePosition.x * 5}deg)
                    scale(1.05)
                  `,
                }}
              >
                <OptimizedImage 
                  src={farmZones[activeZone].image}
                  alt={farmZones[activeZone].name}
                  className="w-full h-full object-cover"
                  width={1200}
                  height={675}
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Interactive Hotspots - Positioned elements that react to hover */}
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/50 transition-all duration-300 z-10"
                  style={{
                    top: `${20 + (index * 15)}%`,
                    left: `${10 + (index * 20)}%`,
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                  }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.7, 1, 0.7] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2 + (index * 0.5),
                    ease: "easeInOut" 
                  }}
                >
                  <Flower className="h-4 w-4 text-white" />
                </motion.div>
              ))}

              {/* Zone Information Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={activeZone} // Re-animate when zone changes
                >
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                    {farmZones[activeZone].name}
                  </h2>
                  <p className="text-white/90 max-w-3xl mb-4">
                    {farmZones[activeZone].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {farmZones[activeZone].facts.map((fact, index) => (
                      <span 
                        key={index}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                      >
                        {fact}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all z-20"
                onClick={() => navigateZone('prev')}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all z-20"
                onClick={() => navigateZone('next')}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {farmZones.map((zone, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      activeZone === index 
                        ? "bg-white scale-125" 
                        : "bg-white/40 hover:bg-white/60"
                    )}
                    onClick={() => setActiveZone(index)}
                    aria-label={`View ${zone.name}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Tour Guide Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="aspect-square relative rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Farm Manager"
                className="w-full h-full object-cover"
                height={400}
                width={400}
                transform3d={true}
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
            <h3 className="text-2xl font-display font-bold mb-4">Meet Your Virtual Guide</h3>
            <p className="text-muted-foreground mb-6">
              Join Maria, our farm manager with over 15 years of experience in rose cultivation. 
              She'll guide you through our farm facilities, sharing insights about our sustainable 
              farming practices and the specialized care each variety receives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary/90 hover:bg-primary">
                <Map className="mr-2 h-4 w-4" />
                Start Guided Tour
              </Button>
              <Button variant="outline">
                <Navigation className="mr-2 h-4 w-4" />
                Explore on Your Own
              </Button>
            </div>
          </div>
        </div>

        {/* Tour Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "360° Panoramic Views",
              description: "Immerse yourself in our rose fields with interactive panoramic views that let you look in any direction.",
              icon: <Globe className="h-8 w-8 text-primary" />
            },
            {
              title: "Behind-the-Scenes Access",
              description: "Explore areas of our farm not typically accessible to visitors, including our processing and packing facilities.",
              icon: <Map className="h-8 w-8 text-primary" />
            },
            {
              title: "Interactive Learning",
              description: "Discover how we grow our roses through interactive elements that explain our cultivation techniques.",
              icon: <Flower className="h-8 w-8 text-primary" />
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4 bg-purple-100/50 p-3 rounded-full inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
