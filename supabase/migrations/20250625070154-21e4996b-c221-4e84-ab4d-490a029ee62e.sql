
-- Create table for long-form assessment responses
CREATE TABLE public.assessment_responses_long (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  
  -- Contact Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  phone_number TEXT,
  
  -- Role Selection (Section 1)
  selected_role TEXT NOT NULL,
  
  -- Organization & Contact (Questions 1-5)
  q1_company_size TEXT NOT NULL,
  q2_industry_sector TEXT NOT NULL,
  q3_annual_revenue TEXT NOT NULL,
  q4_primary_business_model TEXT NOT NULL,
  q5_geographic_footprint TEXT NOT NULL,
  
  -- Strategic Foundation (Questions 6-11)
  q6_business_priorities TEXT NOT NULL,
  q7_competitive_differentiation TEXT NOT NULL,
  q8_growth_challenges TEXT NOT NULL,
  q9_technology_investment TEXT NOT NULL,
  q10_change_appetite TEXT NOT NULL,
  q11_success_metrics TEXT NOT NULL,
  
  -- Knowledge Management (Questions 12-16)
  q12_information_challenges TEXT NOT NULL,
  q13_knowledge_systems TEXT NOT NULL,
  q14_search_efficiency TEXT NOT NULL,
  q15_expertise_capture TEXT NOT NULL,
  q16_collaboration_tools TEXT NOT NULL,
  
  -- Data & AI Readiness (Questions 17-22)
  q17_data_quality TEXT NOT NULL,
  q18_analytics_maturity TEXT NOT NULL,
  q19_automation_level TEXT NOT NULL,
  q20_technology_stack TEXT NOT NULL,
  q21_ai_experience TEXT NOT NULL,
  q22_implementation_timeline TEXT NOT NULL,
  
  -- Role-Specific Questions (Questions 23-24)
  q23_role_specific TEXT NOT NULL,
  q24_role_specific TEXT NOT NULL,
  
  -- AI Generated Results
  ai_dashboard_data JSONB,
  ai_written_assessment TEXT,
  ai_generation_status TEXT DEFAULT 'pending',
  ai_prompt_used TEXT,
  ai_raw_response TEXT,
  
  -- Tracking
  email_sent BOOLEAN DEFAULT false,
  notification_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for long-form assessment responses
ALTER TABLE public.assessment_responses_long ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow assessment response long insert" 
  ON public.assessment_responses_long 
  FOR INSERT 
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow assessment response long select" 
  ON public.assessment_responses_long 
  FOR SELECT 
  TO public
  USING (true);

CREATE POLICY "Allow assessment response long update" 
  ON public.assessment_responses_long 
  FOR UPDATE 
  TO public
  USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_assessment_responses_long_updated_at
  BEFORE UPDATE ON public.assessment_responses_long
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
