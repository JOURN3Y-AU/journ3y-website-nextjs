import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import ProductsSection from '@/components/home/ProductsSection'
import BlogSection from '@/components/home/BlogSection'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'AI Consulting Australia | Small Business & Enterprise AI Solutions | JOURN3Y',
  description: 'Australia\'s AI consulting experts for small business and enterprise. Practical AI solutions that save 10+ hours per week. Official Glean implementation partner. Serving Sydney, Melbourne, Brisbane, Perth, Adelaide & Hobart.',
  keywords: ['AI consulting Australia', 'small business AI', 'Glean implementation', 'enterprise AI search', 'AI strategy', 'business automation', 'AI consultants Sydney', 'AI consultants Melbourne'],
  openGraph: {
    title: 'AI Consulting Australia | Small Business & Enterprise AI | JOURN3Y',
    description: 'Australia\'s AI consulting experts. Practical AI solutions for small business and enterprise. Official Glean partner.',
    url: 'https://www.journ3y.com.au/',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Consulting Australia | Small Business & Enterprise AI | JOURN3Y',
    description: 'Australia\'s AI consulting experts. Practical AI solutions for small business and enterprise.',
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
