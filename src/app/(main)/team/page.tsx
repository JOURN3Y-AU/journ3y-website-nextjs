import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { TeamMember } from '@/types/teamMember'
import TeamMemberGrid from './TeamMemberGrid'

export const metadata: Metadata = {
  title: 'Our Team | AI Consulting Experts | JOURN3Y',
  description: 'Meet the JOURN3Y team. Experienced AI consultants and Glean implementation specialists helping Australian businesses transform with AI.',
  keywords: ['AI consulting team', 'Glean consultants', 'AI experts', 'enterprise search specialists', 'AI transformation team', 'JOURN3Y team'],
  openGraph: {
    title: 'Our Team | AI Consulting Experts | JOURN3Y',
    description: 'Meet the JOURN3Y team. Experienced AI consultants and Glean implementation specialists.',
    url: 'https://journ3y.com.au/team',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team | AI Consulting Experts | JOURN3Y',
    description: 'Meet the JOURN3Y team. Experienced AI consultants and Glean implementation specialists.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/team',
  },
  robots: {
    index: true,
    follow: true,
  },
}

async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching team members:', error)
    return []
  }

  return data as TeamMember[]
}

async function getShowTeamPage(): Promise<boolean> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'show_team_page')
    .single()

  if (error || !data) {
    // Default to showing the team page if setting not found
    return true
  }

  return data.value === 'true'
}

export default async function TeamPage() {
  const [teamMembers, showTeamPage] = await Promise.all([
    getTeamMembers(),
    getShowTeamPage()
  ])

  if (!showTeamPage) {
    return (
      <div className="container mx-auto py-24 mt-16 px-4">
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-gray-500">The team page is currently unavailable.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-24 mt-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Team</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Meet the dedicated professionals behind JOURN3Y's success. Our team combines expertise and passion to deliver exceptional solutions.
        </p>
      </div>

      {!teamMembers || teamMembers.length === 0 ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <p className="text-lg text-gray-500">Team information coming soon.</p>
        </div>
      ) : (
        <TeamMemberGrid teamMembers={teamMembers} />
      )}
    </div>
  )
}
