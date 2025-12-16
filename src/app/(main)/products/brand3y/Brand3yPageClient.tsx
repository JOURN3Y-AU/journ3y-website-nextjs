'use client'

import { useState } from 'react'
import Brand3yHeroSection from '@/components/brand3y/Brand3yHeroSection'
import Brand3yIntegrationsSection from '@/components/brand3y/Brand3yIntegrationsSection'
import Brand3yComingSoonSection from '@/components/brand3y/Brand3yComingSoonSection'
import Brand3yFAQSection from '@/components/brand3y/Brand3yFAQSection'
import Brand3yThankYouDialog from '@/components/brand3y/Brand3yThankYouDialog'

export default function Brand3yPageClient() {
  const [showThankYou, setShowThankYou] = useState(false)

  const handleFormSubmitSuccess = () => {
    setShowThankYou(true)
  }

  return (
    <>
      <Brand3yHeroSection />
      <Brand3yIntegrationsSection />
      <Brand3yComingSoonSection onFormSubmitSuccess={handleFormSubmitSuccess} />
      <Brand3yFAQSection />
      <Brand3yThankYouDialog
        open={showThankYou}
        onOpenChange={setShowThankYou}
      />
    </>
  )
}
