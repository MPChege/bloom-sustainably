
import { Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Suspense, lazy } from "react";

// Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin components
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Immediate load pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loaded pages
const About = lazy(() => import("./pages/About"));
const OurFarm = lazy(() => import("./pages/OurFarm"));
const Products = lazy(() => import("./pages/Products"));
const Sustainability = lazy(() => import("./pages/Sustainability"));
const CSR = lazy(() => import("./pages/CSR"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const VirtualTour = lazy(() => import("./pages/VirtualTour"));
const FeatureShowcase = lazy(() => import("./pages/FeatureShowcase"));

// Admin pages
const AdminSignIn = lazy(() => import("./pages/admin/SignIn"));
const AdminSignUp = lazy(() => import("./pages/admin/SignUp"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminAddProduct = lazy(() => import("./pages/admin/AddProduct"));
const AdminSalesTracker = lazy(() => import("./pages/admin/SalesTracker"));

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
                
                {/* Admin routes */}
                <Route path="/admin/sign-in" element={
                  <Suspense fallback={<PageLoader />}>
                    <AdminSignIn />
                  </Suspense>
                } />
                <Route path="/admin/sign-up" element={
                  <Suspense fallback={<PageLoader />}>
                    <AdminSignUp />
                  </Suspense>
                } />
                
                {/* Protected admin routes */}
                <Route path="/admin/dashboard" element={
                  <Suspense fallback={<PageLoader />}>
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  </Suspense>
                } />
                <Route path="/admin/add-product" element={
                  <Suspense fallback={<PageLoader />}>
                    <ProtectedRoute>
                      <AdminAddProduct />
                    </ProtectedRoute>
                  </Suspense>
                } />
                <Route path="/admin/sales-tracker" element={
                  <Suspense fallback={<PageLoader />}>
                    <ProtectedRoute>
                      <AdminSalesTracker />
                    </ProtectedRoute>
                  </Suspense>
                } />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
