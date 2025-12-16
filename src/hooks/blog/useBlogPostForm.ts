'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export type BlogPostFormState = {
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  category_id: string
  hashtags: string[]
}

export function useBlogPostForm(initialSlug?: string, isNew = false) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [blogPost, setBlogPost] = useState<BlogPostFormState>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category_id: '',
    hashtags: []
  })

  const loadBlogPost = async () => {
    if (isNew) {
      return true
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', initialSlug)
        .single()

      if (error) throw error

      if (data) {
        setBlogPost({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          image_url: data.image_url,
          category_id: data.category_id,
          hashtags: data.hashtags || []
        })
      }
      return true
    } catch (error) {
      console.error('Error fetching blog post:', error)
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      })
      router.push('/admin')
      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'title' && isNew) {
      // Auto-generate slug from title for new posts
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      setBlogPost(prev => ({
        ...prev,
        [name]: value,
        slug
      }))
    } else {
      setBlogPost(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleContentChange = (html: string) => {
    setBlogPost(prev => ({
      ...prev,
      content: html
    }))
  }

  const saveBlogPost = async (imageUrl: string) => {
    setIsSaving(true)

    try {
      const postData = {
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        content: blogPost.content,
        image_url: imageUrl,
        category_id: blogPost.category_id,
        hashtags: blogPost.hashtags
      }

      let error

      if (isNew) {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([postData])
        error = insertError
      } else {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('slug', initialSlug)
        error = updateError
      }

      if (error) throw error

      toast({
        title: "Success",
        description: isNew ? "Blog post created successfully" : "Blog post updated successfully",
      })

      router.push('/admin')
      return true
    } catch (error) {
      console.error('Error saving blog post:', error)
      toast({
        title: "Error",
        description: `Failed to ${isNew ? 'create' : 'update'} blog post`,
        variant: "destructive",
      })
      return false
    } finally {
      setIsSaving(false)
    }
  }

  return {
    blogPost,
    setBlogPost,
    isSaving,
    loadBlogPost,
    handleInputChange,
    handleContentChange,
    saveBlogPost
  }
}
