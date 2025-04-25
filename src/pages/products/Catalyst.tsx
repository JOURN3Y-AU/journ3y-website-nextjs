
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';

const Catalyst = () => {
  const section1Ref = useScrollReveal();
  const section2Ref = useScrollReveal();
  const section3Ref = useScrollReveal();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-journey-blue/10 to-journey-dark-blue/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Catalyst</h1>
            <p className="text-xl text-gray-700 mb-8">
              AI-powered analytics and decision-making acceleration platform that transforms your data into actionable insights.
            </p>
            <Button className="bg-gradient-to-r from-journey-blue to-journey-dark-blue text-white">
              <Link to="/contact">Request a Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-first md:order-last">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-journey-blue to-journey-dark-blue opacity-30 blur-sm"></div>
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80" 
                  alt="Data Analytics" 
                  className="relative rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
            <div ref={section1Ref} className="reveal transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold mb-6">What is Catalyst?</h2>
              <p className="text-gray-700 mb-4">
                Catalyst is our AI-powered analytics platform that uses machine learning to transform your business data into actionable insights and predictions.
              </p>
              <p className="text-gray-700">
                By analyzing patterns across your organization's data, Catalyst identifies opportunities, predicts outcomes, and recommends optimizations to accelerate your decision-making process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={section2Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Catalyst Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock the full potential of your data with our advanced analytics platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-blue/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">Predictive Analytics</h3>
              <p className="text-gray-600">
                Forecast trends and anticipate market changes with our advanced predictive models.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-dark-blue/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">Performance Optimization</h3>
              <p className="text-gray-600">
                Identify bottlenecks and receive AI-generated recommendations for improvement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-blue/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">Natural Language Processing</h3>
              <p className="text-gray-600">
                Analyze customer feedback and communications for valuable insights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-dark-blue/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-dark-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">Secure Integration</h3>
              <p className="text-gray-600">
                Seamlessly connect with your existing data sources with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={section3Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">The Catalyst Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An intuitive interface that makes complex data accessible and actionable.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg shadow-xl">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-journey-blue to-journey-dark-blue opacity-30 blur-sm"></div>
            <img 
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80" 
              alt="Catalyst Dashboard" 
              className="relative w-full h-auto rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Real-time Analytics</h3>
                <p className="text-white/80">
                  Monitor key metrics and receive instant alerts when patterns change.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 rounded-full bg-journey-blue/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-journey-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customizable Widgets</h3>
              <p className="text-gray-600">
                Build personalized dashboards for different departments and roles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 rounded-full bg-journey-blue/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-journey-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Scheduled Reports</h3>
              <p className="text-gray-600">
                Automate regular reporting with AI-enhanced insights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 rounded-full bg-journey-blue/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-journey-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Mobile Access</h3>
              <p className="text-gray-600">
                Stay connected to your data with our responsive mobile interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-journey-blue/90 to-journey-dark-blue/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Decision-Making?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a live demo of Catalyst and see how our AI-powered analytics can transform your business.
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-white text-journey-blue hover:bg-gray-100">
            <Link to="/contact">Request a Demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Catalyst;
