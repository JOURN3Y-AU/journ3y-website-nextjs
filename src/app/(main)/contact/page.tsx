import { Metadata } from 'next'
import { Suspense } from 'react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | AI Consulting & Glean Implementation | JOURN3Y',
  description: 'Get in touch with JOURN3Y for AI consulting, Glean implementation, and enterprise search solutions. Request a consultation with our expert AI consultants.',
  keywords: ['contact JOURN3Y', 'AI consulting contact', 'Glean implementation inquiry', 'enterprise search consultation', 'AI transformation contact'],
  openGraph: {
    title: 'Contact Us | AI Consulting & Glean Implementation | JOURN3Y',
    description: 'Get in touch with JOURN3Y for AI consulting, Glean implementation, and enterprise search solutions.',
    url: 'https://www.journ3y.com.au/contact',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | AI Consulting & Glean Implementation | JOURN3Y',
    description: 'Get in touch with JOURN3Y for AI consulting and Glean implementation.',
  },
  alternates: {
    canonical: 'https://www.journ3y.com.au/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactPage() {
  return (
    <>
      {/* Header - Server Rendered */}
      <section className="pt-24 pb-8 bg-gradient-to-r from-journey-purple/5 to-journey-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Time is your most precious resource... let AI give it back</h1>
            <p className="text-xl text-gray-700 mb-8">Share your details below and we'll send you a complimentary information pack</p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form - Client Component */}
            <Suspense fallback={<div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 animate-pulse h-96" />}>
              <ContactForm />
            </Suspense>

            {/* Contact Information - Server Rendered */}
            <div className="bg-gray-50 rounded-lg p-8 h-full">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-journey-purple/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email Us</h3>
                    <p className="text-gray-600">info@journ3y.com.au</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-journey-dark-purple/10 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-journey-dark-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                    <p className="text-gray-600">Sydney, NSW 2000</p>
                    <p className="text-gray-600">Australia</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/company/journ3y-au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-journey-purple hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
