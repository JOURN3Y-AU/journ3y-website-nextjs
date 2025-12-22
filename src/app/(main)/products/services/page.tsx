import { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'AI Consulting Services Australia | Implementation & Support',
  description: 'Professional AI consulting services in Australia. Implementation, training, and managed AI services. From strategy to execution, we help Australian businesses succeed with AI.',
  keywords: ['AI consulting services Australia', 'AI implementation', 'AI training', 'managed AI services', 'enterprise AI consulting', 'Glean consultant services'],
  openGraph: {
    title: 'AI Consulting Services Australia | Implementation & Support | JOURN3Y',
    description: 'Professional AI consulting services in Australia. Implementation, training, and managed AI services.',
    url: 'https://www.journ3y.com.au/products/services',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Consulting Services Australia | JOURN3Y',
    description: 'Professional AI consulting services in Australia. Implementation, training, and managed AI services.',
  },
  alternates: {
    canonical: 'https://www.journ3y.com.au/products/services',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
