
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const farmDropdownRef = useRef<HTMLDivElement>(null);
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Navigation items with translation keys
  const navigation = [
    { name: "nav.home", href: "/" },
    { name: "nav.about", href: "/about" },
    { name: "nav.sustainability", href: "/sustainability" },
    { name: "nav.csr", href: "/csr" },
    { name: "nav.blog", href: "/blog" },
    { name: "nav.contact", href: "/contact" },
  ];

  // Farm dropdown items
  const farmItems = [
    { name: "Main Farm (CB1)", href: "/our-farm?location=cb1", description: "Our primary flower production facility" },
    { name: "Crops Farm (CB2)", href: "/our-farm?location=cb2", description: "Seedlings, fruits, vegetables, maize and other crops" },
    { name: "Virtual Tour", href: "/virtual-tour", description: "Experience our farms virtually" },
  ];

  // Products dropdown items
  const productItems = [
    { name: "All Flowers", href: "/products", description: "Browse our complete collection" },
    { name: "Extra Premium Cut Flowers", href: "/products?category=Extra%20Premium%20Cut%20Flowers", description: "Our finest selection of premium blooms" },
    { name: "Premium Cut Flowers", href: "/products?category=Premium%20Cut%20Flowers", description: "High-quality roses and other varieties" },
    { name: "Spray Roses", href: "/products?category=Spray%20Roses", description: "Multiple blooms per stem" },
    { name: "Summer Flowers", href: "/products?category=Summer%20Flowers", description: "Seasonal varieties and fillers" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (farmDropdownRef.current && !farmDropdownRef.current.contains(event.target as Node)) {
        setFarmDropdownOpen(false);
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-white/90 backdrop-blur-lg py-3 border-b border-purple/10",
        isRTL ? "rtl" : ""
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 smooth-transition"
        >
          <img 
            src="/lovable-uploads/edda6dbd-9ef2-4b51-bb0c-1b0e82948a1a.png" 
            alt="Credible Blooms Logo" 
            className="h-8 md:h-8"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className={`hidden md:flex ${isRTL ? "space-x-reverse space-x-6" : "space-x-6"}`}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium smooth-transition hover:opacity-100 hover:text-secondary",
                location.pathname === item.href 
                  ? "text-secondary font-semibold border-b-2 border-secondary" 
                  : "text-primary",
                "link-underline py-2"
              )}
            >
              {t(item.name)}
            </Link>
          ))}

          {/* Farm Dropdown */}
          <div className="relative" ref={farmDropdownRef}>
            <button
              onClick={() => setFarmDropdownOpen(!farmDropdownOpen)}
              className={cn(
                "text-sm font-medium flex items-center hover:text-secondary",
                (location.pathname === "/our-farm" || location.pathname === "/virtual-tour")
                  ? "text-secondary font-semibold border-b-2 border-secondary"
                  : "text-primary",
                "py-2"
              )}
            >
              {t("nav.farm")}
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${farmDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {farmDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg overflow-hidden mt-2 z-50 border border-gray-100">
                <div className="p-2">
                  {farmItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-3 hover:bg-purple/5 rounded-lg transition-colors"
                      onClick={() => setFarmDropdownOpen(false)}
                    >
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products Dropdown */}
          <div className="relative" ref={productsDropdownRef}>
            <button
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              className={cn(
                "text-sm font-medium flex items-center hover:text-secondary",
                location.pathname === "/products"
                  ? "text-secondary font-semibold border-b-2 border-secondary"
                  : "text-primary",
                "py-2"
              )}
            >
              {t("nav.products")}
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {productsDropdownOpen && (
              <div className="absolute top-full left-0 w-72 bg-white shadow-lg rounded-lg overflow-hidden mt-2 z-50 border border-gray-100">
                <div className="p-2">
                  {productItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-3 hover:bg-purple/5 rounded-lg transition-colors"
                      onClick={() => setProductsDropdownOpen(false)}
                    >
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Search and Mobile Menu Controls */}
        <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
          {/* Search */}
          <div className="relative">
            {searchVisible ? (
              <form onSubmit={handleSearch} className="absolute right-0 top-0 h-8 w-56 bg-white border border-gray-200 rounded-full overflow-hidden flex items-center">
                <input
                  type="text"
                  placeholder="Search flowers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full px-3 focus:outline-none text-xs"
                  autoFocus
                />
                <button type="submit" className="p-1.5 bg-primary/10 h-full flex items-center justify-center">
                  <Search className="h-3 w-3 text-primary" />
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setSearchVisible(true)}
                className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Search className="h-4 w-4 text-primary" />
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="focus:outline-none bg-purple/10 p-2 rounded-md md:hidden"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6 text-primary" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-full sm:max-w-md">
                <div className="flex flex-col h-full bg-white">
                  {/* Search */}
                  <div className="p-4">
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        placeholder="Search flowers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </form>
                  </div>
                   
                  {/* Primary navigation */}
                  <nav className="px-4 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "block py-3 px-4 rounded-lg text-lg",
                          location.pathname === item.href 
                            ? "bg-purple/10 text-purple font-medium" 
                            : "text-gray-800 hover:bg-gray-100"
                        )}
                      >
                        {t(item.name)}
                      </Link>
                    ))}
                    
                    {/* Farm link */}
                    <div>
                      <button
                        onClick={() => setFarmDropdownOpen(!farmDropdownOpen)}
                        className={cn(
                          "flex items-center justify-between w-full py-3 px-4 rounded-lg text-lg",
                          (location.pathname === "/our-farm" || location.pathname === "/virtual-tour")
                            ? "bg-purple/10 text-purple font-medium"
                            : "text-gray-800 hover:bg-gray-100"
                        )}
                      >
                        {t("nav.farm")}
                        <ChevronDown className={`h-5 w-5 transition-transform ${farmDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {farmDropdownOpen && (
                        <div className="ml-4 space-y-1 mt-1 mb-2">
                          {farmItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block py-2 px-4 text-base text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Products link */}
                    <div>
                      <button
                        onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                        className={cn(
                          "flex items-center justify-between w-full py-3 px-4 rounded-lg text-lg",
                          location.pathname === "/products"
                            ? "bg-purple/10 text-purple font-medium"
                            : "text-gray-800 hover:bg-gray-100"
                        )}
                      >
                        {t("nav.products")}
                        <ChevronDown className={`h-5 w-5 transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {productsDropdownOpen && (
                        <div className="ml-4 space-y-1 mt-1 mb-2">
                          {productItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="block py-2 px-4 text-base text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </nav>
                  
                  <div className="mt-auto p-6">
                    <div className="text-center">
                      <button className="w-full py-3 px-6 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                        Get in Touch
                      </button>
                    </div>
                    
                    <div className="mt-6 text-center text-gray-500 text-sm">
                      <div>Contact Us</div>
                      <div className="mt-1">info@credibleblooms.com</div>
                      <div className="mt-0.5">+254 712 345 678</div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
