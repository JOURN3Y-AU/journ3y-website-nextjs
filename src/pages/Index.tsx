import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AINetwork from '@/components/animations/AINetwork';
import useScrollReveal from '@/hooks/useScrollReveal';
import { Lightbulb, Rocket, Target } from 'lucide-react';

const Index = () => {
  // Animation refs
  const heroRef = useScrollReveal();
  const featureRef1 = useScrollReveal();
  const featureRef2 = useScrollReveal();
  const featureRef3 = useScrollReveal();
  const productSectionRef = useScrollReveal();
  const blogSectionRef = useScrollReveal();

  return (
    <>
      {/* Hero Section */}
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
              JOURN3Y provides consulting and solutions to take your business from AI ambition to reality
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-gradient-to-r from-journey-purple to-journey-blue text-white py-6 px-8 text-lg">
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="border-journey-purple text-journey-purple py-6 px-8 text-lg">
                <Link to="/products/blueprint">Learn More</Link>
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

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 tracking-tight">We've been in your chair</h2>
          <h3 className="text-xl font-semibold text-center mb-16 tracking-tight">We understand the AI challenges you are facing... and what to do about them</h3>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div ref={featureRef1} className="reveal transition-all duration-500 ease-out">
              <div className="bg-white rounded-lg p-8 shadow-sm h-full border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-journey-purple/20 to-journey-blue/20 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-journey-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">Planning & Prioritisation</h3>
                <p className="text-gray-600">
                  With endless AI possibilities but limited resources, how do you identify which opportunities will actually deliver meaningful ROI?
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div ref={featureRef2} className="reveal transition-all duration-500 ease-out reveal-delay-200">
              <div className="bg-white rounded-lg p-8 shadow-sm h-full border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-journey-purple/20 to-journey-blue/20 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-journey-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">Thinking big... starting small</h3>
                <p className="text-gray-600">
                  How do you demonstrate AI value quickly without massive upfront investments or lengthy implementation cycles?
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div ref={featureRef3} className="reveal transition-all duration-500 ease-out reveal-delay-400">
              <div className="bg-white rounded-lg p-8 shadow-sm h-full border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-journey-purple/20 to-journey-blue/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-journey-dark-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">Focus on relavance</h3>
                <p className="text-gray-600">
                  How do you ensure AI solutions actually address your specific business context instead of forcing generic approaches that miss the mark?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div ref={productSectionRef} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Our AI Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of specialized AI products designed to meet your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Blueprint */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-journey-purple/90 to-journey-blue/90 flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2 tracking-tight">Blueprint</h3>
                <p className="text-gray-600 mb-4">
                  Strategic AI roadmapping and business transformation planning.
                </p>
                <Button asChild variant="outline" className="w-full justify-center border-journey-purple text-journey-purple hover:bg-journey-purple/10">
                  <Link to="/products/blueprint">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Catalyst */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-journey-blue/90 to-journey-dark-blue/90 flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2 tracking-tight">Catalyst</h3>
                <p className="text-gray-600 mb-4">
                  AI-powered analytics and decision-making acceleration platform.
                </p>
                <Button asChild variant="outline" className="w-full justify-center border-journey-blue text-journey-blue hover:bg-journey-blue/10">
                  <Link to="/products/catalyst">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Synapse */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-journey-dark-purple/90 to-journey-purple/90 flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2 tracking-tight">Synapse</h3>
                <p className="text-gray-600 mb-4">
                  Neural network-based automation for enterprise workflows.
                </p>
                <Button asChild variant="outline" className="w-full justify-center border-journey-dark-purple text-journey-dark-purple hover:bg-journey-dark-purple/10">
                  <Link to="/products/synapse">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog/Resources Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={blogSectionRef} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Latest Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest AI trends, white papers, and industry insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                alt="AI Technology" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="text-sm text-gray-500 mb-2">May 15, 2023</div>
                <h3 className="text-xl font-semibold mb-2 hover:text-journey-purple transition-colors tracking-tight">
                  <Link to="/blog/understanding-ai">Understanding AI Integration In Modern Businesses</Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore how businesses are leveraging AI to transform operations and improve customer experiences.
                </p>
                <Link to="/blog/understanding-ai" className="text-journey-purple font-medium hover:underline">
                  Read More →
                </Link>
              </CardContent>
            </Card>
            
            {/* Blog Post 2 */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="AI Business Strategy" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="text-sm text-gray-500 mb-2">April 28, 2023</div>
                <h3 className="text-xl font-semibold mb-2 hover:text-journey-purple transition-colors tracking-tight">
                  <Link to="/blog/ai-strategy">Building an Effective AI Strategy For Your Business</Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how to develop a comprehensive AI strategy that aligns with your business goals.
                </p>
                <Link to="/blog/ai-strategy" className="text-journey-purple font-medium hover:underline">
                  Read More →
                </Link>
              </CardContent>
            </Card>
            
            {/* White Paper */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow bg-gradient-to-br from-journey-purple/10 to-journey-blue/10">
              <div className="p-6">
                <div className="text-sm font-medium text-journey-purple mb-2">FEATURED WHITE PAPER</div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">The Future of AI in Business: Trends and Predictions</h3>
                <p className="text-gray-600 mb-6">
                  This comprehensive white paper examines emerging AI trends and how they will shape business operations in the coming years.
                </p>
                <Button asChild className="w-full justify-center bg-gradient-to-r from-journey-purple to-journey-blue text-white">
                  <Link to="/resources/future-ai-whitepaper">Download White Paper</Link>
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-journey-purple text-journey-purple hover:bg-journey-purple/10">
              <Link to="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-journey-purple to-journey-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to Transform Your Business with AI?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation and discover how our AI solutions can drive growth for your business.
          </p>
          <Button asChild variant="secondary" size="lg" className="px-8 py-6 text-lg bg-white text-journey-purple hover:bg-gray-100">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
