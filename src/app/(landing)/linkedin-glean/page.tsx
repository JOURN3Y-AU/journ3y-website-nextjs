import { Metadata } from 'next'
import LinkedInGleanPageClient from './LinkedInGleanPageClient'

export const metadata: Metadata = {
  title: 'Glean Implementation Services | Expert Glean Consultants | JOURN3Y',
  description: 'Professional Glean implementation services. Transform your enterprise search with expert Glean deployment from certified consultants.',
  keywords: ['Glean implementation', 'Glean enterprise search', 'Glean consultants', 'enterprise AI search'],
  openGraph: {
    title: 'Glean Implementation Services | Expert Glean Consultants | JOURN3Y',
    description: 'Professional Glean implementation services. Transform your enterprise search with expert Glean deployment.',
    url: 'https://journ3y.com.au/linkedin-glean',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/products/glean',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function LinkedInGleanPage() {
  return <LinkedInGleanPageClient />
}
