
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import Cart from "./Cart";
import LanguageSelector from "./LanguageSelector";
import CurrencySelector from "./CurrencySelector";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@clerk/clerk-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const { isSignedIn } = useAuth();

  // Navigation items with translation keys
  const navigation = [
    { name: "nav.home", href: "/" },
    { name: "nav.about", href: "/about" },
    { name: "nav.farm", href: "/our-farm" },
    { name: "nav.products", href: "/products" },
    { name: "nav.sustainability", href: "/sustainability" },
    { name: "nav.csr", href: "/csr" },
    { name: "nav.blog", href: "/blog" },
    { name: "nav.contact", href: "/contact" },
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
  }, [location]);

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

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white shadow-md py-3" 
          : "bg-white/90 backdrop-blur-lg py-4 border-b border-purple/10",
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
            className="h-10 md:h-12"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className={`hidden md:flex ${isRTL ? "space-x-reverse space-x-8" : "space-x-8"}`}>
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
          
          {/* Admin link only if signed in */}
          {isSignedIn && (
            <Link
              to="/admin/dashboard"
              className={cn(
                "text-sm font-medium smooth-transition hover:opacity-100 hover:text-secondary flex items-center",
                location.pathname.startsWith("/admin") 
                  ? "text-secondary font-semibold border-b-2 border-secondary" 
                  : "text-primary",
                "link-underline py-2"
              )}
            >
              <ShieldCheck className="mr-1 h-4 w-4" />
              Admin
            </Link>
          )}
        </nav>

        {/* Language, Currency and Cart - Desktop */}
        <div className={`hidden md:flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
          <LanguageSelector />
          <CurrencySelector />
          <Cart />
          
          {/* Admin login button if not signed in */}
          {!isSignedIn && (
            <Link
              to="/admin/sign-in"
              className="text-sm font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"} md:hidden`}>
          <LanguageSelector />
          <CurrencySelector />
          <Cart />
          <button
            className="focus:outline-none bg-purple/10 p-2 rounded-md"
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
          <nav className="flex flex-col space-y-6 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-lg font-medium smooth-transition", 
                  location.pathname === item.href 
                    ? "text-secondary font-semibold border-b-2 border-secondary" 
                    : "text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}
            
            {/* Admin link for mobile */}
            <Link
              to={isSignedIn ? "/admin/dashboard" : "/admin/sign-in"}
              className={cn(
                "text-lg font-medium smooth-transition flex items-center", 
                location.pathname.startsWith("/admin") 
                  ? "text-secondary font-semibold border-b-2 border-secondary" 
                  : "text-primary"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShieldCheck className="mr-2 h-5 w-5" />
              Admin {isSignedIn ? "Dashboard" : "Login"}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
