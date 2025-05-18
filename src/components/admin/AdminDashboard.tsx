
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, Plus, LogOut, Star, StarOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  category: string;
  featured_on_homepage: boolean;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch blog posts
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*, blog_categories(name)')
          .order('published_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedPosts = data.map(post => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            published_at: new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            category: post.blog_categories?.name || '',
            featured_on_homepage: post.featured_on_homepage || false
          }));
          
          setBlogPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load blog posts',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlogPosts();
  }, [toast]);

  // Delete a blog post
  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Update the UI by removing the deleted post
        setBlogPosts(blogPosts.filter(post => post.id !== id));
        
        toast({
          title: 'Post deleted',
          description: `"${title}" has been deleted successfully`,
        });
      } catch (error) {
        console.error('Error deleting post:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete the post',
          variant: 'destructive',
        });
      }
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id: string, title: string, currentStatus: boolean) => {
    try {
      // Get the current count of featured posts
      const { data: featuredPosts, error: countError } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('featured_on_homepage', true);
      
      if (countError) throw countError;
      
      // If trying to feature a post and already have 3 featured posts, show error
      if (!currentStatus && featuredPosts && featuredPosts.length >= 3) {
        toast({
          title: 'Cannot feature more posts',
          description: 'You can only have up to 3 posts featured on the homepage',
          variant: 'destructive',
        });
        return;
      }
      
      // Update the post's featured status
      const { error } = await supabase
        .from('blog_posts')
        .update({ featured_on_homepage: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      // Update the UI
      setBlogPosts(blogPosts.map(post => 
        post.id === id 
          ? { ...post, featured_on_homepage: !currentStatus } 
          : post
      ));
      
      toast({
        title: currentStatus ? 'Post unfeatured' : 'Post featured',
        description: `"${title}" is ${currentStatus ? 'no longer featured' : 'now featured'} on the homepage`,
      });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update featured status',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button asChild variant="default">
            <Link to="/admin/new">
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Link>
          </Button>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-journey-purple"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Published</th>
                    <th className="text-left py-3 px-4">Featured</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6">No blog posts yet</td>
                    </tr>
                  ) : (
                    blogPosts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{post.title}</td>
                        <td className="py-3 px-4">{post.category}</td>
                        <td className="py-3 px-4">{post.published_at}</td>
                        <td className="py-3 px-4">
                          {post.featured_on_homepage ? (
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          ) : (
                            <StarOff className="h-5 w-5 text-gray-300" />
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleFeatured(post.id, post.title, post.featured_on_homepage)}
                              title={post.featured_on_homepage ? "Unfeature from homepage" : "Feature on homepage"}
                            >
                              {post.featured_on_homepage ? (
                                <StarOff className="h-4 w-4" />
                              ) : (
                                <Star className="h-4 w-4" />
                              )}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              asChild
                            >
                              <Link to={`/admin/edit/${post.slug}`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(post.id, post.title)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
