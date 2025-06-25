
import { Card } from '@/components/ui/card';

interface AssessmentResultsDisplayProps {
  assessmentResult: string | null;
}

const AssessmentResultsDisplay = ({ assessmentResult }: AssessmentResultsDisplayProps) => {
  return (
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
  );
};

export default AssessmentResultsDisplay;
