import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import ProductsSection from '@/components/home/ProductsSection'
import BlogSection from '@/components/home/BlogSection'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'JOURN3Y - AI Consulting & Glean Implementation Experts',
  description: 'Leading AI consulting firm specializing in Glean enterprise search implementation, AI strategy development, and business transformation. Expert Glean consultants delivering AI readiness assessments and strategic AI solutions.',
  keywords: ['AI consulting', 'Glean implementation', 'Glean consultant', 'enterprise search', 'AI strategy', 'business transformation', 'AI readiness assessment', 'Glean experts', 'AI transformation services'],
  openGraph: {
    title: 'JOURN3Y - AI Consulting & Glean Implementation Experts',
    description: 'Leading AI consulting firm specializing in Glean enterprise search implementation, AI strategy development, and business transformation.',
    url: 'https://journ3y.com.au/',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOURN3Y - AI Consulting & Glean Implementation Experts',
    description: 'Leading AI consulting firm specializing in Glean enterprise search implementation.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/',
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
