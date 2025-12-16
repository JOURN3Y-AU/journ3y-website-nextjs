import { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import BlogPostCard from '@/components/blog/BlogPostCard'
import BlogFilters from './BlogFilters'
import NewsletterSignup from '@/components/blog/NewsletterSignup'

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

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  published_at: string
  image_url: string
  category: string
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name)')
    .order('published_at', { ascending: false })
    .limit(12)

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data.map(post => ({
    id: post.id as string,
    slug: post.slug as string,
    title: post.title as string,
    excerpt: post.excerpt as string,
    published_at: new Date(post.published_at as string).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    image_url: post.image_url as string,
    category: (post.blog_categories as any)?.name as string || ''
  }))
}

async function getCategories(): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_categories')
    .select('name')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data.map(cat => cat.name as string)
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories()
  ])

  return (
    <>
      {/* Header - Server Rendered */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-journey-purple/5 to-journey-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Blog & Insights</h1>
            <p className="text-xl text-gray-700 mb-8">
              Stay updated with the latest trends in AI and discover how businesses are transforming their operations with intelligent technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Categories - Client Component for interactivity */}
      <Suspense fallback={<div className="py-8 bg-white border-b border-gray-100" />}>
        <BlogFilters categories={categories} />
      </Suspense>

      {/* Blog Posts - Server Rendered Initial Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center p-12">
              <h3 className="text-2xl font-medium mb-4">No articles found</h3>
              <p className="text-gray-600 mb-6">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter - Can be server rendered */}
      <NewsletterSignup />
    </>
  )
}
