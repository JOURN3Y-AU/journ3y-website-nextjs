import { Metadata } from 'next'
import BlueprintPageClient from './BlueprintPageClient'

export const metadata: Metadata = {
  title: 'AI Strategy Blueprint | Enterprise AI Consulting',
  description: 'Comprehensive AI strategy development and roadmap creation from expert AI consultants. Get a personalized AI transformation blueprint including Glean implementation planning.',
  keywords: ['AI strategy', 'AI blueprint', 'AI transformation roadmap', 'AI consulting', 'strategic AI planning', 'enterprise AI strategy', 'AI implementation planning', 'Glean strategy'],
  openGraph: {
    title: 'AI Strategy Blueprint | Enterprise AI Consulting | JOURN3Y',
    description: 'Comprehensive AI strategy development and roadmap creation from expert AI consultants and Glean specialists.',
    url: 'https://journ3y.com.au/products/blueprint',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Strategy Blueprint | Enterprise AI Consulting | JOURN3Y',
    description: 'Comprehensive AI strategy development and roadmap creation from expert AI consultants.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/products/blueprint',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlueprintPage() {
  return <BlueprintPageClient />
}
