'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'

export default function HeroScrollButton() {
  const scrollToIndustrySelector = () => {
    const element = document.getElementById('industry-selector')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }

    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_click', {
        section: 'hero',
        action: 'scroll_to_industries'
      })
    }
  }

  return (
    <Button
      onClick={scrollToIndustrySelector}
      size="lg"
      className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity group"
    >
      Explore Industry Solutions
      <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
    </Button>
  )
}
