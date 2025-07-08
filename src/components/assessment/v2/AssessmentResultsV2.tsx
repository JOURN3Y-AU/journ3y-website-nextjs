import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Calendar } from 'lucide-react';
import { DashboardDataV2, ContactInfoV2 } from '@/types/assessmentV2';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface AssessmentResultsV2Props {
  dashboardData: DashboardDataV2 | null;
  writtenAssessment: string | null;
  contactInfo: ContactInfoV2 | null;
  isGenerating: boolean;
  onComplete: () => void;
}

const AssessmentResultsV2 = ({ 
  dashboardData, 
  writtenAssessment, 
  contactInfo, 
  isGenerating, 
  onComplete 
}: AssessmentResultsV2Props) => {
  
  const getRadarData = () => {
    if (!dashboardData) return [];
    
    return [
      {
        dimension: 'Strategic Readiness',
        score: dashboardData.dimension_scores.strategic_readiness.score,
        industry: dashboardData.dimension_scores.strategic_readiness.industry_average,
      },
      {
        dimension: 'Data Infrastructure',
        score: dashboardData.dimension_scores.data_infrastructure.score,
        industry: dashboardData.dimension_scores.data_infrastructure.industry_average,
      },
      {
        dimension: 'Use Case Clarity',
        score: dashboardData.dimension_scores.use_case_clarity.score,
        industry: dashboardData.dimension_scores.use_case_clarity.industry_average,
      },
      {
        dimension: 'Implementation',
        score: dashboardData.dimension_scores.implementation_readiness.score,
        industry: dashboardData.dimension_scores.implementation_readiness.industry_average,
      },
      {
        dimension: 'Experience',
        score: dashboardData.dimension_scores.experience_capability.score,
        industry: dashboardData.dimension_scores.experience_capability.industry_average,
      },
      {
        dimension: 'Role Specific',
        score: dashboardData.dimension_scores.role_specific_readiness.score,
        industry: dashboardData.dimension_scores.role_specific_readiness.industry_average,
      },
    ];
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const handleDownloadReport = () => {
    if (!dashboardData || !writtenAssessment || !contactInfo) return;
    
    // Create downloadable content
    const reportContent = `
AI READINESS ASSESSMENT REPORT
${contactInfo.first_name} ${contactInfo.last_name}
Generated: ${new Date().toLocaleDateString()}

OVERALL SCORE: ${dashboardData.overall_score}/100
READINESS LEVEL: ${dashboardData.readiness_level}

DIMENSION SCORES:
${Object.entries(dashboardData.dimension_scores).map(([key, dimension]) => 
  `${key.replace(/_/g, ' ').toUpperCase()}: ${dimension.score}/100`
).join('\n')}

KEY STRENGTHS:
${dashboardData.key_strengths.map(strength => `• ${strength}`).join('\n')}

PRIORITY OPPORTUNITIES:
${dashboardData.priority_opportunities.map(opportunity => `• ${opportunity}`).join('\n')}

RECOMMENDED NEXT STEPS:
${dashboardData.recommended_next_steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

PERSONALIZED ASSESSMENT:
${writtenAssessment}
    `.trim();

    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI-Readiness-Report-${contactInfo.first_name}-${contactInfo.last_name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isGenerating) {
    return (
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-8"></div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Generating Your AI Readiness Report
            </h1>
            <p className="text-gray-600">
              Our AI is analyzing your responses and creating a personalized assessment. This will take just a moment...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Your AI Readiness Assessment Results
              </h1>
            </div>
            <p className="text-gray-600">
              {contactInfo?.first_name}, here's your personalized AI readiness analysis and strategic recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Overall Score Card */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Overall AI Readiness Score</h2>
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(dashboardData?.overall_score || 0)}`}>
                  {dashboardData?.overall_score || 0}
                </div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getScoreBgColor(dashboardData?.overall_score || 0)} ${getScoreColor(dashboardData?.overall_score || 0)}`}>
                  {dashboardData?.readiness_level || 'Beginner'}
                </div>
              </div>
            </Card>

            {/* Key Insights */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">Key Strengths</h3>
                  <ul className="text-sm space-y-1">
                    {dashboardData?.key_strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">Priority Opportunities</h3>
                  <ul className="text-sm space-y-1">
                    {dashboardData?.priority_opportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-4 h-4 bg-blue-600 rounded-full mr-2 mt-0.5 flex-shrink-0"></div>
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Spider Chart */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">AI Readiness Dimensions</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={getRadarData()} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
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
                    dataKey="industry"
                    stroke="#64748b"
                    fill="transparent"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Detailed Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dashboardData && Object.entries(dashboardData.dimension_scores).map(([key, dimension]) => (
              <Card key={key} className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 capitalize">
                  {key.replace(/_/g, ' ')}
                </h3>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl font-bold ${getScoreColor(dimension.score)}`}>
                    {dimension.score}
                  </span>
                  <span className="text-sm text-gray-500">
                    Avg: {dimension.industry_average}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{dimension.explanation}</p>
              </Card>
            ))}
          </div>

          {/* Written Assessment */}
          {writtenAssessment && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Personalized Assessment</h2>
              <div className="prose max-w-none">
                {writtenAssessment.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Next Steps</h2>
            <div className="space-y-3">
              {dashboardData?.recommended_next_steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleDownloadReport}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </Button>
            <Button 
              variant="outline"
              onClick={onComplete}
              className="px-8 py-3"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Strategy Session
            </Button>
            <Button 
              variant="outline"
              onClick={onComplete}
              className="px-8 py-3"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentResultsV2;