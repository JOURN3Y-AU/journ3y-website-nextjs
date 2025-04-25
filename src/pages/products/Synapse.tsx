
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';

const Synapse = () => {
  const section1Ref = useScrollReveal();
  const section2Ref = useScrollReveal();
  const section3Ref = useScrollReveal();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-journey-dark-purple/10 to-journey-purple/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Synapse</h1>
            <p className="text-xl text-gray-700 mb-8">
              Neural network-based automation for enterprise workflows that streamlines operations and reduces manual tasks.
            </p>
            <Button className="bg-gradient-to-r from-journey-dark-purple to-journey-purple text-white">
              <Link to="/contact">Explore Synapse</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={section1Ref} className="reveal transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold mb-6">What is Synapse?</h2>
              <p className="text-gray-700 mb-4">
                Synapse is our AI-powered workflow automation platform that uses neural networks to learn and optimize your business processes.
              </p>
              <p className="text-gray-700">
                By analyzing patterns in your current operations, Synapse identifies repetitive tasks, suggests automation opportunities, and implements intelligent workflows that adapt to changing conditions.
              </p>
            </div>
            <div className="order-first md:order-last">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-journey-dark-purple to-journey-purple opacity-30 blur-sm"></div>
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" 
                  alt="Neural Networks" 
                  className="relative rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={section2Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Synapse Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Intelligent automation that grows with your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-purple/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Process Discovery</h3>
              <p className="text-gray-600">
                Automatically identify repetitive tasks and inefficiencies across your organization.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-dark-purple/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-dark-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Intelligent Automation</h3>
              <p className="text-gray-600">
                Create smart workflows that adapt to changing conditions and learn from outcomes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-purple/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">No-Code Integration</h3>
              <p className="text-gray-600">
                Connect Synapse to your existing tools and systems without complex coding requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={section3Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Synapse in Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how businesses use Synapse to transform their operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-journey-purple/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Finance Department</h3>
              </div>
              <p className="text-gray-600 mb-4">
                A global financial services company automated their invoice processing and reconciliation using Synapse, reducing processing time by 78% and errors by 92%.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-journey-purple mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Automated invoice processing and matching
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-journey-purple mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Exception handling with AI recommendations
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-journey-purple mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Real-time reporting and analytics
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-journey-dark-purple/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-journey-dark-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Human Resources</h3>
              </div>
              <p className="text-gray-600 mb-4">
                A technology company streamlined their recruitment process with Synapse, reducing time-to-hire by 65% and improving candidate experience.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-journey-dark-purple mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Resume screening and candidate ranking
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-journey-dark-purple mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Automated interview scheduling
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-journey-dark-purple mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Personalized candidate communication
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-journey-dark-purple/90 to-journey-purple/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Workflows?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a demonstration to see how Synapse can transform your business operations.
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-white text-journey-purple hover:bg-gray-100">
            <Link to="/contact">Book a Demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Synapse;
