import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LongAssessmentHero from '@/components/assessment/long/LongAssessmentHero';
import AssessmentFormV2 from '@/components/assessment/v2/AssessmentFormV2';
import AssessmentResultsV2 from '@/components/assessment/v2/AssessmentResultsV2';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AssessmentDataV2, ContactInfoV2, DashboardDataV2 } from '@/types/assessmentV2';

const AIAssessmentLongV2 = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'assessment' | 'results'>('hero');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<AssessmentDataV2 | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfoV2 | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardDataV2 | null>(null);
  const [writtenAssessment, setWrittenAssessment] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    createAssessmentSession();
  }, []);

  const createAssessmentSession = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term'),
      };

      const { data, error } = await supabase
        .from('assessment_sessions')
        .insert({
          ip_address: null,
          user_agent: navigator.userAgent,
          ...utmData,
        })
        .select()
        .single();

      if (error) throw error;
      setSessionId(data.id);
    } catch (error) {
      console.error('Error creating assessment session:', error);
      toast({
        title: "Error",
        description: "Failed to start assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartAssessment = () => {
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = async (answers: AssessmentDataV2, contact: ContactInfoV2) => {
    if (!sessionId) {
      toast({
        title: "Error",
        description: "Assessment session is invalid. Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }

    setAssessmentAnswers(answers);
    setContactInfo(contact);
    setCurrentStep('results');
    setIsGenerating(true);

    try {
      // Save assessment response to new table
      const { data: responseData, error: responseError } = await supabase
        .from('assessment_responses_v2')
        .insert({
          session_id: sessionId,
          ...contact,
          ...answers,
          ai_generation_status: 'generating',
        })
        .select()
        .single();

      if (responseError) throw responseError;
      
      setAssessmentId(responseData.id);

      // Generate dashboard and written assessment
      const [generatedDashboard, generatedAssessment] = await Promise.all([
        generateDashboard(answers, contact, responseData.id),
        generateWrittenAssessment(answers, contact, responseData.id)
      ]);

      // Create campaign lead
      await supabase.rpc('create_campaign_lead_from_assessment_v2', {
        assessment_response_id: responseData.id
      });

      setIsGenerating(false);

      // Mark session as completed
      await supabase
        .from('assessment_sessions')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', sessionId);

      // Send results email to user after AI generation is complete
      if (generatedDashboard && generatedAssessment) {
        try {
          await supabase.functions.invoke('send-assessment-results-email', {
            body: {
              contactInfo: contact,
              companyInfo: {
                company_name: answers.company_name,
                selected_role: answers.selected_role,
                industry: answers.industry,
                company_size: answers.company_size,
              },
              dashboardData: generatedDashboard,
              writtenAssessment: generatedAssessment,
            },
          });
          console.log('Results email sent to user');
        } catch (emailError) {
          console.error('Error sending results email:', emailError);
        }
      }

    } catch (error) {
      console.error('Error processing assessment:', error);
      setIsGenerating(false);
      
      // Set fallback data
      setDashboardData(getFallbackDashboardData(contact, answers));
      setWrittenAssessment(getFallbackWrittenAssessment(contact, answers));
      
      toast({
        title: "Assessment Generated",
        description: "We've created your personalized assessment using our fallback system.",
        variant: "default",
      });
    }
  };

  const generateDashboard = async (answers: AssessmentDataV2, contact: ContactInfoV2, responseId: string) => {
    try {
      const dashboardTemplate = await fetch('/assessment-v2-dashboard-template.txt').then(r => r.text());
      const prompt = replacePlaceholders(dashboardTemplate, answers, contact);

      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        'generate-ai-assessment',
        {
          body: {
            responseId,
            prompt,
            type: 'dashboard'
          },
        }
      );

      if (aiError) throw aiError;

      const dashboardData = JSON.parse(aiData.assessment);
      setDashboardData(dashboardData);

      // Update database with dashboard data
      await supabase
        .from('assessment_responses_v2')
        .update({ ai_dashboard_data: dashboardData })
        .eq('id', responseId);

      return dashboardData;

    } catch (error) {
      console.error('Error generating dashboard:', error);
      const fallbackData = getFallbackDashboardData(contact, answers);
      setDashboardData(fallbackData);
      return fallbackData;
    }
  };

  const generateWrittenAssessment = async (answers: AssessmentDataV2, contact: ContactInfoV2, responseId: string) => {
    try {
      const feedbackTemplate = await fetch('/assessment-v2-feedback-template.txt').then(r => r.text());
      const prompt = replacePlaceholders(feedbackTemplate, answers, contact);

      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        'generate-ai-assessment',
        {
          body: {
            responseId,
            prompt,
            type: 'feedback'
          },
        }
      );

      if (aiError) throw aiError;

      setWrittenAssessment(aiData.assessment);

      // Update database with written assessment
      await supabase
        .from('assessment_responses_v2')
        .update({ 
          ai_written_assessment: aiData.assessment,
          ai_generation_status: 'completed'
        })
        .eq('id', responseId);

      return aiData.assessment;

    } catch (error) {
      console.error('Error generating written assessment:', error);
      const fallbackAssessment = getFallbackWrittenAssessment(contact, answers);
      setWrittenAssessment(fallbackAssessment);
      return fallbackAssessment;
    }
  };

  const replacePlaceholders = (template: string, answers: AssessmentDataV2, contact: ContactInfoV2): string => {
    let result = template;
    
    // Replace contact info
    result = result.replace(/\[FIRST_NAME\]/g, contact.first_name);
    result = result.replace(/\[COMPANY_NAME\]/g, answers.company_name);
    result = result.replace(/\[SELECTED_ROLE\]/g, answers.selected_role);
    result = result.replace(/\[COMPANY_SIZE\]/g, answers.company_size);
    result = result.replace(/\[INDUSTRY\]/g, answers.industry);
    
    // Replace all assessment answers
    Object.entries(answers.responses).forEach(([key, value]) => {
      const placeholder = `[${key.toUpperCase()}]`;
      const valueStr = Array.isArray(value) ? value.join(', ') : value;
      result = result.replace(new RegExp(placeholder, 'g'), valueStr);
    });
    
    return result;
  };

  const getFallbackDashboardData = (contact: ContactInfoV2, answers: AssessmentDataV2): DashboardDataV2 => {
    return {
      overall_score: 65,
      dimension_scores: {
        strategic_readiness: {
          score: 70,
          industry_average: 60,
          explanation: "Strong business priority alignment with room for AI integration"
        },
        data_infrastructure: {
          score: 55,
          industry_average: 58,
          explanation: "Data landscape shows potential with modernization opportunities"
        },
        use_case_clarity: {
          score: 68,
          industry_average: 52,
          explanation: "Clear priority areas identified for AI implementation"
        },
        implementation_readiness: {
          score: 60,
          industry_average: 55,
          explanation: "Moderate readiness for change with proper planning"
        },
        experience_capability: {
          score: 58,
          industry_average: 48,
          explanation: "Growing experience with AI tools and technologies"
        },
        role_specific_readiness: {
          score: 72,
          industry_average: 62,
          explanation: `Strong ${answers.selected_role} perspective on AI opportunities`
        }
      },
      readiness_level: "Developing",
      key_strengths: [
        "Clear business priority identification",
        "Leadership engagement and commitment",
        "Growing AI awareness and interest"
      ],
      priority_opportunities: [
        "Data infrastructure modernization",
        "Pilot project implementation",
        "Team capability development",
        "Change management planning"
      ],
      recommended_next_steps: [
        "Conduct a focused data readiness assessment",
        "Identify and launch a pilot AI project in your priority area",
        "Develop an AI capability building plan for your team"
      ]
    };
  };

  const getFallbackWrittenAssessment = (contact: ContactInfoV2, answers: AssessmentDataV2): string => {
    return `Hi ${contact.first_name},

Thank you for completing our comprehensive AI readiness assessment for ${answers.company_name}. As a ${answers.selected_role}, you're well-positioned to lead your organization's AI transformation journey.

Your assessment reveals that ${answers.company_name} has a solid foundation for AI adoption. Your responses indicate strong strategic thinking around business priorities and a clear understanding of where AI can create value. This positions you ahead of many organizations that are still in the early exploration phase.

Based on your role as ${answers.selected_role} and your industry context in ${answers.industry}, here are three immediate opportunities you can pursue:

1. **Quick Win: Process Automation** - Start with automating routine tasks in your priority business areas. This can deliver immediate value while building organizational confidence in AI.

2. **Foundation Building: Data Quality Initiative** - Implement a focused data organization project to prepare for more advanced AI applications. Clean, accessible data is the foundation of successful AI.

3. **Capability Development: AI Literacy Program** - Begin building AI awareness across your team to ensure successful adoption when you implement larger initiatives.

${contact.first_name}, the key to successful AI transformation is starting with focused, high-impact initiatives that build momentum. Companies like ${answers.company_name} typically see their best results when they combine strategic vision with practical, incremental implementation.

Our Discovery Session can help you turn these insights into a concrete 90-day action plan. We'll work with you to identify the specific opportunities that align with your ${answers.selected_role} priorities and your organization's readiness level.

Best regards,
The JOURN3Y Team`;
  };

  const handleComplete = () => {
    navigate('/');
  };

  return (
    <>
      {currentStep === 'hero' && (
        <LongAssessmentHero onStartAssessment={handleStartAssessment} />
      )}
      
      {currentStep === 'assessment' && (
        <AssessmentFormV2 onComplete={handleAssessmentComplete} />
      )}
      
      {currentStep === 'results' && (
        <AssessmentResultsV2
          dashboardData={dashboardData}
          writtenAssessment={writtenAssessment}
          contactInfo={contactInfo}
          assessmentData={assessmentAnswers}
          assessmentId={assessmentId}
          isGenerating={isGenerating}
          onComplete={handleComplete}
        />
      )}
    </>
  );
};

export default AIAssessmentLongV2;