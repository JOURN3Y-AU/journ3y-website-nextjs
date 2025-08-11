
import { useState, useEffect } from 'react';
import { useBlogPostForm } from './blog/useBlogPostForm';
import { useBlogCategories } from './blog/useBlogCategories';
import { useBlogImageUpload } from './blog/useBlogImageUpload';

export function useBlogPostEditor(slug?: string, isNew = false) {
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    blogPost,
    setBlogPost,
    isSaving,
    loadBlogPost,
    handleInputChange,
    handleContentChange,
    saveBlogPost
  } = useBlogPostForm(slug, isNew);

  const { categories, isLoading: categoriesLoading } = useBlogCategories(
    isNew, 
    (categoryId) => setBlogPost(prev => ({ ...prev, category_id: categoryId }))
  );

  const {
    imagePreview,
    handleImageChange,
    handleImageRemove,
    uploadImageIfNeeded
  } = useBlogImageUpload(blogPost.image_url);

  useEffect(() => {
    const initialize = async () => {
      await loadBlogPost();
      setIsLoading(false);
    };
    
    if (!categoriesLoading) {
      initialize();
    }
  }, [categoriesLoading]);

  const handleHashtagsChange = (hashtags: string[]) => {
    setBlogPost(prev => ({ ...prev, hashtags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload image if selected
      const imageUrl = await uploadImageIfNeeded(blogPost.image_url);
      await saveBlogPost(imageUrl);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  return {
    blogPost,
    categories,
    isLoading: isLoading || categoriesLoading,
    isSaving,
    imagePreview,
    handleInputChange,
    handleContentChange,
    handleImageChange,
    handleImageRemove,
    handleHashtagsChange,
    handleSubmit
  };
}
