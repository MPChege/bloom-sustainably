import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, MapPin, Leaf, Droplet, Sun, Clock } from "lucide-react";
import Button from "@/components/Button";

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
                  premium flowers.
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
                      <h3 className="text-xl font-medium mb-3">CB1 - Main Flower Production</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Our flagship farm dedicated to the cultivation of premium flowers. 
                        CB1 spans over 30 hectares of land, featuring state-of-the-art 
                        greenhouse technology and advanced irrigation systems.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Leaf className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Products</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Premium roses, spray roses, and specialty cut flowers
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Droplet className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Water Source</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Rainwater harvesting and sustainable well
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Sun className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Growing Method</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            Hydroponic and soil-based cultivation
                          </p>
                        </div>
                        <div className="bg-purple/10 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium text-sm">Established</span>
                          </div>
                          <p className="text-xs text-muted-foreground pl-6">
                            2010
                          </p>
                        </div>
                      </div>
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
                      <h3 className="text-xl font-medium mb-3">CB2 - Crops & Seedlings Farm</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Our diversified agricultural farm that focuses on seedling production, 
                        fruits, vegetables, maize, tomatoes and other food crops. CB2 represents 
                        our commitment to sustainable agriculture and food security.
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
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      {/* Video Section */}
      <section className="py-16 bg-purple/5">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Farm Videos
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-6">
              Experience Our Farms
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a virtual tour of our operations and see how we cultivate premium 
              flowers and crops using sustainable farming practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Video 1 */}
            <div className="glass-card overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Flower Cultivation" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Flower Cultivation Process</h3>
                <p className="text-xs text-muted-foreground mt-1">3:45 minutes</p>
              </div>
            </div>
            
            {/* Video 2 */}
            <div className="glass-card overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589927932384-eee514a6848a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Harvesting & Packaging" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Harvesting & Packaging</h3>
                <p className="text-xs text-muted-foreground mt-1">4:20 minutes</p>
              </div>
            </div>
            
            {/* Video 3 */}
            <div className="glass-card overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1621806939047-af6201999fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Sustainable Practices" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Our Sustainable Practices</h3>
                <p className="text-xs text-muted-foreground mt-1">5:12 minutes</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button 
              as="link" 
              href="/virtual-tour" 
              className="bg-secondary hover:bg-secondary/90 text-white"
            >
              Take a Virtual Tour
            </Button>
          </div>
        </div>
      </section>
      
      {/* Farm Statistics */}
      <section className="py-16 bg-white">
        <div className="container-tight">
          <div className="glass-panel p-8 md:p-12 bg-gradient-to-br from-purple/20 to-purple/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-serif font-semibold text-primary mb-2">30+</div>
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
