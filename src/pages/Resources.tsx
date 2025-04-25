
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhitePaperForm from '@/components/WhitePaperForm';
import useScrollReveal from '@/hooks/useScrollReveal';

// Mock whitepaper data
const whitepapers = [
  {
    id: 'future-ai-whitepaper',
    title: 'The Future of AI in Business: Trends and Predictions',
    summary: 'This comprehensive white paper examines emerging AI trends and how they will shape business operations in the coming years.',
    date: 'June 2023',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ai-automation-guide',
    title: 'Complete Guide to AI-Powered Automation',
    summary: 'Discover how businesses can implement AI automation effectively and maximize ROI across different departments.',
    date: 'May 2023',
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'data-governance-ai',
    title: 'Data Governance Frameworks for AI Implementation',
    summary: 'Best practices for managing data in AI-driven organizations, ensuring compliance and security.',
    date: 'April 2023',
    category: 'Compliance',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'machine-learning-roi',
    title: 'Measuring ROI on Machine Learning Projects',
    summary: 'Frameworks and metrics for evaluating the business impact of machine learning investments.',
    date: 'March 2023',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ai-hiring-toolkit',
    title: 'AI in Recruitment: The Complete Toolkit',
    summary: 'Implementing AI into your hiring processes to reduce bias and find the best candidates more efficiently.',
    date: 'February 2023',
    category: 'HR',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nlp-business-applications',
    title: 'Natural Language Processing: Business Applications',
    summary: 'How NLP technologies are transforming customer service, marketing, and internal communications.',
    date: 'January 2023',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
];

// Mock case studies
const caseStudies = [
  {
    id: 'finance-transformation',
    title: 'Global Bank Automates Risk Assessment',
    client: 'Leading Financial Institution',
    summary: 'How a major bank implemented AI to automate risk assessment, reducing processing time by 85%.',
    industry: 'Finance',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'healthcare-ai',
    title: 'AI-Powered Diagnostics in Healthcare',
    client: 'Regional Hospital Network',
    summary: 'Implementing machine learning for image analysis, improving diagnostic accuracy by 32%.',
    industry: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'retail-personalization',
    title: 'Retail Personalization Engine',
    client: 'E-commerce Leader',
    summary: 'How an e-commerce platform increased conversion rates by 41% using AI-driven personalization.',
    industry: 'Retail',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWhitepaper, setSelectedWhitepaper] = useState<string | null>(null);
  
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();
  
  // Filter whitepapers by search query
  const filteredWhitepapers = whitepapers.filter(whitepaper => {
    return whitepaper.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           whitepaper.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
           whitepaper.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter case studies by search query
  const filteredCaseStudies = caseStudies.filter(caseStudy => {
    return caseStudy.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           caseStudy.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
           caseStudy.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
           caseStudy.client.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-journey-purple/5 to-journey-blue/5">
        <div className="container mx-auto px-4">
          <div ref={headerRef} className="max-w-3xl reveal transition-all duration-700 ease-out">
            <h1 className="text-5xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-gray-700 mb-8">
              Access our collection of white papers, case studies, and research to enhance your knowledge of AI and its business applications.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={contentRef} className="reveal transition-all duration-700 ease-out">
            <Tabs defaultValue="whitepapers" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="whitepapers" className="px-6">White Papers</TabsTrigger>
                  <TabsTrigger value="casestudies" className="px-6">Case Studies</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="whitepapers">
                {selectedWhitepaper ? (
                  <div className="max-w-2xl mx-auto">
                    <Button 
                      variant="outline" 
                      className="mb-6" 
                      onClick={() => setSelectedWhitepaper(null)}
                    >
                      ← Back to White Papers
                    </Button>
                    
                    <WhitePaperForm 
                      whitePaperId={selectedWhitepaper}
                      title={whitepapers.find(wp => wp.id === selectedWhitepaper)?.title || "Download White Paper"}
                    />
                  </div>
                ) : (
                  <>
                    {filteredWhitepapers.length === 0 ? (
                      <div className="text-center p-12">
                        <h3 className="text-2xl font-medium mb-4">No white papers found</h3>
                        <p className="text-gray-600 mb-6">Try different search terms.</p>
                        <Button 
                          variant="outline"
                          onClick={() => setSearchQuery('')}
                        >
                          Clear search
                        </Button>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredWhitepapers.map((whitepaper) => (
                          <Card key={whitepaper.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                            <img 
                              src={whitepaper.image} 
                              alt={whitepaper.title} 
                              className="w-full h-48 object-cover"
                            />
                            <CardContent className="p-6 flex-grow flex flex-col">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-journey-purple font-medium">{whitepaper.category}</span>
                                <span className="text-sm text-gray-500">{whitepaper.date}</span>
                              </div>
                              <h3 className="text-xl font-semibold mb-3">
                                {whitepaper.title}
                              </h3>
                              <p className="text-gray-600 mb-4 flex-grow">
                                {whitepaper.summary}
                              </p>
                              <Button 
                                onClick={() => setSelectedWhitepaper(whitepaper.id)}
                                className="w-full bg-gradient-to-r from-journey-purple to-journey-blue text-white mt-auto"
                              >
                                Download
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="casestudies">
                {filteredCaseStudies.length === 0 ? (
                  <div className="text-center p-12">
                    <h3 className="text-2xl font-medium mb-4">No case studies found</h3>
                    <p className="text-gray-600 mb-6">Try different search terms.</p>
                    <Button 
                      variant="outline"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear search
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCaseStudies.map((caseStudy) => (
                      <Card key={caseStudy.id} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                        <img 
                          src={caseStudy.image} 
                          alt={caseStudy.title} 
                          className="w-full h-48 object-cover"
                        />
                        <CardContent className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-journey-blue font-medium">{caseStudy.industry}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {caseStudy.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">{caseStudy.client}</p>
                          <p className="text-gray-600 mb-4 flex-grow">
                            {caseStudy.summary}
                          </p>
                          <Button 
                            variant="outline"
                            className="w-full border-journey-blue text-journey-blue hover:bg-journey-blue/10 mt-auto"
                          >
                            View Case Study
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-journey-purple to-journey-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Custom AI Solutions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how we can help your business leverage AI for growth and efficiency.
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-white text-journey-purple hover:bg-gray-100">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Resources;
