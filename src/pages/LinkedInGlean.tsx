import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Users, TrendingUp, X, Search, Zap, Shield, square-pen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

const LinkedInGlean = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  // Capture UTM parameters on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
      const value = urlParams.get(param);
      if (value) params[param] = value;
    });
    
    setUtmParams(params);
  }, []);

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
      // Include UTM parameters and campaign source in the submission
      const submissionData = {
        ...formData,
        service: 'glean-consultation',
        campaign_source: 'linkedin_glean',
        utm_params: utmParams,
        message: `${formData.message}\n\n--- Campaign Data ---\nSource: LinkedIn Glean Campaign\nUTM Parameters: ${JSON.stringify(utmParams, null, 2)}`
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

      // Fire LinkedIn conversion event
      if (window.lintrk) {
        window.lintrk('track', { conversion_id: 'glean_consultation_request' });
      }
      
      // Create conversion tracking parameters
      const conversionParams = new URLSearchParams({
        ...utmParams, // Preserve original UTM parameters
        conversion: 'glean_consultation',
        status: 'success'
      });
      
      // Navigate to home page with conversion tracking parameters
      navigate(`/?${conversionParams.toString()}`);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="py-4 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold bg-gradient-to-r from-journey-purple to-journey-blue bg-clip-text text-transparent">
                JOURN3Y
              </span>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Authorized Glean Partner</span>
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Value Proposition */}
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Zap className="w-4 h-4" />
                    <span>Glean Enterprise Search</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Transform Your Business with
                  <span className="block text-blue-600">with Glean's Enterprise AI platform</span>
                </h1>
                
                <p className="text-xl text-gray-700 mb-8">
                  As an authorized Glean partner, we help enterprises securely unlock the power of AI.
                </p>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <Search className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Unified Knowledge Discovery</h3>
                      <p className="text-gray-600">Access data and insights across all your apps, documents, and data sources with AI-powered results</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <square-pen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Your Enterprise AI tool</h3>
                      <p className="text-gray-600">Enable your employees to safely leverage generative AI - report writing, emails, marketing copy, research  </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Evolve from prompts to Agents</h3>
                      <p className="text-gray-600">Automate the tasks that prevent your teams doing real work with Glean's Low-code agent builder</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Expert Implementation Support</h3>
                      <p className="text-gray-600">Get dedicated support from certified Glean implementation specialists</p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-white/70 rounded-lg p-6 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Trusted by Fortune 500:</strong> Join companies like Databricks, Slack, and others
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Certified Partner:</strong> Official Glean implementation and support partner
                  </p>
                </div>
              </div>

              {/* Right Column - Lead Capture Form */}
              <div className="bg-white rounded-lg shadow-xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold mb-2">Get Your Glean Implementation Quote</h2>
                <p className="text-gray-600 mb-6">Speak with a Glean specialist about your enterprise search needs</p>
                
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
                    <Label htmlFor="message">Tell us about your search challenges (Optional)</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How many employees? What tools do you currently use for search?"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Glean Implementation Quote'}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By submitting this form, you agree to receive communication from JOURN3Y regarding Glean implementation services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Glean Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose Glean for Enterprise Search?</h2>
            <p className="text-center text-gray-600 mb-12">Glean's AI-powered platform transforms how your team finds and uses knowledge</p>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              {/* Left side - Image */}
              <div className="order-2 lg:order-1">
                <img 
                  src="https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/6718cd1f5b19546b977e26ae_Frame%203.webp"
                  alt="Glean AI-powered search interface"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              {/* Right side - Features */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="flex items-start space-x-3">
                  <Search className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Universal Search</h3>
                    <p className="text-gray-600">Search across 100+ apps including Slack, Confluence, Google Drive, Notion, and more</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">AI-Powered Results</h3>
                    <p className="text-gray-600">Get personalized, contextual results powered by machine learning and natural language processing</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Enterprise Security</h3>
                    <p className="text-gray-600">Maintain data privacy and security with permissions-aware search and SOC 2 compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Process Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Glean Implementation Process</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Discovery</h3>
                <p className="text-gray-600 text-sm">Assess your current search challenges and data sources</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Planning</h3>
                <p className="text-gray-600 text-sm">Design custom implementation strategy and timeline</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Deployment</h3>
                <p className="text-gray-600 text-sm">Configure Glean with your data sources and permissions</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Training</h3>
                <p className="text-gray-600 text-sm">Train your team and provide ongoing support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Enterprise Search?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join leading companies that have revolutionized knowledge discovery with Glean.
            </p>
            <p className="text-lg mb-8">
              <strong>Limited Time:</strong> Free implementation assessment for qualified enterprises
            </p>
            <Button 
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="bg-white text-blue-600 border-white hover:bg-gray-100 py-6 px-8 text-lg"
            >
              Get Your Glean Quote Now
            </Button>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-8 bg-gray-50 text-center">
          <div className="container mx-auto px-4">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Journey AI - Authorized Glean Partner. All rights reserved. | 
              <a href="/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>
            </p>
          </div>
        </footer>
      </div>

      {/* Thank You Dialog Overlay */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="sr-only">Thank You</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setShowThankYou(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your Glean implementation request has been received. Our certified Glean specialist will contact you within 24 hours to discuss your enterprise search needs.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Check your email for confirmation details.
            </p>
            <Button 
              onClick={() => setShowThankYou(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue Browsing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LinkedInGlean;
