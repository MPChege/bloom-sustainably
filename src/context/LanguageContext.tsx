
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Available languages
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.farm': 'Our Farm',
    'nav.sustainability': 'Sustainability',
    'nav.csr': 'CSR',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'product.addToCart': 'Add to Cart',
    'product.viewDetails': 'View Details',
    'cart.checkout': 'Checkout',
    'cart.continueShopping': 'Continue Shopping',
    'cart.emptyCart': 'Your cart is empty',
    'cart.total': 'Total',
    'about.ourStory': 'Our Story',
    'about.mission': 'Our Mission',
    'about.team': 'Our Team',
    'about.values': 'Our Values',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'المنتجات',
    'nav.farm': 'مزرعتنا',
    'nav.sustainability': 'الاستدامة',
    'nav.csr': 'المسؤولية المجتمعية',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'product.addToCart': 'أضف إلى السلة',
    'product.viewDetails': 'عرض التفاصيل',
    'cart.checkout': 'الدفع',
    'cart.continueShopping': 'مواصلة التسوق',
    'cart.emptyCart': 'سلة التسوق فارغة',
    'cart.total': 'المجموع',
    'about.ourStory': 'قصتنا',
    'about.mission': 'مهمتنا',
    'about.team': 'فريقنا',
    'about.values': 'قيمنا',
  },
  nl: {
    'nav.home': 'Home',
    'nav.about': 'Over Ons',
    'nav.products': 'Producten',
    'nav.farm': 'Onze Boerderij',
    'nav.sustainability': 'Duurzaamheid',
    'nav.csr': 'MVO',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'product.addToCart': 'In Winkelwagen',
    'product.viewDetails': 'Details Bekijken',
    'cart.checkout': 'Afrekenen',
    'cart.continueShopping': 'Verder Winkelen',
    'cart.emptyCart': 'Je winkelwagen is leeg',
    'cart.total': 'Totaal',
    'about.ourStory': 'Ons Verhaal',
    'about.mission': 'Onze Missie',
    'about.team': 'Ons Team',
    'about.values': 'Onze Waarden',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.products': 'Produits',
    'nav.farm': 'Notre Ferme',
    'nav.sustainability': 'Durabilité',
    'nav.csr': 'RSE',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'product.addToCart': 'Ajouter au Panier',
    'product.viewDetails': 'Voir les Détails',
    'cart.checkout': 'Commander',
    'cart.continueShopping': 'Continuer les Achats',
    'cart.emptyCart': 'Votre panier est vide',
    'cart.total': 'Total',
    'about.ourStory': 'Notre Histoire',
    'about.mission': 'Notre Mission',
    'about.team': 'Notre Équipe',
    'about.values': 'Nos Valeurs',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.products': 'Productos',
    'nav.farm': 'Nuestra Granja',
    'nav.sustainability': 'Sostenibilidad',
    'nav.csr': 'RSC',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'product.addToCart': 'Añadir al Carrito',
    'product.viewDetails': 'Ver Detalles',
    'cart.checkout': 'Pagar',
    'cart.continueShopping': 'Seguir Comprando',
    'cart.emptyCart': 'Tu carrito está vacío',
    'cart.total': 'Total',
    'about.ourStory': 'Nuestra Historia',
    'about.mission': 'Nuestra Misión',
    'about.team': 'Nuestro Equipo',
    'about.values': 'Nuestros Valores',
  },
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
  languageOptions: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  // Translate function
  const t = (key: string): string => {
    if (!translations[currentLanguage]) return key;
    return translations[currentLanguage][key] || translations['en'][key] || key;
  };

  // Set language and handle RTL
  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    const lang = languages.find(l => l.code === code);
    setIsRTL(!!lang?.rtl);
    localStorage.setItem('language', code);
    
    // Set text direction for the whole app
    document.documentElement.dir = lang?.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  };

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      t, 
      isRTL,
      languageOptions: languages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
