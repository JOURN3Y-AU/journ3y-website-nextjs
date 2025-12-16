'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useScrollReveal from '@/hooks/useScrollReveal'

export default function ServicesPageClient() {
  const section1Ref = useScrollReveal()
  const section2Ref = useScrollReveal()

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-journey-dark-purple/10 to-journey-purple/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Services</h1>
            <p className="text-xl text-gray-700 mb-8">
              Professional AI services that provide the expertise and implementation support to turn your AI vision into measurable business outcomes. Our team brings executive-level experience from leading organizations to bridge the gap between strategic ambition and practical execution.
            </p>
            <Button className="bg-gradient-to-r from-journey-dark-purple to-journey-purple text-white">
              <Link href="/contact">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={section1Ref} className="reveal transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold mb-6">What are our Services?</h2>
              <p className="text-gray-700 mb-4">
                Our professional services offer the expertise, implementation support, and ongoing optimization needed to successfully deliver AI solutions in your organization. We've been in your chair and understand the challenges of translating bold visions into practical results.
              </p>
              <p className="text-gray-700">
                We provide the people, knowledge and platforms to help you implement AI solutions, overcome challenges, and achieve your business objectives. Our approach is commercial and outcome-led, focusing on delivering tangible business value rather than technical complexity.
              </p>
            </div>
            <div className="order-first md:order-last">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-journey-dark-purple to-journey-purple opacity-30 blur-sm"></div>
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
                  alt="Professional Services"
                  className="relative rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={section2Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Our Service Offerings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support for your AI transformation journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-purple/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Implementation Services</h3>
              <p className="text-gray-600">
                Expert teams that bring your AI vision to life with technical expertise and project management. We help you navigate from Blueprint to execution, ensuring your technology investments deliver measurable returns through practical roadmaps and scalable architecture.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-dark-purple/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-dark-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Training & Education</h3>
              <p className="text-gray-600">
                Customized training programs to build AI literacy and skills across your organization. We provide executive-level AI fluency workshops and practical training that demystifies AI concepts, creating a common language to align business and technical teams.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-purple/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Managed AI Services</h3>
              <p className="text-gray-600">
                Ongoing support and optimization to ensure your AI solutions continue to deliver value. Our fractional expertise model provides enterprise-grade talent without the overhead, while our managed services ensure your data infrastructure runs flawlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-journey-dark-purple/90 to-journey-purple/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our team to discuss how our professional services can support your AI initiatives.
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-white text-journey-purple hover:bg-gray-100">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
