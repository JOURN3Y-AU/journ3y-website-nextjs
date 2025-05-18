
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/components/admin/ImageUploadService';
import { Category } from '@/types/blog';

export function useBlogPostEditor(slug?: string, isNew = false) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [blogPost, setBlogPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category_id: ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_categories')
          .select('id, name')
          .order('name');
          
        if (error) throw error;
        
        if (data) {
          setCategories(data);
          if (data.length > 0 && isNew) {
            setBlogPost(prev => ({ ...prev, category_id: data[0].id }));
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
      }
    };
    
    const fetchBlogPost = async () => {
      if (isNew) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setBlogPost({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            image_url: data.image_url,
            category_id: data.category_id
          });
          
          setImagePreview(data.image_url);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        });
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
    fetchBlogPost();
  }, [slug, isNew, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'title' && isNew) {
      // Auto-generate slug from title for new posts
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      setBlogPost(prev => ({
        ...prev,
        [name]: value,
        slug
      }));
    } else {
      setBlogPost(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleContentChange = (html: string) => {
    setBlogPost(prev => ({
      ...prev,
      content: html
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
    setBlogPost(prev => ({ ...prev, image_url: '' }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Upload image if selected
      let imageUrl = blogPost.image_url;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const postData = {
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        content: blogPost.content,
        image_url: imageUrl,
        category_id: blogPost.category_id
      };
      
      let error;
      
      if (isNew) {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([postData]);
        error = insertError;
      } else {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('slug', slug);
        error = updateError;
      }
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: isNew ? "Blog post created successfully" : "Blog post updated successfully",
      });
      
      navigate('/admin');
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: `Failed to ${isNew ? 'create' : 'update'} blog post`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    blogPost,
    setBlogPost,
    categories,
    isLoading,
    isSaving,
    imagePreview,
    handleInputChange,
    handleContentChange,
    handleImageChange,
    handleImageRemove,
    handleSubmit
  };
}
