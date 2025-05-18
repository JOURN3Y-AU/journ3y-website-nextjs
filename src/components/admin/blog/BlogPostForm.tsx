
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { Category } from '@/types/blog';
import ImageUpload from './ImageUpload';

interface BlogPostFormProps {
  blogPost: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    category_id: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  categories: Category[];
  isNew: boolean;
  isSaving: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onImageRemove: () => void;
}

export default function BlogPostForm({
  blogPost,
  handleInputChange,
  handleImageChange,
  imagePreview,
  categories,
  isNew,
  isSaving,
  onSubmit,
  onImageRemove
}: BlogPostFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={blogPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={blogPost.slug}
              onChange={handleInputChange}
              required
              disabled={!isNew}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category_id"
              value={blogPost.category_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={blogPost.excerpt}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>
          
          <ImageUpload 
            imagePreview={imagePreview} 
            onImageChange={handleImageChange} 
            onImageRemove={onImageRemove}
            isNew={isNew}
            imageUrl={blogPost.image_url}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={blogPost.content}
            onChange={handleInputChange}
            className="min-h-[400px]"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-journey-purple hover:bg-journey-dark-purple flex items-center gap-2"
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Post'}
        </Button>
      </div>
    </form>
  );
}
