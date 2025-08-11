
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AINetwork from '@/components/animations/AINetwork';
import useScrollReveal from '@/hooks/useScrollReveal';

const HeroSection = () => {
  const heroRef = useScrollReveal();

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AINetwork />
      </div>
      <div className="container mx-auto px-4 z-10">
        <div ref={heroRef} className="max-w-3xl reveal transition-all duration-700 ease-out">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-journey-purple to-journey-blue tracking-tight">
            The future is AI powered<br />
            Is your business?
          </h1>
          <p className="text-xl text-gray-700 mb-8 md:pr-12">
            JOURN3Y delivers bold business visions with AI that drives real impact.
          </p>
          <p className="text-xl text-gray-700 mb-8 md:pr-12">
            Advisory | Accelerators | Delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-gradient-to-r from-journey-purple to-journey-blue text-white py-6 px-8 text-lg">
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 text-lg border border-blue-600 flex items-center gap-2">
              <Link to="/products/glean">
                <img src="/Glean-logo.png" alt="Glean" className="w-5 h-5" />
                Get Glean
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-10 h-10 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
