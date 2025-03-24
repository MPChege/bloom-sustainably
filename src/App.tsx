
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense, lazy } from "react";

// Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Immediate load pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loaded pages
const About = lazy(() => import("./pages/About"));
const OurFarm = lazy(() => import("./pages/OurFarm"));
const Products = lazy(() => import("./pages/Products"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const SalesTracker = lazy(() => import("./pages/SalesTracker"));
const Sustainability = lazy(() => import("./pages/Sustainability"));
const CSR = lazy(() => import("./pages/CSR"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const VirtualTour = lazy(() => import("./pages/VirtualTour"));
const FeatureShowcase = lazy(() => import("./pages/FeatureShowcase"));

// Context
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CurrencyProvider } from "./context/CurrencyContext";

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Eager loaded route */}
                  <Route path="/" element={<Index />} />
                  
                  {/* Lazy loaded routes */}
                  <Route path="/about" element={
                    <Suspense fallback={<PageLoader />}>
                      <About />
                    </Suspense>
                  } />
                  <Route path="/our-farm" element={
                    <Suspense fallback={<PageLoader />}>
                      <OurFarm />
                    </Suspense>
                  } />
                  <Route path="/products" element={
                    <Suspense fallback={<PageLoader />}>
                      <Products />
                    </Suspense>
                  } />
                  <Route path="/add-product" element={
                    <Suspense fallback={<PageLoader />}>
                      <AddProduct />
                    </Suspense>
                  } />
                  <Route path="/sales-tracker" element={
                    <Suspense fallback={<PageLoader />}>
                      <SalesTracker />
                    </Suspense>
                  } />
                  <Route path="/sustainability" element={
                    <Suspense fallback={<PageLoader />}>
                      <Sustainability />
                    </Suspense>
                  } />
                  <Route path="/csr" element={
                    <Suspense fallback={<PageLoader />}>
                      <CSR />
                    </Suspense>
                  } />
                  <Route path="/blog" element={
                    <Suspense fallback={<PageLoader />}>
                      <Blog />
                    </Suspense>
                  } />
                  <Route path="/contact" element={
                    <Suspense fallback={<PageLoader />}>
                      <Contact />
                    </Suspense>
                  } />
                  <Route path="/virtual-tour" element={
                    <Suspense fallback={<PageLoader />}>
                      <VirtualTour />
                    </Suspense>
                  } />
                  <Route path="/features" element={
                    <Suspense fallback={<PageLoader />}>
                      <FeatureShowcase />
                    </Suspense>
                  } />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" richColors />
          </Router>
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
