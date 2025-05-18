import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import Blueprint from '@/pages/Blueprint';
import Accelerators from '@/pages/Accelerators';
import Services from '@/pages/Services';
import Blog from '@/pages/Blog';
import Resources from '@/pages/Resources';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import BlogPost from '@/pages/BlogPost';

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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
