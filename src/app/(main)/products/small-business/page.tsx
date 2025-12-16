import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { Building2, Users, Zap, CheckCircle, Heart, PhoneOff, Search, TrendingUp, DollarSign, Settings, Database, Bot, GraduationCap, ArrowRight, Calendar, MessageCircle, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SmallBusinessAnalytics from './SmallBusinessAnalytics'
import HeroScrollButton from './HeroScrollButton'
import IndustryTabs from './IndustryTabs'
import HowItWorksAccordion from './HowItWorksAccordion'
import FinalCTAButton from './FinalCTAButton'

export const metadata: Metadata = {
  title: 'AI Solutions for Small Business Australia | JOURN3Y-SMB',
  description: 'JOURN3Y-SMB helps Australian small businesses save 1-2 hours per person per day with AI. Fully managed AI platform for trades, real estate, healthcare, and professional services. 4-week deployment.',
  keywords: ['AI for small business', 'AI platform for Teams', 'real estate AI', 'construction AI', 'recruitment AI', 'business automation', 'productivity tools', 'small business AI Australia'],
  openGraph: {
    title: 'AI Solutions for Small Business | JOURN3Y',
    description: 'Transform your small business with AI-powered productivity solutions. Industry-specific AI platform for Teams implementation.',
    url: 'https://journ3y.com.au/products/small-business',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions for Small Business | JOURN3Y',
    description: 'Transform your small business with AI-powered productivity solutions.',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/products/small-business',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Static data for industries
const industryData = {
  recruitment: {
    title: "We've built AI that tackles the stuff that actually matters to your recruitment business",
    description: [
      { bold: "Get your time back", text: " - Stop drowning in admin and get back to placing candidates" },
      { bold: "Automate the paperwork", text: " - Contracts, compliance, candidate management & more" },
      { bold: "Keep placements flowing", text: " - No more confusion between candidates, clients, and your team" },
    ],
    image: '/small-business/recruitment-hero.jpg',
    benefits: [
      { title: 'Keep my best candidates warm', description: "Stop candidates being snapped up by competitors while I'm dealing with admin." },
      { title: 'Get placements moving faster', description: 'Stop losing deals because compliance paperwork takes too long to sort out.' },
      { title: 'Stop clients calling me for updates', description: 'Keep them informed automatically so I can focus on finding their next hire.' },
      { title: 'Find the needles in the haystack', description: 'Get through 200 CVs quickly to find the 3 that actually matter.' },
      { title: 'Get my consultants back to selling', description: 'Stop them drowning in interview coordination and status updates.' },
      { title: 'Get paid on time', description: 'Chase up contractor timesheets and overdue invoices without it eating my whole Friday.' },
    ]
  },
  realestate: {
    title: "We've built AI that tackles the stuff that actually matters to your real estate business",
    description: [
      { bold: "Get your time back", text: " - Stop drowning in admin and get back to prospecting" },
      { bold: "Automate the paperwork", text: " - Contracts, listings, compliance, settlements & more" },
      { bold: "Keep deals moving", text: " - No more confusion between buyers, sellers, and solicitors" },
    ],
    image: '/small-business/realestate-hero.jpg',
    benefits: [
      { title: 'Keep my hot leads from going cold', description: "So prospects don't list with competitors while I'm stuck doing paperwork." },
      { title: 'Stop vendors calling for updates', description: 'Keep them informed on market activity and buyer feedback automatically.' },
      { title: 'Get my listings live faster', description: 'Upload once, appear everywhere without spending hours on portals and paperwork.' },
      { title: 'Keep tenants happy without the phone calls', description: 'Handle maintenance requests and payment issues before they become dramas.' },
      { title: 'Get my agents back to prospecting', description: 'Stop them drowning in contract prep and settlement coordination.' },
      { title: 'Never miss a compliance deadline', description: 'Keep trust accounts balanced and documents filed before the regulator comes knocking.' },
    ]
  },
  construction: {
    title: "We've built AI that tackles the stuff that actually matters to your construction business",
    description: [
      { bold: "Get your time back", text: " - Stop drowning in admin" },
      { bold: "Automate the paperwork", text: " - Quotes, invoices, compliance, meetings & more" },
      { bold: "Keep projects on track", text: " - No more confusion or miscommunication" },
    ],
    image: '/small-business/construction-hero.jpg',
    benefits: [
      { title: 'Quoting and Pricing', description: 'Generate accurate project estimates, automate quote creation, and streamline pricing workflows with intelligent cost analysis.' },
      { title: 'Clients and Project Management', description: 'Centralise client communications, track project milestones, and maintain comprehensive project records in one place.' },
      { title: 'Sales, Payments and Contracts', description: 'Automate contract generation, streamline payment processing, and manage the entire sales pipeline efficiently.' },
      { title: 'Project Delivery', description: 'Coordinate project execution, track deliverables, and ensure timely completion with automated progress monitoring.' },
      { title: 'Reporting', description: 'Generate comprehensive project reports, track performance metrics, and provide stakeholders with real-time insights.' },
      { title: 'Safety and Compliance', description: 'Simplify site safety briefings, generate compliance documentation, and simply compliance processes across all projects.' },
    ]
  }
}

const steps = [
  {
    id: 'setup',
    number: '01',
    title: 'Platform Setup',
    summary: 'Quick deployment of your managed AI platform',
    details: [
      'Industry-specific AI model configuration and optimisation',
      'User access controls and permission settings',
      'Security protocols and data protection measures'
    ]
  },
  {
    id: 'integration',
    number: '02',
    title: 'Data Integration',
    summary: 'Seamless connection with your existing business systems',
    details: [
      'Document management system connectivity',
      'Email platform integration for communication workflows',
      'Calendar and scheduling system connections'
    ]
  },
  {
    id: 'agents',
    number: '03',
    title: 'Custom AI Agents',
    summary: 'Industry-specific AI assistants tailored to your business needs',
    details: [
      'Client communication and follow-up automation',
      'Market analysis and reporting assistants',
      'Document processing and data extraction tools'
    ]
  },
  {
    id: 'training',
    number: '04',
    title: 'Training & Support',
    summary: 'Comprehensive training and ongoing support for your team',
    details: [
      'Initial team training sessions and best practices',
      'Custom workflow development and optimisation',
      'Ongoing technical support and system updates',
      'Performance monitoring and improvement recommendations',
      'Regular check-ins and strategy refinement sessions'
    ]
  }
]

export default function SmallBusinessPage() {
  return (
    <>
      <Suspense fallback={null}>
        <SmallBusinessAnalytics />
      </Suspense>

      {/* Hero Section - Static Content */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              AI-Powered Productivity for
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Small Business
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Fully managed AI service configured for your industry. Streamline your operations, enhance productivity, and scale your business with AI.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
              <div className="flex flex-col items-center space-y-2">
                <Building2 className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Real Estate</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Zap className="w-8 h-8 text-secondary" />
                <span className="text-sm font-medium text-muted-foreground">Construction</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Users className="w-8 h-8 text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Recruitment</span>
              </div>
            </div>

            <div className="pt-8">
              <Suspense fallback={
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white">
                  Explore Industry Solutions
                </Button>
              }>
                <HeroScrollButton />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Selector Section - Static content with interactive tabs */}
      <section id="industry-selector" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industry-Specific AI Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your industry to discover how your AI platform can transform your business operations.
            </p>
          </div>

          {/* Interactive Tabs - Client Component */}
          <Suspense fallback={
            <div className="space-y-8">
              <div className="grid w-full grid-cols-3 mb-8 bg-muted rounded-lg p-1">
                <div className="py-2 text-center font-medium">Recruitment</div>
                <div className="py-2 text-center font-medium">Real Estate</div>
                <div className="py-2 text-center font-medium">Construction</div>
              </div>
              {/* Default recruitment content */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {industryData.recruitment.title}
                  </h3>
                  <div className="text-lg text-muted-foreground space-y-2">
                    {industryData.recruitment.description.map((item, i) => (
                      <div key={i}><strong>{item.bold}</strong>{item.text}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <img
                    src={industryData.recruitment.image}
                    alt="Recruitment AI solutions"
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industryData.recruitment.benefits.map((benefit, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          }>
            <IndustryTabs industryData={industryData} />
          </Suspense>
        </div>
      </section>

      {/* How It Works Section - Static content with interactive accordion */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven four-step process ensures seamless implementation and maximum value
              from your AI-powered business transformation.
            </p>
          </div>

          {/* Static steps with interactive accordion */}
          <Suspense fallback={
            <div className="grid gap-6">
              {steps.map((step) => (
                <Card key={step.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                        <span className="text-lg font-bold text-foreground">{step.number}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-muted-foreground">{step.summary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          }>
            <HowItWorksAccordion steps={steps} />
          </Suspense>
        </div>
      </section>

      {/* Final CTA Section - Static content */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of small businesses already using AI to streamline operations,
              enhance productivity, and accelerate growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-border text-center">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Proven Results</h3>
                <p className="text-muted-foreground text-sm">
                  Average 40% increase in operational efficiency within 90 days
                </p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Quick Implementation</h3>
                <p className="text-muted-foreground text-sm">Up and running in 4 weeks</p>
              </CardContent>
            </Card>

            <Card className="border-border text-center">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                  <MessageCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Ongoing Support</h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated support team and regular optimisation sessions
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Suspense fallback={
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-8">
                  <Link href="/contact?service=small-business&inquiry=demo">
                    Get Your Free Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              }>
                <FinalCTAButton />
              </Suspense>
            </div>

            <p className="text-sm text-muted-foreground">
              No commitment required. See how AI can transform your business in just 30 minutes.
            </p>

            <div className="pt-8 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Trusted by small businesses across Australia • Industry-specific solutions •
                Managed AI platform for Teams • Expert implementation support
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
