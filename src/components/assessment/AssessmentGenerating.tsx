
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AssessmentGenerating = () => {
  return (
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
  );
};

export default AssessmentGenerating;
