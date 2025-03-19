
import HeroSection from "@/components/HeroSection";
import { CheckCircle, Users, Calendar, Target, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const About = () => {
  const timeline = [
    {
      year: "2010",
      title: "Humble Beginnings",
      description: "Credible Blooms was founded with just 2 hectares of land and a vision to grow quality roses."
    },
    {
      year: "2013",
      title: "International Expansion",
      description: "First successful exports to European markets, establishing our reputation for quality."
    },
    {
      year: "2015",
      title: "Sustainability Initiative",
      description: "Implemented comprehensive water recycling systems and solar power throughout the farm."
    },
    {
      year: "2018",
      title: "Product Diversification",
      description: "Expanded our product range to include summer flowers and specialty blooms."
    },
    {
      year: "2020",
      title: "Certification Milestone",
      description: "Achieved multiple international certifications for quality and sustainable practices."
    },
    {
      year: "Present",
      title: "Growing Together",
      description: "Continuing to expand our reach while maintaining our commitment to quality and sustainability."
    }
  ];

  const values = [
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Quality Excellence",
      description: "We are committed to growing the highest quality flowers that exceed international standards."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community Development",
      description: "We believe in supporting our local communities and providing fair employment opportunities."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Integrity",
      description: "We conduct our business with honesty, transparency, and respect for all stakeholders."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Innovation",
      description: "We continuously seek better methods in cultivation, harvesting, and sustainability."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="About Credible Blooms"
        subtitle="Our journey to becoming Kenya's premier flower farm"
        backgroundImage="https://images.unsplash.com/photo-1524593656068-76ff73f3e4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      {/* Mission and Vision */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                Our Purpose
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
                Mission & Vision
              </h2>
              
              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <h3 className="text-xl font-medium mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To grow and supply premium quality flowers using sustainable practices 
                    that protect our environment, support our communities, and deliver 
                    exceptional value to our customers around the world.
                  </p>
                </div>
                
                <div className="glass-panel p-6">
                  <h3 className="text-xl font-medium mb-2">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be recognized globally as the leading sustainable flower farm in Africa, 
                    setting the standard for quality, innovation, and environmental stewardship 
                    in the floriculture industry.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1599809726351-7343ff8a7ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Flower farm fields" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-1/2 h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Close up of roses" 
                  className="w-full h-auto object-cover rounded-lg shadow-lg border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="page-section bg-cream/50">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Credible Blooms, from how we grow our flowers 
              to how we treat our employees and interact with our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="glass-panel p-8 flex items-start"
              >
                <div className="mr-4 mt-1">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              The People Behind Our Success
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Our Leadership Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals who lead Credible Blooms with expertise, 
              passion, and a commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              {
                name: "David Mwangi",
                role: "Head of Production",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              {
                name: "Grace Odhiambo",
                role: "Sustainability Director",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="glass-card overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-medium">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our History Timeline */}
      <section className="page-section bg-sage/10">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              The Credible Blooms Story
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to a leading flower exporter, our journey has been marked 
              by growth, innovation, and an unwavering commitment to quality.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-sage/50 hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "relative flex flex-col md:flex-row gap-8 items-center",
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Year bubble */}
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center font-medium shadow-md">
                    {item.year}
                  </div>
                  
                  {/* Content box */}
                  <div className={cn(
                    "glass-panel p-6 md:w-[calc(50%-2rem)]",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  
                  {/* Empty div for alignment */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
