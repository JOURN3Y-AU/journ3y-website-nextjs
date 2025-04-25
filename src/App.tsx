
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blueprint from "./pages/products/Blueprint";
import Catalyst from "./pages/products/Catalyst";
import Synapse from "./pages/products/Synapse";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const App = () => {
  // Initialize scroll reveal on page transitions
  useEffect(() => {
    const reveal = () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((element) => {
        element.classList.add('transition-all', 'duration-700', 'ease-out');
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
        });
        
        observer.observe(element);
      });
    };
    
    // Run on initial load
    reveal();
    
    // Setup for route changes
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
      
      // Small delay to let new DOM elements render
      setTimeout(reveal, 100);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products/blueprint" element={<Blueprint />} />
                <Route path="/products/catalyst" element={<Catalyst />} />
                <Route path="/products/synapse" element={<Synapse />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
