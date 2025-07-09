import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Calendar } from 'lucide-react';
import { DashboardDataV2, ContactInfoV2, AssessmentDataV2 } from '@/types/assessmentV2';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AssessmentResultsV2Props {
  dashboardData: DashboardDataV2 | null;
  writtenAssessment: string | null;
  contactInfo: ContactInfoV2 | null;
  assessmentData: AssessmentDataV2 | null;
  assessmentId: string | null;
  isGenerating: boolean;
  onComplete: () => void;
}

const AssessmentResultsV2 = ({ 
  dashboardData, 
  writtenAssessment, 
  contactInfo, 
  assessmentData,
  assessmentId,
  isGenerating, 
  onComplete 
}: AssessmentResultsV2Props) => {
  const { toast } = useToast();
  
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

  const handleDownloadReport = async () => {
    if (!dashboardData || !writtenAssessment || !contactInfo) return;
    
    try {
      toast({
        title: "Generating PDF Report",
        description: "Creating your personalized AI readiness report...",
        variant: "default",
      });

      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Set up fonts and colors
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(37, 99, 235); // Blue color
      
      // Title
      pdf.text('AI READINESS ASSESSMENT REPORT', margin, yPosition);
      yPosition += 15;
      
      // Contact info and date
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${contactInfo.first_name} ${contactInfo.last_name}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Company: ${assessmentData?.company_name || 'N/A'}`, margin, yPosition);
      yPosition += 15;

      // Overall Score Section
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(37, 99, 235);
      pdf.text('OVERALL AI READINESS SCORE', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      if (dashboardData.overall_score >= 80) {
        pdf.setTextColor(34, 197, 94); // Green
      } else if (dashboardData.overall_score >= 60) {
        pdf.setTextColor(234, 179, 8); // Yellow
      } else {
        pdf.setTextColor(239, 68, 68); // Red
      }
      pdf.text(`${dashboardData.overall_score}/100`, margin, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Readiness Level: ${dashboardData.readiness_level}`, margin + 50, yPosition);
      yPosition += 20;

      // Capture the radar chart with improved settings
      const chartElement = document.getElementById('radar-chart-container');
      if (chartElement) {
        try {
          // Wait a moment for chart to fully render
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const canvas = await html2canvas(chartElement as HTMLElement, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: false,
            foreignObjectRendering: false,
            removeContainer: false,
            logging: false
          });
          
          const chartImgData = canvas.toDataURL('image/png', 1.0);
          
          // Calculate proper dimensions maintaining aspect ratio
          const originalWidth = canvas.width;
          const originalHeight = canvas.height;
          const aspectRatio = originalWidth / originalHeight;
          
          // Set target width and calculate height to maintain aspect ratio
          const targetWidth = 120;
          const targetHeight = targetWidth / aspectRatio;
          
          // Add chart title
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(14);
          pdf.setTextColor(37, 99, 235);
          pdf.text('AI READINESS DIMENSIONS', margin, yPosition);
          yPosition += 15;
          
          // Center the chart horizontally
          const chartX = (pageWidth - targetWidth) / 2;
          pdf.addImage(chartImgData, 'PNG', chartX, yPosition, targetWidth, targetHeight);
          yPosition += targetHeight + 20;
        } catch (error) {
          console.warn('Could not capture chart, adding dimension scores instead:', error);
          
          // Add chart title
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(14);
          pdf.setTextColor(37, 99, 235);
          pdf.text('AI READINESS DIMENSIONS', margin, yPosition);
          yPosition += 15;
          
          // Add fallback text representation
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
          
          const radarData = getRadarData();
          radarData.forEach((item) => {
            pdf.text(`${item.dimension}: ${item.score}/100 (Industry: ${item.industry}/100)`, margin, yPosition);
            yPosition += 6;
          });
          yPosition += 10;
        }
      } else {
        // Add section title and dimension scores if chart element not found
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(37, 99, 235);
        pdf.text('AI READINESS DIMENSIONS', margin, yPosition);
        yPosition += 15;
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        
        const radarData = getRadarData();
        radarData.forEach((item) => {
          pdf.text(`${item.dimension}: ${item.score}/100 (Industry: ${item.industry}/100)`, margin, yPosition);
          yPosition += 6;
        });
        yPosition += 10;
      }

      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }

      // Dimension Scores
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(37, 99, 235);
      pdf.text('DIMENSION SCORES', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      Object.entries(dashboardData.dimension_scores).forEach(([key, dimension]) => {
        const dimensionName = key.replace(/_/g, ' ').toUpperCase();
        pdf.text(`${dimensionName}: ${dimension.score}/100 (Industry Avg: ${dimension.industry_average})`, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 10;

      // Key Strengths
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(34, 197, 94); // Green
      pdf.text('KEY STRENGTHS', margin, yPosition);
      yPosition += 8;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      dashboardData.key_strengths.forEach((strength) => {
        const lines = pdf.splitTextToSize(`• ${strength}`, contentWidth);
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * 5;
      });
      yPosition += 10;

      // Priority Opportunities
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(37, 99, 235); // Blue
      pdf.text('PRIORITY OPPORTUNITIES', margin, yPosition);
      yPosition += 8;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      dashboardData.priority_opportunities.forEach((opportunity) => {
        const lines = pdf.splitTextToSize(`• ${opportunity}`, contentWidth);
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * 5;
      });
      yPosition += 10;

      // Recommended Next Steps
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(37, 99, 235);
      pdf.text('RECOMMENDED NEXT STEPS', margin, yPosition);
      yPosition += 8;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      dashboardData.recommended_next_steps.forEach((step, index) => {
        const lines = pdf.splitTextToSize(`${index + 1}. ${step}`, contentWidth);
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * 5 + 2;
      });
      yPosition += 10;

      // Personalized Assessment
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(37, 99, 235);
      pdf.text('PERSONALIZED ASSESSMENT', margin, yPosition);
      yPosition += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      // Split the written assessment into paragraphs and handle page breaks
      const paragraphs = writtenAssessment.split('\n').filter(p => p.trim());
      
      paragraphs.forEach((paragraph) => {
        if (paragraph.trim()) {
          const lines = pdf.splitTextToSize(paragraph.trim(), contentWidth);
          
          // Check if we need a new page
          if (yPosition + (lines.length * 5) > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          
          pdf.text(lines, margin, yPosition);
          yPosition += (lines.length * 5) + 5;
        }
      });

      // Add footer with company info
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text('Generated by JOURN3Y AI Readiness Assessment', margin, pageHeight - 10);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
      }

      // Save the PDF
      pdf.save(`AI-Readiness-Report-${contactInfo.first_name}-${contactInfo.last_name}.pdf`);
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your AI readiness report has been downloaded.",
        variant: "default",
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error Generating PDF",
        description: "Failed to create PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleScheduleSession = async () => {
    if (!contactInfo || !assessmentData || !assessmentId) {
      toast({
        title: "Error",
        description: "Missing required information to schedule session.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Update campaign lead to show interest in Discovery Session
      const { error: updateError } = await supabase
        .from('campaign_leads')
        .update({ 
          message: 'AI Readiness Assessment - Interested in Discovery Session',
          status: 'discovery_session_requested'
        })
        .eq('additional_data->>assessment_response_id', assessmentId);

      if (updateError) {
        console.error('Error updating campaign lead:', updateError);
      }

      // Send notification email to team
      const { error: emailError } = await supabase.functions.invoke(
        'send-discovery-session-notification',
        {
          body: {
            contactInfo,
            companyInfo: {
              company_name: assessmentData.company_name,
              selected_role: assessmentData.selected_role,
              industry: assessmentData.industry,
              company_size: assessmentData.company_size,
            },
            assessmentId,
          },
        }
      );

      if (emailError) {
        console.error('Error sending notification:', emailError);
        toast({
          title: "Session Request Noted",
          description: "Your interest has been recorded. Our team will contact you soon!",
          variant: "default",
        });
      } else {
        toast({
          title: "Session Request Sent!",
          description: "Our team has been notified and will contact you within 24 hours to schedule your Discovery Session.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Error scheduling session:', error);
      toast({
        title: "Request Submitted",
        description: "Your interest has been noted. Our team will be in touch soon!",
        variant: "default",
      });
    }
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
            <div id="radar-chart-container" className="h-96">
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
              onClick={handleScheduleSession}
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