import { ArrowRight, Heart, Leaf, Smile } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Button from "@/components/Button";
import CertificationBadge from "@/components/CertificationBadge";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const Index = () => {
  // Parallax effect state and refs
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample product data for the homepage
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Red Roses",
      image: "https://images.unsplash.com/photo-1583436775199-2d9618673055?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Premium Roses",
      description: "Elegant long-stemmed red roses, perfect for luxury floral arrangements and special occasions.",
      price: 29.99
    },
    {
      id: 2,
      name: "Spray Carnations",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Summer Flowers",
      description: "Vibrant spray carnations with multiple blooms per stem, adding texture and color to bouquets.",
      price: 19.99
    },
    {
      id: 3,
      name: "Premium Pink Roses",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Premium Roses",
      description: "Delicate pink roses with excellent vase life and stunning bloom development.",
      price: 24.99
    },
    {
      id: 4,
      name: "Elegant Lilies",
      image: "https://images.unsplash.com/photo-1612966809470-bfbbeb142bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Specialty Flowers",
      description: "Striking lilies with large, fragrant blooms perfect for statement arrangements.",
      price: 32.99
    },
    {
      id: 5,
      name: "Colorful Tulips",
      image: "https://images.unsplash.com/photo-1589392342952-1a527a7e662f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Spring Flowers",
      description: "Vibrant tulips in various colors, bringing freshness and charm to any arrangement.",
      price: 22.99
    }
  ];

  // Banner images for parallax slider
  const bannerImages = [
    "https://images.unsplash.com/photo-1624225010878-11814b8608fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1591550253956-cead2c3882e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1621983209364-a51c1c8a67d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  // State for the current banner image
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Change banner image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % bannerImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // Sample certification data
  const certifications = [
    { name: "Fairtrade", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Fairtrade-Logo.svg/1200px-Fairtrade-Logo.svg.png" },
    { name: "Kenya Flower Council", logo: "https://kenyaflowercouncil.org/wp-content/uploads/2019/02/logo.png" },
    { name: "SEDEX", logo: "https://www.sedex.com/wp-content/uploads/2019/05/Sedex_Logo_2019.png" },
    { name: "Global G.A.P", logo: "https://www.globalgap.org/.content/.galleries/images/GLOBALG.A.P._Corporate_Logo.png" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background transition */}
      <HeroSection 
        title="Fresh, Quality, and Sustainable Flowers from Kenya"
        subtitle="Cultivating Beauty, Harvesting Excellence"
        backgroundImage={bannerImages[currentBannerIndex]}
        height="large"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            as="link" 
            href="/products" 
            size="lg" 
            icon={<ArrowRight size={18} />} 
            iconPosition="right"
            className="transform transition-transform hover:translate-y-[-5px] hover:shadow-lg"
          >
            View Our Flowers
          </Button>
          <Button 
            as="link" 
            href="/contact" 
            variant="outline" 
            size="lg" 
            className="bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white/30 hover:text-white transform transition-transform hover:translate-y-[-5px] hover:shadow-lg"
          >
            Get in Touch
          </Button>
        </div>
      </HeroSection>

      {/* 3D Parallax Intro Section */}
      <section 
        ref={parallaxRef}
        className="page-section bg-gradient-to-b from-sage/10 to-transparent relative overflow-hidden"
      >
        {/* Parallax floating elements */}
        <div 
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "5%",
            transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.05}deg)`,
            opacity: 0.7,
            zIndex: 1
          }}
        >
          <img src="https://images.unsplash.com/photo-1589392342952-1a527a7e662f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2OHwwfDF8c2VhcmNofDJ8fHR1bGlwc3xlbnwwfHx8fDE2OTg4ODgxNTB8MA&ixlib=rb-4.0.3&q=80&w=150" 
               alt="Floating tulip" 
               className="rounded-full shadow-xl w-24 h-24 object-cover" 
          />
        </div>
        <div 
          className="absolute pointer-events-none"
          style={{
            top: "30%",
            right: "10%",
            transform: `translateY(${scrollY * 0.1}px) rotate(${-scrollY * 0.03}deg)`,
            opacity: 0.8,
            zIndex: 1
          }}
        >
          <img src="https://images.unsplash.com/photo-1583436425532-6e4e1474575d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2OHwwfDF8c2VhcmNofDd8fHJvc2V8ZW58MHx8fHwxNjk4ODg4MjAyfDA&ixlib=rb-4.0.3&q=80&w=150" 
               alt="Floating rose" 
               className="rounded-full shadow-xl w-20 h-20 object-cover" 
          />
        </div>
        <div 
          className="absolute pointer-events-none"
          style={{
            bottom: "15%",
            left: "15%",
            transform: `translateY(${-scrollY * 0.05}px) rotate(${scrollY * 0.02}deg)`,
            opacity: 0.7,
            zIndex: 1
          }}
        >
          <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNjE2OHwwfDF8c2VhcmNofDE3fHxmbG93ZXJ8ZW58MHx8fHwxNjk4ODg4MjU0fDA&ixlib=rb-4.0.3&q=80&w=150" 
               alt="Floating flower" 
               className="rounded-full shadow-xl w-16 h-16 object-cover" 
          />
        </div>
        
        <div className="container-tight relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto transform transition-all duration-700" 
               style={{ 
                 transform: `translateY(${Math.min(scrollY * 0.05, 30)}px)`,
                 opacity: Math.min(1, 0.4 + scrollY * 0.001)
               }}>
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full inline-block transform hover:scale-105 transition-transform">
              About Credible Blooms
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Kenya's Premier Flower Farm
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Located at an ideal altitude of 2050 meters above sea level in Naivasha, 
              Credible Blooms grows premium quality flowers for both local and international markets. 
              Our commitment to sustainable farming practices ensures our flowers are as 
              environmentally friendly as they are beautiful.
            </p>
            <Link to="/about" className="inline-flex items-center mt-6 text-primary font-medium link-underline hover:translate-x-1 transition-transform">
              Learn more about our story
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
                className="glass-panel p-8 h-full flex flex-col items-center text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl"
                style={{ 
                  transformStyle: "preserve-3d", 
                  perspective: "1000px",
                  transform: `translateZ(0) translateY(${Math.min(scrollY * 0.03 * (index + 1), 20)}px)`
                }}
              >
                <div className="mb-4 bg-sage/30 p-3 rounded-full transform transition-transform hover:scale-110">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with Carousel */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Our Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Featured Flowers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our selection of premium quality flowers, grown with care and harvested at the perfect moment.
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      image={product.image}
                      category={product.category}
                      description={product.description}
                      price={product.price}
                      className="h-full transform transition-all duration-300 hover:translate-y-[-5px]"
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

          <div className="mt-12 text-center">
            <Button 
              as="link" 
              href="/products" 
              icon={<ArrowRight size={18} />} 
              iconPosition="right"
              className="transform transition-transform hover:translate-y-[-5px] hover:shadow-lg"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Certifications with animated hover effects */}
      <section className="page-section bg-cream/50">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Our Standards
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Quality Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We adhere to the highest international standards to ensure our flowers meet global quality expectations.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <CertificationBadge
                key={index}
                name={cert.name}
                logo={cert.logo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with parallax background */}
      <section 
        className="relative py-20 md:py-28 bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
        <div className="container relative z-10 text-center">
          <div className="max-w-2xl mx-auto transform transition-all duration-500 hover:scale-105">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6 drop-shadow-lg">
              Ready to Order Premium Flowers?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contact us today to discuss your floral needs, request a quote, or learn more about our sustainable farming practices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                as="link" 
                href="/contact" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 transform transition-transform hover:translate-y-[-5px] hover:shadow-lg"
              >
                Contact Us Now
              </Button>
              <Button 
                as="link" 
                href="/products" 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/20 transform transition-transform hover:translate-y-[-5px] hover:shadow-lg"
              >
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
