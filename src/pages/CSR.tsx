
import HeroSection from "@/components/HeroSection";
import { BookOpen, Home, Heart, Users, Award, Star } from "lucide-react";
import Button from "@/components/Button";

const CSR = () => {
  const initiatives = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Education Support",
      description: "We've built and support two local schools, providing quality education to over 500 children in our community.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Home className="h-6 w-6 text-primary" />,
      title: "Housing Improvements",
      description: "Our employee housing program has helped 200+ families access better housing with clean water and electricity.",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Healthcare Access",
      description: "Our on-site clinic provides free healthcare to employees and their families, serving 2,000+ people annually.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Women's Empowerment",
      description: "Our leadership development program has helped 150+ women advance to management positions within our organization.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const testimonials = [
    {
      quote: "The scholarship program from Credible Blooms helped me complete my education and return to work as an agricultural engineer. They've transformed not just my life, but our entire community.",
      author: "Mary Njeri",
      role: "Former Scholarship Recipient, Now Agricultural Engineer"
    },
    {
      quote: "As a single mother, the childcare facilities provided by Credible Blooms have been invaluable. I can work with peace of mind knowing my children are well cared for and learning.",
      author: "Grace Wambui",
      role: "Production Team Lead"
    },
    {
      quote: "The company's investment in our village water system has dramatically improved health outcomes. Cases of waterborne diseases have dropped by 80% since the project was completed.",
      author: "Dr. James Kamau",
      role: "Local Health Center Director"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Corporate Social Responsibility"
        subtitle="Growing communities alongside our flowers"
        backgroundImage="https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      {/* CSR Philosophy */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
                We Grow Communities
              </h2>
              
              <div className="prose">
                <p>
                  At Credible Blooms, we believe that our success is intrinsically linked to the 
                  wellbeing of our employees, their families, and the broader community. Our Corporate 
                  Social Responsibility (CSR) initiatives reflect this commitment.
                </p>
                <p>
                  We take a holistic approach to community development, focusing on key areas that create 
                  lasting positive impact: education, healthcare, housing, and economic empowerment. By 
                  investing in these fundamental areas, we help create the conditions for sustainable 
                  development and improved quality of life.
                </p>
                <p>
                  Our programs are developed with direct input from community members to ensure they 
                  address real needs and respect local culture and traditions. We measure our success 
                  not just in business terms, but in the tangible improvements we see in the lives of 
                  those around us.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                {["Education", "Healthcare", "Housing", "Women's Empowerment", "Water & Sanitation", "Local Economy"].map((area, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-sage/20 text-primary/90 text-sm font-medium rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative h-[500px] w-full">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Community gathering" 
                className="absolute w-3/4 h-auto rounded-lg shadow-lg z-10 top-0 right-0"
              />
              <img 
                src="https://images.unsplash.com/photo-1509099863731-ef4bff19e808?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Children in classroom" 
                className="absolute w-2/3 h-auto rounded-lg shadow-lg bottom-0 left-0 border-4 border-white"
              />
              <div className="absolute w-64 h-64 rounded-full bg-sage/30 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Initiatives */}
      <section className="page-section bg-sage/10">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Making A Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Our Key CSR Initiatives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These programs represent our major investments in community development and wellbeing.
            </p>
          </div>
          
          <div className="space-y-12">
            {initiatives.map((initiative, index) => (
              <div 
                key={index} 
                className={`glass-panel p-8 grid grid-cols-1 md:grid-cols-5 gap-8 ${index % 2 ? 'md:grid-flow-row-dense' : ''}`}
              >
                <div className={`md:col-span-3 ${index % 2 ? 'md:col-start-3' : ''}`}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white/60 rounded-full mr-4">
                      {initiative.icon}
                    </div>
                    <h3 className="text-2xl font-medium">{initiative.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {initiative.description}
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
                <div className={`md:col-span-2 ${index % 2 ? 'md:col-start-1' : 'md:col-start-4'}`}>
                  <img 
                    src={initiative.image} 
                    alt={initiative.title} 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Metrics */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Measuring Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Community Impact By The Numbers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We track key metrics to measure the real-world impact of our CSR initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: "500+",
                label: "Children Educated",
                description: "In our supported schools annually"
              },
              {
                metric: "2,000+",
                label: "Medical Treatments",
                description: "Provided through our health clinic yearly"
              },
              {
                metric: "200+",
                label: "Improved Homes",
                description: "For employee families since program inception"
              },
              {
                metric: "85%",
                label: "Female Employment",
                description: "Supporting gender equality in our workforce"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 flex flex-col items-center text-center"
              >
                <div className="text-5xl font-bold text-primary mb-3">{stat.metric}</div>
                <h3 className="text-xl font-medium mb-2">{stat.label}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="page-section bg-cream/50">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Community Voices
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Impact Stories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear directly from those whose lives have been touched by our CSR initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-panel p-8 flex flex-col"
              >
                <div className="mb-6 text-4xl text-primary/40">"</div>
                <p className="italic text-foreground/90 mb-6 flex-grow">
                  {testimonial.quote}
                </p>
                <div>
                  <h4 className="text-lg font-medium">{testimonial.author}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Awards */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Recognition
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              CSR Awards & Recognition
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our community initiatives have been recognized by these organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Award className="h-10 w-10 text-primary" />,
                title: "Best Agricultural Employer Award",
                organization: "Kenya Employers Federation",
                year: "2022",
                description: "Recognized for outstanding employee welfare programs and community development initiatives."
              },
              {
                icon: <Star className="h-10 w-10 text-primary" />,
                title: "Community Impact Award",
                organization: "International Flower Association",
                year: "2021",
                description: "Awarded for exceptional contribution to local community development and empowerment."
              }
            ].map((award, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 flex items-start"
              >
                <div className="p-4 bg-sage/20 rounded-full mr-6">
                  {award.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">{award.title}</h3>
                  <p className="text-muted-foreground mb-3">
                    {award.organization} | {award.year}
                  </p>
                  <p className="text-foreground/90">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Get Involved */}
      <section 
        className="relative py-20 md:py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm"></div>
        <div className="container-tight relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm">
              Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6 text-white">
              Partner With Us
            </h2>
            <p className="text-white/90 text-lg mb-8">
              We welcome collaboration with organizations that share our vision for community development. 
              Whether you're a business, NGO, or community group, we'd love to explore how we can work together.
            </p>
            <Button 
              as="link" 
              href="/contact" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CSR;
