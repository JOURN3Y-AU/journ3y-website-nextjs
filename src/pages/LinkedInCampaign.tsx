import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Users, TrendingUp, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

const LinkedInCampaign = () => {
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
        service: 'linkedin-consultation',
        campaign_source: 'linkedin',
        utm_params: utmParams,
        message: `${formData.message}\n\n--- Campaign Data ---\nSource: LinkedIn Campaign\nUTM Parameters: ${JSON.stringify(utmParams, null, 2)}`
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
        window.lintrk('track', { conversion_id: 'linkedin_consultation_request' });
      }
      
      // Create conversion tracking parameters
      const conversionParams = new URLSearchParams({
        ...utmParams, // Preserve original UTM parameters
        conversion: 'linkedin_consultation',
        status: 'success'
      });
      
      // Navigate to home page with conversion tracking parameters
      navigate(`/?${conversionParams.toString()}`);
      setShowThankYou(true);
      
      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your consultation.",
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
      <div className="min-h-screen bg-gradient-to-br from-journey-purple/5 to-journey-blue/5">
        {/* Header */}
        <header className="py-4 px-4">
          <div className="container mx-auto">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-journey-purple to-journey-blue bg-clip-text text-transparent">
                JOURN3Y
              </span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Value Proposition */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Get Your AI Transformation Roadmap
                  <span className="block text-journey-purple">Free 1-Hour Strategy Session</span>
                </h1>
                
                <p className="text-xl text-gray-700 mb-8">
                  Discover how AI can drive real impact in your business with our expert consultation. No sales pitch, just genuine value.
                </p>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-6 h-6 text-journey-purple mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Personalized AI Strategy Assessment</h3>
                      <p className="text-gray-600">Tailored analysis of your business's AI opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-journey-purple mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Identify Quick Wins & Long-term Goals</h3>
                      <p className="text-gray-600">Practical steps you can implement immediately</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-journey-purple mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Expert Guidance from AI Specialists</h3>
                      <p className="text-gray-600">Direct access to our experienced AI consultants</p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-white/50 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Limited Availability:</strong> We only offer 20 free consultations per month
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>No Commitment Required:</strong> This is a genuine value-first approach
                  </p>
                </div>
              </div>

              {/* Right Column - Lead Capture Form */}
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-2">Book Your Free Consultation</h2>
                <p className="text-gray-600 mb-6">Takes less than 2 minutes to complete</p>
                
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
                    <Label htmlFor="message">What AI challenges are you facing? (Optional)</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-journey-purple focus:border-transparent"
                      placeholder="Tell us about your current challenges or goals..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-journey-purple to-journey-blue text-white py-6 text-lg font-semibold"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book My Free Consultation'}
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By submitting this form, you agree to receive communication from JOURN3Y regarding your consultation request.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Get Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">What You'll Get in Your Free Consultation</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-journey-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-journey-purple" />
                </div>
                <h3 className="font-semibold mb-2">AI Readiness Assessment</h3>
                <p className="text-gray-600">Evaluate your current technology stack and identify AI integration opportunities</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-journey-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-journey-blue" />
                </div>
                <h3 className="font-semibold mb-2">Strategic Roadmap</h3>
                <p className="text-gray-600">Receive a customized 90-day action plan with prioritized AI initiatives</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-journey-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-journey-purple" />
                </div>
                <h3 className="font-semibold mb-2">Expert Recommendations</h3>
                <p className="text-gray-600">Get specific tool recommendations and implementation strategies from our AI specialists</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-journey-purple to-journey-blue text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business with AI?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the businesses that are already leveraging AI for competitive advantage.
            </p>
            <p className="text-lg mb-8">
              <strong>Limited Time:</strong> Free consultations available this month only
            </p>
            <Button 
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="bg-white text-journey-purple border-white hover:bg-gray-100 py-6 px-8 text-lg"
            >
              Book Your Free Consultation Now
            </Button>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-8 bg-gray-50 text-center">
          <div className="container mx-auto px-4">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Journey AI. All rights reserved. | 
              <a href="/privacy" className="text-journey-purple hover:underline ml-1">Privacy Policy</a>
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
              Your consultation request has been received. Our AI strategy expert will contact you within 24 hours to schedule your free 1-hour session.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Check your email for confirmation details.
            </p>
            <Button 
              onClick={() => setShowThankYou(false)}
              className="w-full bg-gradient-to-r from-journey-purple to-journey-blue text-white"
            >
              Continue Browsing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LinkedInCampaign;
