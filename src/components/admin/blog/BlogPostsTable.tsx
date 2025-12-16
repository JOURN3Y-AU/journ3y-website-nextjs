import Link from 'next/link'
import { Pencil, Star, StarOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DeletePostButton from './DeletePostButton';
import FeaturePostButton from './FeaturePostButton';
import { BlogPost } from '@/types/blog';

interface BlogPostsTableProps {
  posts: BlogPost[];
  onDeletePost: (id: string) => void;
  onToggleFeature: (id: string, newStatus: boolean) => void;
  loading: boolean;
}

export default function BlogPostsTable({ 
  posts, 
  onDeletePost, 
  onToggleFeature, 
  loading 
}: BlogPostsTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-journey-purple"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return <div className="text-center py-6">No blog posts yet</div>;
  }

  return (
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
          {posts.map((post) => (
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
                  <FeaturePostButton 
                    post={post} 
                    onToggleFeature={onToggleFeature} 
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    asChild
                  >
                    <Link href={`/admin/edit/${post.slug}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeletePostButton 
                    post={post} 
                    onDelete={onDeletePost} 
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
