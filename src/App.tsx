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
import Privacy from '@/pages/Privacy';
import NotFound from '@/pages/NotFound';
import BlogPost from '@/pages/BlogPost';
import Admin from '@/pages/Admin';
import Team from '@/pages/Team';
import LinkedInCampaign from '@/pages/LinkedInCampaign';
import LinkedInGlean from '@/pages/LinkedInGlean';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><Index /><Footer /></>} />
        <Route path="/products/blueprint" element={<><Navbar /><Blueprint /><Footer /></>} />
        <Route path="/products/accelerators" element={<><Navbar /><Accelerators /><Footer /></>} />
        <Route path="/products/services" element={<><Navbar /><Services /><Footer /></>} />
        <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
        <Route path="/blog/:slug" element={<><Navbar /><BlogPost /><Footer /></>} />
        <Route path="/resources" element={<><Navbar /><Resources /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/privacy" element={<><Navbar /><Privacy /><Footer /></>} />
        <Route path="/team" element={<><Navbar /><Team /><Footer /></>} />
        <Route path="/admin/*" element={<Admin />} />
        {/* LinkedIn Campaign Landing Page - No nav/footer for conversion optimization */}
        <Route path="/linkedin-campaign" element={<LinkedInCampaign />} />
        <Route path="/linkedin-glean" element={<LinkedInGlean />} />
        <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
