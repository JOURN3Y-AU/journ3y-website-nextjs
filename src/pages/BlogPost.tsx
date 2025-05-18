
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Calendar, Tag, Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  image_url: string;
  category: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) {
        setError('Blog post not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id,
            slug,
            title,
            content,
            published_at,
            image_url,
            blog_categories!inner (name)
          `)
          .eq('slug', slug)
          .single();

        if (error) throw error;

        if (data) {
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
            category: data.blog_categories.name
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
  }, [slug]);

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
            <Button asChild variant="outline" size="sm" className="border-white text-white hover:bg-white/20">
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Convert plain text into paragraphs */}
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Related Tags */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-2">
              <Tag className="text-journey-purple" />
              <Link 
                to={`/blog?category=${post.category}`} 
                className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-journey-purple/10 transition-colors"
              >
                {post.category}
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8">
            <Button asChild>
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
