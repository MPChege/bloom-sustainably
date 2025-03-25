
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { Search, Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Updated flower catalog based on the new categorization
const products = [
  // Extra Premium Cut Flowers
  {
    id: 1,
    name: "Red Naomi Roses",
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Extra Premium Cut Flowers",
    description: "Our signature red rose with large heads, intense color, and exceptional vase life.",
    headSize: "5.5-6.0 cm",
    stemLength: "50-60 cm",
    colors: ["Red"]
  },
  {
    id: 2,
    name: "White O'Hara Roses",
    image: "https://images.unsplash.com/photo-1558652093-2bf93161efc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Extra Premium Cut Flowers",
    description: "Elegant garden roses with multiple petals and a delicate fragrance.",
    headSize: "5.0-5.5 cm",
    stemLength: "50-60 cm",
    colors: ["White"]
  },
  
  // Premium Cut Flowers
  {
    id: 3,
    name: "Pink Avalanche Roses",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Premium Cut Flowers",
    description: "Soft pink roses with strong stems and excellent opening properties.",
    headSize: "4.5-5.0 cm",
    stemLength: "50-60 cm",
    colors: ["Pink"]
  },
  {
    id: 4,
    name: "Yellow Finesse Roses",
    image: "https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Premium Cut Flowers",
    description: "Vibrant yellow roses with perfect form and long stems.",
    headSize: "4.0-4.5 cm",
    stemLength: "50-60 cm",
    colors: ["Yellow"]
  },
  
  // Spray Roses
  {
    id: 5,
    name: "Peach Spray Roses",
    image: "https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Spray Roses",
    description: "Delicate peach spray roses with multiple blooms per stem.",
    headSize: "3.0-3.5 cm",
    stemLength: "50-60 cm",
    colors: ["Peach"]
  },
  {
    id: 6,
    name: "White Spray Roses",
    image: "https://images.unsplash.com/photo-1548198471-e5a4b755def3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Spray Roses",
    description: "Pure white spray roses, perfect for weddings and special events.",
    headSize: "3.0-3.5 cm",
    stemLength: "50-60 cm",
    colors: ["White"]
  },
  
  // Intermediates Cut Flowers
  {
    id: 7,
    name: "Pink Sensation Intermediates",
    image: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Intermediates Cut Flowers",
    description: "Bright pink intermediate roses with excellent color retention.",
    headSize: "4.0-4.5 cm",
    stemLength: "40-50 cm",
    colors: ["Pink"]
  },
  {
    id: 8,
    name: "Red Intermediates",
    image: "https://images.unsplash.com/photo-1547187042-6d945e5a5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Intermediates Cut Flowers",
    description: "Vibrant red intermediate roses, adding drama and intensity to arrangements.",
    headSize: "4.0-4.5 cm",
    stemLength: "40-50 cm",
    colors: ["Red"]
  },
  
  // Julietta Series
  {
    id: 9,
    name: "Julietta Pink",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Julietta Series",
    description: "Beautiful pink Julietta roses with unique petal arrangement.",
    headSize: "4.5-5.0 cm",
    stemLength: "40-50 cm",
    colors: ["Pink"]
  },
  {
    id: 10,
    name: "Julietta Cream",
    image: "https://images.unsplash.com/photo-1588567678465-08902ca5f8d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Julietta Series",
    description: "Elegant cream Julietta roses with subtle hints of color.",
    headSize: "4.5-5.0 cm",
    stemLength: "40-50 cm",
    colors: ["Cream"]
  },
  
  // Summer Flowers - Fillers & Chrysanthemums
  {
    id: 11,
    name: "Lisianthus",
    image: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Summer Flowers",
    description: "Elegant flowers with ruffled petals, available in white, pink, and purple.",
    headSize: "3.0-4.0 cm",
    stemLength: "40-50 cm",
    colors: ["White", "Pink", "Purple"]
  },
  {
    id: 12,
    name: "Chrysanthemums",
    image: "https://images.unsplash.com/photo-1612966809470-bfbbeb142bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Summer Flowers",
    description: "Colorful chrysanthemums that add volume and texture to arrangements.",
    headSize: "4.0-5.0 cm",
    stemLength: "50-60 cm",
    colors: ["Yellow", "White", "Pink"]
  }
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [colorFilter, setColorFilter] = useState("All");
  const { t, isRTL } = useLanguage();

  // Define categories with translations
  const categories = [
    { id: "All", en: "All", ar: "الكل", nl: "Alle", fr: "Tous", es: "Todos" },
    { id: "Extra Premium Cut Flowers", en: "Extra Premium Cut Flowers", ar: "زهور فاخرة جداً", nl: "Extra Premium Snijbloemen", fr: "Fleurs Coupées Extra Premium", es: "Flores de Corte Extra Premium" },
    { id: "Premium Cut Flowers", en: "Premium Cut Flowers", ar: "زهور فاخرة", nl: "Premium Snijbloemen", fr: "Fleurs Coupées Premium", es: "Flores de Corte Premium" },
    { id: "Spray Roses", en: "Spray Roses", ar: "ورد سبراي", nl: "Trosrozen", fr: "Roses Spray", es: "Rosas Spray" },
    { id: "Intermediates Cut Flowers", en: "Intermediates Cut Flowers", ar: "زهور متوسطة", nl: "Tussenmaatse Snijbloemen", fr: "Fleurs Coupées Intermédiaires", es: "Flores de Corte Intermedias" },
    { id: "Julietta Series", en: "Julietta Series", ar: "سلسلة جولييتا", nl: "Julietta Serie", fr: "Série Julietta", es: "Serie Julietta" },
    { id: "Summer Flowers", en: "Summer Flowers", ar: "زهور صيفية", nl: "Zomerbloemen", fr: "Fleurs d'Été", es: "Flores de Verano" }
  ];
  
  // Extract all unique colors from products
  const allColors = ["All", ...Array.from(new Set(products.flatMap(product => product.colors || [])))];

  // Filter products based on category, search query, and color
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor = colorFilter === "All" || 
                         (product.colors && product.colors.some(color => color === colorFilter));
    
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
          <div className="flex flex-col gap-6">
            {/* Category tabs */}
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-2 min-w-max pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
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
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
              
              {/* Color filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Filter by color:</span>
                <div className="flex flex-wrap gap-1">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setColorFilter(color)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all",
                        colorFilter === color
                          ? "bg-secondary/80 text-white"
                          : "bg-purple/10 text-foreground/70 hover:bg-purple/20"
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
                  stemLength={product.stemLength}
                  colors={product.colors}
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
      
      {/* Product Information - Updated focusing on quality */}
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
      
      {/* Request Custom Order */}
      <section className="page-section bg-purple/10">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="bg-purple/30 text-primary/90 text-sm font-medium px-3 py-1 rounded-full">
              Tailored Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mt-4 mb-6">
              Request Custom Orders
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer custom growing and packaging solutions to meet your specific requirements.
            </p>
          </div>
          
          <div className="glass-panel p-8 md:p-12">
            <div className="grid grid-cols-1 gap-12">
              <FlowerRequestForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
