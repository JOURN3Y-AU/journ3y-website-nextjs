
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle, Calendar, Mail } from 'lucide-react';
import { ContactInfo } from '@/pages/products/AIAssessment';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AssessmentResultsProps {
  assessmentResult: string | null;
  contactInfo: ContactInfo | null;
  isGenerating: boolean;
  onComplete: () => void;
}

const AssessmentResults = ({ 
  assessmentResult, 
  contactInfo, 
  isGenerating, 
  onComplete 
}: AssessmentResultsProps) => {
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [isBookingCall, setIsBookingCall] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (assessmentResult && !isGenerating) {
      setCompletionTime(Math.round((Date.now() - startTime) / 1000));
      // Scroll to top when results are displayed
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [assessmentResult, isGenerating, startTime]);

  const handleBookStrategyCall = async () => {
    if (!contactInfo) {
      toast({
        title: "Error",
        description: "Contact information is missing.",
        variant: "destructive",
      });
      return;
    }

    setIsBookingCall(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: `${contactInfo.first_name} ${contactInfo.last_name}`,
          email: contactInfo.email,
          company: contactInfo.company_name,
          phone: contactInfo.phone_number || 'Not provided',
          message: `Hi, I've just completed the AI Readiness Assessment and would like to book a complimentary 30-minute strategy call to discuss my AI transformation opportunities.

Company: ${contactInfo.company_name}
Contact: ${contactInfo.first_name} ${contactInfo.last_name}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone_number || 'Not provided'}

I'm interested in discussing how AI can help my business based on the assessment results I just received.`,
          service: 'general',
          campaign_source: 'ai-assessment'
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Request Sent!",
        description: "Your strategy call request has been sent. We'll contact you within 24 hours to schedule your meeting.",
      });

    } catch (error) {
      console.error('Error sending strategy call request:', error);
      toast({
        title: "Error",
        description: "Failed to send your request. Please try again or contact us directly at info@journ3y.com.au",
        variant: "destructive",
      });
    } finally {
      setIsBookingCall(false);
    }
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {isGenerating ? (
            <Card className="p-8 shadow-lg text-center">
              <div className="mb-6">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Analyzing Your Responses
                </h2>
                <p className="text-gray-600">
                  Our AI is generating personalized insights based on your assessment...
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          ) : (
            <div className="space-y-8">
              
              {/* Success Header */}
              <Card className="p-8 shadow-lg text-center bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Your AI Readiness Assessment is Complete!
                </h2>
                <p className="text-gray-600 mb-4">
                  Hi {contactInfo?.first_name}, here are your personalized insights
                </p>
                {completionTime && (
                  <p className="text-sm text-gray-500">
                    Assessment completed in {completionTime} seconds
                  </p>
                )}
              </Card>

              {/* Assessment Results */}
              <Card className="p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Your Personalized AI Readiness Report
                </h3>
                
                <div className="prose prose-lg max-w-none">
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
                    {assessmentResult && (
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {assessmentResult}
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Next Steps */}
              <Card className="p-8 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Take the Next Step?
                  </h3>
                  <p className="text-blue-100 mb-6 text-lg">
                    Book a complimentary 30-minute strategy call with our AI transformation experts 
                    to discuss your specific opportunities and create a tailored implementation roadmap.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                      onClick={handleBookStrategyCall}
                      disabled={isBookingCall}
                    >
                      {isBookingCall ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Book Strategy Call
                        </>
                      )}
                    </Button>
                    
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 transition-colors"
                      onClick={onComplete}
                    >
                      Continue to JOURN3Y
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Email Confirmation */}
              <Card className="p-6 shadow-lg bg-green-50 border-green-200">
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">
                    Your detailed assessment has been sent to {contactInfo?.email}
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Check your inbox for the complete report and next steps
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AssessmentResults;
