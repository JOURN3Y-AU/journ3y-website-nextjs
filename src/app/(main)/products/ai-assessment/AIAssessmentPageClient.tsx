'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AssessmentHero from '@/components/assessment/AssessmentHero'
import AssessmentForm from '@/components/assessment/AssessmentForm'
import AssessmentResults from '@/components/assessment/AssessmentResults'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export type AssessmentAnswers = {
  q1_business_challenge: string
  q2_time_waste: string
  q3_revenue: string
  q4_timeline: string
  q5_investment_priority: string
  q6_leadership_readiness: string
}

export type ContactInfo = {
  first_name: string
  last_name: string
  email: string
  company_name: string
  phone_number?: string
}

export default function AIAssessmentPageClient() {
  const [currentStep, setCurrentStep] = useState<'hero' | 'questions' | 'contact' | 'results'>('hero')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [assessmentAnswers, setAssessmentAnswers] = useState<AssessmentAnswers | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    createAssessmentSession()
  }, [])

  const createAssessmentSession = async () => {
    try {
      const utmData = {
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
        utm_content: searchParams.get('utm_content'),
        utm_term: searchParams.get('utm_term'),
      }

      const { data, error } = await supabase
        .from('assessment_sessions')
        .insert({
          ip_address: null,
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          ...utmData,
        })
        .select()
        .single()

      if (error) throw error
      setSessionId(data.id)
    } catch (error) {
      console.error('Error creating assessment session:', error)
      toast({
        title: "Error",
        description: "Failed to start assessment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleStartAssessment = () => {
    setCurrentStep('questions')
  }

  const handleQuestionsComplete = (answers: AssessmentAnswers) => {
    setAssessmentAnswers(answers)
    setCurrentStep('contact')
  }

  const handleContactComplete = async (contact: ContactInfo) => {
    if (!sessionId || !assessmentAnswers) {
      toast({
        title: "Error",
        description: "Assessment data is missing. Please start over.",
        variant: "destructive",
      })
      return
    }

    setContactInfo(contact)
    setCurrentStep('results')
    setIsGenerating(true)

    try {
      const { data: responseData, error: responseError } = await supabase
        .from('assessment_responses')
        .insert({
          session_id: sessionId,
          ...contact,
          ...assessmentAnswers,
          ai_generation_status: 'generating',
        })
        .select()
        .single()

      if (responseError) throw responseError

      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        'generate-ai-assessment',
        {
          body: {
            responseId: responseData.id,
            answers: assessmentAnswers,
            contactInfo: contact,
          },
        }
      )

      if (aiError) throw aiError

      setAssessmentResult(aiData.assessment)
      setIsGenerating(false)

      await supabase
        .from('assessment_sessions')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', sessionId)

    } catch (error) {
      console.error('Error processing assessment:', error)
      setIsGenerating(false)
      setAssessmentResult(
        "Thank you for completing the assessment. Your responses show valuable insights about your AI readiness. Our team will review your specific situation and provide detailed recommendations during your strategy call."
      )
      toast({
        title: "Assessment Generated",
        description: "We've created your personalized assessment using our fallback system.",
        variant: "default",
      })
    }
  }

  const handleComplete = () => {
    router.push('/')
  }

  return (
    <>
      {currentStep === 'hero' && (
        <AssessmentHero onStartAssessment={handleStartAssessment} />
      )}

      {currentStep === 'questions' && (
        <AssessmentForm onComplete={handleQuestionsComplete} />
      )}

      {currentStep === 'contact' && (
        <AssessmentForm
          isContactStep={true}
          onComplete={handleContactComplete}
        />
      )}

      {currentStep === 'results' && (
        <AssessmentResults
          assessmentResult={assessmentResult}
          contactInfo={contactInfo}
          isGenerating={isGenerating}
          onComplete={handleComplete}
        />
      )}
    </>
  )
}
