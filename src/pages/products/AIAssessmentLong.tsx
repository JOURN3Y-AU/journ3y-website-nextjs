
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LongAssessmentHero from '@/components/assessment/long/LongAssessmentHero';
import LongAssessmentForm from '@/components/assessment/long/LongAssessmentForm';
import LongAssessmentResults from '@/components/assessment/long/LongAssessmentResults';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type LongAssessmentAnswers = {
  selected_role: string;
  q1_company_size: string;
  q2_industry_sector: string;
  q3_annual_revenue: string;
  q4_primary_business_model: string;
  q5_geographic_footprint: string;
  q6_business_priorities: string;
  q7_competitive_differentiation: string;
  q8_growth_challenges: string;
  q9_technology_investment: string;
  q10_change_appetite: string;
  q11_success_metrics: string;
  q12_information_challenges: string;
  q13_knowledge_systems: string;
  q14_search_efficiency: string;
  q15_expertise_capture: string;
  q16_collaboration_tools: string;
  q17_data_quality: string;
  q18_analytics_maturity: string;
  q19_automation_level: string;
  q20_technology_stack: string;
  q21_ai_experience: string;
  q22_implementation_timeline: string;
  q23_role_specific: string;
  q24_role_specific: string;
};

export type ContactInfo = {
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  phone_number?: string;
};

export type DashboardData = {
  overallScore: number;
  dimensions: {
    strategicReadiness: {
      score: number;
      industryAverage: number;
      topQuartile: number;
      explanation: string;
    };
    knowledgeManagement: {
      score: number;
      industryAverage: number;
      topQuartile: number;
      explanation: string;
    };
    dataInfrastructure: {
      score: number;
      industryAverage: number;
      topQuartile: number;
      explanation: string;
    };
    useCaseIdentification: {
      score: number;
      industryAverage: number;
      topQuartile: number;
      explanation: string;
    };
    roleSpecificCapability: {
      score: number;
      industryAverage: number;
      topQuartile: number;
      explanation: string;
    };
    changeReadiness: {
      score: number;
      industryAverage: number;
      topQuartile: number;
      explanation: string;
    };
  };
  industryContext: string;
  roleContext: string;
  keyStrengths: string[];
  topOpportunities: string[];
};

const AIAssessmentLong = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'assessment' | 'results'>('hero');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<LongAssessmentAnswers | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
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

  const handleAssessmentComplete = async (answers: LongAssessmentAnswers, contact: ContactInfo) => {
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
      // Save assessment response
      const { data: responseData, error: responseError } = await supabase
        .from('assessment_responses_long')
        .insert({
          session_id: sessionId,
          ...contact,
          ...answers,
          ai_generation_status: 'generating',
        })
        .select()
        .single();

      if (responseError) throw responseError;

      // Generate dashboard and written assessment
      await Promise.all([
        generateDashboard(answers, contact, responseData.id),
        generateWrittenAssessment(answers, contact, responseData.id)
      ]);

      setIsGenerating(false);

      // Mark session as completed
      await supabase
        .from('assessment_sessions')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', sessionId);

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

  const generateDashboard = async (answers: LongAssessmentAnswers, contact: ContactInfo, responseId: string) => {
    try {
      const dashboardTemplate = await fetch('/assessment-long-dashboard-template.txt').then(r => r.text());
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
        .from('assessment_responses_long')
        .update({ ai_dashboard_data: dashboardData })
        .eq('id', responseId);

    } catch (error) {
      console.error('Error generating dashboard:', error);
      setDashboardData(getFallbackDashboardData(contact, answers));
    }
  };

  const generateWrittenAssessment = async (answers: LongAssessmentAnswers, contact: ContactInfo, responseId: string) => {
    try {
      const feedbackTemplate = await fetch('/assessment-long-feedback-template.txt').then(r => r.text());
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
        .from('assessment_responses_long')
        .update({ 
          ai_written_assessment: aiData.assessment,
          ai_generation_status: 'completed'
        })
        .eq('id', responseId);

    } catch (error) {
      console.error('Error generating written assessment:', error);
      setWrittenAssessment(getFallbackWrittenAssessment(contact, answers));
    }
  };

  const replacePlaceholders = (template: string, answers: LongAssessmentAnswers, contact: ContactInfo): string => {
    let result = template;
    
    // Replace contact info
    result = result.replace(/\[FIRST_NAME\]/g, contact.first_name);
    result = result.replace(/\[COMPANY_NAME\]/g, contact.company_name);
    
    // Replace all assessment answers
    Object.entries(answers).forEach(([key, value]) => {
      const placeholder = `[${key.toUpperCase()}]`;
      result = result.replace(new RegExp(placeholder, 'g'), value);
    });
    
    return result;
  };

  const getFallbackDashboardData = (contact: ContactInfo, answers: LongAssessmentAnswers): DashboardData => {
    return {
      overallScore: 60,
      dimensions: {
        strategicReadiness: {
          score: 60,
          industryAverage: 55,
          topQuartile: 80,
          explanation: "Moderate strategic alignment with room for improvement"
        },
        knowledgeManagement: {
          score: 50,
          industryAverage: 52,
          topQuartile: 78,
          explanation: "Typical challenges with information accessibility"
        },
        dataInfrastructure: {
          score: 65,
          industryAverage: 61,
          topQuartile: 82,
          explanation: "Solid foundation for AI implementation"
        },
        useCaseIdentification: {
          score: 55,
          industryAverage: 49,
          topQuartile: 75,
          explanation: "Some opportunities identified"
        },
        roleSpecificCapability: {
          score: 60,
          industryAverage: 54,
          topQuartile: 80,
          explanation: `Standard capability for ${answers.selected_role} role`
        },
        changeReadiness: {
          score: 65,
          industryAverage: 56,
          topQuartile: 83,
          explanation: "Good foundation for organizational change"
        }
      },
      industryContext: "Mid-market organization",
      roleContext: answers.selected_role,
      keyStrengths: ["Committed leadership", "Growth mindset"],
      topOpportunities: ["Operational efficiency", "Technology integration"]
    };
  };

  const getFallbackWrittenAssessment = (contact: ContactInfo, answers: LongAssessmentAnswers): string => {
    return `Hi ${contact.first_name}, thank you for completing our comprehensive AI readiness assessment for ${contact.company_name}.

Your responses indicate that ${contact.company_name} is well-positioned to begin its AI transformation journey. Like many organizations in your industry, you're experiencing the common challenges of operational efficiency and information management that AI can significantly address.

Based on similar companies in your sector and size range, you have strong foundational elements in place. Your leadership team's interest in AI adoption positions you ahead of many competitors who are still in early consideration phases. The key opportunities we see include streamlining information access, automating routine processes, and enhancing decision-making capabilities.

Companies like ${contact.company_name} typically see 25-40% productivity improvements when they implement AI solutions strategically. Your timeline and approach suggest you're well-suited for a phased implementation that delivers quick wins while building toward longer-term transformation.

${contact.first_name}, here's what you can do immediately: identify one repetitive process that consumes significant team time each week. This becomes your pilot opportunity. At JOURN3Y, we help you turn these insights into a strategic roadmap - our Discovery Session can show you exactly where the biggest opportunities lie for ${contact.company_name} and outline a practical implementation plan.

Regards - The JOURN3Y team`;
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
        <LongAssessmentForm onComplete={handleAssessmentComplete} />
      )}
      
      {currentStep === 'results' && (
        <LongAssessmentResults
          dashboardData={dashboardData}
          writtenAssessment={writtenAssessment}
          contactInfo={contactInfo}
          isGenerating={isGenerating}
          onComplete={handleComplete}
        />
      )}
    </>
  );
};

export default AIAssessmentLong;
