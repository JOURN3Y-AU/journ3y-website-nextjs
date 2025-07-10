
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Award, Target } from 'lucide-react';

interface LongAssessmentHeroProps {
  onStartAssessment: () => void;
}

const LongAssessmentHero = ({ onStartAssessment }: LongAssessmentHeroProps) => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Hero Content */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete AI Readiness Assessment
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Get comprehensive insights into your organization's AI potential. This detailed assessment provides in-depth analysis comparing your readiness against industry leaders in your sector.
            </p>
            
            {/* Time and Value Indicators */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-blue-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Estimated time: 7-10 minutes</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-green-600">
                <Award className="w-5 h-5" />
                <span className="font-medium">Professional consulting-grade analysis</span>
              </div>
            </div>
          </div>

          {/* Value Proposition Card */}
          <Card className="p-8 mb-12 bg-white shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                What You'll Receive
              </h3>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Receive a personalized AI readiness report with visual benchmarking dashboard and detailed strategic recommendations
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Visual Dashboard</h4>
                <p className="text-sm text-gray-600">Interactive radar chart comparing your scores against industry benchmarks</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Strategic Report</h4>
                <p className="text-sm text-gray-600">Detailed written analysis with role-specific recommendations</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Action Plan</h4>
                <p className="text-sm text-gray-600">Practical next steps tailored to your organization's readiness</p>
              </div>
            </div>
          </Card>


          {/* CTA Button */}
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Comprehensive Assessment
          </Button>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="text-gray-400 font-medium">Professional Services</span>
              <span className="text-gray-400 font-medium">Manufacturing</span>
              <span className="text-gray-400 font-medium">Healthcare</span>
              <span className="text-gray-400 font-medium">Financial Services</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongAssessmentHero;
