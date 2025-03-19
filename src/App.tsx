
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loaded pages for better performance
const About = lazy(() => import("./pages/About"));
const OurFarm = lazy(() => import("./pages/OurFarm"));
const Products = lazy(() => import("./pages/Products"));
const Sustainability = lazy(() => import("./pages/Sustainability"));
const CSR = lazy(() => import("./pages/CSR"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));

// Loading spinner for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/our-farm" element={<OurFarm />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/csr" element={<CSR />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
