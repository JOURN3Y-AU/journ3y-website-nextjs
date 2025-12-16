import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface BlogPostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    published_at: string;
    image_url: string;
    category: string;
  };
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <img 
        src={post.image_url} 
        alt={post.title} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-journey-purple font-medium">{post.category}</span>
          <span className="text-sm text-gray-500">{post.published_at}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 hover:text-journey-purple transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-gray-600 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <Link href={`/blog/${post.slug}`} className="text-journey-purple font-medium hover:underline mt-auto inline-block">
          Read More →
        </Link>
      </CardContent>
    </Card>
  );
}
