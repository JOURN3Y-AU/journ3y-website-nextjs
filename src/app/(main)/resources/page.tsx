import { Metadata } from 'next'
import ResourcesPageClient from './ResourcesPageClient'

export const metadata: Metadata = {
  title: 'AI Resources & Case Studies | JOURN3Y',
  description: 'Access AI case studies, research papers, and resources from JOURN3Y. Learn how businesses are transforming with AI and Glean enterprise search solutions.',
  keywords: ['AI case studies', 'AI resources', 'Glean case studies', 'enterprise search resources', 'AI transformation examples', 'AI business applications'],
  openGraph: {
    title: 'AI Resources & Case Studies | JOURN3Y',
    description: 'Access AI case studies, research papers, and resources from JOURN3Y.',
    url: 'https://journ3y.com.au/resources',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resources & Case Studies | JOURN3Y',
    description: 'Access AI case studies, research papers, and resources from JOURN3Y.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/resources',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ResourcesPage() {
  return <ResourcesPageClient />
}
