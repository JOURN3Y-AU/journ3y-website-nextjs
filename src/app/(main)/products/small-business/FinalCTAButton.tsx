'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function FinalCTAButton() {
  const searchParams = useSearchParams()

  const handleCTAClick = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_click', {
        section: 'final',
        action: 'request_demo',
        campaign: searchParams.get('utm_campaign') || 'direct'
      })
    }
  }

  return (
    <Button
      asChild
      size="lg"
      className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-8"
    >
      <Link
        href={`/contact?service=small-business&inquiry=demo&utm_source=${searchParams.get('utm_source') || 'page'}`}
        onClick={handleCTAClick}
      >
        Get Your Free Demo
        <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </Button>
  )
}
