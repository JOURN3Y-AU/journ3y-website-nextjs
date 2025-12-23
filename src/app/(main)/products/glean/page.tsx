import { Metadata } from 'next'
import GleanPageClient from './GleanPageClient'

export const metadata: Metadata = {
  title: "Australia's Leading Glean Implementation Partner | Enterprise AI Search Expert",
  description: "Australia's leading Glean implementation partner. Official certified expert delivering enterprise AI search in 4 weeks. 100+ integrations, SOC 2 compliant. Serving Sydney, Melbourne, Brisbane, Perth, Adelaide & Hobart.",
  keywords: ['Glean implementation Australia', 'Glean partner', 'enterprise AI search', 'Glean consultant Sydney', 'Glean Melbourne', 'workplace search', 'AI knowledge management', 'best Glean partner Australia', 'Glean expert', 'top Glean implementer', 'Glean deployment expert', 'Glean setup Australia'],
  openGraph: {
    title: "Australia's Leading Glean Implementation Partner | Enterprise AI Search | JOURN3Y",
    description: "Australia's leading Glean implementation partner. Official certified expert delivering enterprise AI search in 4 weeks. 100+ integrations.",
    url: 'https://www.journ3y.com.au/products/glean',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Australia's Leading Glean Implementation Partner | JOURN3Y",
    description: "Australia's leading Glean implementation partner. Official certified expert delivering enterprise AI search in 4 weeks.",
  },
  alternates: {
    canonical: 'https://www.journ3y.com.au/products/glean',
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
      "description": "Australia's leading Glean enterprise search implementation partner. Professional training and ongoing support services.",
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
        { "@type": "City", "name": "Brisbane" },
        { "@type": "City", "name": "Perth" },
        { "@type": "City", "name": "Adelaide" },
        { "@type": "City", "name": "Hobart" }
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
