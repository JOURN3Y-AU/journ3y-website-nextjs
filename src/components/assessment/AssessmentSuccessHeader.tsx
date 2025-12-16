
import { CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ContactInfo } from '@/types/assessment';

interface AssessmentSuccessHeaderProps {
  contactInfo: ContactInfo | null;
  completionTime: number | null;
}

const AssessmentSuccessHeader = ({ contactInfo, completionTime }: AssessmentSuccessHeaderProps) => {
  return (
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
  );
};

export default AssessmentSuccessHeader;
