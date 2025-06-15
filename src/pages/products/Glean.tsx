
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Search, Zap, Shield, SquarePen, Users, TrendingUp, Database, Brain, Workflow } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import useScrollReveal from '@/hooks/useScrollReveal';

const Glean = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { toast } = useToast();
  
  const section1Ref = useScrollReveal();
  const section2Ref = useScrollReveal();
  const section3Ref = useScrollReveal();
  const section4Ref = useScrollReveal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        service: 'glean-consultation',
        campaign_source: 'glean_product_page',
        message: `${formData.message}\n\n--- Service Request ---\nService: Glean Implementation\nSource: Product Page`
      };

      console.log('Submitting data:', submissionData);

      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: submissionData
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Success response:', data);
      setShowThankYou(true);
      
      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 24 hours to discuss your Glean implementation.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                <span>Authorized Glean Partner</span>
              </div>
              
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Transform Your Business with
                <span className="block text-blue-600">Glean's Enterprise AI</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8">
                Unlock the power of AI across your organization with Glean's unified work AI platform. Find, create, and automate anything with enterprise-grade security.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="#demo">Schedule Demo</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="#features">Learn More</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>100+ Integrations</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="/Marketecture-diagram.png"
                alt="Glean AI Platform Architecture"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div ref={section1Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Three Pillars of Glean's Work AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Glean combines search, creation, and automation in one unified platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Find & Understand</h3>
              <p className="text-gray-600 mb-4">
                Search across all your company's apps, documents, and data sources with AI-powered contextual results.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Universal search across 100+ apps</li>
                <li>• Personalized, contextual results</li>
                <li>• Permissions-aware security</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <SquarePen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Create & Summarize</h3>
              <p className="text-gray-600 mb-4">
                Generate content, summarize documents, and create presentations with your company's knowledge.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• AI-powered content creation</li>
                <li>• Brand-safe and compliant</li>
                <li>• Context from your data</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Automate Work</h3>
              <p className="text-gray-600 mb-4">
                Build AI agents to automate repetitive tasks and workflows across your organization.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Low-code agent builder</li>
                <li>• Process automation</li>
                <li>• Workflow integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={section2Ref} className="reveal transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold mb-6">Your Enterprise AI Platform</h2>
              <p className="text-gray-700 mb-6">
                Glean connects all your company's information and makes it instantly accessible with powerful AI capabilities that understand context and deliver precisely what you need.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Universal Knowledge Graph</h3>
                    <p className="text-gray-600">Connects and understands relationships between all your company's data and documents.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contextual AI</h3>
                    <p className="text-gray-600">AI that understands your role, permissions, and what's relevant to your work.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Enterprise Security</h3>
                    <p className="text-gray-600">SOC 2 compliant with advanced permissions and data governance controls.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-first lg:order-last">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                alt="Glean Platform Dashboard"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={section3Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Connect Your Entire Tech Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Glean integrates with 100+ business applications to create a unified knowledge layer
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              'Slack', 'Microsoft 365', 'Google Workspace', 'Confluence',
              'Jira', 'Notion', 'Salesforce', 'GitHub',
              'Figma', 'Dropbox', 'Box', 'SharePoint'
            ].map((app, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center border hover:shadow-md transition-shadow">
                <p className="font-medium text-gray-800">{app}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">And 90+ more integrations available</p>
            <Button variant="outline">
              View All Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Proven Enterprise Results</h2>
            <p className="text-xl text-gray-600">Companies using Glean see immediate productivity gains</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">75%</div>
              <p className="text-gray-700 font-medium">Less time searching for information</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">3x</div>
              <p className="text-gray-700 font-medium">Faster knowledge discovery</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">90%</div>
              <p className="text-gray-700 font-medium">User adoption rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form Section */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={section4Ref} className="reveal transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold mb-6">See Glean in Action</h2>
              <p className="text-gray-700 mb-6">
                Schedule a personalized demo to see how Glean can transform knowledge work at your organization.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>30-minute personalized demo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>ROI analysis for your organization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Implementation roadmap discussion</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 border">
              <h3 className="text-2xl font-bold mb-6">Request Your Demo</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Business Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Tell us about your needs</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company size, current challenges, timeline..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {isSubmitting ? 'Submitting...' : 'Schedule Demo'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thank You!</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Demo Request Received</h2>
            <p className="text-gray-600 mb-6">
              Our Glean specialist will contact you within 24 hours to schedule your personalized demo.
            </p>
            <Button 
              onClick={() => setShowThankYou(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Glean;
