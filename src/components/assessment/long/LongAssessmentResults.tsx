
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Mail, Calendar } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { DashboardData, ContactInfo } from '@/types/assessment';

interface LongAssessmentResultsProps {
  dashboardData: DashboardData | null;
  writtenAssessment: string | null;
  contactInfo: ContactInfo | null;
  isGenerating: boolean;
  onComplete: () => void;
}

const LongAssessmentResults = ({ 
  dashboardData, 
  writtenAssessment, 
  contactInfo, 
  isGenerating, 
  onComplete 
}: LongAssessmentResultsProps) => {
  if (isGenerating) {
    return (
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-8"></div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Analyzing Your Comprehensive Assessment
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Our AI is generating your personalized insights and benchmarking your responses against industry leaders...
            </p>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-gray-600">This typically takes 30-60 seconds...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const chartData = dashboardData ? [
    {
      dimension: 'Strategic Readiness',
      score: dashboardData.dimensions.strategicReadiness.score,
      industryAverage: dashboardData.dimensions.strategicReadiness.industryAverage,
      topQuartile: dashboardData.dimensions.strategicReadiness.topQuartile,
    },
    {
      dimension: 'Knowledge Mgmt',
      score: dashboardData.dimensions.knowledgeManagement.score,
      industryAverage: dashboardData.dimensions.knowledgeManagement.industryAverage,
      topQuartile: dashboardData.dimensions.knowledgeManagement.topQuartile,
    },
    {
      dimension: 'Data Infrastructure',
      score: dashboardData.dimensions.dataInfrastructure.score,
      industryAverage: dashboardData.dimensions.dataInfrastructure.industryAverage,
      topQuartile: dashboardData.dimensions.dataInfrastructure.topQuartile,
    },
    {
      dimension: 'Use Case ID',
      score: dashboardData.dimensions.useCaseIdentification.score,
      industryAverage: dashboardData.dimensions.useCaseIdentification.industryAverage,
      topQuartile: dashboardData.dimensions.useCaseIdentification.topQuartile,
    },
    {
      dimension: 'Role Capability',
      score: dashboardData.dimensions.roleSpecificCapability.score,
      industryAverage: dashboardData.dimensions.roleSpecificCapability.industryAverage,
      topQuartile: dashboardData.dimensions.roleSpecificCapability.topQuartile,
    },
    {
      dimension: 'Change Readiness',
      score: dashboardData.dimensions.changeReadiness.score,
      industryAverage: dashboardData.dimensions.changeReadiness.industryAverage,
      topQuartile: dashboardData.dimensions.changeReadiness.topQuartile,
    },
  ] : [];

  const chartConfig = {
    score: { label: "Your Score", color: "#2563eb" },
    industryAverage: { label: "Industry Average", color: "#64748b" },
    topQuartile: { label: "Top Quartile", color: "#16a34a" },
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your AI Readiness Report is Ready!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Hi {contactInfo?.first_name}, here's your comprehensive analysis
            </p>
            <p className="text-gray-500">
              Based on {dashboardData?.industryContext} | {dashboardData?.roleContext}
            </p>
          </div>

          {/* Dashboard Visualization */}
          {dashboardData && (
            <Card className="p-8 mb-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                AI Readiness Benchmarking Dashboard
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Radar
                          name="Your Score"
                          dataKey="score"
                          stroke="#2563eb"
                          fill="#2563eb"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                        <Radar
                          name="Industry Average"
                          dataKey="industryAverage"
                          stroke="#64748b"
                          fill="transparent"
                          strokeWidth={1}
                          strokeDasharray="5 5"
                        />
                        <Radar
                          name="Top Quartile"
                          dataKey="topQuartile"
                          stroke="#16a34a"
                          fill="transparent"
                          strokeWidth={1}
                          strokeDasharray="3 3"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {dashboardData.overallScore}%
                    </div>
                    <p className="text-gray-600">Overall AI Readiness Score</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Strengths</h3>
                    <ul className="space-y-2">
                      {dashboardData.keyStrengths.map((strength, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Top Opportunities</h3>
                    <ul className="space-y-2">
                      {dashboardData.topOpportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Written Assessment */}
          {writtenAssessment && (
            <Card className="p-8 mb-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Personalized AI Strategy Insights
              </h2>
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {writtenAssessment}
                </div>
              </div>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Turn Insights Into Action?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Schedule a complimentary 30-minute Discovery Session to discuss your specific AI roadmap and implementation strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Discovery Session
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email My Report
              </Button>
            </div>
          </Card>

          {/* Navigation */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={onComplete}
              className="px-8"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongAssessmentResults;
