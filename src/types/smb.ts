// SMB Industries types

export interface SMBIndustry {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  icon_name: string;
  hero_headline: string;
  hero_subhead: string;
  hero_image_url: string | null;
  results_statement: string | null;
  related_industries: string[];
  metadata_title: string | null;
  metadata_description: string | null;
  metadata_keywords: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SMBPainPoint {
  id: string;
  industry_id: string;
  title: string;
  description: string;
  display_order: number;
  created_at: string;
}

export interface SMBUseCase {
  id: string;
  industry_id: string;
  title: string;
  description: string;
  benefit: string | null;
  icon_name: string;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface SMBFAQ {
  id: string;
  industry_id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
}

export interface SMBAdminUser {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

// Extended industry type with related data
export interface SMBIndustryWithDetails extends SMBIndustry {
  pain_points: SMBPainPoint[];
  use_cases: SMBUseCase[];
  faqs: SMBFAQ[];
}

// Form data types for admin
export type SMBIndustryFormData = Omit<SMBIndustry, 'id' | 'created_at' | 'updated_at'> & { id?: string };
export type SMBPainPointFormData = Omit<SMBPainPoint, 'id' | 'created_at'> & { id?: string };
export type SMBUseCaseFormData = Omit<SMBUseCase, 'id' | 'created_at'> & { id?: string };
export type SMBFAQFormData = Omit<SMBFAQ, 'id' | 'created_at'> & { id?: string };

// Global content for the SMB landing page
export interface SMBGlobalContent {
  stats: {
    value: string;
    label: string;
  }[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
}

// Smart Matcher API response
export interface SMBMatchResult {
  matchedIndustry: SMBIndustry;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  alternateIndustries: Pick<SMBIndustry, 'slug' | 'name' | 'tagline'>[];
}
