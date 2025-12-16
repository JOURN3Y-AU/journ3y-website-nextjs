import { Metadata } from 'next'
import { Suspense } from 'react'
import SmallBusinessHeroSection from '@/components/smallbusiness/SmallBusinessHeroSection'
import SmallBusinessIndustrySelector from '@/components/smallbusiness/SmallBusinessIndustrySelector'
import SmallBusinessHowItWorksSection from '@/components/smallbusiness/SmallBusinessHowItWorksSection'
import SmallBusinessFinalCTA from '@/components/smallbusiness/SmallBusinessFinalCTA'
import SmallBusinessAnalytics from './SmallBusinessAnalytics'

export const metadata: Metadata = {
  title: 'AI Solutions for Small Business Australia | JOURN3Y-SMB',
  description: 'JOURN3Y-SMB helps Australian small businesses save 1-2 hours per person per day with AI. Fully managed AI platform for trades, real estate, healthcare, and professional services. 4-week deployment.',
  keywords: ['AI for small business', 'AI platform for Teams', 'real estate AI', 'construction AI', 'recruitment AI', 'business automation', 'productivity tools', 'small business AI Australia'],
  openGraph: {
    title: 'AI Solutions for Small Business | JOURN3Y',
    description: 'Transform your small business with AI-powered productivity solutions. Industry-specific AI platform for Teams implementation.',
    url: 'https://journ3y.com.au/products/small-business',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions for Small Business | JOURN3Y',
    description: 'Transform your small business with AI-powered productivity solutions.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/products/small-business',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SmallBusinessPage() {
  return (
    <>
      <Suspense fallback={null}>
        <SmallBusinessAnalytics />
      </Suspense>
      <SmallBusinessHeroSection />
      <SmallBusinessIndustrySelector />
      <SmallBusinessHowItWorksSection />
      <SmallBusinessFinalCTA />
    </>
  )
}
