'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SmallBusinessAnalytics() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const params: Record<string, string> = {}

    searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') || key === 'industry') {
        params[key] = value
      }
    })

    // Track page view with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Small Business Solutions',
        page_location: window.location.href,
        industry: params.industry || 'default'
      })
    }
  }, [searchParams])

  return null
}
