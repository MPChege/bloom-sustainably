
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSelector from "./LanguageSelector";
import CurrencySelector from "./CurrencySelector";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const farmDropdownRef = useRef<HTMLDivElement>(null);
  const productsDropdownRef = useRef<HTMLDivElement>(null);

  // Navigation items with translation keys
  const navigation = [
    { name: "nav.home", href: "/" },
    { name: "nav.about", href: "/about" },
    // Farm dropdown will be handled separately
    // Products dropdown will be handled separately
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setSearchVisible(false);
  }, [location]);

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

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
      {/* Top utility bar */}
      <div className="bg-primary/10 py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-primary/80">
            <span className="mr-4">Email: info@credibleblooms.com</span>
            <span>Phone: +254 712 345 678</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <CurrencySelector />
          </div>
        </div>
      </div>

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
              <form onSubmit={handleSearch} className="absolute right-0 top-0 h-10 w-64 bg-white border border-gray-200 rounded-full overflow-hidden flex items-center">
                <input
                  type="text"
                  placeholder="Search flowers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full px-4 focus:outline-none text-sm"
                  autoFocus
                />
                <button type="submit" className="p-2 bg-primary/10 h-full flex items-center justify-center">
                  <Search className="h-4 w-4 text-primary" />
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setSearchVisible(true)}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Search className="h-5 w-5 text-primary" />
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button
            className="focus:outline-none bg-purple/10 p-2 rounded-md md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-secondary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - Fixed overlay with higher z-index */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-white transition-all duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none",
          isRTL ? "rtl" : ""
        )}
      >
        {/* Close button in the top-right corner of mobile menu */}
        <div className="absolute top-4 right-4">
          <button
            className="p-2 rounded-full bg-purple/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6 text-secondary" />
          </button>
        </div>
        
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          {/* Language and Currency selector on mobile */}
          <div className="flex justify-center space-x-4 mb-8">
            <LanguageSelector />
            <CurrencySelector />
          </div>
          
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search flowers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-primary/10 rounded-full"
              >
                <Search className="h-4 w-4 text-primary" />
              </button>
            </div>
          </form>
          
          {/* Mobile navigation */}
          <nav className="flex flex-col space-y-6 items-start">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-lg font-medium smooth-transition w-full", 
                  location.pathname === item.href 
                    ? "text-secondary font-semibold border-b border-secondary pb-1" 
                    : "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}
            
            {/* Mobile Farm dropdown */}
            <div className="w-full">
              <button
                onClick={() => setFarmDropdownOpen(!farmDropdownOpen)}
                className="flex items-center justify-between w-full text-lg font-medium text-primary pb-1"
              >
                {t("nav.farm")}
                <ChevronDown className={`h-5 w-5 transition-transform ${farmDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {farmDropdownOpen && (
                <div className="mt-2 pl-4 space-y-3 border-l-2 border-purple/20">
                  {farmItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block text-base hover:text-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Products dropdown */}
            <div className="w-full">
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className="flex items-center justify-between w-full text-lg font-medium text-primary pb-1"
              >
                {t("nav.products")}
                <ChevronDown className={`h-5 w-5 transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {productsDropdownOpen && (
                <div className="mt-2 pl-4 space-y-3 border-l-2 border-purple/20">
                  {productItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block text-base hover:text-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          
          {/* Contact information */}
          <div className="mt-auto pt-8 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Contact Us</p>
              <p className="text-primary font-medium mb-1">info@credibleblooms.com</p>
              <p className="text-primary font-medium">+254 712 345 678</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
