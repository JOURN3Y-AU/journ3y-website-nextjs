import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type {
  SMBIndustry,
  SMBIndustryWithDetails,
  SMBPainPoint,
  SMBUseCase,
  SMBFAQ,
  SMBGlobalContent
} from '@/types/smb';

// Create a client for build-time operations (no cookies)
function createBuildClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Global content that's shared across all SMB pages
export const smbGlobalContent: SMBGlobalContent = {
  stats: [
    { value: "40%", label: "average efficiency gain" },
    { value: "4 weeks", label: "to go live" },
    { value: "50+", label: "Aussie businesses" },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Platform Setup",
      description: "Quick deployment of your managed AI platform, configured for your industry"
    },
    {
      step: 2,
      title: "System Integration",
      description: "We connect to your existing tools - email, calendar, accounting, CRM"
    },
    {
      step: 3,
      title: "Custom AI Agents",
      description: "AI assistants trained on your industry's language and workflows"
    },
    {
      step: 4,
      title: "Training & Support",
      description: "Your team gets hands-on training plus ongoing support"
    },
  ],
};

// Fetch all active industries for the landing page
export async function getActiveIndustries(): Promise<SMBIndustry[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('smb_industries')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching SMB industries:', error);
    return [];
  }

  return data as SMBIndustry[];
}

// Fetch all industries for admin (including inactive)
export async function getAllIndustries(): Promise<SMBIndustry[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('smb_industries')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching all SMB industries:', error);
    return [];
  }

  return data as SMBIndustry[];
}

// Fetch a single industry by slug with all related data
export async function getIndustryBySlug(slug: string): Promise<SMBIndustryWithDetails | null> {
  const supabase = await createClient();

  // Fetch the industry
  const { data: industry, error: industryError } = await supabase
    .from('smb_industries')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (industryError || !industry) {
    console.error('Error fetching industry:', industryError);
    return null;
  }

  // Fetch related data in parallel
  const [painPointsResult, useCasesResult, faqsResult] = await Promise.all([
    supabase
      .from('smb_pain_points')
      .select('*')
      .eq('industry_id', industry.id)
      .order('display_order', { ascending: true }),
    supabase
      .from('smb_use_cases')
      .select('*')
      .eq('industry_id', industry.id)
      .order('display_order', { ascending: true }),
    supabase
      .from('smb_faqs')
      .select('*')
      .eq('industry_id', industry.id)
      .order('display_order', { ascending: true }),
  ]);

  return {
    ...industry,
    pain_points: (painPointsResult.data || []) as SMBPainPoint[],
    use_cases: (useCasesResult.data || []) as SMBUseCase[],
    faqs: (faqsResult.data || []) as SMBFAQ[],
  } as SMBIndustryWithDetails;
}

// Fetch related industries by slugs
export async function getRelatedIndustries(slugs: string[]): Promise<Pick<SMBIndustry, 'slug' | 'name' | 'tagline' | 'icon_name'>[]> {
  if (!slugs || slugs.length === 0) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('smb_industries')
    .select('slug, name, tagline, icon_name')
    .in('slug', slugs)
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching related industries:', error);
    return [];
  }

  return data || [];
}

// Get all industry slugs for static generation (uses build-time client without cookies)
export async function getAllIndustrySlugs(): Promise<string[]> {
  const supabase = createBuildClient();

  const { data, error } = await supabase
    .from('smb_industries')
    .select('slug')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching industry slugs:', error);
    return [];
  }

  return (data || []).map(d => d.slug);
}

// Admin: Get industry by slug (including inactive)
export async function getIndustryBySlugAdmin(slug: string): Promise<SMBIndustryWithDetails | null> {
  const supabase = await createClient();

  // Fetch the industry (no is_active filter for admin)
  const { data: industry, error: industryError } = await supabase
    .from('smb_industries')
    .select('*')
    .eq('slug', slug)
    .single();

  if (industryError || !industry) {
    console.error('Error fetching industry for admin:', industryError);
    return null;
  }

  // Fetch related data in parallel
  const [painPointsResult, useCasesResult, faqsResult] = await Promise.all([
    supabase
      .from('smb_pain_points')
      .select('*')
      .eq('industry_id', industry.id)
      .order('display_order', { ascending: true }),
    supabase
      .from('smb_use_cases')
      .select('*')
      .eq('industry_id', industry.id)
      .order('display_order', { ascending: true }),
    supabase
      .from('smb_faqs')
      .select('*')
      .eq('industry_id', industry.id)
      .order('display_order', { ascending: true }),
  ]);

  return {
    ...industry,
    pain_points: (painPointsResult.data || []) as SMBPainPoint[],
    use_cases: (useCasesResult.data || []) as SMBUseCase[],
    faqs: (faqsResult.data || []) as SMBFAQ[],
  } as SMBIndustryWithDetails;
}
