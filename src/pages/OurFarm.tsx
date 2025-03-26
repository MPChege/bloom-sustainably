
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Leaf, Droplet, Sun, Clock, ArrowRight, Flower, LineChart, Gauge, Sparkles, Play, Video, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection 
        title="Our Farm"
        subtitle="Explore our state-of-the-art flower farms in Kenya"
        backgroundImage="https://images.unsplash.com/photo-1524059228160-55d0c0142fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="cb1" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Flower className="w-4 h-4 mr-2" />
                  Flower Farm
                </TabsTrigger>
                <TabsTrigger value="cb2" className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Leaf className="w-4 h-4 mr-2" />
                  Crops Farm (CB2)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="w-full">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="cb1" className="mt-0">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="overflow-hidden rounded-2xl shadow-lg border border-purple-200/50"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <OptimizedImage 
                      src="https://images.unsplash.com/photo-1626809774573-c000d982bf47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                      alt="Flower Farm" 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      width={1200}
                      height={675}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer group">
                        <Play className="h-10 w-10 text-white fill-white group-hover:fill-primary transition-colors" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">The Perfect Growing Environment</h2>
                      <p className="text-xl font-light max-w-2xl">Where nature and technology create exceptional roses</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white">
                    <div className="flex items-center gap-2 text-primary mb-4">
                      <MapPin className="h-5 w-5" />
                      <span className="text-lg font-medium">Naivasha, Kenya • 2050m above sea level</span>
                    </div>
                    <p className="text-muted-foreground text-lg mb-8">
                      Located at an altitude of 2050 meters above sea level, our farm benefits from ideal growing 
                      conditions that are unmatched by many other regions. The combination of rich volcanic soil, 
                      abundant sunshine, and cool temperatures creates the perfect environment for growing vibrant, 
                      long-lasting flowers with exceptional stem length, bloom size, and color intensity.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100/50 transition-all duration-300 hover:shadow-md hover:bg-purple-100/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Flower className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-display text-xl font-semibold">Products</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Premium roses, spray roses, carnations, hypericum, and seasonal specialties
                        </p>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100/50 transition-all duration-300 hover:shadow-md hover:bg-purple-100/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Droplet className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-display text-xl font-semibold">Water Source</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Advanced drip irrigation and rainwater harvesting systems
                        </p>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100/50 transition-all duration-300 hover:shadow-md hover:bg-purple-100/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Sun className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-display text-xl font-semibold">Growing Method</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Climate-controlled greenhouses spanning 35 hectares
                        </p>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100/50 transition-all duration-300 hover:shadow-md hover:bg-purple-100/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Clock className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-display text-xl font-semibold">Shipping Time</h3>
                        </div>
                        <p className="text-muted-foreground">
                          24-48 hours to Europe, Middle East, and Asia
                        </p>
                      </div>
                    </div>
                    
                    <Link 
                      to="/virtual-tour" 
                      className="inline-flex items-center bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/90 transition-colors"
                    >
                      <Video className="h-5 w-5 mr-2" />
                      Take a virtual tour
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="cb2" className="mt-0">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="overflow-hidden rounded-2xl shadow-lg border border-green-200/50"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <OptimizedImage 
                      src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                      alt="CB2 - Crops & Seedlings Farm" 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                      width={1200}
                      height={675}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer group">
                        <Play className="h-10 w-10 text-white fill-white group-hover:fill-green-500 transition-colors" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Sustainable Crop Production</h2>
                      <p className="text-xl font-light max-w-2xl">Supporting local communities with eco-friendly farming</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white">
                    <div className="flex items-center gap-2 text-green-600 mb-4">
                      <MapPin className="h-5 w-5" />
                      <span className="text-lg font-medium">Nakuru Region, Kenya</span>
                    </div>
                    <p className="text-muted-foreground text-lg mb-8">
                      Our diversified agricultural farm focuses on seedling production, fruits, vegetables, 
                      maize, tomatoes and other food crops using organic farming and permaculture principles. 
                      CB2 represents our commitment to sustainable agriculture and food security, utilizing 
                      eco-friendly cultivation techniques.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-md hover:bg-green-100/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-green-500/10 rounded-full">
                            <Leaf className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="font-display text-xl font-semibold">Products</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Seedlings, fruits, vegetables, maize, tomatoes
                        </p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-md hover:bg-green-100/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-green-500/10 rounded-full">
                            <Droplet className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="font-display text-xl font-semibold">Water Source</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Drip irrigation and rainwater collection
                        </p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-md hover:bg-green-100/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-green-500/10 rounded-full">
                            <Sun className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="font-display text-xl font-semibold">Growing Method</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Organic farming and permaculture
                        </p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-md hover:bg-green-100/40">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 bg-green-500/10 rounded-full">
                            <Clock className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="font-display text-xl font-semibold">Established</h3>
                        </div>
                        <p className="text-muted-foreground">
                          2015
                        </p>
                      </div>
                    </div>
                    
                    <Link 
                      to="/virtual-tour" 
                      className="inline-flex items-center bg-green-600 text-white py-3 px-6 rounded-full hover:bg-green-700 transition-colors"
                    >
                      <Video className="h-5 w-5 mr-2" />
                      Take a virtual tour
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* For Flower Farm Tab - CB1 */}
      {activeTab === "cb1" && (
        <>
          {/* Prime Location Section */}
          <section className="py-16 bg-gradient-to-b from-white to-purple-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="text-center mb-6"
              >
                <span className="px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full inline-block mb-3">
                  Prime Location
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                  The Perfect Growing Environment
                </h2>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="prose prose-lg text-muted-foreground">
                    <p className="lead text-foreground font-medium">
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
                  
                  <div className="mt-8 flex gap-4">
                    <Button className="bg-primary text-white hover:bg-primary/90">
                      Schedule a Farm Visit
                    </Button>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-2 gap-6"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="space-y-6">
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                      <OptimizedImage
                        src="public/lovable-uploads/f5d22b58-4ca1-495e-ac18-467dfb463d8a.png"
                        alt="Aerial view of flower greenhouses"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        width={400}
                        height={400}
                      />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg translate-y-12">
                      <OptimizedImage
                        src="https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Close up of white roses"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className="space-y-6 translate-y-6">
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                      <OptimizedImage
                        src="https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Close up of red roses"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        width={400}
                        height={400}
                      />
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                      <OptimizedImage
                        src="public/lovable-uploads/041c8216-2f06-466e-94c0-dbb7318c808f.png"
                        alt="Close up of flowers in the field"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Farm Gallery Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="text-center mb-12"
              >
                <span className="px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full inline-block mb-3">
                  Visual Experience
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Farm Gallery
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Take a visual tour of our facilities, fields, and operations.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="overflow-hidden rounded-xl shadow-lg mb-4">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Our state-of-the-art greenhouses with rows of flowers"
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                      width={800}
                      height={600}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-center mb-1">State-of-the-art Greenhouses</h3>
                  <p className="text-center text-muted-foreground">Our modern greenhouses with rows of premium flowers</p>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="overflow-hidden rounded-xl shadow-lg mb-4">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Our skilled team carefully harvesting roses"
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                      width={800}
                      height={600}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-center mb-1">Expert Harvesting</h3>
                  <p className="text-center text-muted-foreground">Our skilled team carefully harvesting roses</p>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="overflow-hidden rounded-xl shadow-lg mb-4 relative bg-gray-100">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Inside greenhouse with rows of flowers"
                      className="w-full aspect-[4/3] object-cover"
                      width={800}
                      height={600}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors cursor-pointer">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-center mb-1">Farm Operations</h3>
                  <p className="text-center text-muted-foreground">Watch our behind-the-scenes video tour</p>
                </motion.div>
                
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="overflow-hidden rounded-xl shadow-lg mb-4">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Close-up of our premium quality blooms"
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                      width={800}
                      height={600}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-center mb-1">Premium Quality</h3>
                  <p className="text-center text-muted-foreground">Close-up of our premium quality blooms</p>
                </motion.div>
              </div>
              
              {/* Virtual Tour Option */}
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="relative">
                  <OptimizedImage
                    src="public/lovable-uploads/13fa4442-d787-4442-9be4-4276f09c18bc.png"
                    alt="Virtual tour of our farm"
                    className="w-full h-auto object-cover"
                    width={1200}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
                    <div className="p-12 max-w-2xl">
                      <h3 className="text-3xl font-display font-bold mb-4 text-white">Virtual Farm Tour</h3>
                      <p className="text-white/90 mb-6 text-lg">
                        Can't visit us in person? Experience our farm from anywhere with our immersive 
                        virtual tour. Explore our greenhouses, packing facilities, and learn about our 
                        sustainable practices from the comfort of your device.
                      </p>
                      <Link 
                        to="/virtual-tour" 
                        className="inline-flex items-center bg-white text-primary py-3 px-6 rounded-full hover:bg-purple-50 transition-colors"
                      >
                        <Video className="h-5 w-5 mr-2" />
                        Start Virtual Tour
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Flower Farm Advantages Section */}
          <section className="py-16 bg-purple-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="text-center mb-12"
              >
                <span className="px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full inline-block mb-3">
                  Our Advantages
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  What Makes Our Farm Special
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Our unique combination of location, climate, and technology creates the perfect 
                  environment for growing exceptional flowers.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Mountain className="h-7 w-7 text-primary" />,
                    title: "2050 Meters Above Sea Level",
                    description: "Our high-altitude location provides optimal growing conditions with cooler temperatures and intense sunlight."
                  },
                  {
                    icon: <Sun className="h-7 w-7 text-primary" />,
                    title: "Perfect Climate",
                    description: "With over 12 hours of daylight year-round and consistent temperatures, our flowers develop rich colors and strong stems."
                  },
                  {
                    icon: <Droplet className="h-7 w-7 text-primary" />,
                    title: "Water Conservation",
                    description: "Our advanced drip irrigation and rainwater harvesting systems conserve this precious resource."
                  },
                  {
                    icon: <Leaf className="h-7 w-7 text-primary" />,
                    title: "Rich Volcanic Soil",
                    description: "The naturally fertile soil of the Kenyan highlands provides ideal nutrition for our flowers."
                  },
                  {
                    icon: <LineChart className="h-7 w-7 text-primary" />,
                    title: "Modern Technology",
                    description: "Climate-controlled greenhouses and monitoring systems ensure optimal growing conditions."
                  },
                  {
                    icon: <Sparkles className="h-7 w-7 text-primary" />,
                    title: "Low Carbon Footprint",
                    description: "Solar power and sustainable practices reduce our environmental impact."
                  }
                ].map((advantage, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                        {advantage.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3">{advantage.title}</h3>
                    <p className="text-muted-foreground">
                      {advantage.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Flower Specialties Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="text-center mb-12"
              >
                <span className="px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full inline-block mb-3">
                  Our Specialties
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  What We Grow
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  We specialize in a variety of premium flowers, each grown with attention to detail and quality.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {[
                  {
                    name: "Premium Roses",
                    image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    description: "Our signature product with over 15 varieties in different colors and sizes."
                  },
                  {
                    name: "Spray Roses",
                    image: "https://images.unsplash.com/photo-1593737074808-759fcc4dc9b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    description: "Multi-headed roses perfect for bouquets and arrangements."
                  },
                  {
                    name: "Carnations",
                    image: "https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    description: "Available in standard and spray varieties with excellent vase life."
                  },
                  {
                    name: "Hypericum",
                    image: "https://images.unsplash.com/photo-1547187042-6d945e5a5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    description: "Beautiful berries that add texture and interest to arrangements."
                  },
                  {
                    name: "Lisianthus",
                    image: "https://images.unsplash.com/photo-1558652093-2bf93161efc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    description: "Elegant blooms resembling roses with delicate ruffled petals."
                  },
                  {
                    name: "Seasonal Specialties",
                    image: "https://images.unsplash.com/photo-1548198471-e5a4b755def3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                    description: "Rotating selection of seasonal flowers to complement our core offerings."
                  },
                ].map((specialty, index) => (
                  <motion.div 
                    key={index}
                    className="text-center flex flex-col items-center group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-4 shadow-md border-4 border-white group-hover:shadow-lg transition-all duration-300">
                      <OptimizedImage
                        src={specialty.image}
                        alt={specialty.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        width={160}
                        height={160}
                      />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{specialty.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {specialty.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Link to="/products">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <Flower className="mr-2 h-4 w-4" />
                    View Our Products
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      )}
      
      {/* For Crops Farm Tab - CB2 */}
      {activeTab === "cb2" && (
        <>
          {/* Crops Farm Content */}
          <section className="py-16 bg-gradient-to-b from-white to-green-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="text-center mb-12"
              >
                <span className="px-4 py-1.5 bg-green-600/10 text-green-600 font-medium rounded-full inline-block mb-3">
                  Sustainable Agriculture
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Our Crop Production
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  At our Crops Farm (CB2), we focus on sustainable farming practices that 
                  prioritize environmental stewardship and food security.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h3 className="text-2xl font-display font-bold mb-6 text-green-800">Diversified Crop Production</h3>
                  <div className="prose prose-lg text-muted-foreground">
                    <p className="lead text-foreground font-medium">
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
                  
                  <div className="mt-8 flex gap-4">
                    <Button className="bg-green-600 text-white hover:bg-green-700">
                      Schedule a Farm Visit
                    </Button>
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Our sustainable crop fields"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      width={600}
                      height={400}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default OurFarm;
