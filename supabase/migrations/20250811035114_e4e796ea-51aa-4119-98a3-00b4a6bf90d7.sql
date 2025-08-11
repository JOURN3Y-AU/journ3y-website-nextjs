-- Add Glean category to blog_categories
INSERT INTO public.blog_categories (name) VALUES ('Glean');

-- Add hashtags column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN hashtags TEXT[] DEFAULT '{}';

-- Add an index on hashtags for better search performance
CREATE INDEX idx_blog_posts_hashtags ON public.blog_posts USING GIN(hashtags);