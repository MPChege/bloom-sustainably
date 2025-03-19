
import { ArrowRight, Heart, Leaf, Smile } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Button from "@/components/Button";
import CertificationBadge from "@/components/CertificationBadge";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import OptimizedImage from "@/components/OptimizedImage";
import { Skeleton } from "@/components/ui/skeleton";

// Define optimized image URLs with reduced quality for faster loading
const OPTIMIZED_BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75", // Red roses field
  "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75", // Pink roses
  "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75"  // White roses
];

const Index = () => {
  // Parallax effect state and refs
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  
  // Calculate scroll percentage for various effects
  const scrollPercentage = useMemo(() => {
    if (!viewportHeight) return 0;
    return Math.min(1, Math.max(0, scrollY / (viewportHeight * 2)));
  }, [scrollY, viewportHeight]);
  
  // Handle scroll for parallax effects with debounce for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Mouse move handler for 3D effects
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: (e.clientY / window.innerHeight) * 2 - 1
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Set initial viewport dimensions
    setViewportHeight(window.innerHeight);
    setViewportWidth(window.innerWidth);
    
    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Handle resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Sample product data for the homepage - using smaller dataset for better performance
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Red Roses",
      image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75",
      category: "Premium Roses",
      description: "Elegant long-stemmed red roses, perfect for luxury floral arrangements and special occasions.",
      price: 29.99
    },
    {
      id: 2,
      name: "Spray Carnations",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75",
      category: "Summer Flowers",
      description: "Vibrant spray carnations with multiple blooms per stem, adding texture and color to bouquets.",
      price: 19.99
    },
    {
      id: 3,
      name: "Premium Pink Roses",
      image: "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75",
      category: "Premium Roses",
      description: "Delicate pink roses with excellent vase life and stunning bloom development.",
      price: 24.99
    }
  ];

  // Banner images for parallax slider - ROSE FLOWERS ONLY
  const bannerImages = OPTIMIZED_BANNER_IMAGES;

  // State for the current banner image
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Change banner image every 5 seconds with debounce for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % bannerImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // Sample certification data - using only necessary certifications
  const certifications = [
    { name: "Fairtrade", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Fairtrade-Logo.svg/1200px-Fairtrade-Logo.svg.png" },
    { name: "Kenya Flower Council", logo: "https://kenyaflowercouncil.org/wp-content/uploads/2019/02/logo.png" }
  ];

  // 3D rotation based on mouse position
  const getMouseTransform = (intensity = 1) => {
    if (!mousePosition) return {};
    
    return {
      transform: `
        perspective(1000px) 
        rotateX(${mousePosition.y * -5 * intensity}deg) 
        rotateY(${mousePosition.x * 5 * intensity}deg)
      `,
    };
  };

  return (
    <div 
      ref={mainRef} 
      className="min-h-screen"
    >
      {/* Hero Section with 3D effect and animated background transition */}
      <section className="relative h-screen overflow-hidden scene-3d">
        {/* Parallax background layers */}
        <div 
          className="absolute inset-0 w-full h-full" 
          style={{
            transform: `translateZ(-10px) scale(${1 + scrollPercentage * 0.5})`,
            opacity: 1 - scrollPercentage * 1.5,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out"
          }}
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
            style={{ 
              backgroundImage: `url(${bannerImages[currentBannerIndex]})`,
              transform: `scale(${1 + mousePosition.x * 0.02 + mousePosition.y * 0.02})`,
              filter: "brightness(0.8) contrast(1.2)"
            }}
          />
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: "linear-gradient(135deg, rgba(106, 13, 173, 0.6) 0%, rgba(157, 78, 221, 0.4) 100%)",
              mixBlendMode: "overlay"
            }}
          />
        </div>
        
        {/* Moving particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white/20 backdrop-blur-md"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.1)}px) rotate(${scrollY * (0.02 + Math.random() * 0.05)}deg)`,
                transition: "transform 0.3s ease-out"
              }}
            />
          ))}
        </div>
        
        {/* Hero content with 3D effect */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateY(${-scrollY * 0.5}px)`,
            opacity: 1 - scrollPercentage * 2,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out"
          }}
        >
          <div 
            className="container mx-auto px-4 text-center"
            style={getMouseTransform(0.3)}
          >
            <div 
              className="floating-card-3d max-w-4xl mx-auto py-12 px-8"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transform: `
                  perspective(1000px) 
                  rotateX(${mousePosition.y * -2}deg) 
                  rotateY(${mousePosition.x * 2}deg)
                `,
              }}
            >
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white glow-effect"
                style={{
                  textShadow: "0 0 10px rgba(157, 78, 221, 0.5)",
                }}
              >
                Fresh, Quality Roses
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200">
                  from Kenya
                </span>
              </h1>
              
              <p 
                className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto"
                style={{
                  textShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
              >
                Cultivating Beauty, Harvesting Excellence
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  className="btn-future group relative overflow-hidden rounded-md px-6 py-3 text-white font-medium"
                >
                  <span className="relative z-10 flex items-center">
                    View Our Flowers
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button 
                  className="relative overflow-hidden rounded-md px-6 py-3 font-medium border border-white/30 text-white/90 hover:bg-white/10 transition-colors"
                >
                  <span>Get in Touch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
          style={{
            opacity: 1 - scrollPercentage * 3,
            transform: `translate(-50%, ${scrollPercentage * 100}px)`,
          }}
        >
          <p className="text-sm mb-2 text-white/80">Scroll to Explore</p>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div 
              className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
              style={{animationDuration: "1.5s"}}
            />
          </div>
        </div>
      </section>

      {/* 3D Parallax Intro Section */}
      <section 
        ref={parallaxRef}
        className="page-section relative overflow-hidden bg-gradient-to-b from-purple-900/10 to-transparent"
        style={{
          paddingTop: `${Math.max(100, 150 - scrollY * 0.1)}px`,
          paddingBottom: `${Math.max(100, 150 - scrollY * 0.1)}px`,
        }}
      >
        {/* Parallax floating elements - ROSES ONLY - Using OptimizedImage with 3D transforms */}
        <div 
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "5%",
            transform: `
              perspective(1000px)
              translateY(${scrollY * 0.2}px) 
              rotateX(${scrollY * 0.02}deg)
              rotateY(${scrollY * 0.02}deg)
              scale(${1 + scrollPercentage * 0.1})
            `,
            opacity: 0.7,
            zIndex: 1,
            transition: "transform 0.1s ease-out"
          }}
        >
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&q=75&w=150" 
            alt="Floating red rose" 
            className="rounded-full shadow-xl w-24 h-24 object-cover"
            width={96}
            height={96}
            transform3d={true}
          />
        </div>
        <div 
          className="absolute pointer-events-none"
          style={{
            top: "30%",
            right: "10%",
            transform: `
              perspective(1000px)
              translateY(${scrollY * 0.1}px) 
              rotateX(${-scrollY * 0.03}deg)
              rotateY(${-scrollY * 0.04}deg)
              scale(${1 + scrollPercentage * 0.15})
            `,
            opacity: 0.8,
            zIndex: 1,
            transition: "transform 0.1s ease-out"
          }}
        >
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&q=75&w=150" 
            alt="Floating pink rose" 
            className="rounded-full shadow-xl w-20 h-20 object-cover"
            width={80}
            height={80}
            transform3d={true}
          />
        </div>
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: "15%",
            left: "15%",
            transform: `
              perspective(1000px)
              translateY(${-scrollY * 0.05}px) 
              rotateX(${scrollY * 0.01}deg)
              rotateY(${scrollY * 0.02}deg)
              scale(${1 + scrollPercentage * 0.2})
            `,
            opacity: 0.7,
            zIndex: 1,
            transition: "transform 0.1s ease-out"
          }}
        >
          <OptimizedImage 
            src="https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&q=75&w=150" 
            alt="Floating white rose" 
            className="rounded-full shadow-xl w-16 h-16 object-cover"
            width={64}
            height={64}
            transform3d={true}
          />
        </div>
        
        <div className="container-tight relative z-10">
          <div 
            className="text-center mb-16 max-w-3xl mx-auto transform transition-all duration-700" 
            style={{ 
              transform: `
                perspective(1000px)
                translateY(${Math.min(scrollY * 0.05, 30)}px)
                rotateX(${Math.min(5 - scrollPercentage * 10, 5)}deg)
              `,
              opacity: Math.min(1, 0.4 + scrollY * 0.001)
            }}
          >
            <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block neon-glow">
              About Credible Blooms
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mt-6 mb-6 futuristic-line"
              style={{
                background: "linear-gradient(90deg, #6a0dad 0%, #8b5cf6 50%, #6a0dad 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "lineFlow 3s infinite linear"
              }}
            >
              Kenya's Premier Flower Farm
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Located at an ideal altitude of 2050 meters above sea level in Naivasha, 
              Credible Blooms grows premium quality flowers for both local and international markets. 
              Our commitment to sustainable farming practices ensures our flowers are as 
              environmentally friendly as they are beautiful.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center mt-6 text-primary font-medium hover:translate-x-1 transition-transform"
              style={{
                position: "relative",
                paddingBottom: "2px"
              }}
            >
              <span className="futuristic-line">Learn more about our story</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Feature boxes with 3D hover effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="h-8 w-8 text-primary" />,
                title: "Sustainable Farming",
                description: "Our eco-friendly practices conserve water, protect soil health, and minimize our carbon footprint."
              },
              {
                icon: <Heart className="h-8 w-8 text-primary" />,
                title: "Premium Quality",
                description: "Grown in optimal conditions, our flowers boast exceptional color, size, and impressive vase life."
              },
              {
                icon: <Smile className="h-8 w-8 text-primary" />,
                title: "Community Impact",
                description: "We support local communities through fair employment practices and social development programs."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="card-3d glass-panel p-8 h-full flex flex-col items-center text-center"
                style={{ 
                  transformStyle: "preserve-3d", 
                  perspective: "1000px",
                  transform: `
                    translateZ(0) 
                    translateY(${Math.min(scrollY * 0.03 * (index + 1), 20)}px)
                    rotateX(${mousePosition.y * -5}deg)
                    rotateY(${mousePosition.x * 5}deg)
                  `,
                  transition: "transform 0.3s ease-out"
                }}
              >
                <div className="mb-4 bg-purple-200/30 p-4 rounded-full transform transition-transform hover:scale-110 neon-glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with 3D Carousel - Using fewer items for better performance */}
      <section 
        ref={featuredRef}
        className="page-section relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(106, 13, 173, 0.05) 0%, rgba(157, 78, 221, 0.1) 100%)"
        }}
      >
        {/* Background decoration - moving with scroll and mouse */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(138, 43, 226, ${Math.random() * 0.1}) 0%, rgba(138, 43, 226, 0) 70%)`,
                transform: `translateY(${scrollY * (0.05 + Math.random() * 0.05)}px)`,
                opacity: 0.3 + Math.random() * 0.3,
                transition: "transform 0.2s ease-out"
              }}
            />
          ))}
        </div>
          
        <div className="container-tight relative z-10">
          <div 
            className="text-center mb-12 transform transition-all duration-500"
            style={{
              transform: `
                perspective(1000px)
                translateY(${Math.min((scrollY - viewportHeight) * 0.1, 30)}px)
                rotateX(${Math.min((scrollY - viewportHeight) * 0.01, 5)}deg)
              `,
              opacity: Math.min(1, Math.max(0, (scrollY - viewportHeight * 0.7) * 0.002))
            }}
          >
            <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block neon-glow">
              Our Collection
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mt-6 mb-6 futuristic-line"
              style={{
                background: "linear-gradient(90deg, #6a0dad 0%, #8b5cf6 50%, #6a0dad 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "lineFlow 3s infinite linear"
              }}
            >
              Featured Flowers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our selection of premium quality flowers, grown with care and harvested at the perfect moment.
            </p>
          </div>

          <div 
            className="scene-3d transform transition-all duration-500"
            style={{
              transform: `
                perspective(1000px) 
                rotateX(${Math.min((scrollY - viewportHeight) * 0.01, 5)}deg)
              `,
              opacity: Math.min(1, Math.max(0, (scrollY - viewportHeight * 0.8) * 0.002))
            }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {featuredProducts.map((product, idx) => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                    <div 
                      className="p-1 element-3d"
                      style={{
                        transform: `
                          perspective(1000px)
                          rotateY(${mousePosition.x * 10}deg)
                          rotateX(${-mousePosition.y * 5}deg)
                          translateZ(${idx * 10}px)
                        `,
                        transformOrigin: "center center",
                        transition: "transform 0.2s ease-out"
                      }}
                    >
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        category={product.category}
                        description={product.description}
                        price={product.price}
                        className="h-full transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative static mr-2 left-0 translate-y-0" />
                <CarouselNext className="relative static ml-2 right-0 translate-y-0" />
              </div>
            </Carousel>
          </div>

          <div 
            className="mt-12 text-center transform transition-all duration-500"
            style={{
              transform: `translateY(${Math.min((scrollY - viewportHeight * 1.5) * 0.1, 30)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - viewportHeight * 1.3) * 0.002))
            }}
          >
            <button className="btn-future group relative overflow-hidden rounded-md px-6 py-3 text-white font-medium">
              <span className="relative z-10 flex items-center">
                View All Products
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Certifications with animated hover effects - Using fewer for better performance */}
      <section className="page-section bg-cream/50 relative overflow-hidden">
        <div className="container-tight relative z-10">
          <div className="text-center mb-12">
            <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block neon-glow">
              Our Standards
            </span>
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mt-6 mb-6 futuristic-line"
              style={{
                background: "linear-gradient(90deg, #6a0dad 0%, #8b5cf6 50%, #6a0dad 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "lineFlow 3s infinite linear"
              }}
            >
              Quality Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We adhere to the highest international standards to ensure our flowers meet global quality expectations.
            </p>
          </div>

          <div 
            className="flex flex-wrap justify-center gap-6 scene-3d"
            style={getMouseTransform(0.2)}
          >
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="element-3d"
                style={{
                  transform: `
                    perspective(1000px)
                    rotateY(${mousePosition.x * 10}deg)
                    rotateX(${-mousePosition.y * 5}deg)
                    translateZ(${index * 20}px)
                  `,
                  transformOrigin: "center center"
                }}
              >
                <CertificationBadge
                  name={cert.name}
                  logo={cert.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with 3D parallax background - ROSE FLOWER IMAGE */}
      <section 
        className="relative py-20 md:py-28 overflow-hidden scene-3d"
      >
        {/* Parallax background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75')",
            transform: `scale(${1 + scrollPercentage * 0.2})`,
            transition: "transform 0.2s ease-out"
          }}
        />
        
        {/* Overlay with gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(106, 13, 173, 0.8) 0%, rgba(157, 78, 221, 0.7) 100%)",
            mixBlendMode: "multiply"
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 20,
                height: Math.random() * 100 + 20,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(8px)",
                opacity: Math.random() * 0.3 + 0.1,
                transform: `translateY(${scrollY * (0.05 + Math.random() * 0.05)}px)`,
                transition: "transform 0.2s ease-out"
              }}
            />
          ))}
        </div>
        
        <div 
          className="container relative z-10 text-center"
          style={getMouseTransform(0.2)}
        >
          <div 
            className="max-w-2xl mx-auto floating-card-3d bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transform: `
                perspective(1000px) 
                rotateX(${mousePosition.y * -3}deg) 
                rotateY(${mousePosition.x * 3}deg)
              `
            }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-6 drop-shadow-lg">
              Ready to Order Premium Flowers?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contact us today to discuss your floral needs, request a quote, or learn more about our sustainable farming practices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-future group relative overflow-hidden rounded-md px-6 py-3 text-white font-medium">
                <span className="relative z-10">Contact Us Now</span>
              </button>
              <button className="relative overflow-hidden rounded-md px-6 py-3 font-medium border border-white/30 text-white/90 hover:bg-white/10 transition-colors">
                <span>Explore Products</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
