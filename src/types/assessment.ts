// Original AI Assessment Types (short form)
export type AssessmentAnswers = {
  q1_business_challenge: string
  q2_time_waste: string
  q3_revenue: string
  q4_timeline: string
  q5_investment_priority: string
  q6_leadership_readiness: string
}

export type ContactInfo = {
  first_name: string
  last_name: string
  email: string
  company_name: string
  phone_number?: string
}

// Long Assessment Types
export type LongAssessmentAnswers = {
  selected_role: string

  // Organization Section
  q1_company_size: string
  q2_industry_sector: string
  q3_annual_revenue: string
  q4_primary_business_model: string
  q5_geographic_footprint: string

  // Strategic Foundation
  q6_business_priorities: string | string[]
  q7_competitive_differentiation: string
  q8_growth_challenges: string
  q9_technology_investment: string
  q10_change_appetite: string
  q11_success_metrics: string

  // Knowledge Management
  q12_information_challenges: string
  q13_knowledge_systems: string
  q14_search_efficiency: string
  q15_expertise_capture: string
  q16_collaboration_tools: string

  // Data & AI Readiness
  q17_data_quality: string
  q18_analytics_maturity: string
  q19_automation_level: string
  q20_technology_stack: string
  q21_ai_experience: string
  q22_implementation_timeline: string

  // Role-Specific Questions
  q23_role_specific: string
  q24_role_specific: string
}

type DimensionScore = {
  score: number
  industryAverage: number
  topQuartile: number
  interpretation: string
}

export type DashboardData = {
  overallScore: number
  readinessLevel: string
  industryContext: string
  roleContext: string
  dimensions: {
    strategicReadiness: DimensionScore
    knowledgeManagement: DimensionScore
    dataInfrastructure: DimensionScore
    useCaseIdentification: DimensionScore
    roleSpecificCapability: DimensionScore
    changeReadiness: DimensionScore
  }
  keyStrengths: string[]
  topOpportunities: string[]
  improvementAreas: string[]
  recommendedActions: string[]
}
