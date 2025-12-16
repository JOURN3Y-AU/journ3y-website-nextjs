import { Metadata } from 'next'
import LinkedInCampaignPageClient from './LinkedInCampaignPageClient'

export const metadata: Metadata = {
  title: 'Free AI Consultation | Get Your AI Transformation Roadmap | JOURN3Y',
  description: 'Book a free 1-hour AI strategy session with JOURN3Y. Get personalized AI strategy assessment, identify quick wins, and receive expert guidance from AI specialists.',
  keywords: ['free AI consultation', 'AI strategy session', 'AI transformation roadmap', 'AI consulting'],
  openGraph: {
    title: 'Free AI Consultation | Get Your AI Transformation Roadmap | JOURN3Y',
    description: 'Book a free 1-hour AI strategy session. Get personalized AI strategy assessment and expert guidance.',
    url: 'https://journ3y.com.au/linkedin-campaign',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function LinkedInCampaignPage() {
  return <LinkedInCampaignPageClient />
}
