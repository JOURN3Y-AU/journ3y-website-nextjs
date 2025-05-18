
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Index from '@/pages/Index';
import Blueprint from '@/pages/products/Blueprint';
import Accelerators from '@/pages/products/Accelerators';
import Services from '@/pages/products/Services';
import Blog from '@/pages/Blog';
import Resources from '@/pages/Resources';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import BlogPost from '@/pages/BlogPost';
import Admin from '@/pages/Admin';
import Team from '@/pages/Team';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products/blueprint" element={<Blueprint />} />
        <Route path="/products/accelerators" element={<Accelerators />} />
        <Route path="/products/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
