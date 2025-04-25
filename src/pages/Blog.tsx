
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useScrollReveal from '@/hooks/useScrollReveal';

// Mock blog data
const blogPosts = [
  {
    id: 'understanding-ai',
    title: 'Understanding AI Integration In Modern Businesses',
    excerpt: 'Explore how businesses are leveraging AI to transform operations and improve customer experiences.',
    date: 'May 15, 2023',
    category: 'AI Strategy',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ai-strategy',
    title: 'Building an Effective AI Strategy For Your Business',
    excerpt: 'Learn how to develop a comprehensive AI strategy that aligns with your business goals.',
    date: 'April 28, 2023',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'data-ethics',
    title: 'Ethical Considerations in AI Development',
    excerpt: 'Navigating the complex ethical landscape of artificial intelligence and responsible development.',
    date: 'April 10, 2023',
    category: 'Ethics',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ai-hiring',
    title: 'How AI is Transforming the Recruitment Process',
    excerpt: 'Discover how companies are using AI to streamline hiring and find the right talent.',
    date: 'March 22, 2023',
    category: 'HR Tech',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'machine-learning-basics',
    title: 'Machine Learning Fundamentals for Business Leaders',
    excerpt: 'A non-technical guide to understanding machine learning concepts for executives.',
    date: 'March 5, 2023',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ai-analytics',
    title: 'Leveraging AI for Enhanced Business Analytics',
    excerpt: 'How AI-powered analytics tools are providing deeper insights and forecasting capabilities.',
    date: 'February 18, 2023',
    category: 'Analytics',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
  },
];

// Mock categories
const categories = [
  'All',
  'AI Strategy',
  'Analytics',
  'Ethics',
  'HR Tech',
  'Education',
  'Strategy',
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();
  
  // Filter posts by search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

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
            {filteredPosts.length === 0 ? (
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-journey-purple font-medium">{post.category}</span>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 hover:text-journey-purple transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <Link to={`/blog/${post.id}`} className="text-journey-purple font-medium hover:underline mt-auto inline-block">
                        Read More →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
