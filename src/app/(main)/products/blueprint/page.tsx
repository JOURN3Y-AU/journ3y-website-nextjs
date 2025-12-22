import { Metadata } from 'next'
import BlueprintPageClient from './BlueprintPageClient'

export const metadata: Metadata = {
  title: 'AI Strategy Blueprint | Enterprise AI Roadmap Australia',
  description: 'Transform AI ambition into action. JOURN3Y Blueprint delivers prioritised AI implementation roadmaps for Australian businesses. Strategy workshops to executable plans in weeks.',
  keywords: ['AI strategy Australia', 'AI blueprint', 'AI transformation roadmap', 'AI consulting', 'strategic AI planning', 'enterprise AI strategy', 'AI implementation planning'],
  openGraph: {
    title: 'AI Strategy Blueprint | Enterprise AI Roadmap Australia | JOURN3Y',
    description: 'Transform AI ambition into action. JOURN3Y Blueprint delivers prioritised AI implementation roadmaps for Australian businesses.',
    url: 'https://www.journ3y.com.au/products/blueprint',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Strategy Blueprint | Enterprise AI Roadmap Australia | JOURN3Y',
    description: 'Transform AI ambition into action. Prioritised AI implementation roadmaps for Australian businesses.',
  },
  alternates: {
    canonical: 'https://www.journ3y.com.au/products/blueprint',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlueprintPage() {
  return <BlueprintPageClient />
}
