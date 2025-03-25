
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import LanguageSelector from "./LanguageSelector";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/4de3e44b-ea84-4489-aab2-240d59a1688b.png" 
              alt="Credible Blooms Logo" 
              className="h-12" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors ${
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
          <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="flex items-center">
              <LanguageSelector />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 focus:outline-none"
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
            } md:hidden`}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <img 
                  src="/lovable-uploads/4de3e44b-ea84-4489-aab2-240d59a1688b.png" 
                  alt="Credible Blooms Logo" 
                  className="h-10" 
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
            <div className="flex-1 overflow-y-auto py-4 px-6">
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
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Language:</span>
                  <div className="flex items-center">
                    <LanguageSelector />
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
