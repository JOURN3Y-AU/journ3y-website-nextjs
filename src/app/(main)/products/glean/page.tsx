import { Metadata } from 'next'
import GleanPageClient from './GleanPageClient'

export const metadata: Metadata = {
  title: 'Glean Implementation Services | Expert Glean Consultants',
  description: 'Professional Glean implementation and optimization services from certified Glean consultants. Transform your enterprise search with expert Glean deployment, configuration, and ongoing support.',
  keywords: ['Glean implementation', 'Glean consultant', 'Glean services', 'enterprise search', 'Glean deployment', 'Glean optimization', 'Glean configuration', 'Glean support', 'Glean experts'],
  openGraph: {
    title: 'Glean Implementation Services | Expert Glean Consultants | JOURN3Y',
    description: 'Professional Glean implementation and optimization services from certified Glean consultants. Transform your enterprise search capabilities.',
    url: 'https://journ3y.com.au/products/glean',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glean Implementation Services | Expert Glean Consultants | JOURN3Y',
    description: 'Professional Glean implementation and optimization services from certified Glean consultants.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/products/glean',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Glean Implementation and Support Services",
      "description": "Professional Glean enterprise search implementation, training, and ongoing support services for Australian businesses",
      "provider": {
        "@type": "Organization",
        "name": "JOURN3Y",
        "url": "https://www.journ3y.com.au",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AU"
        }
      },
      "areaServed": [
        { "@type": "Country", "name": "Australia" },
        { "@type": "City", "name": "Sydney" },
        { "@type": "City", "name": "Melbourne" },
        { "@type": "City", "name": "Brisbane" }
      ],
      "serviceType": [
        "Enterprise Search Implementation",
        "Glean Installation",
        "Software Implementation",
        "AI Workplace Solutions"
      ],
      "offers": {
        "@type": "Offer",
        "description": "Glean implementation and support services"
      }
    })
  }
}

export default function GleanPage() {
  return <GleanPageClient />
}
