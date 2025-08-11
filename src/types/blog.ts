
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  category: string;
  featured_on_homepage: boolean;
  excerpt?: string;
  content?: string;
  image_url?: string;
  category_id?: string;
  hashtags?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category_id: string;
  hashtags: string[];
}
