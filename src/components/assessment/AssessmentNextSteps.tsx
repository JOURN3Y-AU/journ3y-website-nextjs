
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Mail, Loader2 } from 'lucide-react';
import { ContactInfo } from '@/types/assessment';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AssessmentNextStepsProps {
  contactInfo: ContactInfo | null;
  onComplete: () => void;
}

const AssessmentNextSteps = ({ contactInfo, onComplete }: AssessmentNextStepsProps) => {
  const [isBookingCall, setIsBookingCall] = useState(false);
  const { toast } = useToast();

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
  );
};

export default AssessmentNextSteps;
