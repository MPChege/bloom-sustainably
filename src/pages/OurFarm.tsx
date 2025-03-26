
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, MapPin, Leaf, Droplet, Sun, Clock, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import OptimizedImage from "@/components/OptimizedImage";

const OurFarm = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("cb1");
  
  useEffect(() => {
    // Check URL parameters for location
    const params = new URLSearchParams(location.search);
    const farmLocation = params.get("location");
    if (farmLocation === "cb1" || farmLocation === "cb2") {
      setActiveTab(farmLocation);
    }
  }, [location]);

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Our Farm"
        subtitle="Explore our state-of-the-art flower farms in Kenya"
        backgroundImage="https://images.unsplash.com/photo-1524059228160-55d0c0142fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />
      
      <section className="py-16 bg-white">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-2/5">
              <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                Our Locations
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-6">
                Sustainable Farming in the Heart of Kenya
              </h2>
              
              <div className="prose mb-8">
                <p>
                  Credible Blooms operates two specialized farms in Kenya's 
                  highland regions, where the altitude, climate, and soil 
                  conditions create the perfect environment for growing 
                  premium flowers and crops.
                </p>
                <p>
                  Our farms employ sustainable farming practices, 
                  minimizing environmental impact while maximizing 
                  quality and productivity. We take pride in our 
                  commitment to ethical and eco-friendly cultivation methods.
                </p>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="cb1" className={`text-sm ${activeTab === "cb1" ? "bg-purple/20" : ""}`}>
                    Main Farm (CB1)
                  </TabsTrigger>
                  <TabsTrigger value="cb2" className={`text-sm ${activeTab === "cb2" ? "bg-purple/20" : ""}`}>
                    Crops Farm (CB2)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="w-full md:w-3/5">
              <Tabs value={activeTab} className="w-full">
                <TabsContent value="cb1" className="mt-0">
                  <div className="glass-card overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1626809774573-c000d982bf47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="CB1 - Main Flower Farm" 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-primary/80 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Naivasha, Kenya</span>
                      </div>
                      <h3 className="text-xl font-medium mb-3">CB1 - The Perfect Growing Environment</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Located at an altitude of 2050 meters above sea level, our farm benefits from ideal growing 
                        conditions that are unmatched by many other regions. The combination of rich volcanic soil, 
                        abundant sunshine, and cool temperatures creates the perfect environment for growing vibrant, 
                        long-lasting flowers with exceptional stem length, bloom size, and color intensity.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Leaf className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Products</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Premium roses, spray roses, carnations, hypericum, and seasonal specialties
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Droplet className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Water Source</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Advanced drip irrigation and rainwater harvesting systems
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Sun className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Growing Method</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Climate-controlled greenhouses spanning 35 hectares
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Shipping Time</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            24-48 hours to Europe, Middle East, and Asia
                          </p>
                        </div>
                      </div>
                      
                      <Link 
                        to="/virtual-tour" 
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium mt-2"
                      >
                        Take a virtual tour of our flower farm
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="cb2" className="mt-0">
                  <div className="glass-card overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="CB2 - Crops & Seedlings Farm" 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-primary/80 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Nakuru Region, Kenya</span>
                      </div>
                      <h3 className="text-xl font-medium mb-3">CB2 - Sustainable Crop Production</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Our diversified agricultural farm focuses on seedling production, fruits, vegetables, 
                        maize, tomatoes and other food crops using organic farming and permaculture principles. 
                        CB2 represents our commitment to sustainable agriculture and food security, utilizing 
                        eco-friendly cultivation techniques.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Leaf className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Products</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Seedlings, fruits, vegetables, maize, tomatoes
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Droplet className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Water Source</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Drip irrigation and rainwater collection
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Sun className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Growing Method</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Organic farming and permaculture
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Established</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            2015
                          </p>
                        </div>
                      </div>
                      
                      <Link 
                        to="/virtual-tour" 
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium mt-2"
                      >
                        Take a virtual tour of our crops farm
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      {/* Flower Farm Advantages Section - CB1 content */}
      <section className="py-16 bg-purple/5">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Our Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-6">
              What Makes Our Farm Special
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our unique combination of location, climate, and technology creates the perfect 
              environment for growing exceptional flowers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Advantage 1 */}
            <div className="glass-card p-6">
              <div className="h-12 w-12 bg-purple/20 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">2050 Meters Above Sea Level</h3>
              <p className="text-muted-foreground text-sm">
                Our high-altitude location provides optimal growing conditions with cooler 
                temperatures and intense sunlight.
              </p>
            </div>
            
            {/* Advantage 2 */}
            <div className="glass-card p-6">
              <div className="h-12 w-12 bg-purple/20 rounded-full flex items-center justify-center mb-4">
                <Sun className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Perfect Climate</h3>
              <p className="text-muted-foreground text-sm">
                With over 12 hours of daylight year-round and consistent temperatures, 
                our flowers develop rich colors and strong stems.
              </p>
            </div>
            
            {/* Advantage 3 */}
            <div className="glass-card p-6">
              <div className="h-12 w-12 bg-purple/20 rounded-full flex items-center justify-center mb-4">
                <Droplet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Water Conservation</h3>
              <p className="text-muted-foreground text-sm">
                Our advanced drip irrigation and rainwater harvesting systems conserve 
                this precious resource.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link to="/virtual-tour" className="btn-primary">
              Schedule a Virtual Farm Visit
            </Link>
          </div>
        </div>
      </section>
      
      {/* Flower Specialties Section */}
      <section className="py-16 bg-white">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Our Specialties
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-6">
              What We Grow
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in a variety of premium flowers, each grown with attention to detail and quality.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Specialty 1 */}
            <div className="group relative overflow-hidden rounded-xl aspect-square">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Premium Roses"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-medium">Premium Roses</h3>
                <p className="text-white/80 text-sm mt-1">
                  Our signature product with over 15 varieties in different colors and sizes.
                </p>
              </div>
            </div>
            
            {/* Specialty 2 */}
            <div className="group relative overflow-hidden rounded-xl aspect-square">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1593737074808-759fcc4dc9b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spray Roses"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-medium">Spray Roses</h3>
                <p className="text-white/80 text-sm mt-1">
                  Multi-headed roses perfect for bouquets and arrangements.
                </p>
              </div>
            </div>
            
            {/* Specialty 3 */}
            <div className="group relative overflow-hidden rounded-xl aspect-square">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Carnations"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-medium">Carnations</h3>
                <p className="text-white/80 text-sm mt-1">
                  Available in standard and spray varieties with excellent vase life.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/products" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              View Our Complete Product Range
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Farm Statistics */}
      <section className="py-16 bg-purple/5">
        <div className="container-tight">
          <div className="glass-panel p-8 md:p-12 bg-gradient-to-br from-purple/20 to-purple/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-serif font-semibold text-primary mb-2">35+</div>
                <div className="text-sm text-muted-foreground">Hectares of Land</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-semibold text-primary mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Flower Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-semibold text-primary mb-2">450+</div>
                <div className="text-sm text-muted-foreground">Employees</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-serif font-semibold text-primary mb-2">12+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurFarm;
