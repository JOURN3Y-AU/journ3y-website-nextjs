'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AINetwork from '@/components/animations/AINetwork'
import useScrollReveal from '@/hooks/useScrollReveal'

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
            AI that works for how you work. From solo operators to large teams.
          </p>
          <p className="text-xl text-gray-700 mb-8 md:pr-12">
            Advice | Implementation | Automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-gradient-to-r from-journey-purple to-journey-blue text-white py-6 px-8 text-lg flex-1 sm:flex-none">
              <Link href="/small-business-ai">JOURN3Y AI</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-lime-400 to-lime-300 hover:from-lime-500 hover:to-lime-400 text-blue-600 py-6 px-8 text-lg border border-lime-400 flex items-center justify-center font-semibold flex-1 sm:flex-none">
              <Link href="/products/glean">
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
