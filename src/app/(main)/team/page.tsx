import { Metadata } from 'next'
import TeamPageClient from './TeamPageClient'

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

export default function TeamPage() {
  return <TeamPageClient />
}
