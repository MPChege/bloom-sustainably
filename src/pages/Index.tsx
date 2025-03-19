
import { ArrowRight, Heart, Leaf, Smile } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Button from "@/components/Button";
import CertificationBadge from "@/components/CertificationBadge";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

const Index = () => {
  // Sample product data for the homepage
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Red Roses",
      image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Premium Roses",
      description: "Elegant long-stemmed red roses, perfect for luxury floral arrangements and special occasions."
    },
    {
      id: 2,
      name: "Spray Carnations",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Summer Flowers",
      description: "Vibrant spray carnations with multiple blooms per stem, adding texture and color to bouquets."
    },
    {
      id: 3,
      name: "Premium Pink Roses",
      image: "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Premium Roses",
      description: "Delicate pink roses with excellent vase life and stunning bloom development."
    }
  ];

  // Sample certification data
  const certifications = [
    { name: "Fairtrade", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Fairtrade-Logo.svg/1200px-Fairtrade-Logo.svg.png" },
    { name: "Kenya Flower Council", logo: "https://kenyaflowercouncil.org/wp-content/uploads/2019/02/logo.png" },
    { name: "SEDEX", logo: "https://www.sedex.com/wp-content/uploads/2019/05/Sedex_Logo_2019.png" },
    { name: "Global G.A.P", logo: "https://www.globalgap.org/.content/.galleries/images/GLOBALG.A.P._Corporate_Logo.png" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        title="Fresh, Quality, and Sustainable Flowers from Kenya"
        subtitle="Cultivating Beauty, Harvesting Excellence"
        backgroundImage="https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="large"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            as="link" 
            href="/products" 
            size="lg" 
            icon={<ArrowRight size={18} />} 
            iconPosition="right"
          >
            View Our Flowers
          </Button>
          <Button 
            as="link" 
            href="/contact" 
            variant="outline" 
            size="lg" 
            className="bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white/30 hover:text-white"
          >
            Get in Touch
          </Button>
        </div>
      </HeroSection>

      {/* Intro Section */}
      <section className="page-section bg-gradient-to-b from-sage/10 to-transparent">
        <div className="container-tight">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
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
            <Link to="/about" className="inline-flex items-center mt-6 text-primary font-medium link-underline">
              Learn more about our story
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Feature boxes */}
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
                className="glass-panel p-8 h-full flex flex-col items-center text-center"
              >
                <div className="mb-4 bg-sage/30 p-3 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                image={product.image}
                category={product.category}
                description={product.description}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button as="link" href="/products" icon={<ArrowRight size={18} />} iconPosition="right">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Certifications */}
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

      {/* CTA Section */}
      <section 
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
        <div className="container relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
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
                className="bg-white text-primary hover:bg-white/90"
              >
                Contact Us Now
              </Button>
              <Button 
                as="link" 
                href="/products" 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/20"
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
