
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Share2, Users, Image, Send, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import OptimizedImage from "./OptimizedImage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Community post type
interface CommunityPost {
  id: number;
  userName: string;
  userAvatar: string;
  date: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
  location?: string;
  isFeatured?: boolean;
}

// Sample community posts
const communityPosts: CommunityPost[] = [
  {
    id: 1,
    userName: "Sarah Johnson",
    userAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "These Crimson Queen roses from Credible Blooms added the perfect touch to my daughter's graduation party! The rich red color held beautifully for over a week.",
    likes: 127,
    comments: 18,
    isLiked: false,
    tags: ["CrimsonQueen", "SpecialOccasion", "FlowerArrangement"],
    location: "New York, USA",
    isFeatured: true
  },
  {
    id: 2,
    userName: "Michael Chen",
    userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    date: "5 days ago",
    image: "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Created this pink rose centerpiece using Pink Perfection roses for my sister's baby shower. Everyone was asking where I got such beautiful flowers!",
    likes: 89,
    comments: 12,
    isLiked: true,
    tags: ["PinkPerfection", "BabyShower", "Centerpiece"],
    location: "Toronto, Canada"
  },
  {
    id: 3,
    userName: "Emma Wilson",
    userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "My wedding bouquet featuring Snow White roses from Credible Blooms was absolutely stunning. They really pay attention to every detail!",
    likes: 215,
    comments: 34,
    isLiked: false,
    tags: ["SnowWhite", "WeddingBouquet", "SpecialDay"],
    location: "London, UK",
    isFeatured: true
  },
  {
    id: 4,
    userName: "James Rodriguez",
    userAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
    date: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1518709594023-6ebd2b4f69dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Surprised my wife with these gorgeous Passion Purple roses for our anniversary. The unique color made them extra special!",
    likes: 156,
    comments: 21,
    isLiked: false,
    tags: ["PassionPurple", "Anniversary", "RomanticGesture"],
    location: "Miami, USA"
  }
];

// For filtering posts
const categories = [
  { id: "all", name: "All Posts" },
  { id: "featured", name: "Featured" },
  { id: "arrangements", name: "Arrangements" },
  { id: "occasions", name: "Special Occasions" },
  { id: "weddings", name: "Weddings" },
];

const CustomerCommunity = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState(communityPosts);
  const { toast } = useToast();

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : selectedCategory === "featured" 
    ? posts.filter(post => post.isFeatured)
    : posts.filter(post => {
        // Simple filtering logic based on tags
        if (selectedCategory === "arrangements") {
          return post.tags.some(tag => 
            ["arrangement", "centerpiece", "bouquet"].some(keyword => 
              tag.toLowerCase().includes(keyword)
            )
          );
        } else if (selectedCategory === "occasions") {
          return post.tags.some(tag => 
            ["occasion", "party", "shower", "graduation"].some(keyword => 
              tag.toLowerCase().includes(keyword)
            )
          );
        } else if (selectedCategory === "weddings") {
          return post.tags.some(tag => 
            ["wedding", "bride", "bouquet"].some(keyword => 
              tag.toLowerCase().includes(keyword)
            )
          );
        }
        return true;
      });

  // Like a post
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (post.isLiked) {
          return { ...post, isLiked: false, likes: post.likes - 1 };
        } else {
          return { ...post, isLiked: true, likes: post.likes + 1 };
        }
      }
      return post;
    }));
  };

  // Share a post
  const handleShare = (postId: number) => {
    toast({
      title: "Share functionality",
      description: "This would open social sharing options in a real implementation.",
    });
  };

  // Submit a comment
  const handleSubmitComment = (postId: number) => {
    if (!comment.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    }));
    
    setComment("");
    toast({
      title: "Comment submitted",
      description: "Your comment has been added to the post.",
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Customer Community</h2>
          <p className="text-muted-foreground">
            See how our customers use Credible Blooms flowers in their special moments.
          </p>
        </div>
        <Button>
          <Image className="mr-2 h-4 w-4" />
          Share Your Story
        </Button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 mb-8 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            className={cn(
              "px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors",
              selectedCategory === category.id
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Community posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Post image */}
            <div className="relative">
              <OptimizedImage
                src={post.image}
                alt={`Post by ${post.userName}`}
                className="w-full h-64 object-cover"
                width={600}
                height={400}
              />
              {post.isFeatured && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </div>
              )}
            </div>
            
            {/* Post content */}
            <div className="p-4">
              {/* User info */}
              <div className="flex items-center mb-3">
                <img 
                  src={post.userAvatar} 
                  alt={post.userName} 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium">{post.userName}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{post.date}</span>
                    {post.location && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{post.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Caption */}
              <p className="text-sm mb-3">{post.caption}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              {/* Post actions */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <button 
                  className={cn(
                    "flex items-center text-sm",
                    post.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                  )}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={cn("h-4 w-4 mr-1", post.isLiked && "fill-current")} />
                  <span>{post.likes}</span>
                </button>
                
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{post.comments}</span>
                </button>
                
                <button 
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => handleShare(post.id)}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  <span>Share</span>
                </button>
              </div>
              
              {/* Comment box */}
              <div className="mt-3 flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-grow text-sm px-3 py-1.5 border border-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button 
                  className="bg-primary text-white px-3 py-1.5 rounded-r-md hover:bg-primary/90"
                  onClick={() => handleSubmitComment(post.id)}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Community stats */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-purple-50 p-4 rounded-lg">
          <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">850+</p>
          <p className="text-sm text-gray-500">Community Members</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <Image className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">3,200+</p>
          <p className="text-sm text-gray-500">Shared Arrangements</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <Heart className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">15K+</p>
          <p className="text-sm text-gray-500">Engagement Activities</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCommunity;
