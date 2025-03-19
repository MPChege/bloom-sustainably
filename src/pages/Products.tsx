
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Product data with prices
const products = [
  // Premium Roses
  {
    id: 1,
    name: "Red Naomi Roses",
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Premium Roses",
    description: "Our signature red rose with large heads, intense color, and exceptional vase life.",
    price: 29.99
  },
  {
    id: 2,
    name: "White O'Hara Roses",
    image: "https://images.unsplash.com/photo-1558652093-2bf93161efc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Premium Roses",
    description: "Elegant garden roses with multiple petals and a delicate fragrance.",
    price: 27.99
  },
  {
    id: 3,
    name: "Pink Avalanche Roses",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Premium Roses",
    description: "Soft pink roses with strong stems and excellent opening properties.",
    price: 26.99
  },
  {
    id: 4,
    name: "Yellow Finesse Roses",
    image: "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Premium Roses",
    description: "Vibrant yellow roses with perfect form and long stems.",
    price: 28.99
  },
  
  // Spray Roses
  {
    id: 5,
    name: "Peach Spray Roses",
    image: "https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Spray Roses",
    description: "Delicate peach spray roses with multiple blooms per stem.",
    price: 19.99
  },
  {
    id: 6,
    name: "White Spray Roses",
    image: "https://images.unsplash.com/photo-1548198471-e5a4b755def3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Spray Roses",
    description: "Pure white spray roses, perfect for weddings and special events.",
    price: 18.99
  },
  {
    id: 7,
    name: "Pink Sensation Spray Roses",
    image: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Spray Roses",
    description: "Bright pink spray roses with excellent color retention.",
    price: 21.99
  },
  {
    id: 8,
    name: "Red Spray Roses",
    image: "https://images.unsplash.com/photo-1547187042-6d945e5a5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Spray Roses",
    description: "Vibrant red spray roses, adding drama and intensity to arrangements.",
    price: 22.99
  },
  
  // Summer Flowers
  {
    id: 9,
    name: "Carnations",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Summer Flowers",
    description: "Available in various colors, these long-lasting flowers are versatile and durable.",
    price: 16.99
  },
  {
    id: 10,
    name: "Hypericum Berries",
    image: "https://images.unsplash.com/photo-1588567678465-08902ca5f8d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Summer Flowers",
    description: "Decorative berries that add texture and interest to arrangements.",
    price: 15.99
  },
  {
    id: 11,
    name: "Lisianthus",
    image: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Summer Flowers",
    description: "Elegant flowers with ruffled petals, available in white, pink, and purple.",
    price: 24.99
  },
  {
    id: 12,
    name: "Statice",
    image: "https://images.unsplash.com/photo-1612966809470-bfbbeb142bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Summer Flowers",
    description: "Colorful filler flowers that dry beautifully and add texture to arrangements.",
    price: 14.99
  }
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { t, isRTL } = useLanguage();

  // Define categories with translations
  const categories = [
    { id: "All", en: "All", ar: "الكل", nl: "Alle", fr: "Tous", es: "Todos" },
    { id: "Premium Roses", en: "Premium Roses", ar: "ورد فاخر", nl: "Premium Rozen", fr: "Roses Premium", es: "Rosas Premium" },
    { id: "Spray Roses", en: "Spray Roses", ar: "ورد سبراي", nl: "Trosrozen", fr: "Roses Spray", es: "Rosas Spray" },
    { id: "Summer Flowers", en: "Summer Flowers", ar: "زهور صيفية", nl: "Zomerbloemen", fr: "Fleurs d'Été", es: "Flores de Verano" }
  ];

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get translated category name
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return categoryId;
    
    // Use the appropriate language based on current language
    if (isRTL) return category.ar;
    
    // For other languages we can expand this
    return category.en;
  };

  return (
    <div className={`min-h-screen pt-16 ${isRTL ? "rtl" : ""}`}>
      <HeroSection 
        title={isRTL ? "مجموعة الزهور لدينا" : "Our Flower Collection"}
        subtitle={isRTL 
          ? "اكتشف زهورنا عالية الجودة المزروعة بعناية في مرتفعات كينيا" 
          : "Discover our premium quality blooms grown with care in the Kenyan highlands"}
        backgroundImage="https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        height="medium"
      />
      
      {/* Filters and Search */}
      <section className="py-10 bg-white">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-purple/20 text-foreground/80 hover:bg-purple/40"
                  )}
                >
                  {getCategoryName(category.id)}
                </button>
              ))}
            </div>
            
            {/* Search bar */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder={isRTL ? "ابحث عن الزهور..." : "Search flowers..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-purple/30 focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              />
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="page-section bg-cream/30">
        <div className="container-tight">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  category={product.category}
                  description={product.description}
                  price={product.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">
                {isRTL ? "لم يتم العثور على زهور" : "No flowers found"}
              </h3>
              <p className="text-muted-foreground">
                {isRTL 
                  ? "حاول تعديل معايير البحث أو التصفية."
                  : "Try adjusting your search or filter criteria."}
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Product Information */}
      <section className="page-section bg-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
                Quality Assurance
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
                Our Product Standards
              </h2>
              
              <div className="prose">
                <p>
                  At Credible Blooms, we maintain strict quality control measures throughout the entire 
                  growing and harvesting process. Each flower is carefully inspected to ensure it meets 
                  our high standards before packaging.
                </p>
                <p>
                  Our flowers are harvested at the optimal stage of development, rapidly cooled to 
                  preserve freshness, and carefully graded and bunched according to stem length, 
                  bloom size, and quality.
                </p>
                <p>
                  We implement sustainable post-harvest practices to ensure our flowers reach you 
                  with maximum vase life and beauty. This includes proper hydration treatments and 
                  temperature-controlled storage and transportation.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600703136783-bdb5ea365239?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Quality control process" 
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-2/5 h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1533616688419-b7a585564566?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Flower inspection" 
                  className="w-full h-auto object-cover rounded-lg shadow-lg border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom Orders */}
      <section className="page-section bg-purple/10">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Tailored Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Custom Orders
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer custom growing and packaging solutions to meet your specific requirements.
            </p>
          </div>
          
          <div className="glass-panel p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-medium mb-4">How It Works</h3>
                <ul className="space-y-4">
                  {[
                    "Contact us with your specific requirements",
                    "Our team will assess feasibility and provide recommendations",
                    "We'll create a custom growing plan tailored to your needs",
                    "Regular updates on the progress of your order",
                    "Quality-controlled harvesting and packaging",
                    "Timely delivery through our established logistics network"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-medium mb-4">Custom Options Include:</h3>
                <div className="space-y-4">
                  {[
                    "Specific color variations and bloom sizes",
                    "Custom stem lengths to meet your market's preferences",
                    "Specialized packaging with your branding",
                    "Unique flower combinations for signature bouquets",
                    "Seasonal or event-specific growing schedules"
                  ].map((option, index) => (
                    <div key={index} className="glass-card p-3 flex items-center">
                      <div className="bg-purple/40 rounded-full p-2 mr-3">
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary" stroke="currentColor">
                          <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
