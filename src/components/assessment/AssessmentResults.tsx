
import { useState, useEffect } from 'react';
import { ContactInfo } from '@/pages/products/AIAssessment';
import AssessmentGenerating from './AssessmentGenerating';
import AssessmentSuccessHeader from './AssessmentSuccessHeader';
import AssessmentResultsDisplay from './AssessmentResultsDisplay';
import AssessmentNextSteps from './AssessmentNextSteps';
import AssessmentEmailConfirmation from './AssessmentEmailConfirmation';

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

  useEffect(() => {
    if (assessmentResult && !isGenerating) {
      setCompletionTime(Math.round((Date.now() - startTime) / 1000));
      // Scroll to top when results are displayed
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [assessmentResult, isGenerating, startTime]);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {isGenerating ? (
            <AssessmentGenerating />
          ) : (
            <div className="space-y-8">
              <AssessmentSuccessHeader 
                contactInfo={contactInfo}
                completionTime={completionTime}
              />

              <AssessmentResultsDisplay 
                assessmentResult={assessmentResult}
              />

              <AssessmentNextSteps 
                contactInfo={contactInfo}
                onComplete={onComplete}
              />

              <AssessmentEmailConfirmation 
                contactInfo={contactInfo}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AssessmentResults;
