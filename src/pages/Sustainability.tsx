import HeroSection from "@/components/HeroSection";
import { Droplets, Recycle, Sun, Sprout, Users, Heart } from "lucide-react";
import CertificationBadge from "@/components/CertificationBadge";

const Sustainability = () => {
  const initiatives = [
    {
      icon: <Droplets className="h-6 w-6 text-primary" />,
      title: "Water Conservation",
      description: "Our closed-loop water recycling system reduces water usage by up to 80% compared to traditional farming methods."
    },
    {
      icon: <Recycle className="h-6 w-6 text-primary" />,
      title: "Waste Management", 
      description: "We compost 100% of organic waste and recycle all plastic and packaging materials used in our operations."
    },
    {
      icon: <Sun className="h-6 w-6 text-primary" />,
      title: "Renewable Energy",
      description: "Solar panels provide 70% of our energy needs, reducing our carbon footprint and operating costs."
    },
    {
      icon: <Sprout className="h-6 w-6 text-primary" />,
      title: "Integrated Pest Management",
      description: "We use biological controls and natural predators to minimize chemical pesticide use."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Fair Labor Practices",
      description: "All employees receive fair wages, healthcare benefits, and opportunities for career development."
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Community Support",
      description: "We invest in local schools, healthcare facilities, and infrastructure to support our workers and their families."
    }
  ];

  const certifications = [
    { name: "Fairtrade", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Fairtrade-Logo.svg/1200px-Fairtrade-Logo.svg.png" },
    { name: "Kenya Flower Council", logo: "https://kenyaflowercouncil.org/wp-content/uploads/2019/02/logo.png" },
    { name: "SEDEX", logo: "https://www.sedex.com/wp-content/uploads/2019/05/Sedex_Logo_2019.png" },
    { name: "Global G.A.P", logo: "https://www.globalgap.org/.content/.galleries/images/GLOBALG.A.P._Corporate_Logo.png" },
    { name: "MPS-ABC", logo: "https://www.my-mps.com/images/logo-nieuw-2021.png" },
    { name: "Rainforest Alliance", logo: "https://www.rainforest-alliance.org/wp-content/uploads/2021/07/RA-Cert-Seal-Green.png" }
  ];

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Our Commitment to Sustainability"
        subtitle="Growing flowers in harmony with nature and communities"
        backgroundImage="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      {/* Sustainability Approach */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative h-[500px] w-full">
              <img 
                src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Greenhouses with solar panels" 
                className="absolute w-3/4 h-auto rounded-lg shadow-lg z-10 top-0 left-0"
              />
              <img 
                src="https://images.unsplash.com/photo-1504713685952-246531f75c5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Water conservation system with flowers" 
                className="absolute w-2/3 h-auto rounded-lg shadow-lg bottom-0 right-0 border-4 border-white"
              />
              <div className="absolute w-64 h-64 rounded-full bg-sage/30 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <div className="order-1 md:order-2">
              <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
                Sustainable By Design
              </h2>
              
              <div className="prose">
                <p>
                  At Credible Blooms, sustainability isn't just a buzzword—it's built into every aspect 
                  of our operations. From the design of our facilities to our daily farming practices, 
                  we constantly seek ways to minimize our environmental impact while maximizing the 
                  quality of our flowers.
                </p>
                <p>
                  We believe that beautiful flowers should come from beautiful practices. That's why we've 
                  invested in renewable energy, water conservation, integrated pest management, and 
                  environmentally friendly growing methods that protect our soil, water, and air.
                </p>
                <p>
                  Our commitment extends beyond environmental considerations to encompass social 
                  responsibility as well. We provide fair wages, safe working conditions, and development 
                  opportunities for our employees, while supporting the broader community through various 
                  initiatives.
                </p>
                <p>
                  These efforts have earned us recognition and certification from leading international 
                  organizations, validating our approach and encouraging us to continuously improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sustainability Initiatives */}
      <section className="page-section bg-sage/10">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Making A Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Our Sustainability Initiatives
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We implement a range of practices to ensure our operations are as environmentally 
              friendly and socially responsible as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 flex flex-col"
              >
                <div className="mb-4 p-3 bg-white/60 rounded-full self-start">
                  {initiative.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{initiative.title}</h3>
                <p className="text-muted-foreground">{initiative.description}</p>
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
              Sustainability By The Numbers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We track key metrics to measure our progress and identify areas for improvement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: "80%",
                label: "Water Reduction",
                description: "Through recycling and efficient irrigation systems"
              },
              {
                metric: "70%",
                label: "Solar Powered",
                description: "Of our energy needs come from renewable sources"
              },
              {
                metric: "100%",
                label: "Organic Waste Composted",
                description: "Nothing goes to waste in our circular system"
              },
              {
                metric: "90%",
                label: "Reduction in Chemical Use",
                description: "Through integrated pest management techniques"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 flex flex-col items-center text-center"
              >
                <div className="text-5xl font-bold text-primary mb-2">{stat.metric}</div>
                <h3 className="text-xl font-medium mb-2">{stat.label}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications */}
      <section className="page-section bg-cream/50">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Verified Standards
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Our Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to sustainability is validated by these internationally recognized certifications.
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
          
          <div className="mt-16 glass-panel p-8">
            <h3 className="text-2xl font-medium mb-4 text-center">Our Certification Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  step: "1",
                  title: "Rigorous Assessment",
                  description: "Our facilities and practices undergo thorough evaluation by independent auditors"
                },
                {
                  step: "2",
                  title: "Continuous Monitoring",
                  description: "Regular inspections ensure ongoing compliance with certification standards"
                },
                {
                  step: "3",
                  title: "Transparent Reporting",
                  description: "We maintain detailed records and provide full transparency to certification bodies"
                }
              ].map((process, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                    {process.step}
                  </div>
                  <h4 className="text-xl font-medium mb-2">{process.title}</h4>
                  <p className="text-muted-foreground">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Future Plans */}
      <section 
        className="relative py-20 md:py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496861083958-175aa34862cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
      >
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm"></div>
        <div className="container-tight relative z-10">
          <div className="text-center mb-12">
            <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm">
              Looking Forward
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6 text-white">
              Our Sustainability Roadmap
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              We're committed to continuous improvement in our sustainability journey. 
              Here's what we're working towards in the coming years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: "2024",
                goals: [
                  "Achieve carbon neutrality through offsets and reductions",
                  "Expand rainwater harvesting capacity by 50%",
                  "Launch biodiversity enhancement program"
                ]
              },
              {
                year: "2025",
                goals: [
                  "Transition to 100% renewable energy",
                  "Implement zero-waste packaging solutions",
                  "Expand employee education & development programs"
                ]
              },
              {
                year: "2026",
                goals: [
                  "Achieve net positive water impact",
                  "Develop regenerative agriculture practices",
                  "Establish supplier sustainability standards"
                ]
              }
            ].map((roadmap, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
              >
                <div className="text-2xl font-bold text-white mb-4">{roadmap.year}</div>
                <ul className="space-y-3">
                  {roadmap.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start text-white/90">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-2 mt-1 text-white" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;
