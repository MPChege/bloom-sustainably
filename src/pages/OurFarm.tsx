
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, MapPin, Leaf, Droplet, Sun, Clock, ArrowRight, Flower, Image, PlaneTakeoff, Sparkles, LineChart, Gauge } from "lucide-react";
import Button from "@/components/Button";
import OptimizedImage from "@/components/OptimizedImage";
import { Card, CardContent } from "@/components/ui/card";

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
                    Flower Farm (CB1)
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
                        alt="CB1 - Flower Farm" 
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
                      <h3 className="text-xl font-medium mb-3">The Perfect Growing Environment</h3>
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
                      <h3 className="text-xl font-medium mb-3">Sustainable Crop Production</h3>
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
      
      {/* For Flower Farm Tab - CB1 */}
      {activeTab === "cb1" && (
        <>
          {/* Prime Location Section */}
          <section className="py-16 bg-purple/5">
            <div className="container-tight">
              <div className="text-center mb-4">
                <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                  Prime Location
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
                    The Perfect Growing Environment
                  </h2>
                  <div className="prose text-muted-foreground">
                    <p>
                      Located in Naivasha, Kenya at an altitude of 2050 meters above sea level, 
                      our farm benefits from ideal growing conditions that are unmatched by many other regions.
                    </p>
                    <p>
                      The combination of rich volcanic soil, abundant sunshine, and cool temperatures 
                      creates the perfect environment for growing vibrant, long-lasting flowers with 
                      exceptional stem length, bloom size, and color intensity.
                    </p>
                    <p>
                      Our farm spans over 35 hectares of land with state-of-the-art greenhouses that 
                      provide controlled growing environments while implementing sustainable water 
                      management systems and solar energy to minimize our environmental impact.
                    </p>
                    <p>
                      Kenya's central location also provides logistical advantages, allowing us to ship 
                      fresh-cut flowers to Europe, the Middle East, and Asia within 24-48 hours of harvesting.
                    </p>
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/virtual-tour" className="btn-primary">
                      Schedule a Farm Visit
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="/lovable-uploads/b7f28867-8121-437a-a09b-016204a30835.png"
                      alt="Aerial view of flower greenhouses"
                      className="w-full h-full object-cover"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <OptimizedImage
                      src="/lovable-uploads/3990332e-d412-4bfb-b195-31782b9e55b8.png"
                      alt="Close up of flowers in the field"
                      className="w-full h-full object-cover"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Flower Farm Advantages Section */}
          <section className="py-16 bg-white">
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Advantage 1 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">2050 Meters Above Sea Level</h3>
                    <p className="text-muted-foreground text-center">
                      Our high-altitude location provides optimal growing conditions with cooler 
                      temperatures and intense sunlight.
                    </p>
                  </CardContent>
                </Card>
                
                {/* Advantage 2 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <Sun className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">Perfect Climate</h3>
                    <p className="text-muted-foreground text-center">
                      With over 12 hours of daylight year-round and consistent temperatures, 
                      our flowers develop rich colors and strong stems.
                    </p>
                  </CardContent>
                </Card>
                
                {/* Advantage 3 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <Droplet className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">Water Conservation</h3>
                    <p className="text-muted-foreground text-center">
                      Our advanced drip irrigation and rainwater harvesting systems conserve 
                      this precious resource.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Advantage 4 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <Leaf className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">Rich Volcanic Soil</h3>
                    <p className="text-muted-foreground text-center">
                      The naturally fertile soil of the Kenyan highlands provides ideal nutrition for our flowers.
                    </p>
                  </CardContent>
                </Card>
                
                {/* Advantage 5 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <LineChart className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">Modern Technology</h3>
                    <p className="text-muted-foreground text-center">
                      Climate-controlled greenhouses and monitoring systems ensure optimal growing conditions.
                    </p>
                  </CardContent>
                </Card>
                
                {/* Advantage 6 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">Low Carbon Footprint</h3>
                    <p className="text-muted-foreground text-center">
                      Solar power and sustainable practices reduce our environmental impact.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Visual Tour / Farm Gallery */}
          <section className="py-16 bg-purple/5">
            <div className="container-tight">
              <div className="text-center mb-12">
                <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                  Visual Tour
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-6">
                  Farm Gallery
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Take a visual tour of our facilities, fields, and operations.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="col-span-2 row-span-2">
                  <div className="glass-card h-full overflow-hidden">
                    <div className="relative aspect-square md:aspect-auto md:h-full">
                      <OptimizedImage
                        src="/lovable-uploads/d3794652-d431-4384-9774-a73af5ad21a8.png"
                        alt="Our state-of-the-art greenhouses with rows of flowers"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        width={600}
                        height={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end">
                        <p className="text-white text-sm">Our state-of-the-art greenhouses with rows of flowers</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <div className="glass-card overflow-hidden">
                    <div className="relative aspect-square">
                      <OptimizedImage
                        src="/lovable-uploads/9ec24cd4-0dc2-4edb-9c87-668df912dc2b.png"
                        alt="Our skilled team carefully harvesting roses"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        width={300}
                        height={300}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end">
                        <p className="text-white text-xs">Our skilled team carefully harvesting roses</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <div className="glass-card overflow-hidden">
                    <div className="relative aspect-square">
                      <OptimizedImage
                        src="https://images.unsplash.com/photo-1612966809470-bfbbeb142bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Inside view of our climate-controlled growing environment"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        width={300}
                        height={300}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end">
                        <p className="text-white text-xs">Inside view of our climate-controlled growing environment</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 md:col-span-2">
                  <div className="glass-card overflow-hidden">
                    <div className="relative aspect-video">
                      <OptimizedImage
                        src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="Our modern packing facility ensures flowers remain fresh during transport"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        width={600}
                        height={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end">
                        <p className="text-white text-sm">Our modern packing facility ensures flowers remain fresh during transport</p>
                      </div>
                    </div>
                  </div>
                </div>
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
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
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
                
                {/* Specialty 4 */}
                <div className="group relative overflow-hidden rounded-xl aspect-square">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1547187042-6d945e5a5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Hypericum"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-medium">Hypericum</h3>
                    <p className="text-white/80 text-sm mt-1">
                      Beautiful berries that add texture and interest to arrangements.
                    </p>
                  </div>
                </div>
                
                {/* Specialty 5 */}
                <div className="group relative overflow-hidden rounded-xl aspect-square">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1558652093-2bf93161efc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Lisianthus"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-medium">Lisianthus</h3>
                    <p className="text-white/80 text-sm mt-1">
                      Elegant blooms resembling roses with delicate ruffled petals.
                    </p>
                  </div>
                </div>
                
                {/* Specialty 6 */}
                <div className="group relative overflow-hidden rounded-xl aspect-square">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1548198471-e5a4b755def3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Seasonal Specialties"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-medium">Seasonal Specialties</h3>
                    <p className="text-white/80 text-sm mt-1">
                      Rotating selection of seasonal flowers to complement our core offerings.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <Link to="/products" className="btn-primary">
                  View Our Products
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
      
      {/* For Crops Farm Tab - CB2 */}
      {activeTab === "cb2" && (
        <>
          {/* Crops Farm Content */}
          <section className="py-16 bg-purple/5">
            <div className="container-tight">
              <div className="text-center mb-12">
                <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                  Sustainable Agriculture
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-6">
                  Our Crop Production
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  At our Crops Farm (CB2), we focus on sustainable farming practices that 
                  prioritize environmental stewardship and food security.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-medium mb-4">Diversified Crop Production</h3>
                  <div className="prose text-muted-foreground">
                    <p>
                      Our Crops Farm operates on principles of organic farming and permaculture, 
                      growing a diverse range of crops including vegetables, fruits, maize, and tomatoes.
                    </p>
                    <p>
                      We use integrated pest management techniques that minimize chemical inputs 
                      while maintaining high yields and quality standards.
                    </p>
                    <p>
                      Our seedling production facility provides healthy starts for both our farm 
                      and local farmers, contributing to food security in the region.
                    </p>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden">
                  <OptimizedImage
                    src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Our sustainable crop fields"
                    className="w-full h-full object-cover"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <Leaf className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">Organic Practices</h3>
                    <p className="text-muted-foreground text-center">
                      Natural composting, crop rotation, and reduced synthetic inputs for healthier produce.
                    </p>
                  </CardContent>
                </Card>
                
                {/* Feature 2 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <Droplet className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">Water Conservation</h3>
                    <p className="text-muted-foreground text-center">
                      Drip irrigation and rainwater harvesting systems that reduce water usage by up to 60%.
                    </p>
                  </CardContent>
                </Card>
                
                {/* Feature 3 */}
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
                        <Gauge className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-medium mb-2 text-center">Soil Health</h3>
                    <p className="text-muted-foreground text-center">
                      Regular soil testing and natural amendments to maintain optimal growing conditions.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-12">
                <Link to="/virtual-tour" className="btn-primary">
                  Take a Virtual Tour of Our Crops Farm
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
      
      {/* Farm Statistics - Common for both tabs */}
      <section className="py-16 bg-white">
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
