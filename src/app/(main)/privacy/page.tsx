import { Metadata } from 'next'
import PrivacyPageClient from './PrivacyPageClient'

export const metadata: Metadata = {
  title: 'Privacy Policy | JOURN3Y',
  description: 'JOURN3Y Privacy Policy. Learn how we collect, use, and protect your personal information in accordance with Australian Privacy Principles.',
  keywords: ['privacy policy', 'JOURN3Y privacy', 'data protection', 'Australian Privacy Principles'],
  openGraph: {
    title: 'Privacy Policy | JOURN3Y',
    description: 'JOURN3Y Privacy Policy. Learn how we collect, use, and protect your personal information.',
    url: 'https://journ3y.com.au/privacy',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | JOURN3Y',
    description: 'JOURN3Y Privacy Policy. Learn how we collect, use, and protect your personal information.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
