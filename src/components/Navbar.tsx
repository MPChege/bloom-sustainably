
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, Heart, Bell } from "lucide-react";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector";
import CurrencySelector from "./CurrencySelector";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import OptimizedImage from "./OptimizedImage";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.farm'), path: '/our-farm' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.sustainability'), path: '/sustainability' },
    { name: t('nav.csr'), path: '/csr' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const farmSubmenu = [
    { name: "Our Story", path: "/our-farm/story" },
    { name: "Facilities", path: "/our-farm/facilities" },
    { name: "Growing Process", path: "/our-farm/process" },
    { name: "Virtual Tour", path: "/virtual-tour" },
  ];

  const productsSubmenu = [
    { name: "All Products", path: "/products" },
    { name: "Seasonal Collections", path: "/products/seasonal" },
    { name: "Gift Arrangements", path: "/products/gifts" },
    { name: "Weddings & Events", path: "/products/events" },
  ];

  const renderNavMenuItems = () => (
    <NavigationMenuList className={`${isRTL ? 'flex-row-reverse' : ''}`}>
      <NavigationMenuItem>
        <Link to="/" className={navigationMenuTriggerStyle()}>
          {t('nav.home')}
        </Link>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <Link to="/about" className={navigationMenuTriggerStyle()}>
          {t('nav.about')}
        </Link>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <NavigationMenuTrigger>{t('nav.farm')}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[200px] gap-2 p-4">
            {farmSubmenu.map((item) => (
              <li key={item.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.path}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">{item.name}</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <NavigationMenuTrigger>{t('nav.products')}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[200px] gap-2 p-4">
            {productsSubmenu.map((item) => (
              <li key={item.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.path}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">{item.name}</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <Link to="/sustainability" className={navigationMenuTriggerStyle()}>
          {t('nav.sustainability')}
        </Link>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <Link to="/csr" className={navigationMenuTriggerStyle()}>
          {t('nav.csr')}
        </Link>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <Link to="/blog" className={navigationMenuTriggerStyle()}>
          {t('nav.blog')}
        </Link>
      </NavigationMenuItem>
      
      <NavigationMenuItem>
        <Link to="/contact" className={navigationMenuTriggerStyle()}>
          {t('nav.contact')}
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
    setShowSearch(false);
    setSearchQuery("");
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden md:block bg-gray-50 py-1 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse justify-start' : 'justify-end'} gap-4`}>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <div className="h-4 w-px bg-gray-300"></div>
              <CurrencySelector />
              <div className="h-4 w-px bg-gray-300"></div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-primary">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Notifications</h4>
                      <p className="text-sm text-muted-foreground">Stay updated with our latest offers and news.</p>
                    </div>
                    <div className="border-t pt-2">
                      <p className="text-sm">No new notifications</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <div className="h-4 w-px bg-gray-300"></div>
              <Link to="/favorites" className="flex items-center gap-1 text-sm text-gray-700 hover:text-primary">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Favorites</span>
              </Link>
              
              <div className="h-4 w-px bg-gray-300"></div>
              <Link to="/account" className="flex items-center gap-1 text-sm text-gray-700 hover:text-primary">
                <User className="h-4 w-4" />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link to="/" className="flex items-center">
            <OptimizedImage 
              src="/lovable-uploads/7a20dd3a-a5d2-40bb-9445-897a611f76a2.png" 
              alt="Credible Blooms Logo" 
              className="h-8 w-auto" 
              priority={true}
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:block">
            <NavigationMenu>
              {renderNavMenuItems()}
            </NavigationMenu>
          </div>

          {/* Desktop Search & Cart */}
          <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-0 flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-64 px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button 
                    type="submit"
                    className="px-3 py-1 bg-primary text-white rounded-r-md hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <button 
                  onClick={toggleSearch}
                  className="p-2 text-gray-700 hover:text-primary transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <Link 
              to="/cart"
              className="p-2 text-gray-700 hover:text-primary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 focus:outline-none"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } lg:hidden`}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <OptimizedImage 
                  src="/lovable-uploads/7a20dd3a-a5d2-40bb-9445-897a611f76a2.png" 
                  alt="Credible Blooms Logo" 
                  className="h-6 w-auto" 
                  priority={true}
                />
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 focus:outline-none"
                aria-label="Close Menu"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
            
            {/* Mobile search */}
            <div className="px-4 py-3 border-b border-gray-100">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button 
                  type="submit"
                  className="px-3 py-2 bg-primary text-white rounded-r-md"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-6">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className={`py-3 px-2 flex items-center text-lg border-b border-gray-100 ${
                        location.pathname === link.path || location.pathname.startsWith(link.path + '/') 
                          ? 'text-primary font-medium' 
                          : 'text-gray-700'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                    
                    {/* Submenus for farm */}
                    {link.name === t('nav.farm') && (
                      <div className="ml-4 mt-1 mb-2 border-l-2 border-gray-100 pl-4">
                        {farmSubmenu.map(item => (
                          <Link 
                            key={item.path}
                            to={item.path}
                            className="py-2 block text-gray-600 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {/* Submenus for products */}
                    {link.name === t('nav.products') && (
                      <div className="ml-4 mt-1 mb-2 border-l-2 border-gray-100 pl-4">
                        {productsSubmenu.map(item => (
                          <Link 
                            key={item.path}
                            to={item.path}
                            className="py-2 block text-gray-600 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                {/* Mobile account links */}
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <Link to="/account" className="flex items-center gap-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span>Account</span>
                  </Link>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <Link to="/favorites" className="flex items-center gap-2 text-gray-700">
                    <Heart className="h-5 w-5" />
                    <span>Favorites</span>
                  </Link>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <Link to="/cart" className="flex items-center gap-2 text-gray-700">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart</span>
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </Link>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Language:</span>
                  <div className="flex items-center">
                    <LanguageSelector />
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Currency:</span>
                  <div className="flex items-center">
                    <CurrencySelector />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="h-0.5 w-full bg-red-500"></div>
    </header>
  );
};

export default Navbar;
