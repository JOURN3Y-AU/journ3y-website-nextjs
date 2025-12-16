'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SmallBusinessHeroSection from '@/components/smallbusiness/SmallBusinessHeroSection'
import SmallBusinessIndustrySelector from '@/components/smallbusiness/SmallBusinessIndustrySelector'
import SmallBusinessHowItWorksSection from '@/components/smallbusiness/SmallBusinessHowItWorksSection'
import SmallBusinessFinalCTA from '@/components/smallbusiness/SmallBusinessFinalCTA'

export default function SmallBusinessPageClient() {
  const searchParams = useSearchParams()
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  useEffect(() => {
    const params: Record<string, string> = {}

    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') || key === 'industry') {
        params[key] = value
      }
    })

    setUtmParams(params)

    // Track page view with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Small Business Solutions',
        page_location: window.location.href,
        industry: params.industry || 'default'
      })
    }
  }, [searchParams])

  return (
    <>
      <SmallBusinessHeroSection utmParams={utmParams} />
      <SmallBusinessIndustrySelector utmParams={utmParams} />
      <SmallBusinessHowItWorksSection />
      <SmallBusinessFinalCTA utmParams={utmParams} />
    </>
  )
}
