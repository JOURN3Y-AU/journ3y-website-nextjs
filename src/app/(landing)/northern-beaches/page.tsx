import { Metadata } from 'next'
import NorthernBeachesPageClient from './NorthernBeachesPageClient'

export const metadata: Metadata = {
  title: 'Find 5-10 Hours Per Week for Your Business | JOURN3Y AI - Northern Beaches',
  description: 'See how Northern Beaches businesses are using AI to cut admin time in half - without hiring more staff. Book your free 15-minute discovery call.',
  keywords: ['Northern Beaches AI', 'small business AI', 'AI automation Sydney', 'business productivity AI'],
  openGraph: {
    title: 'Find 5-10 Hours Per Week for Your Business | JOURN3Y AI - Northern Beaches',
    description: 'See how Northern Beaches businesses are using AI to cut admin time in half - without hiring more staff.',
    url: 'https://www.journ3y.com.au/northern-beaches',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function NorthernBeachesPage() {
  return <NorthernBeachesPageClient />
}
