
import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import { ArrowDown, Lightbulb, Calendar, Users, Image, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import FlowerAvailabilityTracker from "@/components/FlowerAvailabilityTracker";
import CustomerCommunity from "@/components/CustomerCommunity";
import InteractiveProductShowcase from "@/components/InteractiveProductShowcase";
import Timeline from "@/pages/Sustainability/Timeline";
import { useIsMobile } from "@/hooks/use-mobile";

const FeatureShowcase = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/5 to-transparent">
      <HeroSection
        title="Explore Our Interactive Features"
        subtitle="Discover the innovative ways we bring our flower farm to life with cutting-edge digital experiences"
        backgroundImage="https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75"
        height={isMobile ? "medium" : "large"}
        overlay="medium"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToFeatures}
            className="btn-future group relative overflow-hidden rounded-md px-6 py-3 text-white font-medium"
          >
            <span className="relative z-10 flex items-center">
              Explore Features
              <ArrowDown size={18} className="ml-2 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </HeroSection>

      {/* Features Navigation */}
      <div 
        ref={featuresRef}
        className="container mx-auto px-4 py-8 md:py-16"
      >
        <div className="text-center mb-8 md:mb-16">
          <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block">
            Interactive Experiences
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-semibold mt-4 md:mt-6 mb-4 md:mb-6">
            Cutting-Edge Features
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Explore our farm and products through these innovative digital experiences, designed to bring you closer to our roses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16">
          {[
            { 
              title: "Virtual Farm Tour", 
              description: "Explore our farm through an immersive 3D experience.", 
              icon: <Image className="h-6 w-6 text-primary" />,
              link: "/virtual-tour"
            },
            { 
              title: "Interactive Product Showcase", 
              description: "View our products in 3D and explore from all angles.", 
              icon: <Lightbulb className="h-6 w-6 text-primary" />,
              elementId: "product-showcase"
            },
            { 
              title: "Sustainability Timeline", 
              description: "Discover our journey towards sustainable farming.", 
              icon: <Leaf className="h-6 w-6 text-primary" />,
              elementId: "sustainability-timeline"
            },
            { 
              title: "Community Garden", 
              description: "See how customers use our flowers in their creations.", 
              icon: <Users className="h-6 w-6 text-primary" />,
              elementId: "customer-community"
            }
          ].map((feature, index) => (
            <a
              key={index}
              href={feature.link || `#${feature.elementId}`}
              className="block p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={(e) => {
                if (feature.elementId) {
                  e.preventDefault();
                  document.getElementById(feature.elementId)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              <div className="mb-3 md:mb-4 bg-purple-100/50 p-3 rounded-full inline-block">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </a>
          ))}
        </div>

        {/* Interactive Product Showcase */}
        <section id="product-showcase" className="mb-12 md:mb-24 scroll-mt-24">
          <div className="text-center mb-6 md:mb-8">
            <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block">
              3D Showcase
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mt-3 md:mt-4 mb-2">
              Interactive Product Showcase
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Experience our flower arrangements in stunning 3D detail. Rotate, zoom, and explore our products from every angle.
            </p>
          </div>
          
          <InteractiveProductShowcase />
        </section>

        {/* Real-time Flower Availability */}
        <section id="availability-tracker" className="mb-12 md:mb-24 scroll-mt-24">
          <div className="text-center mb-6 md:mb-8">
            <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block">
              Real-time Data
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mt-3 md:mt-4 mb-2">
              Flower Availability Tracker
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Check the current availability of our premium rose varieties and when they'll be harvested next.
            </p>
          </div>
          
          <FlowerAvailabilityTracker />
        </section>

        {/* Sustainability Timeline */}
        <section id="sustainability-timeline" className="mb-12 md:mb-24 scroll-mt-24">
          <div className="text-center mb-6 md:mb-8">
            <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block">
              Our Journey
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mt-3 md:mt-4 mb-2">
              Sustainability Timeline
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Explore our ongoing commitment to sustainable practices and ethical flower production since our founding.
            </p>
          </div>
          
          <Timeline />
        </section>

        {/* Customer Community */}
        <section id="customer-community" className="scroll-mt-24">
          <div className="text-center mb-6 md:mb-8">
            <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block">
              Community Showcase
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mt-3 md:mt-4 mb-2">
              Customer Community
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              See how our customers are using Credible Blooms flowers in their special moments and share your own creations.
            </p>
          </div>
          
          <CustomerCommunity />
        </section>
      </div>
    </div>
  );
};

export default FeatureShowcase;
