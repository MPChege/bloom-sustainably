
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Button from "@/components/Button";
import { Calendar, User, Clock, ChevronRight, Search, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Sustainable Flower Farming Practices in Kenya",
    excerpt: "Discover how Kenya's flower industry is leading the way in sustainable farming practices, reducing water usage and carbon emissions while supporting local communities.",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "May 15, 2023",
    author: "Sarah Johnson",
    readTime: "5 min read",
    category: "Sustainability"
  },
  {
    id: 2,
    title: "The Perfect Climate: Why Kenya Produces the World's Best Roses",
    excerpt: "Learn about the unique geographical and climatic factors that make Kenya's highlands the ideal location for growing world-class roses with vibrant colors and long vase life.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "April 2, 2023",
    author: "David Mwangi",
    readTime: "7 min read",
    category: "Flower Production"
  },
  {
    id: 3,
    title: "From Farm to Vase: The Journey of Kenyan Cut Flowers",
    excerpt: "Follow the fascinating journey of cut flowers from the Kenyan highlands to vases around the world, exploring the logistics, technology, and people that make it possible.",
    image: "https://images.unsplash.com/photo-1523342451740-8f862677acbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 18, 2023",
    author: "Grace Odhiambo",
    readTime: "6 min read",
    category: "Supply Chain"
  },
  {
    id: 4,
    title: "The Rise of Eco-Conscious Flower Consumers",
    excerpt: "How changing consumer preferences for sustainable and ethically sourced flowers are reshaping the global floriculture industry and driving positive change.",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "February 5, 2023",
    author: "Sarah Johnson",
    readTime: "4 min read",
    category: "Market Trends"
  },
  {
    id: 5,
    title: "Innovating Flower Preservation: Technologies Extending Vase Life",
    excerpt: "Explore the cutting-edge technologies and techniques being developed to extend the vase life of cut flowers, reducing waste and enhancing consumer experience.",
    image: "https://images.unsplash.com/photo-1589189956120-47ae7561e7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "January 22, 2023",
    author: "David Mwangi",
    readTime: "8 min read",
    category: "Innovation"
  },
  {
    id: 6,
    title: "The Language of Flowers: Cultural Meanings Around the World",
    excerpt: "Discover how different cultures interpret the symbolism of various flowers and how these meanings influence global demand patterns for specific varieties.",
    image: "https://images.unsplash.com/photo-1509064680721-83a09a9f8ef0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "December 10, 2022",
    author: "Grace Odhiambo",
    readTime: "6 min read",
    category: "Culture"
  }
];

// All unique categories
const categories = [...new Set(blogPosts.map(post => post.category))];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-16">
      <HeroSection 
        title="Flower Farm Insights"
        subtitle="Industry news, growing tips, and behind-the-scenes stories from Credible Blooms"
        backgroundImage="https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      {/* Search and Filters */}
      <section className="py-10 bg-white">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Search bar */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-sage focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === ""
                    ? "bg-primary text-white"
                    : "bg-sage/20 text-foreground/80 hover:bg-sage/40"
                )}
              >
                All
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-sage/20 text-foreground/80 hover:bg-sage/40"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="page-section bg-cream/30">
          <div className="container-tight">
            <div className="glass-panel p-6 md:p-8 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="mb-6">
                    <span className="bg-sage/30 text-primary/90 text-xs font-medium px-2 py-1 rounded-full">
                      {filteredPosts[0].category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-6">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {filteredPosts[0].author}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {filteredPosts[0].date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {filteredPosts[0].readTime}
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    icon={<ChevronRight size={16} />} 
                    iconPosition="right"
                  >
                    Read Article
                  </Button>
                </div>
                <div className="md:h-72 overflow-hidden rounded-lg">
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title} 
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Posts Grid */}
      <section className="page-section bg-white">
        <div className="container-tight">
          {filteredPosts.length > 1 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post) => (
                  <article key={post.id} className="glass-card overflow-hidden group">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="bg-sage/30 text-primary/90 text-xs font-medium px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-foreground/60">
                          <Calendar size={12} className="mr-1" />
                          {post.date}
                        </div>
                        <Link to="#" className="text-primary text-sm font-medium flex items-center">
                          Read More
                          <ChevronRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button className="w-10 h-10 rounded-full flex items-center justify-center border border-sage hover:border-primary transition-colors">
                    &laquo;
                  </button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white">1</button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center border border-sage hover:border-primary transition-colors">2</button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center border border-sage hover:border-primary transition-colors">3</button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center border border-sage hover:border-primary transition-colors">
                    &raquo;
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="page-section bg-sage/10">
        <div className="container-tight">
          <div className="glass-panel p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-muted-foreground">
                  Stay updated with the latest insights, tips, and news from the world of flower farming. 
                  We send thoughtful content twice a month - no spam, we promise!
                </p>
              </div>
              <div className="md:col-span-2">
                <form className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-md border border-sage focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white/90"
                      required
                    />
                  </div>
                  <Button type="submit" fullWidth>
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Tags */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-semibold mb-2">
              Popular Topics
            </h2>
            <p className="text-muted-foreground">
              Explore articles by our most popular tags
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Sustainable Farming", "Rose Varieties", "Export Markets", 
              "Water Conservation", "Flower Care", "Industry Trends", 
              "Growing Tips", "Community Impact", "Certifications", 
              "Flower Seasons", "Eco-Friendly Packaging", "Floral Design"
            ].map((tag, index) => (
              <Link 
                to="#" 
                key={index}
                className="flex items-center px-4 py-2 bg-sage/20 hover:bg-sage/40 text-foreground/80 rounded-full text-sm font-medium transition-all"
              >
                <Tag size={14} className="mr-2" />
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
