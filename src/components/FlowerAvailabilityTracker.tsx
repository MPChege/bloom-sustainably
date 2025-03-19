
import { useState, useEffect } from "react";
import { Search, Check, AlertCircle, Calendar, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import OptimizedImage from "./OptimizedImage";

// Types
interface FlowerVariety {
  id: number;
  name: string;
  image: string;
  category: string;
  season: "spring" | "summer" | "autumn" | "winter" | "year-round";
  availability: number; // 0-100 percentage
  colors: string[];
  estimatedHarvest?: string;
}

// Flower data
const flowerVarieties: FlowerVariety[] = [
  {
    id: 1,
    name: "Crimson Queen",
    image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75",
    category: "Red Roses",
    season: "year-round",
    availability: 85,
    colors: ["#8B0000", "#DC143C"],
    estimatedHarvest: "Daily harvest"
  },
  {
    id: 2,
    name: "Pink Perfection",
    image: "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75",
    category: "Pink Roses",
    season: "spring",
    availability: 65,
    colors: ["#FFC0CB", "#FF69B4"],
    estimatedHarvest: "Next harvest: 3 days"
  },
  {
    id: 3,
    name: "Snow White",
    image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75",
    category: "White Roses",
    season: "winter",
    availability: 45,
    colors: ["#FFFFFF", "#FFFAFA"],
    estimatedHarvest: "Next harvest: 5 days"
  },
  {
    id: 4,
    name: "Summer Sunrise",
    image: "https://images.unsplash.com/photo-1530906358829-e84b2769270f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75",
    category: "Yellow Roses",
    season: "summer",
    availability: 90,
    colors: ["#FFFF00", "#FFD700"],
    estimatedHarvest: "Daily harvest"
  },
  {
    id: 5,
    name: "Passion Purple",
    image: "https://images.unsplash.com/photo-1518709594023-6ebd2b4f69dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75",
    category: "Purple Roses",
    season: "autumn",
    availability: 30,
    colors: ["#800080", "#4B0082"],
    estimatedHarvest: "Next harvest: 7 days"
  },
  {
    id: 6,
    name: "Peach Dream",
    image: "https://images.unsplash.com/photo-1518709594023-6ebd2b4f69dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75",
    category: "Specialty Roses",
    season: "spring",
    availability: 55,
    colors: ["#FFDAB9", "#FFA07A"],
    estimatedHarvest: "Next harvest: 4 days"
  }
];

const seasonColors = {
  "spring": "bg-green-100 text-green-800",
  "summer": "bg-yellow-100 text-yellow-800",
  "autumn": "bg-orange-100 text-orange-800",
  "winter": "bg-blue-100 text-blue-800",
  "year-round": "bg-purple-100 text-purple-800"
};

const FlowerAvailabilityTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
  const [filteredFlowers, setFilteredFlowers] = useState<FlowerVariety[]>(flowerVarieties);
  const [isLoading, setIsLoading] = useState(false);

  // Filter flowers based on search term and filters
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const filtered = flowerVarieties.filter(flower => {
        // Search term filter
        const matchesSearch = searchTerm === "" || 
          flower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          flower.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Season filter
        const matchesSeason = selectedSeason === null || selectedSeason === "all" || 
          flower.season === selectedSeason;
        
        // Availability filter
        let matchesAvailability = true;
        if (selectedAvailability === "high") {
          matchesAvailability = flower.availability >= 70;
        } else if (selectedAvailability === "medium") {
          matchesAvailability = flower.availability >= 40 && flower.availability < 70;
        } else if (selectedAvailability === "low") {
          matchesAvailability = flower.availability < 40;
        }
        
        return matchesSearch && matchesSeason && matchesAvailability;
      });
      
      setFilteredFlowers(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, selectedSeason, selectedAvailability]);

  // Get availability label and color
  const getAvailabilityInfo = (availability: number) => {
    if (availability >= 70) {
      return { label: "High", color: "bg-green-500" };
    } else if (availability >= 40) {
      return { label: "Medium", color: "bg-yellow-500" };
    } else {
      return { label: "Low", color: "bg-red-500" };
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Real-Time Flower Availability</h2>
        <p className="text-muted-foreground">
          Track the current availability of our premium rose varieties and their harvest schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            placeholder="Search by name or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Season filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 appearance-none"
            value={selectedSeason || "all"}
            onChange={(e) => setSelectedSeason(e.target.value === "all" ? null : e.target.value)}
          >
            <option value="all">All Seasons</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
            <option value="year-round">Year-Round</option>
          </select>
        </div>

        {/* Availability filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 appearance-none"
            value={selectedAvailability || "all"}
            onChange={(e) => setSelectedAvailability(e.target.value === "all" ? null : e.target.value)}
          >
            <option value="all">All Availability</option>
            <option value="high">High Availability</option>
            <option value="medium">Medium Availability</option>
            <option value="low">Low Availability</option>
          </select>
        </div>
      </div>

      {/* Flower results */}
      <div className="relative min-h-[400px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredFlowers.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No flowers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find the flowers you're looking for.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFlowers.map((flower) => {
                const availabilityInfo = getAvailabilityInfo(flower.availability);
                
                return (
                  <motion.div
                    key={flower.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <OptimizedImage
                        src={flower.image}
                        alt={flower.name}
                        className="w-full h-full object-cover"
                        width={300}
                        height={200}
                      />
                      <div className="absolute top-2 right-2">
                        <span 
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-semibold", 
                            seasonColors[flower.season]
                          )}
                        >
                          {flower.season.charAt(0).toUpperCase() + flower.season.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{flower.name}</h3>
                        <span 
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-semibold text-white", 
                            availabilityInfo.color
                          )}
                        >
                          {availabilityInfo.label}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{flower.category}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={cn("h-2.5 rounded-full", availabilityInfo.color)} 
                              style={{ width: `${flower.availability}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{flower.availability}%</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center text-sm">
                        {flower.availability > 0 ? (
                          <>
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            <span>{flower.estimatedHarvest}</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span>Currently unavailable</span>
                          </>
                        )}
                      </div>
                      
                      <div className="mt-3 flex gap-1">
                        {flower.colors.map((color, index) => (
                          <div 
                            key={index}
                            className="h-6 w-6 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default FlowerAvailabilityTracker;
