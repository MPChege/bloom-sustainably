
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector";
import CurrencySelector from "./CurrencySelector";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const isMobile = useIsMobile();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll events
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

  // Navigation links
  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.ourFarm'), path: '/our-farm' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.sustainability'), path: '/sustainability' },
    { name: t('nav.csr'), path: '/csr' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-gray-100'}`}
    >
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between py-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className="z-10">
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/c91f75de-a991-4a12-b5ae-9d1029b5be9a.png" alt="Credible Blooms Logo" className="h-10" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className={`hidden md:flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LanguageSelector />
            <CurrencySelector />
            <div className="relative">
              <Link to="/cart" className="flex items-center justify-center w-10 h-10 rounded-full bg-purple/10 text-primary">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">1</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="z-10 md:hidden p-2 focus:outline-none"
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 z-0 flex flex-col bg-white transition-transform duration-300 ease-in-out transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden`}
          >
            <div className="flex-1 overflow-y-auto pt-20 px-6">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`py-3 text-lg border-b border-gray-100 ${
                      location.pathname === link.path ? 'text-primary font-medium' : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex justify-between">
                  <LanguageSelector />
                  <CurrencySelector />
                </div>
                <Link 
                  to="/cart"
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white w-full py-2 rounded-md"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart (1)</span>
                </Link>
                <Button 
                  as="link" 
                  href="/contact" 
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white w-full"
                >
                  {t('nav.getInTouch')}
                </Button>
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
