import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';
import { supabase } from '@/integrations/supabase/client';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Loader2 } from 'lucide-react';

// Define types for our blog posts and categories
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
  image_url: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();
  
  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        // Explicitly type the query result
        const { data, error } = await supabase
          .from('blog_categories')
          .select('name')
          .order('name');
          
        if (error) throw error;
        
        if (data) {
          // Type assertion to ensure data is treated as an array with name property
          const categoryNames = data.map(cat => cat.name);
          setCategories(['All', ...categoryNames]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    
    fetchCategories();
  }, []);
  
  // Fetch blog posts
  useEffect(() => {
    async function fetchBlogPosts() {
      setLoading(true);
      
      try {
        // First get total count for pagination
        let query = supabase
          .from('blog_posts')
          .select('*', { count: 'exact' });
          
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
        }
        
        if (activeCategory !== 'All') {
          // Get category id first, then use it in the filter
          const { data: categoryData } = await supabase
            .from('blog_categories')
            .select('id')
            .eq('name', activeCategory)
            .single();
            
          if (categoryData) {
            query = query.eq('category_id', categoryData.id);
          }
        }
        
        const { count, error: countError } = await query;
        
        if (countError) throw countError;
        setTotalPosts(count || 0);
        
        // Now fetch the actual data for the current page
        let dataQuery = supabase
          .from('blog_posts')
          .select('*, blog_categories(name)')
          .order('published_at', { ascending: false })
          .range((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE - 1);
          
        if (searchQuery) {
          dataQuery = dataQuery.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
        }
        
        if (activeCategory !== 'All') {
          const { data: categoryData } = await supabase
            .from('blog_categories')
            .select('id')
            .eq('name', activeCategory)
            .single();
            
          if (categoryData) {
            dataQuery = dataQuery.eq('category_id', categoryData.id);
          }
        }
        
        const { data, error } = await dataQuery;
        
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
            category: post.blog_categories?.name || ''
          }));
          
          setBlogPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlogPosts();
  }, [searchQuery, activeCategory, currentPage]);
  
  // Reset to first page when changing filter or search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);
  
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Filter posts by search query and category
  const filteredPosts = blogPosts;

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-journey-purple/5 to-journey-blue/5">
        <div className="container mx-auto px-4">
          <div ref={headerRef} className="max-w-3xl reveal transition-all duration-700 ease-out">
            <h1 className="text-5xl font-bold mb-6">Blog & Insights</h1>
            <p className="text-xl text-gray-700 mb-8">
              Stay updated with the latest trends in AI and discover how businesses are transforming their operations with intelligent technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full md:w-64">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"} 
                  size="sm"
                  className={activeCategory === category 
                    ? "bg-journey-purple hover:bg-journey-purple/90" 
                    : "border-gray-200"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={contentRef} className="reveal transition-all duration-700 ease-out">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-journey-purple" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center p-12">
                <h3 className="text-2xl font-medium mb-4">No articles found</h3>
                <p className="text-gray-600 mb-6">Try different search terms or categories.</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
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
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {post.excerpt}
                        </p>
                        <Link to={`/blog/${post.slug}`} className="text-journey-purple font-medium hover:underline mt-auto inline-block">
                          Read More →
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(i + 1);
                            }}
                            isActive={currentPage === i + 1}
                            className={currentPage === i + 1 ? "bg-journey-purple text-white hover:bg-journey-purple/90" : ""}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest AI insights and updates delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button className="bg-gradient-to-r from-journey-purple to-journey-blue text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
