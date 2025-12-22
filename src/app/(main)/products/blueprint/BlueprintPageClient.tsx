'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useScrollReveal from '@/hooks/useScrollReveal'

export default function BlueprintPageClient() {
  const section1Ref = useScrollReveal()
  const section2Ref = useScrollReveal()
  const section3Ref = useScrollReveal()
  const section4Ref = useScrollReveal()

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-journey-purple/10 to-journey-blue/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Blueprint</h1>
            <p className="text-xl text-gray-700 mb-8">
              Transform your AI ambition into action with JOURN3Y Blueprint. Our accelerated process delivers a prioritised, practical plan to get your business implementing AI faster
            </p>
            <Button className="bg-gradient-to-r from-journey-purple to-journey-blue text-white">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={section1Ref} className="reveal transition-all duration-500 ease-out">
              <h2 className="text-3xl font-bold mb-6">What is Blueprint?</h2>
              <p className="text-gray-700 mb-4">
                Blueprint is our strategic AI planning process designed to help businesses map out their AI journey. We work with your leadership team to identify opportunities, challenges, and the practical path to AI integration.
              </p>
              <p className="text-gray-700">
                Through a series of workshops, assessments, and planning sessions, we create a comprehensive roadmap that aligns with your business goals and provides a clear implementation strategy.
              </p>
            </div>
            <div className="order-first md:order-last">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-journey-purple to-journey-blue opacity-30 blur-sm"></div>
                <img
                  src="/Flux_Dev_I_need_a_modern_office_view_a_work_desk_in_focus_On_t_3.jpg"
                  alt="Strategic Planning"
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
            <h2 className="text-3xl font-bold mb-4">Blueprint Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach ensures your AI strategy is built for success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-purple/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Business Architecture</h3>
              <p className="text-gray-600">
                Rapidly visualize your organization's functional needs using our AI-powered industry blueprints. We help you clarify, prioritize, and simplify what truly matters to achieve your strategic objectives
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-blue/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Priorities</h3>
              <p className="text-gray-600">
                We evaluate your business architecture against our AI value framework to pinpoint where AI can deliver the greatest impact. This process maps potential AI solutions to your specific business drivers and ranks opportunities based on implementation feasibility, time-to-value, and ROI potential
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-journey-dark-purple/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-journey-dark-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Executable Plan</h3>
              <p className="text-gray-600">
                Move beyond planning into action with our iterative, value-focused executable plan. We guide you through vendor negotiations, partner engagements. We can hand over to you or continue to serve as your ongoing champion to ensure successful delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div ref={section3Ref} className="max-w-3xl mx-auto text-center mb-16 reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-4">Our Blueprint Process</h2>
            <p className="text-xl text-gray-600">
              A structured approach to quickly develop your AI strategy
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 inset-y-0 w-0.5 bg-gradient-to-b from-journey-purple to-journey-blue"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                <div className="relative pl-12">
                  <div className="absolute left-0 mt-1 w-8 h-8 rounded-full bg-journey-purple flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Draft Assessment</h3>
                  <p className="text-gray-600">
                    We prepare an initial view of your business, its processes and technology based on 2-3 meetings with your key subject matter experts and our own research and experience.
                  </p>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 mt-1 w-8 h-8 rounded-full bg-gradient-to-r from-journey-purple to-journey-blue flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Draft review</h3>
                  <p className="text-gray-600">
                    Over 2-3 days, we refine our assement with your teams. Confirm what's right, what needs changing and dig into the key opportunities for AI.
                  </p>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 mt-1 w-8 h-8 rounded-full bg-gradient-to-r from-journey-blue to-journey-dark-blue flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Business Architecture</h3>
                  <p className="text-gray-600">
                    We sit with your leadership team, quickly confirm your current state and then build out your AI plan. By combining your teams strategy with our expertise we create an achievable roadmap prioritised for value
                  </p>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 mt-1 w-8 h-8 rounded-full bg-journey-blue flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Finalised Blueprint</h3>
                  <p className="text-gray-600">
                    With the agreed plan in hand, we complete a platform and technology assessment allowing your business to make better decisions about how AI can be brought into your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial or Case Study */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div ref={section4Ref} className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12 reveal transition-all duration-500 ease-out">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-full bg-journey-purple/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-journey-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Blueprint Success Story</h3>
                <p className="text-gray-600 mb-4">
                  "JOURN3Y's AI Blueprint process helped us identify multiple high-impact AI opportunities we hadn't considered. Their structured approach and clear implementation roadmap gave our leadership team confidence to move forward with our AI initiatives."
                </p>
                <p className="font-medium">CEO at Logistics Company</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-journey-purple/90 to-journey-blue/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your AI Blueprint?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our team to begin your JOURN3Y.
          </p>
          <Button asChild variant="secondary" size="lg" className="bg-white text-journey-purple hover:bg-gray-100">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
