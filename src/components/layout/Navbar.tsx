
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTeamPage, setShowTeamPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const fetchSiteSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'show_team_page')
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching site settings:', error);
        }
        
        setShowTeamPage(data?.value === 'true');
      } catch (error) {
        console.error('Error in fetchSiteSettings:', error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    fetchSiteSettings();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/JOURN3Y-logo.svg" 
              alt="JOURN3Y Logo" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold font-heading tracking-tight text-[#333333]">
              JOURN3Y
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-journey-purple transition-colors">
              Home
            </Link>
            <Link to="/products/blueprint" className="text-gray-700 hover:text-journey-purple transition-colors">
              Blueprint
            </Link>
            <Link to="/products/glean" className="text-gray-700 hover:text-journey-purple transition-colors relative">
              Glean
              <Sparkles className="w-3 h-3 text-journey-purple animate-pulse absolute -top-0.5 -right-4" />
            </Link>
            <Link to="/products/services" className="text-gray-700 hover:text-journey-purple transition-colors">
              Services
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-journey-purple transition-colors">
              Blog
            </Link>
            {showTeamPage && (
              <Link to="/team" className="text-gray-700 hover:text-journey-purple transition-colors">
                Team
              </Link>
            )}
            <Link to="/contact" className="text-gray-700 hover:text-journey-purple transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button asChild variant="default" className="bg-gradient-to-r from-journey-purple to-journey-blue text-white">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-3 animate-fade-in bg-white shadow-lg rounded-md">
            <Link 
              to="/" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products/blueprint" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blueprint
            </Link>
            <Link 
              to="/products/glean" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md relative"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Glean
              <Sparkles className="w-3 h-3 text-journey-purple animate-pulse absolute top-1.5 left-14" />
            </Link>
            <Link 
              to="/products/services" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            {showTeamPage && (
              <Link 
                to="/team" 
                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </Link>
            )}
            <Link 
              to="/contact" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 pb-4 px-4">
              <Button asChild variant="default" className="w-full bg-gradient-to-r from-journey-purple to-journey-blue text-white">
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
