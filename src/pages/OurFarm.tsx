
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import { Droplets, Sun, Mountain, Leaf, BarChart2, Cloud, ChevronDown } from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const OurFarm = () => {
  const { t, isRTL } = useLanguage();
  const [selectedFarm, setSelectedFarm] = useState("cb1");
  
  const farmFeatures = {
    cb1: [
      {
        icon: <Mountain className="h-6 w-6 text-primary" />,
        title: "2050 Meters Above Sea Level",
        description: "Our high-altitude location provides optimal growing conditions with cooler temperatures and intense sunlight."
      },
      {
        icon: <Sun className="h-6 w-6 text-primary" />,
        title: "Perfect Climate",
        description: "With over 12 hours of daylight year-round and consistent temperatures, our flowers develop rich colors and strong stems."
      },
      {
        icon: <Droplets className="h-6 w-6 text-primary" />,
        title: "Water Conservation",
        description: "Our advanced drip irrigation and rainwater harvesting systems conserve this precious resource."
      },
      {
        icon: <Leaf className="h-6 w-6 text-primary" />,
        title: "Rich Volcanic Soil",
        description: "The naturally fertile soil of the Kenyan highlands provides ideal nutrition for our flowers."
      },
      {
        icon: <BarChart2 className="h-6 w-6 text-primary" />,
        title: "Modern Technology",
        description: "Climate-controlled greenhouses and monitoring systems ensure optimal growing conditions."
      },
      {
        icon: <Cloud className="h-6 w-6 text-primary" />,
        title: "Low Carbon Footprint",
        description: "Solar power and sustainable practices reduce our environmental impact."
      }
    ],
    cb2: [
      {
        icon: <Leaf className="h-6 w-6 text-primary" />,
        title: "Diverse Crop Production",
        description: "Our CB2 farm is dedicated to growing a wide variety of crops beyond flowers, focusing on sustainable and diversified agriculture."
      },
      {
        icon: <Leaf className="h-6 w-6 text-primary" />,
        title: "Seedlings",
        description: "We cultivate high-quality seedlings for various plants, ensuring strong starts for healthy growth."
      },
      {
        icon: <Leaf className="h-6 w-6 text-primary" />,
        title: "Fresh Fruits",
        description: "Our orchards produce a variety of seasonal fruits grown with sustainable farming practices."
      },
      {
        icon: <Leaf className="h-6 w-6 text-primary" />,
        title: "Vegetables",
        description: "We grow a diverse range of fresh vegetables using organic farming techniques."
      },
      {
        icon: <Leaf className="h-6 w-6 text-primary" />,
        title: "Maize Production",
        description: "Our maize fields utilize modern agricultural methods for optimal yield and quality."
      },
      {
        icon: <Leaf className="h-6 w-6 text-primary" />,
        title: "Tomato Cultivation",
        description: "Our greenhouse tomatoes are grown with care for maximum flavor and nutritional value."
      }
    ]
  };

  const farmImages = {
    cb1: [
      {
        src: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Flowers in greenhouse",
        caption: "Our state-of-the-art greenhouses with rows of flowers"
      },
      {
        src: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Workers harvesting flowers",
        caption: "Our skilled team carefully harvesting roses"
      },
      {
        src: "https://images.unsplash.com/photo-1504713685952-246531f75c5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Inside greenhouse with rows of flowers",
        caption: "Inside view of our climate-controlled growing environment"
      },
      {
        src: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Sorting and packing area",
        caption: "Our modern packing facility ensures flowers remain fresh during transport"
      }
    ],
    cb2: [
      {
        src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Vegetable garden",
        caption: "Our diverse vegetable production using sustainable practices"
      },
      {
        src: "https://images.unsplash.com/photo-1528825056783-3a74b27f49fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Fruit orchard",
        caption: "Seasonal fruits grown in our orchards"
      },
      {
        src: "https://images.unsplash.com/photo-1602465350100-a3e5bb7be910?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Maize field",
        caption: "Our maize production areas"
      },
      {
        src: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        alt: "Tomato greenhouse",
        caption: "Greenhouse tomato cultivation for optimal quality"
      }
    ]
  };

  const farmDescription = {
    cb1: {
      title: "Our Primary Flower Farm (CB1)",
      content: [
        "Located in Naivasha, Kenya at an altitude of 2050 meters above sea level, our primary farm benefits from ideal growing conditions that are unmatched by many other regions.",
        "The combination of rich volcanic soil, abundant sunshine, and cool temperatures creates the perfect environment for growing vibrant, long-lasting flowers with exceptional stem length, bloom size, and color intensity.",
        "Our farm spans over 35 hectares of land with state-of-the-art greenhouses that provide controlled growing environments while implementing sustainable water management systems and solar energy to minimize our environmental impact.",
        "Kenya's central location also provides logistical advantages, allowing us to ship fresh-cut flowers to Europe, the Middle East, and Asia within 24-48 hours of harvesting."
      ]
    },
    cb2: {
      title: "Our Diverse Crop Production Farm (CB2)",
      content: [
        "Our CB2 farm focuses on diversified agriculture, producing a variety of crops beyond our flower production.",
        "We grow high-quality seedlings, fresh fruits, vegetables, maize, tomatoes, and other farm produce using sustainable farming practices.",
        "This farm operates with the same commitment to quality and sustainability as our flower farm, employing modern agricultural techniques and environmentally friendly practices.",
        "Our diversified approach allows us to provide a wider range of products while maintaining soil health through crop rotation and integrated pest management."
      ]
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${isRTL ? "rtl" : ""}`}>
      <HeroSection 
        title={t('farm.title')}
        subtitle={t('farm.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      {/* Farm Selection */}
      <section className="py-8 bg-white">
        <div className="container-tight">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-display font-semibold">Select Farm Location</h2>
            <div className="w-full max-w-xs">
              <Select 
                value={selectedFarm} 
                onValueChange={setSelectedFarm}
              >
                <SelectTrigger className="w-full border-purple/30 focus:ring-purple">
                  <SelectValue placeholder="Select a farm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cb1">CB1 - Flower Farm</SelectItem>
                  <SelectItem value="cb2">CB2 - Diverse Crop Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Farm Location & Advantages */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                {t('farm.location')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
                {farmDescription[selectedFarm as keyof typeof farmDescription].title}
              </h2>
              
              <div className="prose">
                {farmDescription[selectedFarm as keyof typeof farmDescription].content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8">
                <Button as="link" href="/contact" size="lg">
                  {t('farm.scheduleVisit')}
                </Button>
              </div>
            </div>
            
            <div className="relative h-[500px] w-full">
              <img 
                src={selectedFarm === "cb1" 
                  ? "https://images.unsplash.com/photo-1589123053646-4e8b5493f439?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  : "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                } 
                alt={selectedFarm === "cb1" ? "Aerial view of flower greenhouses" : "Diverse crop production"} 
                className="absolute w-3/4 h-auto rounded-lg shadow-lg z-10 top-0 right-0"
              />
              <img 
                src={selectedFarm === "cb1"
                  ? "https://images.unsplash.com/photo-1606041011872-596597976b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  : "https://images.unsplash.com/photo-1528825056783-3a74b27f49fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                } 
                alt={selectedFarm === "cb1" ? "Close up of flowers in the field" : "Fruit production"} 
                className="absolute w-2/3 h-auto rounded-lg shadow-lg bottom-0 left-0 border-4 border-white"
              />
              <div className="absolute w-64 h-64 rounded-full bg-sage/30 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Farm Features */}
      <section className="page-section bg-sage/10">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              {t('farm.advantages')}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              {selectedFarm === "cb1" ? t('farm.special') : "Our Diverse Production"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {selectedFarm === "cb1" 
                ? "Our unique combination of location, climate, and technology creates the perfect environment for growing exceptional flowers."
                : "Our CB2 farm produces a variety of crops with sustainable and environmentally friendly practices."
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {farmFeatures[selectedFarm as keyof typeof farmFeatures].map((feature, index) => (
              <div 
                key={index} 
                className="glass-panel p-6 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-white/60 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Farm Gallery */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              {t('farm.visualTour')}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              {t('farm.gallery')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a visual tour of our {selectedFarm === "cb1" ? "flower farm" : "diverse crop production"} facilities and operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {farmImages[selectedFarm as keyof typeof farmImages].map((image, index) => (
              <div key={index} className="glass-card overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground text-sm">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Farm Products */}
      <section className="page-section bg-cream/50">
        <div className="container-tight">
          <div className="text-center mb-16">
            <span className="bg-sage/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              {selectedFarm === "cb1" ? t('farm.specialties') : "Our Products"}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              {selectedFarm === "cb1" ? t('farm.whatWeGrow') : "What We Produce"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {selectedFarm === "cb1" 
                ? "We specialize in a variety of premium flowers, each grown with attention to detail and quality."
                : "Our CB2 farm produces a diverse range of agricultural products with sustainable farming methods."
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8">
            {selectedFarm === "cb1" ? (
              // Flower products
              [
                {
                  name: "Premium Roses",
                  description: "Our signature product with over 15 varieties in different colors and sizes.",
                  image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Spray Roses",
                  description: "Multi-headed roses perfect for bouquets and arrangements.",
                  image: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Carnations",
                  description: "Available in standard and spray varieties with excellent vase life.",
                  image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Hypericum",
                  description: "Beautiful berries that add texture and interest to arrangements.",
                  image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Lisianthus",
                  description: "Elegant blooms resembling roses with delicate ruffled petals.",
                  image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Seasonal Specialties",
                  description: "Rotating selection of seasonal flowers to complement our core offerings.",
                  image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
              ].map((variety, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="h-40 w-40 rounded-full overflow-hidden mb-6">
                    <img 
                      src={variety.image} 
                      alt={variety.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{variety.name}</h3>
                  <p className="text-muted-foreground">{variety.description}</p>
                </div>
              ))
            ) : (
              // CB2 products
              [
                {
                  name: "Seedlings",
                  description: "High-quality seedlings for various vegetables and flowering plants.",
                  image: "https://images.unsplash.com/photo-1600276833003-0b90afc4b467?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Fresh Fruits",
                  description: "Seasonal fruits including mangoes, avocados, and citrus varieties.",
                  image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Vegetables",
                  description: "Fresh vegetables grown with organic farming practices.",
                  image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Maize",
                  description: "Quality maize varieties for both human consumption and animal feed.",
                  image: "https://images.unsplash.com/photo-1599371596008-9a08a564db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Tomatoes",
                  description: "Greenhouse-grown tomatoes with excellent flavor and shelf life.",
                  image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  name: "Other Produce",
                  description: "Various other agricultural products following seasonal availability.",
                  image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
              ].map((variety, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="h-40 w-40 rounded-full overflow-hidden mb-6">
                    <img 
                      src={variety.image} 
                      alt={variety.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{variety.name}</h3>
                  <p className="text-muted-foreground">{variety.description}</p>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-16">
            <Button as="link" href={selectedFarm === "cb1" ? "/products" : "/contact"} size="lg">
              {selectedFarm === "cb1" ? t('farm.viewProducts') : "Contact Us for Products"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurFarm;
