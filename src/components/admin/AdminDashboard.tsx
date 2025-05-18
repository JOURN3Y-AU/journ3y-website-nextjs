
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlogPostsTable from './blog/BlogPostsTable';
import { supabase } from '@/integrations/supabase/client';
import { User, Edit, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BlogPost } from '@/types/blog';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setCurrentUserEmail(data.user.email);
      }
    };
    
    fetchUserData();
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(name)')
        .order('published_at', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        const formattedPosts = data.map(post => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          published_at: new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          image_url: post.image_url,
          category: (post.blog_categories as any)?.name || '',
          featured_on_homepage: post.featured_on_homepage
        }));
        
        setBlogPosts(formattedPosts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the UI by removing the deleted post
      setBlogPosts(blogPosts.filter(post => post.id !== id));
      
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive"
      });
    }
  };

  const handleToggleFeature = async (id: string, newStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ featured_on_homepage: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the UI by updating the featured status
      setBlogPosts(
        blogPosts.map(post => 
          post.id === id ? { ...post, featured_on_homepage: newStatus } : post
        )
      );
      
      toast({
        title: "Success",
        description: `Post ${newStatus ? 'featured' : 'unfeatured'} successfully`,
      });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update post featured status",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {currentUserEmail && (
            <p className="text-gray-500 mt-1">Logged in as: {currentUserEmail}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/admin/users')} variant="outline" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
          <Button onClick={() => navigate('/admin/team')} variant="outline" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Manage Team
          </Button>
          <Button onClick={() => navigate('/admin/new')} variant="default" className="flex items-center">
            <Edit className="mr-2 h-4 w-4" />
            New Post
          </Button>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <BlogPostsTable 
          posts={blogPosts} 
          onDeletePost={handleDeletePost}
          onToggleFeature={handleToggleFeature}
          loading={loading}
        />
      </div>
    </div>
  );
}
