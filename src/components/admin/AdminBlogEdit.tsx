'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import BlogPostForm from './blog/BlogPostForm'
import { useBlogPostEditor } from '@/hooks/useBlogPostEditor'

interface AdminBlogEditProps {
  onLogout: () => void
  isNew?: boolean
  slug?: string
}

export default function AdminBlogEdit({ onLogout, isNew = false, slug }: AdminBlogEditProps) {
  const router = useRouter()

  const {
    blogPost,
    categories,
    isLoading,
    isSaving,
    imagePreview,
    handleInputChange,
    handleContentChange,
    handleImageChange,
    handleImageRemove,
    handleHashtagsChange,
    handleSubmit
  } = useBlogPostEditor(slug, isNew)

  if (isLoading) {
    return <div className="container mx-auto py-10 px-4">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {isNew ? 'Create New Blog Post' : 'Edit Blog Post'}
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push('/admin')}>
            Cancel
          </Button>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>

      <BlogPostForm
        blogPost={blogPost}
        handleInputChange={handleInputChange}
        handleContentChange={handleContentChange}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        categories={categories}
        isNew={isNew}
        isSaving={isSaving}
        onSubmit={handleSubmit}
        onImageRemove={handleImageRemove}
        onHashtagsChange={handleHashtagsChange}
      />
    </div>
  )
}
