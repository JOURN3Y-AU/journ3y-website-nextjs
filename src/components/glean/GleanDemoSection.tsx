'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import useScrollReveal from '@/hooks/useScrollReveal';

interface GleanDemoSectionProps {
  onFormSubmitSuccess: () => void;
}

const GleanDemoSection = ({ onFormSubmitSuccess }: GleanDemoSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
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
      onFormSubmitSuccess();
      
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
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={section4Ref} className="reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-6">See Glean in Action with JOURN3Y</h2>
            <p className="text-gray-700 mb-6">
              Schedule a personalized demo with JOURN3Y's Authorized Glean specialists to see how our proven implementation approach can transform knowledge work at your organization.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Authorized partner implementation expertise</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Certified Glean implementation methodology</span>
              </div>
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
  );
};

export default GleanDemoSection;
