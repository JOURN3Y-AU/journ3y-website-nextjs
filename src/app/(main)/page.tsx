import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import ProductsSection from '@/components/home/ProductsSection'
import BlogSection from '@/components/home/BlogSection'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'AI Consulting Australia | Leading Glean Partner | Small Business AI | JOURN3Y',
  description: "Australia's leading Glean implementation partner and small business AI experts. Official Glean certified. Practical AI solutions saving 10+ hours/week. Serving Sydney, Melbourne, Brisbane, Perth, Adelaide & Hobart.",
  keywords: ['AI consulting Australia', 'small business AI', 'Glean implementation', 'enterprise AI search', 'AI strategy', 'business automation', 'AI consultants Sydney', 'AI consultants Melbourne', 'leading Glean partner Australia'],
  openGraph: {
    title: 'AI Consulting Australia | Leading Glean Partner | Small Business AI | JOURN3Y',
    description: "Australia's leading Glean implementation partner and small business AI experts. Official Glean certified. Practical AI solutions.",
    url: 'https://www.journ3y.com.au/',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Consulting Australia | Leading Glean Partner | Small Business AI | JOURN3Y',
    description: "Australia's leading Glean implementation partner and small business AI experts. Official Glean certified.",
  },
  alternates: {
    canonical: 'https://www.journ3y.com.au/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <BlogSection />
      <CTASection />
    </>
  )
}
