'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase/client'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Please enter your name'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  })
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formInteracted, setFormInteracted] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Contact Form Page',
        content_category: 'contact'
      })
    }
  }, [])

  const trackFormInteraction = () => {
    if (!formInteracted) {
      setFormInteracted(true)
      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: 'Contact Form Started',
          content_category: 'form_interaction'
        })
      }
    }
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formInteracted && !isSuccess) {
        if (typeof (window as any).fbq !== 'undefined') {
          (window as any).fbq('track', 'CustomizeProduct', {
            content_name: 'Contact Form Abandoned',
            content_category: 'form_abandonment'
          })
        }
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [formInteracted, isSuccess])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const campaignData = {
        campaign_source: 'small-business-page',
        utm_source: searchParams.get('utm_source'),
        utm_medium: searchParams.get('utm_medium'),
        utm_campaign: searchParams.get('utm_campaign'),
        selected_industry: searchParams.get('industry'),
        page_section: searchParams.get('inquiry') || 'contact_form'
      }

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...data,
          message: 'Request for information pack',
          service: 'small-business',
          campaignData
        }
      })
      if (error) throw new Error(error.message)

      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Contact Form Submitted',
          content_category: 'small-business',
          value: 1.00,
          currency: 'AUD'
        })
      }
      setIsSuccess(true)
      toast({
        title: 'Message sent!',
        description: "We've received your inquiry and will get back to you soon."
      })
      form.reset()
    } catch (error) {
      console.error('Error submitting contact form:', error)

      if (typeof (window as any).fbq !== 'undefined') {
        (window as any).fbq('trackCustom', 'FormError', {
          content_name: 'Contact Form Submission Error',
          error_message: error instanceof Error ? error.message : 'Unknown error'
        })
      }
      toast({
        title: 'Something went wrong',
        description: 'Failed to send your message. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-semibold mb-6">Share your details here</h2>

      {isSuccess ? (
        <div className="text-center py-8">
          <div className="mb-4 text-journey-purple">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Thank You!</h3>
          <p className="mb-6 text-gray-600">
            Your message has been sent successfully. Our team will get back to you shortly.
          </p>
          <Button onClick={() => setIsSuccess(false)}>Send Another Message</Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} onFocus={trackFormInteraction} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} onFocus={trackFormInteraction} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-journey-purple to-journey-blue text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Request my free information pack'}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
