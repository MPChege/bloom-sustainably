import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Available languages - updated to match the image
export const languages = [
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', rtl: true },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
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
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über Uns',
    'nav.products': 'Produkte',
    'nav.farm': 'Unsere Farm',
    'nav.sustainability': 'Nachhaltigkeit',
    'nav.csr': 'CSR',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    
    // Product related
    'product.addToCart': 'In den Warenkorb',
    'product.viewDetails': 'Details Anzeigen',
    'product.price': 'Preis',
    'product.category': 'Kategorie',
    'product.description': 'Beschreibung',
    'product.quantity': 'Menge',
    'product.availableSoon': 'Bald Verfügbar',
    'product.outOfStock': 'Nicht auf Lager',
    'product.inStock': 'Auf Lager',
    
    // Cart related
    'cart.checkout': 'Zur Kasse',
    'cart.continueShopping': 'Weiter Einkaufen',
    'cart.emptyCart': 'Ihr Warenkorb ist leer',
    'cart.total': 'Gesamt',
    'cart.items': 'Artikel',
    'cart.remove': 'Entfernen',
    
    // About page
    'about.ourStory': 'Unsere Geschichte',
    'about.mission': 'Unsere Mission',
    'about.team': 'Unser Team',
    'about.values': 'Unsere Werte',
    
    // Blog page
    'blog.readMore': 'Weiterlesen',
    'blog.recentPosts': 'Neueste Beiträge',
    'blog.categories': 'Kategorien',
    'blog.postedOn': 'Veröffentlicht am',
    'blog.by': 'von',
    
    // Home page
    'home.hero.title': 'Frische, Qualitäts- und Nachhaltige Blumen aus Kenia',
    'home.hero.subtitle': 'Schönheit Kultivieren, Exzellenz Ernten',
    'home.viewProducts': 'Unsere Blumen Ansehen',
    'home.getInTouch': 'Kontakt Aufnehmen',
    'home.featuredProducts': 'Ausgewählte Blumen',
    'home.viewAllProducts': 'Alle Produkte Ansehen',
    'home.qualityCertifications': 'Qualitätszertifikate',
    'home.readyToOrder': 'Bereit Premium-Blumen zu Bestellen?',
    'home.contactUs': 'Kontaktieren Sie Uns Jetzt',
    'home.exploreProducts': 'Produkte Erkunden',
    
    // Farm page
    'farm.title': 'Unsere Farm',
    'farm.subtitle': 'Entdecken Sie die perfekte Umgebung für den Anbau von Weltklasse-Blumen',
    'farm.location': 'Erstklassiger Standort',
    'farm.environment': 'Die Perfekte Wachstumsumgebung',
    'farm.advantages': 'Unsere Vorteile',
    'farm.special': 'Was Unsere Farm Besonders Macht',
    'farm.gallery': 'Farm-Galerie',
    'farm.specialties': 'Unsere Spezialitäten',
    'farm.whatWeGrow': 'Was Wir Anbauen',
    'farm.scheduleVisit': 'Farmbesuch Planen',
    'farm.visualTour': 'Visuelle Tour',
    'farm.viewProducts': 'Unsere Produkte Ansehen',
    
    // Error page
    'error.pageNotFound': 'Seite Nicht Gefunden',
    'error.pageMessage': 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    'error.returnHome': 'Zurück zur Startseite',
  },
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.products': 'Prodotti',
    'nav.farm': 'La Nostra Fattoria',
    'nav.sustainability': 'Sostenibilità',
    'nav.csr': 'RSI',
    'nav.blog': 'Blog',
    'nav.contact': 'Contatti',
    
    // Product related
    'product.addToCart': 'Aggiungi al Carrello',
    'product.viewDetails': 'Visualizza Dettagli',
    'product.price': 'Prezzo',
    'product.category': 'Categoria',
    'product.description': 'Descrizione',
    'product.quantity': 'Quantità',
    'product.availableSoon': 'Presto Disponibile',
    'product.outOfStock': 'Esaurito',
    'product.inStock': 'Disponibile',
    
    // Cart related
    'cart.checkout': 'Procedi all\'Acquisto',
    'cart.continueShopping': 'Continua lo Shopping',
    'cart.emptyCart': 'Il tuo carrello è vuoto',
    'cart.total': 'Totale',
    'cart.items': 'Articoli',
    'cart.remove': 'Rimuovi',
    
    // About page
    'about.ourStory': 'La Nostra Storia',
    'about.mission': 'La Nostra Missione',
    'about.team': 'Il Nostro Team',
    'about.values': 'I Nostri Valori',
    
    // Blog page
    'blog.readMore': 'Leggi di Più',
    'blog.recentPosts': 'Post Recenti',
    'blog.categories': 'Categorie',
    'blog.postedOn': 'Pubblicato il',
    'blog.by': 'da',
    
    // Home page
    'home.hero.title': 'Fiori Freschi, di Qualità e Sostenibili dal Kenya',
    'home.hero.subtitle': 'Coltivare Bellezza, Raccogliere Eccellenza',
    'home.viewProducts': 'Visualizza i Nostri Fiori',
    'home.getInTouch': 'Contattaci',
    'home.featuredProducts': 'Flores in Evidenza',
    'home.viewAllProducts': 'Visualizza Tutti i Prodotti',
    'home.qualityCertifications': 'Certificazioni di Qualità',
    'home.readyToOrder': 'Pronto per Ordinare Fiori Premium?',
    'home.contactUs': 'Contattaci Ora',
    'home.exploreProducts': 'Esplora i Prodotti',
    
    // Farm page
    'farm.title': 'La Nostra Fattoria',
    'farm.subtitle': 'Scopri l\'ambiente perfetto per coltivare fiori di classe mondiale',
    'farm.location': 'Posizione Privilegiata',
    'farm.environment': 'L\'Ambiente di Crescita Perfetto',
    'farm.advantages': 'I Nostri Vantaggi',
    'farm.special': 'Cosa Rende Speciale la Nostra Fattoria',
    'farm.gallery': 'Galleria della Fattoria',
    'farm.specialties': 'Le Nostre Specialità',
    'farm.whatWeGrow': 'Cosa Coltiviamo',
    'farm.scheduleVisit': 'Programma una Visita',
    'farm.visualTour': 'Tour Visivo',
    'farm.viewProducts': 'Visualizza i Nostri Prodotti',
    
    // Error page
    'error.pageNotFound': 'Pagina Non Trovata',
    'error.pageMessage': 'La pagina che stai cercando non esiste o è stata spostata.',
    'error.returnHome': 'Torna alla Home',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.products': 'Produtos',
    'nav.farm': 'Nossa Fazenda',
    'nav.sustainability': 'Sustentabilidade',
    'nav.csr': 'RSE',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    
    // Product related
    'product.addToCart': 'Adicionar ao Carrinho',
    'product.viewDetails': 'Ver Detalhes',
    'product.price': 'Preço',
    'product.category': 'Categoria',
    'product.description': 'Descrição',
    'product.quantity': 'Quantidade',
    'product.availableSoon': 'Disponível em Breve',
    'product.outOfStock': 'Esgotado',
    'product.inStock': 'Em Estoque',
    
    // Cart related
    'cart.checkout': 'Finalizar Compra',
    'cart.continueShopping': 'Continuar Comprando',
    'cart.emptyCart': 'Seu carrinho está vazio',
    'cart.total': 'Total',
    'cart.items': 'Itens',
    'cart.remove': 'Remover',
    
    // About page
    'about.ourStory': 'Nossa História',
    'about.mission': 'Nossa Missão',
    'about.team': 'Nossa Equipe',
    'about.values': 'Nossos Valores',
    
    // Blog page
    'blog.readMore': 'Leia Mais',
    'blog.recentPosts': 'Posts Recentes',
    'blog.categories': 'Categorias',
    'blog.postedOn': 'Publicado em',
    'blog.by': 'por',
    
    // Home page
    'home.hero.title': 'Flores Frescas, de Qualidade e Sustentáveis do Quênia',
    'home.hero.subtitle': 'Cultivando Beleza, Colhendo Excelência',
    'home.viewProducts': 'Ver Nossas Flores',
    'home.getInTouch': 'Entre em Contato',
    'home.featuredProducts': 'Flores em Destaque',
    'home.viewAllProducts': 'Ver Todos os Produtos',
    'home.qualityCertifications': 'Certificações de Qualidade',
    'home.readyToOrder': 'Pronto para Encomendar Flores Premium?',
    'home.contactUs': 'Contate-nos Agora',
    'home.exploreProducts': 'Explorar Produtos',
    
    // Farm page
    'farm.title': 'Nossa Fazenda',
    'farm.subtitle': 'Descubra o ambiente perfeito para o cultivo de flores de classe mundial',
    'farm.location': 'Localização Privilegiada',
    'farm.environment': 'O Ambiente de Crescimento Perfeito',
    'farm.advantages': 'Nossas Vantagens',
    'farm.special': 'O Que Torna Nossa Fazenda Especial',
    'farm.gallery': 'Galeria da Fazenda',
    'farm.specialties': 'Nossas Especialidades',
    'farm.whatWeGrow': 'O Que Cultivamos',
    'farm.scheduleVisit': 'Agende uma Visita',
    'farm.visualTour': 'Tour Visual',
    'farm.viewProducts': 'Ver Nossos Produtos',
    
    // Error page
    'error.pageNotFound': 'Página Não Encontrada',
    'error.pageMessage': 'A página que você está procurando não existe ou foi movida.',
    'error.returnHome': 'Voltar à Página Inicial',
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
