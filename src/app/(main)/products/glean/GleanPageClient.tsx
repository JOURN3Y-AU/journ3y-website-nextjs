'use client'

import { useState } from 'react'
import GleanHeroSection from '@/components/glean/GleanHeroSection'
import GleanCoreFeaturesSection from '@/components/glean/GleanCoreFeaturesSection'
import GleanPlatformSection from '@/components/glean/GleanPlatformSection'
import GleanPartnerBenefitsSection from '@/components/glean/GleanPartnerBenefitsSection'
import GleanIntegrationSection from '@/components/glean/GleanIntegrationSection'
import GleanSuccessMetricsSection from '@/components/glean/GleanSuccessMetricsSection'
import GleanDemoSection from '@/components/glean/GleanDemoSection'
import GleanThankYouDialog from '@/components/glean/GleanThankYouDialog'

export default function GleanPageClient() {
  const [showThankYou, setShowThankYou] = useState(false)

  const handleFormSubmitSuccess = () => {
    setShowThankYou(true)
  }

  return (
    <>
      <GleanHeroSection />
      <GleanCoreFeaturesSection />
      <GleanPlatformSection />
      <GleanPartnerBenefitsSection />
      <GleanIntegrationSection />
      <GleanSuccessMetricsSection />
      <GleanDemoSection onFormSubmitSuccess={handleFormSubmitSuccess} />
      <GleanThankYouDialog
        open={showThankYou}
        onOpenChange={setShowThankYou}
      />
    </>
  )
}
