
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Cart from "./Cart";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Farm", href: "/our-farm" },
  { name: "Products", href: "/products" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "CSR", href: "/csr" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white shadow-md py-3" 
          : "bg-white/90 backdrop-blur-lg py-4 border-b border-purple/10"
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
        <nav className="hidden md:flex space-x-8">
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
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Cart Icon - Desktop */}
        <div className="hidden md:block">
          <Cart />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-3 md:hidden">
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

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transition-all duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
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
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
