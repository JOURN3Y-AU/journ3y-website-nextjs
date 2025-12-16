import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us | AI Consulting & Glean Implementation | JOURN3Y',
  description: 'Get in touch with JOURN3Y for AI consulting, Glean implementation, and enterprise search solutions. Request a consultation with our expert AI consultants.',
  keywords: ['contact JOURN3Y', 'AI consulting contact', 'Glean implementation inquiry', 'enterprise search consultation', 'AI transformation contact'],
  openGraph: {
    title: 'Contact Us | AI Consulting & Glean Implementation | JOURN3Y',
    description: 'Get in touch with JOURN3Y for AI consulting, Glean implementation, and enterprise search solutions.',
    url: 'https://journ3y.com.au/contact',
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
    canonical: 'https://journ3y.com.au/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
