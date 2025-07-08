export interface AssessmentDataV2 {
  // Core Info
  selected_role: 'CEO' | 'CFO' | 'CMO' | 'CHRO' | 'CPO' | 'CTO' | 'Other';
  company_name: string;
  company_size: string;
  industry: string;
  
  // Responses object with flexible structure
  responses: {
    // Strategic Foundation
    q1_business_priorities: string[];
    q2_ai_familiarity: string;
    q3_competitive_pressure: string;
    
    // Data & AI Readiness  
    q4_data_landscape: string;
    q5_ai_barriers: string[];
    q6_genai_experience: string;
    q7_data_quality: string;
    
    // Use Case Prioritization
    q8_priority_areas: string[];
    q9_automation_readiness: string;
    q10_decision_making: string;
    
    // Implementation Readiness
    q11_change_readiness: string;
    q12_resource_allocation: string;
    q13_timeline_expectation: string;
    
    // Role-Specific (2 questions per role)
    q14_role_specific_1: string;
    q15_role_specific_2: string;
  };
  
  // Campaign Interest
  interested_in_conversation: boolean;
}

export interface ContactInfoV2 {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
}

export interface DashboardDataV2 {
  overall_score: number;
  dimension_scores: {
    strategic_readiness: {
      score: number;
      industry_average: number;
      explanation: string;
    };
    data_infrastructure: {
      score: number;
      industry_average: number;
      explanation: string;
    };
    use_case_clarity: {
      score: number;
      industry_average: number;
      explanation: string;
    };
    implementation_readiness: {
      score: number;
      industry_average: number;
      explanation: string;
    };
    experience_capability: {
      score: number;
      industry_average: number;
      explanation: string;
    };
    role_specific_readiness: {
      score: number;
      industry_average: number;
      explanation: string;
    };
  };
  readiness_level: "Beginner" | "Developing" | "Advancing" | "Leading";
  key_strengths: string[];
  priority_opportunities: string[];
  recommended_next_steps: string[];
}

export type AssessmentSection = 
  | 'role_selection'
  | 'strategic_foundation'
  | 'data_ai_readiness'
  | 'use_case_prioritization'
  | 'implementation_readiness'
  | 'role_specific'
  | 'contact_info';