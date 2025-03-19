
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
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.farm': 'Our Farm',
    'nav.sustainability': 'Sustainability',
    'nav.csr': 'CSR',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Product related
    'product.addToCart': 'Add to Cart',
    'product.viewDetails': 'View Details',
    'product.price': 'Price',
    'product.category': 'Category',
    'product.description': 'Description',
    'product.quantity': 'Quantity',
    'product.availableSoon': 'Available Soon',
    'product.outOfStock': 'Out of Stock',
    'product.inStock': 'In Stock',
    
    // Cart related
    'cart.checkout': 'Checkout',
    'cart.continueShopping': 'Continue Shopping',
    'cart.emptyCart': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.items': 'Items',
    'cart.remove': 'Remove',
    
    // About page
    'about.ourStory': 'Our Story',
    'about.mission': 'Our Mission',
    'about.team': 'Our Team',
    'about.values': 'Our Values',
    
    // Blog page
    'blog.readMore': 'Read More',
    'blog.recentPosts': 'Recent Posts',
    'blog.categories': 'Categories',
    'blog.postedOn': 'Posted on',
    'blog.by': 'by',
    
    // Home page
    'home.hero.title': 'Fresh, Quality, and Sustainable Flowers from Kenya',
    'home.hero.subtitle': 'Cultivating Beauty, Harvesting Excellence',
    'home.viewProducts': 'View Our Flowers',
    'home.getInTouch': 'Get in Touch',
    'home.featuredProducts': 'Featured Flowers',
    'home.viewAllProducts': 'View All Products',
    'home.qualityCertifications': 'Quality Certifications',
    'home.readyToOrder': 'Ready to Order Premium Flowers?',
    'home.contactUs': 'Contact Us Now',
    'home.exploreProducts': 'Explore Products',
    
    // Farm page
    'farm.title': 'Our Farm',
    'farm.subtitle': 'Discover the perfect environment for growing world-class flowers',
    'farm.location': 'Prime Location',
    'farm.environment': 'The Perfect Growing Environment',
    'farm.advantages': 'Our Advantages',
    'farm.special': 'What Makes Our Farm Special',
    'farm.gallery': 'Farm Gallery',
    'farm.specialties': 'Our Specialties',
    'farm.whatWeGrow': 'What We Grow',
    'farm.scheduleVisit': 'Schedule a Farm Visit',
    'farm.visualTour': 'Visual Tour',
    'farm.viewProducts': 'View Our Products',
    
    // Error page
    'error.pageNotFound': 'Page Not Found',
    'error.pageMessage': 'The page you\'re looking for doesn\'t exist or has been moved.',
    'error.returnHome': 'Return to Homepage',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'المنتجات',
    'nav.farm': 'مزرعتنا',
    'nav.sustainability': 'الاستدامة',
    'nav.csr': 'المسؤولية المجتمعية',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    
    // Product related
    'product.addToCart': 'أضف إلى السلة',
    'product.viewDetails': 'عرض التفاصيل',
    'product.price': 'السعر',
    'product.category': 'الفئة',
    'product.description': 'الوصف',
    'product.quantity': 'الكمية',
    'product.availableSoon': 'متوفر قريباً',
    'product.outOfStock': 'غير متوفر',
    'product.inStock': 'متوفر',
    
    // Cart related
    'cart.checkout': 'الدفع',
    'cart.continueShopping': 'مواصلة التسوق',
    'cart.emptyCart': 'سلة التسوق فارغة',
    'cart.total': 'المجموع',
    'cart.items': 'العناصر',
    'cart.remove': 'إزالة',
    
    // About page
    'about.ourStory': 'قصتنا',
    'about.mission': 'مهمتنا',
    'about.team': 'فريقنا',
    'about.values': 'قيمنا',
    
    // Blog page
    'blog.readMore': 'قراءة المزيد',
    'blog.recentPosts': 'أحدث المقالات',
    'blog.categories': 'الفئات',
    'blog.postedOn': 'نشر في',
    'blog.by': 'بواسطة',
    
    // Home page
    'home.hero.title': 'زهور طازجة وعالية الجودة ومستدامة من كينيا',
    'home.hero.subtitle': 'نزرع الجمال ونحصد التميز',
    'home.viewProducts': 'عرض منتجاتنا',
    'home.getInTouch': 'تواصل معنا',
    'home.featuredProducts': 'الزهور المميزة',
    'home.viewAllProducts': 'عرض جميع المنتجات',
    'home.qualityCertifications': 'شهادات الجودة',
    'home.readyToOrder': 'هل أنت جاهز لطلب زهور فاخرة؟',
    'home.contactUs': 'اتصل بنا الآن',
    'home.exploreProducts': 'استكشف المنتجات',
    
    // Farm page
    'farm.title': 'مزرعتنا',
    'farm.subtitle': 'اكتشف البيئة المثالية لزراعة زهور عالمية المستوى',
    'farm.location': 'موقع مميز',
    'farm.environment': 'البيئة المثالية للنمو',
    'farm.advantages': 'مميزاتنا',
    'farm.special': 'ما الذي يجعل مزرعتنا مميزة',
    'farm.gallery': 'معرض صور المزرعة',
    'farm.specialties': 'تخصصاتنا',
    'farm.whatWeGrow': 'ماذا نزرع',
    
    // Error page
    'error.pageNotFound': 'الصفحة غير موجودة',
    'error.pageMessage': 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    'error.returnHome': 'العودة إلى الصفحة الرئيسية',
  },
  nl: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Over Ons',
    'nav.products': 'Producten',
    'nav.farm': 'Onze Boerderij',
    'nav.sustainability': 'Duurzaamheid',
    'nav.csr': 'MVO',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Product related
    'product.addToCart': 'In Winkelwagen',
    'product.viewDetails': 'Details Bekijken',
    'product.price': 'Prijs',
    'product.category': 'Categorie',
    'product.description': 'Beschrijving',
    'product.quantity': 'Aantal',
    'product.availableSoon': 'Binnenkort Beschikbaar',
    'product.outOfStock': 'Niet op Voorraad',
    'product.inStock': 'Op Voorraad',
    
    // Cart related
    'cart.checkout': 'Afrekenen',
    'cart.continueShopping': 'Verder Winkelen',
    'cart.emptyCart': 'Je winkelwagen is leeg',
    'cart.total': 'Totaal',
    'cart.items': 'Artikelen',
    'cart.remove': 'Verwijderen',
    
    // About page
    'about.ourStory': 'Ons Verhaal',
    'about.mission': 'Onze Missie',
    'about.team': 'Ons Team',
    'about.values': 'Onze Waarden',
    
    // Blog page
    'blog.readMore': 'Lees Meer',
    'blog.recentPosts': 'Recente Berichten',
    'blog.categories': 'Categorieën',
    'blog.postedOn': 'Geplaatst op',
    'blog.by': 'door',
    
    // Home page
    'home.hero.title': 'Verse, Kwaliteits- en Duurzame Bloemen uit Kenia',
    'home.hero.subtitle': 'Schoonheid Cultiveren, Uitmuntendheid Oogsten',
    'home.viewProducts': 'Bekijk Onze Bloemen',
    'home.getInTouch': 'Neem Contact Op',
    'home.featuredProducts': 'Uitgelichte Bloemen',
    'home.viewAllProducts': 'Bekijk Alle Producten',
    'home.qualityCertifications': 'Kwaliteitscertificaten',
    'home.readyToOrder': 'Klaar om Premium Bloemen te Bestellen?',
    'home.contactUs': 'Neem Nu Contact Op',
    'home.exploreProducts': 'Verken Producten',
    
    // Farm page
    'farm.title': 'Onze Boerderij',
    'farm.subtitle': 'Ontdek de perfecte omgeving voor het kweken van wereldklasse bloemen',
    'farm.location': 'Toplocatie',
    'farm.environment': 'De Perfecte Groeiomgeving',
    'farm.advantages': 'Onze Voordelen',
    'farm.special': 'Wat Onze Boerderij Bijzonder Maakt',
    'farm.gallery': 'Boerderij Galerij',
    'farm.specialties': 'Onze Specialiteiten',
    'farm.whatWeGrow': 'Wat We Kweken',
    
    // Error page
    'error.pageNotFound': 'Pagina Niet Gevonden',
    'error.pageMessage': 'De pagina die je zoekt bestaat niet of is verplaatst.',
    'error.returnHome': 'Terug naar Homepage',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.products': 'Produits',
    'nav.farm': 'Notre Ferme',
    'nav.sustainability': 'Durabilité',
    'nav.csr': 'RSE',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Product related
    'product.addToCart': 'Ajouter au Panier',
    'product.viewDetails': 'Voir les Détails',
    'product.price': 'Prix',
    'product.category': 'Catégorie',
    'product.description': 'Description',
    'product.quantity': 'Quantité',
    'product.availableSoon': 'Bientôt Disponible',
    'product.outOfStock': 'Rupture de Stock',
    'product.inStock': 'En Stock',
    
    // Cart related
    'cart.checkout': 'Commander',
    'cart.continueShopping': 'Continuer les Achats',
    'cart.emptyCart': 'Votre panier est vide',
    'cart.total': 'Total',
    'cart.items': 'Articles',
    'cart.remove': 'Supprimer',
    
    // About page
    'about.ourStory': 'Notre Histoire',
    'about.mission': 'Notre Mission',
    'about.team': 'Notre Équipe',
    'about.values': 'Nos Valeurs',
    
    // Blog page
    'blog.readMore': 'Lire Plus',
    'blog.recentPosts': 'Articles Récents',
    'blog.categories': 'Catégories',
    'blog.postedOn': 'Publié le',
    'blog.by': 'par',
    
    // Home page
    'home.hero.title': 'Fleurs Fraîches, de Qualité et Durables du Kenya',
    'home.hero.subtitle': 'Cultiver la Beauté, Récolter l\'Excellence',
    'home.viewProducts': 'Voir Nos Fleurs',
    'home.getInTouch': 'Nous Contacter',
    'home.featuredProducts': 'Fleurs en Vedette',
    'home.viewAllProducts': 'Voir Tous les Produits',
    'home.qualityCertifications': 'Certifications de Qualité',
    'home.readyToOrder': 'Prêt à Commander des Fleurs Premium?',
    'home.contactUs': 'Contactez-Nous Maintenant',
    'home.exploreProducts': 'Explorer les Produits',
    
    // Farm page
    'farm.title': 'Notre Ferme',
    'farm.subtitle': 'Découvrez l\'environnement parfait pour cultiver des fleurs de classe mondiale',
    'farm.location': 'Emplacement Privilégié',
    'farm.environment': 'L\'Environnement de Croissance Parfait',
    'farm.advantages': 'Nos Avantages',
    'farm.special': 'Ce Qui Rend Notre Ferme Spéciale',
    'farm.gallery': 'Galerie de la Ferme',
    'farm.specialties': 'Nos Spécialités',
    'farm.whatWeGrow': 'Ce Que Nous Cultivons',
    
    // Error page
    'error.pageNotFound': 'Page Non Trouvée',
    'error.pageMessage': 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    'error.returnHome': 'Retour à la Page d\'Accueil',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.products': 'Productos',
    'nav.farm': 'Nuestra Granja',
    'nav.sustainability': 'Sostenibilidad',
    'nav.csr': 'RSC',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    
    // Product related
    'product.addToCart': 'Añadir al Carrito',
    'product.viewDetails': 'Ver Detalles',
    'product.price': 'Precio',
    'product.category': 'Categoría',
    'product.description': 'Descripción',
    'product.quantity': 'Cantidad',
    'product.availableSoon': 'Disponible Pronto',
    'product.outOfStock': 'Agotado',
    'product.inStock': 'En Stock',
    
    // Cart related
    'cart.checkout': 'Pagar',
    'cart.continueShopping': 'Seguir Comprando',
    'cart.emptyCart': 'Tu carrito está vacío',
    'cart.total': 'Total',
    'cart.items': 'Artículos',
    'cart.remove': 'Eliminar',
    
    // About page
    'about.ourStory': 'Nuestra Historia',
    'about.mission': 'Nuestra Misión',
    'about.team': 'Nuestro Equipo',
    'about.values': 'Nuestros Valores',
    
    // Blog page
    'blog.readMore': 'Leer Más',
    'blog.recentPosts': 'Publicaciones Recientes',
    'blog.categories': 'Categorías',
    'blog.postedOn': 'Publicado el',
    'blog.by': 'por',
    
    // Home page
    'home.hero.title': 'Flores Frescas, de Calidad y Sostenibles de Kenia',
    'home.hero.subtitle': 'Cultivando Belleza, Cosechando Excelencia',
    'home.viewProducts': 'Ver Nuestras Flores',
    'home.getInTouch': 'Ponerse en Contacto',
    'home.featuredProducts': 'Flores Destacadas',
    'home.viewAllProducts': 'Ver Todos los Productos',
    'home.qualityCertifications': 'Certificaciones de Calidad',
    'home.readyToOrder': '¿Listo para Pedir Flores Premium?',
    'home.contactUs': 'Contáctenos Ahora',
    'home.exploreProducts': 'Explorar Productos',
    
    // Farm page
    'farm.title': 'Nuestra Granja',
    'farm.subtitle': 'Descubre el entorno perfecto para cultivar flores de clase mundial',
    'farm.location': 'Ubicación Privilegiada',
    'farm.environment': 'El Entorno de Cultivo Perfecto',
    'farm.advantages': 'Nuestras Ventajas',
    'farm.special': 'Lo Que Hace Especial a Nuestra Granja',
    'farm.gallery': 'Galería de la Granja',
    'farm.specialties': 'Nuestras Especialidades',
    'farm.whatWeGrow': 'Lo Que Cultivamos',
    
    // Error page
    'error.pageNotFound': 'Página No Encontrada',
    'error.pageMessage': 'La página que estás buscando no existe o ha sido movida.',
    'error.returnHome': 'Volver a la Página de Inicio',
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
