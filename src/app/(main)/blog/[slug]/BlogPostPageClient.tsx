'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

interface BlogPost {
  id: string
  slug: string
  title: string
  content: string
  published_at: string
  image_url: string
  category: string
  hashtags: string[]
}

interface BlogPostPageClientProps {
  post: BlogPost
}

export default function BlogPostPageClient({ post }: BlogPostPageClientProps) {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative pt-32 pb-20 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${post.image_url})`
        }}
      >
        <div className="container mx-auto px-4 text-white relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-journey-purple px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {post.published_at}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white/20 bg-black/20"
            >
              <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:my-4 prose-a:text-journey-purple hover:prose-a:underline
                prose-ul:list-disc prose-ol:list-decimal prose-ul:ml-6 prose-ol:ml-6 prose-li:ml-2 prose-li:my-2"
            />
          </div>

          {/* Tags and Category */}
          <div className="mt-12 pt-8 border-t">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="text-journey-purple" />
                <span className="text-sm text-gray-600 mr-2">Category:</span>
                <Link
                  href={`/blog?category=${post.category}`}
                  className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-journey-purple/10 transition-colors"
                >
                  {post.category}
                </Link>
              </div>

              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex items-start gap-2">
                  <Tag className="text-journey-purple mt-1" />
                  <div>
                    <span className="text-sm text-gray-600 mr-2">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {post.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 rounded-full bg-journey-purple/10 text-sm text-journey-purple hover:bg-journey-purple/20 transition-colors"
                        >
                          #{hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8">
            <Button asChild className="bg-journey-purple hover:bg-journey-dark-purple">
              <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
