
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Calendar, Tag, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import { useMetaTags } from '@/hooks/useMetaTags';

// Define types for our blog post data
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  image_url: string;
  category: string;
  hashtags?: string[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Set dynamic meta tags based on the blog post
  useMetaTags(post ? {
    title: `${post.title} | JOURN3Y AI Consulting & Glean Experts Blog`,
    description: `${post.content.replace(/<[^>]*>/g, '').substring(0, 155)}... Expert insights on AI consulting and Glean implementation from JOURN3Y.`,
    keywords: `${post.category}, AI consulting, Glean implementation, ${post.hashtags?.join(', ') || ''}, ${post.title.toLowerCase().split(' ').join(', ')}, enterprise search, AI strategy`,
    ogTitle: `${post.title} | JOURN3Y AI Consulting Blog`,
    ogDescription: `${post.content.replace(/<[^>]*>/g, '').substring(0, 155)}...`,
    ogImage: post.image_url,
    ogUrl: `https://journ3y.com.au/blog/${post.slug}`,
    twitterTitle: `${post.title} | JOURN3Y AI Consulting`,
    twitterDescription: `${post.content.replace(/<[^>]*>/g, '').substring(0, 140)}...`,
    twitterImage: post.image_url
  } : {
    title: "Blog Post | JOURN3Y AI Consulting & Glean Experts",
    description: "Expert insights on AI consulting, Glean implementation, and enterprise search optimization from JOURN3Y's team of specialists.",
    ogUrl: `https://journ3y.com.au/blog/${slug}`
  });

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) {
        setError('Blog post not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Using type casting to properly type the query result
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, slug, title, content, published_at, image_url, category_id, hashtags, blog_categories(name)')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Error fetching blog post:', error);
          toast({
            title: "Error",
            description: "Failed to load blog post",
            variant: "destructive",
          });
          throw error;
        }

        if (data) {
          // Access the nested blog_categories object for the category name
          const categoryName = data.blog_categories?.name || '';
          
          setPost({
            id: data.id,
            slug: data.slug,
            title: data.title,
            content: data.content,
            published_at: new Date(data.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            image_url: data.image_url,
            category: categoryName,
            hashtags: data.hashtags || []
          });
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-journey-purple" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/blog">Return to Blog</Link>
        </Button>
      </div>
    );
  }

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
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Render HTML content with proper styling */}
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
              {/* Category */}
              <div className="flex items-center gap-2">
                <Tag className="text-journey-purple" />
                <span className="text-sm text-gray-600 mr-2">Category:</span>
                <Link 
                  to={`/blog?category=${post.category}`} 
                  className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-journey-purple/10 transition-colors"
                >
                  {post.category}
                </Link>
              </div>
              
              {/* Hashtags */}
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
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
