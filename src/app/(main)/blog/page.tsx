import { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'AI & Glean Insights Blog | JOURN3Y AI Consulting',
  description: 'Expert insights on AI consulting, Glean implementation best practices, enterprise search optimization, and AI transformation strategies from leading AI consultants and Glean specialists.',
  keywords: ['AI blog', 'Glean insights', 'AI consulting tips', 'enterprise search best practices', 'Glean implementation guide', 'AI transformation insights', 'Glean consultant advice'],
  openGraph: {
    title: 'AI & Glean Insights Blog | JOURN3Y AI Consulting',
    description: 'Expert insights on AI consulting, Glean implementation, and enterprise search optimization from leading AI consultants.',
    url: 'https://journ3y.com.au/blog',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Glean Insights Blog | JOURN3Y AI Consulting',
    description: 'Expert insights on AI consulting, Glean implementation, and enterprise search optimization.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
