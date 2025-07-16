
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnnouncementOverlay from '@/components/AnnouncementOverlay';
import { useAnnouncement } from '@/hooks/useAnnouncement';
import useScrollToTop from '@/hooks/useScrollToTop';
import Index from '@/pages/Index';
import Blueprint from '@/pages/products/Blueprint';
import Glean from '@/pages/products/Glean';
import Brand3y from '@/pages/products/Brand3y';
import Services from '@/pages/products/Services';
import AIAssessment from '@/pages/products/AIAssessment';
import AIAssessmentLongV2 from '@/pages/products/AIAssessmentLongV2';
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
import DocumentProxy from '@/pages/DocumentProxy';


function AppContent() {
  const { showAnnouncement, dismissAnnouncement, loading } = useAnnouncement();
  
  // Apply scroll to top on all route changes
  useScrollToTop();

  console.log('App component - announcement state:', { showAnnouncement, loading });

  return (
    <>
      <Routes>
        <Route path="/" element={<><Navbar /><Index /><Footer /></>} />
        <Route path="/products/blueprint" element={<><Navbar /><Blueprint /><Footer /></>} />
        <Route path="/products/glean" element={<><Navbar /><Glean /><Footer /></>} />
        <Route path="/products/brand3y" element={<><Navbar /><Brand3y /><Footer /></>} />
        <Route path="/products/services" element={<><Navbar /><Services /><Footer /></>} />
        <Route path="/products/ai-assessment" element={<><Navbar /><AIAssessment /><Footer /></>} />
        <Route path="/products/ai-assessment-full" element={<><Navbar /><AIAssessmentLongV2 /><Footer /></>} />
        <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
        <Route path="/blog/:slug" element={<><Navbar /><BlogPost /><Footer /></>} />
        <Route path="/resources" element={<><Navbar /><Resources /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/privacy" element={<><Navbar /><Privacy /><Footer /></>} />
        <Route path="/team" element={<><Navbar /><Team /><Footer /></>} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/documents/:filename" element={<DocumentProxy />} />
        
        {/* LinkedIn Campaign Landing Page - No nav/footer for conversion optimization */}
        <Route path="/linkedin-campaign" element={<LinkedInCampaign />} />
        <Route path="/linkedin-glean" element={<LinkedInGlean />} />
        <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
      </Routes>
      
      {!loading && (
        <AnnouncementOverlay 
          isOpen={showAnnouncement}
          onClose={dismissAnnouncement}
        />
      )}
      
      <Toaster />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
