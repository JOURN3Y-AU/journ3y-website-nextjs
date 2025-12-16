import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import BlogPostPageClient from './BlogPostPageClient'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata from the blog post data
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, content, image_url, hashtags, blog_categories(name)')
    .eq('slug', slug)
    .single()

  if (!post) {
    return {
      title: 'Blog Post Not Found | JOURN3Y',
      description: 'The blog post you are looking for could not be found.',
    }
  }

  const plainContent = post.content.replace(/<[^>]*>/g, '')
  const description = plainContent.substring(0, 155) + '...'
  const categoryName = post.blog_categories?.name || ''
  const keywords = [
    categoryName,
    'AI consulting',
    'Glean implementation',
    ...(post.hashtags || []),
    ...post.title.toLowerCase().split(' '),
    'enterprise search',
    'AI strategy'
  ].filter(Boolean)

  return {
    title: `${post.title} | JOURN3Y AI Consulting Blog`,
    description: `${description} Expert insights on AI consulting and Glean implementation from JOURN3Y.`,
    keywords,
    openGraph: {
      title: `${post.title} | JOURN3Y AI Consulting Blog`,
      description,
      url: `https://journ3y.com.au/blog/${slug}`,
      siteName: 'JOURN3Y',
      locale: 'en_AU',
      type: 'article',
      images: post.image_url ? [{ url: post.image_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | JOURN3Y AI Consulting`,
      description: plainContent.substring(0, 140) + '...',
      images: post.image_url ? [post.image_url] : undefined,
    },
    alternates: {
      canonical: `https://journ3y.com.au/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, content, published_at, image_url, category_id, hashtags, blog_categories(name)')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    notFound()
  }

  const categoryName = post.blog_categories?.name || ''

  const formattedPost = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    published_at: new Date(post.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    image_url: post.image_url,
    category: categoryName,
    hashtags: post.hashtags || []
  }

  return <BlogPostPageClient post={formattedPost} />
}
