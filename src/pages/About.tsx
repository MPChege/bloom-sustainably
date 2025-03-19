
import HeroSection from "@/components/HeroSection";
import { CheckCircle, Users, Calendar, Target, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import TestimonialCard from "@/components/TestimonialCard";

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

  const testimonials = [
    {
      content: "The quality of flowers I receive from Credible Blooms is consistently outstanding. Their roses last much longer than any other supplier I've used.",
      author: "Sophia Davis",
      role: "Wedding Planner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      content: "Their commitment to sustainable farming practices while maintaining exceptional quality is why we've partnered with them for over 5 years.",
      author: "Marcus Johnson",
      role: "Hotel Chain Purchasing Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      content: "The variety and consistent quality from Credible Blooms helps our floral shop maintain its reputation for premium arrangements.",
      author: "Emma Rodriguez",
      role: "Boutique Florist Owner",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-white via-purple-50 to-white">
      <HeroSection 
        title="About Credible Blooms"
        subtitle="Our journey to becoming Kenya's premier flower farm"
        backgroundImage="https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      {/* Mission and Vision */}
      <section className="page-section bg-white shadow-md rounded-lg mx-4 md:mx-8 lg:mx-auto -mt-8 relative z-10 max-w-7xl">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
                Our Purpose
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6 text-purple-900">
                Mission & Vision
              </h2>
              
              <div className="space-y-6">
                <div className="glass-panel p-6 border-l-4 border-primary shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-medium mb-2 text-primary">Our Mission</h3>
                  <p className="text-gray-700">
                    To grow and supply premium quality flowers using sustainable practices 
                    that protect our environment, support our communities, and deliver 
                    exceptional value to our customers around the world.
                  </p>
                </div>
                
                <div className="glass-panel p-6 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-medium mb-2 text-red-500">Our Vision</h3>
                  <p className="text-gray-700">
                    To be recognized globally as the leading sustainable flower farm in Africa, 
                    setting the standard for quality, innovation, and environmental stewardship 
                    in the floriculture industry.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <img 
                src="https://images.unsplash.com/photo-1591826637271-81f9e32802b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Greenhouse with rows of flowers" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-1/2 h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1584304624103-2265fad26258?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Closeup of tulips" 
                  className="w-full h-auto object-cover rounded-lg shadow-lg border-4 border-white"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="page-section bg-gradient-to-r from-purple-50 to-red-50">
        <div className="container-tight">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6 text-purple-900">
              Our Core Values
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              These principles guide everything we do at Credible Blooms, from how we grow our flowers 
              to how we treat our employees and interact with our community.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index} 
                className="glass-panel p-8 flex items-start bg-white/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-primary"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.1
                    } 
                  }
                }}
              >
                <div className="mr-4 mt-1 p-3 bg-primary/10 rounded-full">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-primary">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block">
              The People Behind Our Success
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6 text-purple-900">
              Our Leadership Team
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Meet the dedicated professionals who lead Credible Blooms with expertise, 
              passion, and a commitment to excellence.
            </p>
          </motion.div>
          
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
              <motion.div 
                key={index} 
                className="glass-card overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.2
                    } 
                  }
                }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center border-t-4 border-primary">
                  <h3 className="text-xl font-medium text-purple-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="page-section bg-gradient-to-br from-purple-50 to-red-50">
        <div className="container-tight">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block">
              What Our Clients Say
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6 text-purple-900">
              Testimonials
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Don't just take our word for it - see what our valued clients have to say about Credible Blooms.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Our History Timeline */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full inline-block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6 text-purple-900">
              The Credible Blooms Story
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From humble beginnings to a leading flower exporter, our journey has been marked 
              by growth, innovation, and an unwavering commitment to quality.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-300 via-primary to-red-300 rounded-full hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index} 
                  className={cn(
                    "relative flex flex-col md:flex-row gap-8 items-center",
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  )}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      transition: { 
                        duration: 0.5,
                        delay: index * 0.1
                      } 
                    }
                  }}
                >
                  {/* Year bubble */}
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 bg-gradient-to-r from-primary to-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-medium shadow-lg">
                    {item.year}
                  </div>
                  
                  {/* Content box */}
                  <div className={cn(
                    "glass-panel p-6 md:w-[calc(50%-2rem)] bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4",
                    index % 2 === 0 ? "md:text-right border-primary" : "md:text-left border-red-500"
                  )}>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                  
                  {/* Empty div for alignment */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
