
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-sage/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-xl font-display font-bold">
                <span className="text-primary">Credible</span>Blooms
              </h2>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Fresh, quality, and sustainable flowers from Kenya, bringing nature's beauty to the world.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-foreground/60 hover:text-primary smooth-transition" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary smooth-transition" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary smooth-transition" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Our Farm", path: "/our-farm" },
                { label: "Products", path: "/products" },
                { label: "Sustainability", path: "/sustainability" },
                { label: "CSR", path: "/csr" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-muted-foreground hover:text-primary flex items-center smooth-transition"
                  >
                    <ArrowRight size={14} className="mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-primary" />
                <span className="text-muted-foreground">Naivasha, Kenya<br />2050 meters above sea level</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary" />
                <a href="tel:+254712345678" className="text-muted-foreground hover:text-primary smooth-transition">
                  +254 712 345 678
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary" />
                <a href="mailto:info@credibleblooms.com" className="text-muted-foreground hover:text-primary smooth-transition">
                  info@credibleblooms.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-base font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-white rounded-l-md border border-sage focus:outline-none focus:ring-1 focus:ring-primary flex-grow text-sm"
                required
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sage/20 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Credible Blooms. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary smooth-transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary smooth-transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
