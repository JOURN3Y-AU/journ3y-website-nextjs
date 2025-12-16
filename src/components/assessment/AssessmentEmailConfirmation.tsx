
import { CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ContactInfo } from '@/types/assessment';

interface AssessmentEmailConfirmationProps {
  contactInfo: ContactInfo | null;
}

const AssessmentEmailConfirmation = ({ contactInfo }: AssessmentEmailConfirmationProps) => {
  return (
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
  );
};

export default AssessmentEmailConfirmation;
