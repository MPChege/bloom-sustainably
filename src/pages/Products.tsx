
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Updated product data with categories from client's catalog
const products = [
  // Extra Premium Cut Flowers
  {
    id: 1,
    name: "Red Naomi Roses",
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Extra Premium Cut Flowers",
    description: "Our signature red rose with large heads, intense color, and exceptional vase life.",
    headSize: "5-6 cm",
    length: "50-70 cm",
    color: "Deep Red"
  },
  {
    id: 2,
    name: "White O'Hara Roses",
    image: "https://images.unsplash.com/photo-1558652093-2bf93161efc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Extra Premium Cut Flowers",
    description: "Elegant garden roses with multiple petals and a delicate fragrance.",
    headSize: "4-5 cm",
    length: "50-60 cm",
    color: "Pure White"
  },
  
  // Premium Cut Flowers
  {
    id: 3,
    name: "Pink Avalanche Roses",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Premium Cut Flowers",
    description: "Soft pink roses with strong stems and excellent opening properties.",
    headSize: "4-5 cm",
    length: "50-60 cm",
    color: "Soft Pink"
  },
  {
    id: 4,
    name: "Yellow Finesse Roses",
    image: "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Premium Cut Flowers",
    description: "Vibrant yellow roses with perfect form and long stems.",
    headSize: "4-5 cm",
    length: "50-60 cm",
    color: "Bright Yellow"
  },
  
  // Spray Roses
  {
    id: 5,
    name: "Peach Spray Roses",
    image: "https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Spray Roses",
    description: "Delicate peach spray roses with multiple blooms per stem.",
    headSize: "2-3 cm",
    length: "40-50 cm",
    color: "Soft Peach"
  },
  {
    id: 6,
    name: "White Spray Roses",
    image: "https://images.unsplash.com/photo-1548198471-e5a4b755def3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Spray Roses",
    description: "Pure white spray roses, perfect for weddings and special events.",
    headSize: "2-3 cm",
    length: "40-50 cm",
    color: "White"
  },
  
  // Intermediates Cut Flowers
  {
    id: 7,
    name: "Pink Sensation",
    image: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Intermediates Cut Flowers",
    description: "Bright pink roses with excellent color retention and medium stem length.",
    headSize: "3-4 cm",
    length: "40-50 cm",
    color: "Bright Pink"
  },
  {
    id: 8,
    name: "Red Intermediates",
    image: "https://images.unsplash.com/photo-1547187042-6d945e5a5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Intermediates Cut Flowers",
    description: "Vibrant red roses with medium head size and sturdy stems.",
    headSize: "3-4 cm",
    length: "40-50 cm",
    color: "Vibrant Red"
  },
  
  // Julietta Series
  {
    id: 9,
    name: "Julietta Pink",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Julietta Series",
    description: "Gorgeous pink garden-style roses from our exclusive Julietta series.",
    headSize: "4-5 cm",
    length: "45-55 cm",
    color: "Soft Pink"
  },
  {
    id: 10,
    name: "Julietta White",
    image: "https://images.unsplash.com/photo-1588567678465-08902ca5f8d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Julietta Series",
    description: "Elegant white garden-style roses from our exclusive Julietta series.",
    headSize: "4-5 cm",
    length: "45-55 cm",
    color: "White"
  },
  
  // Summer Flowers
  {
    id: 11,
    name: "Lisianthus",
    image: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Summer Flowers",
    description: "Elegant flowers with ruffled petals, available in white, pink, and purple.",
    headSize: "3-4 cm",
    length: "40-50 cm",
    color: "Mixed"
  },
  {
    id: 12,
    name: "Chrysanthemums",
    image: "https://images.unsplash.com/photo-1612966809470-bfbbeb142bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Summer Flowers",
    description: "Colorful chrysanthemums that add texture and volume to arrangements.",
    headSize: "4-6 cm",
    length: "45-60 cm",
    color: "Various"
  }
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [colorFilter, setColorFilter] = useState("All");
  const { t, isRTL } = useLanguage();

  // Define categories with translations
  const categories = [
    { id: "All", en: "All Flowers", ar: "كل الزهور", nl: "Alle Bloemen", fr: "Toutes les Fleurs", es: "Todas las Flores" },
    { id: "Extra Premium Cut Flowers", en: "Extra Premium Cut Flowers", ar: "زهور ممتازة للقطف", nl: "Extra Premium Snijbloemen", fr: "Fleurs Coupées Extra Premium", es: "Flores Cortadas Extra Premium" },
    { id: "Premium Cut Flowers", en: "Premium Cut Flowers", ar: "زهور قطف ممتازة", nl: "Premium Snijbloemen", fr: "Fleurs Coupées Premium", es: "Flores Cortadas Premium" },
    { id: "Spray Roses", en: "Spray Roses", ar: "ورد سبراي", nl: "Trosrozen", fr: "Roses Spray", es: "Rosas Spray" },
    { id: "Intermediates Cut Flowers", en: "Intermediates Cut Flowers", ar: "زهور قطف متوسطة", nl: "Middelhoge Snijbloemen", fr: "Fleurs Coupées Intermédiaires", es: "Flores Cortadas Intermedias" },
    { id: "Julietta Series", en: "Julietta Series", ar: "سلسلة جولييتا", nl: "Julietta Serie", fr: "Série Julietta", es: "Serie Julietta" },
    { id: "Summer Flowers", en: "Summer Flowers", ar: "زهور صيفية", nl: "Zomerbloemen", fr: "Fleurs d'Été", es: "Flores de Verano" }
  ];

  // Extract all unique colors from products
  const uniqueColors = ["All", ...new Set(products.map(product => product.color))];

  // Filter products based on category, search query, and color
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor = colorFilter === "All" || product.color === colorFilter;
    return matchesCategory && matchesSearch && matchesColor;
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
          <div className="flex flex-col space-y-6">
            {/* Search bar */}
            <div className="relative w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder={isRTL ? "ابحث عن الزهور..." : "Search flowers..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-purple/30 focus:outline-none focus:ring-1 focus:ring-primary bg-white"
              />
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`} />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 justify-center">
                <p className="text-sm font-medium text-muted-foreground w-full text-center md:text-left mb-1">Category:</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        selectedCategory === category.id
                          ? "bg-primary text-white"
                          : "bg-purple/20 text-foreground/80 hover:bg-purple/40"
                      )}
                    >
                      {getCategoryName(category.id)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <p className="text-sm font-medium text-muted-foreground w-full text-center md:text-left mb-1">Color:</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {uniqueColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setColorFilter(color)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                        colorFilter === color
                          ? "bg-secondary text-white"
                          : "bg-purple/20 text-foreground/80 hover:bg-purple/40"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="page-section bg-cream/30">
        <div className="container-tight">
          {filteredProducts.length > 0 ? (
            <>
              <h2 className="text-2xl md:text-3xl font-serif font-medium mb-8 text-center">
                {selectedCategory === "All" ? "All Flowers" : selectedCategory}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    category={product.category}
                    description={product.description}
                    headSize={product.headSize}
                    length={product.length}
                    color={product.color}
                  />
                ))}
              </div>
            </>
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
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-6">
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
                src="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
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
              Request Process
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4 mb-6">
              How to Order Our Flowers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer tailored flower solutions to meet your specific requirements.
            </p>
          </div>
          
          <div className="glass-panel p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-medium mb-4">Ordering Process</h3>
                <ul className="space-y-4">
                  {[
                    "Browse our flower catalog and select the flowers you're interested in",
                    "Click the 'Request' button for the specific flowers you want",
                    "Fill out the request form with quantity and preferred delivery date",
                    "Our team will review your request and contact you with availability and pricing",
                    "Once confirmed, we'll process your order for the agreed delivery date",
                    "Your flowers will be freshly harvested and carefully packaged",
                    "Track your order through our notification system"
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
                <h3 className="text-2xl font-medium mb-4">Additional Services:</h3>
                <div className="space-y-4">
                  {[
                    "Custom packaging with your branding",
                    "Mixed flower bunches to your specifications",
                    "Scheduled regular deliveries",
                    "Bulk orders for events and weddings",
                    "Expert advice on flower selection and care"
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
