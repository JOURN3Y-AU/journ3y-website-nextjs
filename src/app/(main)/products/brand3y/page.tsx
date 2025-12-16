import { Metadata } from 'next'
import Brand3yPageClient from './Brand3yPageClient'

export const metadata: Metadata = {
  title: 'Brand3y AI Platform | Next-Gen AI Solutions',
  description: 'Discover Brand3y, our cutting-edge AI platform for enterprise transformation. Advanced AI capabilities integrated with Glean enterprise search for comprehensive business intelligence.',
  keywords: ['Brand3y', 'AI platform', 'enterprise AI', 'AI transformation platform', 'advanced AI solutions', 'AI business intelligence', 'Glean integration', 'enterprise AI platform'],
  openGraph: {
    title: 'Brand3y AI Platform | Next-Gen AI Solutions | JOURN3Y',
    description: 'Cutting-edge AI platform for enterprise transformation with advanced AI capabilities and Glean integration.',
    url: 'https://journ3y.com.au/products/brand3y',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand3y AI Platform | Next-Gen AI Solutions | JOURN3Y',
    description: 'Cutting-edge AI platform for enterprise transformation.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/products/brand3y',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Brand3yPage() {
  return <Brand3yPageClient />
}
