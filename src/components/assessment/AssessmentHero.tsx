'use client'

import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';

interface AssessmentHeroProps {
  onStartAssessment: () => void;
}

const AssessmentHero = ({ onStartAssessment }: AssessmentHeroProps) => {
  const heroRef = useScrollReveal();

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div ref={heroRef} className="reveal transition-all duration-500 ease-out">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <span>🤖 Free AI Readiness Assessment</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
              Find out where{' '}
              <span className="text-blue-600">AI could help</span>{' '}
              your business
            </h1>
            
            <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              Take our 2-minute assessment and discover where your company could put AI to work. 
              Get personalised insights on your biggest opportunities for AI-powered growth.
            </p>

            <div className="bg-white rounded-lg p-8 shadow-lg border border-blue-100 mb-10 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                What You'll Receive:
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Personalized AI readiness score</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Industry benchmark comparison</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Tailored recommendations</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Strategic implementation insights</span>
                </div>
              </div>
            </div>

            <Button
              onClick={onStartAssessment}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 text-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Start Assessment
            </Button>
            
            <p className="text-sm text-gray-600 mt-4">
              Takes 2 minutes • No credit card required • Instant results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentHero;
