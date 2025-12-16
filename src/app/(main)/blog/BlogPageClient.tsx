'use client'

import useScrollReveal from '@/hooks/useScrollReveal'
import BlogSearch from '@/components/blog/BlogSearch'
import CategoryFilter from '@/components/blog/CategoryFilter'
import BlogGrid from '@/components/blog/BlogGrid'
import NewsletterSignup from '@/components/blog/NewsletterSignup'
import useBlogPosts from '@/hooks/useBlogPosts'

export default function BlogPageClient() {
  const {
    blogPosts,
    loading,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    currentPage,
    setCurrentPage,
    totalPages
  } = useBlogPosts()

  const headerRef = useScrollReveal()
  const contentRef = useScrollReveal()

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
            <BlogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={contentRef} className="reveal transition-all duration-700 ease-out">
            <BlogGrid
              loading={loading}
              posts={blogPosts}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setSearchQuery={setSearchQuery}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  )
}
