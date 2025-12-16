'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useScrollReveal from '@/hooks/useScrollReveal'
import { supabase } from '@/lib/supabase/client'

interface FeaturedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
  image_url: string;
  category: string;
}

const BlogSection = () => {
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const blogSectionRef = useScrollReveal();

  // Fetch featured blog posts
  useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*, blog_categories(name)')
          .eq('featured_on_homepage', true)
          .order('published_at', { ascending: false })
          .limit(3);
          
        if (error) throw error;
        
        if (data) {
          const formattedPosts = data.map(post => ({
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
            category: post.blog_categories?.name as string || ''
          }));
          
          setFeaturedPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFeaturedPosts();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={blogSectionRef} className="text-center mb-16 reveal transition-all duration-500 ease-out">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest AI trends and industry insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <div className="flex justify-center items-center col-span-3 h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-journey-purple"></div>
            </div>
          ) : featuredPosts.length === 0 ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-lg text-gray-600">No featured blog posts available.</p>
              <Button asChild className="mt-4">
                <Link href="/blog">Browse All Articles</Link>
              </Button>
            </div>
          ) : (
            featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={post.image_url} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.published_at}</div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-journey-purple transition-colors tracking-tight">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="text-journey-purple font-medium hover:underline">
                    Read More →
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-journey-purple text-journey-purple hover:bg-journey-purple/10">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
