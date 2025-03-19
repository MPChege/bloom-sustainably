
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Leaf, Droplet, Recycle, Heart, Award, Wind, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// Timeline data
const timelineEvents = [
  {
    year: 2008,
    title: "Sustainability Journey Begins",
    description: "Credible Blooms was founded with a commitment to sustainable farming practices and ethical flower production.",
    icon: <Leaf className="h-6 w-6" />,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    year: 2010,
    title: "Water Conservation Initiative",
    description: "Implemented drip irrigation systems, reducing water usage by 60% compared to traditional sprinkler systems.",
    icon: <Droplet className="h-6 w-6" />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    year: 2012,
    title: "First Organic Certification",
    description: "Achieved organic certification for 30% of our farm area, eliminating synthetic pesticides and fertilizers.",
    icon: <Award className="h-6 w-6" />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    year: 2015,
    title: "Renewable Energy Transition",
    description: "Installed solar panels to power our greenhouses and processing facilities, reducing carbon footprint by 40%.",
    icon: <Sun className="h-6 w-6" />,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    year: 2017,
    title: "Waste Reduction Program",
    description: "Launched comprehensive recycling program and switched to biodegradable packaging materials.",
    icon: <Recycle className="h-6 w-6" />,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600"
  },
  {
    year: 2019,
    title: "Community Impact Initiative",
    description: "Established education programs and healthcare benefits for farm workers and their families.",
    icon: <Heart className="h-6 w-6" />,
    iconBg: "bg-red-100",
    iconColor: "text-red-600"
  },
  {
    year: 2021,
    title: "Carbon Neutral Certification",
    description: "Achieved carbon neutrality through offsetting programs and further reductions in energy consumption.",
    icon: <Wind className="h-6 w-6" />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    year: 2023,
    title: "Living Wage Certification",
    description: "Certified as a Living Wage employer, ensuring all staff receive fair compensation above industry standards.",
    icon: <Award className="h-6 w-6" />,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  }
];

const Timeline = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.2 });

  // Set first event as active when timeline comes into view
  useEffect(() => {
    if (isInView && activeEvent === null) {
      setActiveEvent(0);
    }
  }, [isInView, activeEvent]);

  return (
    <div ref={timelineRef} className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-purple-200/30 text-primary/90 text-sm font-medium px-4 py-2 rounded-full inline-block">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mt-6 mb-6">
            Sustainability Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our ongoing commitment to sustainable practices and ethical flower production since our founding.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="mb-16 overflow-x-auto pb-4">
          <div className="flex min-w-max">
            <div className="h-0.5 bg-gray-200 flex-grow mt-5"></div>
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex flex-col items-center mx-6 relative">
                <button
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    activeEvent === index 
                      ? "border-primary bg-primary text-white scale-125" 
                      : "border-gray-300 bg-white text-gray-500 hover:border-primary/70"
                  )}
                  onClick={() => setActiveEvent(index)}
                >
                  <Calendar className="h-5 w-5" />
                </button>
                <span 
                  className={cn(
                    "text-sm font-medium mt-2 transition-colors",
                    activeEvent === index ? "text-primary" : "text-gray-500"
                  )}
                >
                  {event.year}
                </span>

                {/* Connecting line */}
                {index < timelineEvents.length - 1 && (
                  <div className={cn(
                    "absolute top-5 h-0.5 w-12 right-0 translate-x-full",
                    index < activeEvent! ? "bg-primary" : "bg-gray-200"
                  )}></div>
                )}
              </div>
            ))}
            <div className="h-0.5 bg-gray-200 flex-grow mt-5"></div>
          </div>
        </div>

        {/* Active event details */}
        {activeEvent !== null && (
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="col-span-1 md:col-span-4">
                <div className={cn(
                  "rounded-xl p-6 h-full flex flex-col items-center text-center",
                  timelineEvents[activeEvent].iconBg,
                  "bg-opacity-30"
                )}>
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                    timelineEvents[activeEvent].iconBg,
                  )}>
                    <div className={timelineEvents[activeEvent].iconColor}>
                      {timelineEvents[activeEvent].icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{timelineEvents[activeEvent].year}</h3>
                  <div className={cn(
                    "h-1 w-12 rounded-full mb-4",
                    timelineEvents[activeEvent].iconColor.replace("text-", "bg-")
                  )}></div>
                  <p className="text-gray-500 text-sm">
                    {Math.abs(2023 - timelineEvents[activeEvent].year)} years {
                      2023 - timelineEvents[activeEvent].year > 0 ? "ago" : "from now"
                    }
                  </p>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-8">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 h-full shadow-sm">
                  <h3 className="text-2xl font-semibold mb-4">{timelineEvents[activeEvent].title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {timelineEvents[activeEvent].description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((_, i) => (
                      <span 
                        key={i} 
                        className={cn(
                          "px-3 py-1 rounded-full text-sm",
                          timelineEvents[activeEvent].iconBg,
                          timelineEvents[activeEvent].iconColor.replace("text-", "text-"),
                          "bg-opacity-20"
                        )}
                      >
                        Impact Tag {i + 1}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline controls */}
        <div className="flex justify-center mt-12 gap-4">
          <button 
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setActiveEvent(prev => prev !== null && prev > 0 ? prev - 1 : prev)}
            disabled={activeEvent === 0}
          >
            Previous
          </button>
          <button 
            className="px-4 py-2 rounded-md bg-primary text-white flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setActiveEvent(prev => prev !== null && prev < timelineEvents.length - 1 ? prev + 1 : prev)}
            disabled={activeEvent === timelineEvents.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
