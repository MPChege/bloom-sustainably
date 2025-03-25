
import React from 'react';
import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/context/LanguageContext";
import { Play } from "lucide-react";

// Sample video data (would be replaced with actual client videos)
const videos = [
  {
    id: 1,
    title: "Our Flower Farm",
    description: "Take a tour of our sustainable flower farm in the highlands of Kenya.",
    thumbnail: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    youtubeId: "dQw4w9WgXcQ" // Replace with actual video ID
  },
  {
    id: 2,
    title: "Harvesting Process",
    description: "Watch how we carefully harvest our premium flowers to ensure the highest quality.",
    thumbnail: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    youtubeId: "dQw4w9WgXcQ" // Replace with actual video ID
  },
  {
    id: 3,
    title: "Packaging and Quality Control",
    description: "Learn about our rigorous quality control and packaging methods.",
    thumbnail: "https://images.unsplash.com/photo-1533616688419-b7a585564566?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    youtubeId: "dQw4w9WgXcQ" // Replace with actual video ID
  },
  {
    id: 4,
    title: "Sustainable Farming Practices",
    description: "Discover how we implement eco-friendly practices in our flower cultivation.",
    thumbnail: "https://images.unsplash.com/photo-1558652093-2bf93161efc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    youtubeId: "dQw4w9WgXcQ" // Replace with actual video ID
  },
  {
    id: 5,
    title: "From Farm to Vase",
    description: "Follow the journey of our flowers from the farm to your doorstep.",
    thumbnail: "https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    youtubeId: "dQw4w9WgXcQ" // Replace with actual video ID
  },
  {
    id: 6,
    title: "Meet Our Team",
    description: "Get to know the passionate people behind our beautiful flowers.",
    thumbnail: "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    youtubeId: "dQw4w9WgXcQ" // Replace with actual video ID
  }
];

const VideoGallery = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className={`min-h-screen pt-16 ${isRTL ? "rtl" : ""}`}>
      <HeroSection 
        title="Farm to Vase: Our Video Gallery"
        subtitle="Watch our videos to see our farm, harvesting process, and more"
        backgroundImage="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Our Story in Motion
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Watch and Discover
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a virtual tour of our flower farm and discover our sustainable growing practices through our video gallery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="page-section bg-purple/10">
        <div className="container-tight">
          <div className="glass-panel p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-medium mb-4">Behind the Scenes</h3>
                <p className="text-muted-foreground mb-6">
                  Our video gallery gives you an exclusive look at how we grow and harvest our premium flowers. From seedling to packaging, we take pride in our meticulous process.
                </p>
                <p className="text-muted-foreground">
                  Subscribe to our YouTube channel to stay updated with our latest videos and farm updates.
                </p>
              </div>
              
              <div className="aspect-video rounded-lg overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Featured video" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-8 w-8 text-secondary ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    youtubeId: string;
  }
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [showVideo, setShowVideo] = React.useState(false);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-purple/10 h-full flex flex-col">
      <div className="relative aspect-video cursor-pointer" onClick={() => setShowVideo(true)}>
        {!showVideo ? (
          <>
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="h-6 w-6 text-secondary ml-0.5" />
              </div>
            </div>
          </>
        ) : (
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        )}
      </div>
      
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-medium mb-2">{video.title}</h3>
        <p className="text-sm text-muted-foreground">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoGallery;
