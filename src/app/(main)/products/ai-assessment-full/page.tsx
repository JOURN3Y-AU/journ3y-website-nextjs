import { Metadata } from 'next'
import { Suspense } from 'react'
import AIAssessmentFullPageClient from './AIAssessmentFullPageClient'

export const metadata: Metadata = {
  title: 'Comprehensive AI Readiness Assessment | JOURN3Y',
  description: 'Take our comprehensive AI readiness assessment to evaluate your organization\'s AI maturity. Get expert insights from AI consultants and personalized recommendations for AI transformation.',
  keywords: ['AI readiness assessment', 'AI maturity assessment', 'AI strategy evaluation', 'AI consulting assessment', 'free AI assessment', 'AI transformation readiness'],
  openGraph: {
    title: 'Comprehensive AI Readiness Assessment | JOURN3Y',
    description: 'Comprehensive AI readiness assessment with expert insights and personalized recommendations for AI transformation.',
    url: 'https://www.journ3y.com.au/products/ai-assessment-full',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comprehensive AI Readiness Assessment | JOURN3Y',
    description: 'Comprehensive AI readiness assessment with expert insights.',
  },
  alternates: {
    canonical: 'https://www.journ3y.com.au/products/ai-assessment-full',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AIAssessmentFullPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-24 mt-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Comprehensive AI Readiness Assessment</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evaluate your organization's AI maturity and get personalized recommendations for AI transformation.
          </p>
        </div>
      </div>
    }>
      <AIAssessmentFullPageClient />
    </Suspense>
  )
}
