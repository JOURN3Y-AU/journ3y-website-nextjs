
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Database, ChevronRight } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

const Accelerators = () => {
  const section1Ref = useScrollReveal();
  const section2Ref = useScrollReveal();
  const section3Ref = useScrollReveal();
  const section4Ref = useScrollReveal();
  const section5Ref = useScrollReveal();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-journey-blue/10 to-journey-dark-blue/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Accelerators</h1>
            <p className="text-xl text-gray-700 mb-8">
              We partner with the worlds best AI vendors and platforms to quickly deliver knowledge, Generative and Agentic AI
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
              <h2 className="text-3xl font-bold mb-6">What are Accelerators?</h2>
              <p className="text-gray-700 mb-4">
                Many of our clients want to start their AI journey fast. Rather than developing their own solutions, our Accelerator platforms allow our clients to start reaping the benefits of AI without the long startup
              </p>
              <p className="text-gray-700">
                With a focus on value, adoption, security and governance, Glean and Databricks have a proven track record of enabling a genuine AI shift in organisations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Accelerator Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={section2Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Our Accelerator Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partnering with industry leaders to deliver powerful AI-driven solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Glean.com Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-journey-blue/10 pb-2">
                <div className="w-14 h-14 rounded-full bg-journey-blue/20 flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7 text-journey-blue" />
                </div>
                <CardTitle className="text-2xl">Glean.com</CardTitle>
                <CardDescription className="text-base">
                  Enterprise search and knowledge management
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  Powerful AI-driven enterprise search that connects all your company's knowledge, making information instantly accessible across your organization.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full mt-2 flex items-center justify-between group">
                  Learn more about Glean 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>

            {/* Databricks Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-journey-dark-blue/10 pb-2">
                <div className="w-14 h-14 rounded-full bg-journey-dark-blue/20 flex items-center justify-center mb-4">
                  <Database className="h-7 w-7 text-journey-dark-blue" />
                </div>
                <CardTitle className="text-2xl">Databricks</CardTitle>
                <CardDescription className="text-base">
                  Unified data analytics platform
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  A unified analytics platform designed to help data teams solve their most challenging problems, from ETL and BI to machine learning and AI.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full mt-2 flex items-center justify-between group">
                  Learn more about Databricks
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Glean.com Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-journey-blue to-journey-dark-blue opacity-30 blur-sm"></div>
                <img 
                  src="https://images.unsplash.com/photo-1555421689-3f034debb7a6?auto=format&fit=crop&w=800&q=80" 
                  alt="Glean.com Platform" 
                  className="relative rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
            <div ref={section3Ref} className="reveal transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold mb-6">Glean.com</h2>
              <p className="text-gray-700 mb-6">
                Glean connects all your company's information and makes it instantly accessible to everyone. With powerful AI capabilities, it understands the context of your search and delivers precisely what you're looking for.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-journey-blue/10 flex items-center justify-center mr-4">
                    <Zap className="h-5 w-5 text-journey-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Unified Search</h3>
                    <p className="text-gray-600">Search across all your company apps, documents, and communications from one place.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-journey-blue/10 flex items-center justify-center mr-4">
                    <Zap className="h-5 w-5 text-journey-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Personalized Results</h3>
                    <p className="text-gray-600">AI-powered personalization delivers results tailored to your role and work context.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-journey-blue/10 flex items-center justify-center mr-4">
                    <Zap className="h-5 w-5 text-journey-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Knowledge Discovery</h3>
                    <p className="text-gray-600">Uncover insights and connections within your organization's knowledge base.</p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-8 bg-journey-blue text-white">
                <Link to="/contact">Schedule Glean Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Databricks Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-first md:order-last">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-journey-dark-blue to-journey-blue opacity-30 blur-sm"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                  alt="Databricks Platform" 
                  className="relative rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
            <div ref={section4Ref} className="reveal transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold mb-6">Databricks</h2>
              <p className="text-gray-700 mb-6">
                Databricks brings together data engineering, science, and analytics on an open, unified platform so data teams can collaborate and innovate faster. From data ingestion to machine learning deployment, Databricks simplifies the process.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-journey-dark-blue/10 flex items-center justify-center mr-4">
                    <Database className="h-5 w-5 text-journey-dark-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Lakehouse Architecture</h3>
                    <p className="text-gray-600">Combines the best of data warehouses and data lakes for full-spectrum analytics.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-journey-dark-blue/10 flex items-center justify-center mr-4">
                    <Database className="h-5 w-5 text-journey-dark-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">MLflow Integration</h3>
                    <p className="text-gray-600">End-to-end machine learning lifecycle management from experimentation to deployment.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-journey-dark-blue/10 flex items-center justify-center mr-4">
                    <Database className="h-5 w-5 text-journey-dark-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Collaborative Workspace</h3>
                    <p className="text-gray-600">Notebooks, dashboards, and tools for data teams to work together effectively.</p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-8 bg-journey-dark-blue text-white">
                <Link to="/contact">Schedule Databricks Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={section5Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Accelerate Your Business Growth</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our customers see measurable results with our accelerator products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <p className="text-5xl font-bold text-journey-blue mb-2">85%</p>
              <p className="text-gray-700">Increase in knowledge discovery efficiency</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <p className="text-5xl font-bold text-journey-blue mb-2">3.5x</p>
              <p className="text-gray-700">Faster data analysis and decision making</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <p className="text-5xl font-bold text-journey-blue mb-2">60%</p>
              <p className="text-gray-700">Reduction in time spent searching for information</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-journey-blue/90 to-journey-dark-blue/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Accelerate Your Decision-Making?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a live demo of our Accelerators and see how our AI-powered analytics can transform your business.
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-white text-journey-blue hover:bg-gray-100">
            <Link to="/contact">Request a Demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Accelerators;
