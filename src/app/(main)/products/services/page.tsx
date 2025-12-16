import { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'AI Consulting Services | Glean Implementation',
  description: 'Comprehensive AI consulting services including Glean implementation, AI strategy development, enterprise search optimization, and AI transformation consulting from certified experts.',
  keywords: ['AI consulting services', 'Glean implementation services', 'AI strategy consulting', 'enterprise search consulting', 'AI transformation services', 'Glean consultant services'],
  openGraph: {
    title: 'AI Consulting Services | Glean Implementation | JOURN3Y',
    description: 'Comprehensive AI consulting services including Glean implementation, AI strategy development, and enterprise search optimization.',
    url: 'https://journ3y.com.au/products/services',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Consulting Services | Glean Implementation | JOURN3Y',
    description: 'Comprehensive AI consulting services including Glean implementation.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/products/services',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
