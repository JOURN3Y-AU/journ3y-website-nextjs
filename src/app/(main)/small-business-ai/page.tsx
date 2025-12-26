import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown, MessageSquare, FileText, Zap, PenTool, MapPin } from 'lucide-react'
import { getActiveIndustries } from '@/lib/smb'
import { smbGlobalContent } from '@/lib/smb'
import IndustrySelector from '@/components/smb/IndustrySelector'
import SmartMatcher from '@/components/smb/SmartMatcher'
import ProductDemo from '@/components/smb/ProductDemo'
import HowItWorks from '@/components/smb/HowItWorks'
import StatsBar from '@/components/smb/StatsBar'

export const metadata: Metadata = {
  title: 'How to Use AI in Your Small Business | Best AI Tools Australia | JOURN3Y',
  description: 'Learn how to use AI in your small business. Australia\'s best AI consultants helping tradies, builders, recruiters and small business owners save 10+ hours per week. Get expert help setting up AI for your business.',
  keywords: [
    'how to use AI in small business',
    'AI for small business Australia',
    'best AI tools for small business',
    'AI consultants Australia',
    'AI for tradies',
    'AI tools for builders Australia',
    'AI for recruiters',
    'small business AI solutions',
    'who can help set up AI',
    'companies that help implement AI',
    'best AI consultants Australia',
    'AI automation for small business',
    'business AI tools',
    'AI implementation Australia',
    'AI specialist Sydney',
    'AI consultant Northern Beaches Sydney',
    'AI specialist Shire Sydney',
    'AI consultant North Shore Sydney',
    'AI specialist Western Sydney',
    'AI consultant Gold Coast',
    'small business AI Sydney'
  ],
  openGraph: {
    title: 'How to Use AI in Your Small Business | Best AI Tools Australia | JOURN3Y',
    description: 'Learn how to use AI in your small business. Australia\'s best AI consultants helping tradies, builders, recruiters and small business owners save 10+ hours per week.',
    url: 'https://www.journ3y.com.au/small-business-ai',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Use AI in Your Small Business | Best AI Tools Australia | JOURN3Y',
    description: 'Learn how to use AI in your small business. Australia\'s best AI consultants for tradies, builders, recruiters and small business owners.',
  },
  alternates: {
    canonical: 'https://www.journ3y.com.au/small-business-ai',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function SMBLandingPage() {
  const industries = await getActiveIndustries()

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            AI Solutions Built for{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Industry
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Whether you're in trades, professional services, or retail - we've configured AI that understands your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#demo">
                See It In Action
                <ChevronDown className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#industries">
                Find Your Industry
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Demo */}
      <div id="demo">
        <ProductDemo />
      </div>

      {/* Industry Selector */}
      <IndustrySelector industries={industries} />

      {/* Smart Matcher */}
      <SmartMatcher />

      {/* How It Works */}
      <HowItWorks steps={smbGlobalContent.howItWorks} />

      {/* Stats Bar */}
      <StatsBar stats={smbGlobalContent.stats} />

      {/* How to Use AI Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              How to Use AI in Your Small Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with AI doesn't have to be complicated. Here's how Australian small businesses are saving 10+ hours per week with AI tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automate Customer Enquiries</h3>
              <p className="text-muted-foreground">
                AI assistants can answer common questions, book appointments, and handle enquiries 24/7 - perfect for tradies and service businesses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Speed Up Quoting & Proposals</h3>
              <p className="text-muted-foreground">
                Generate professional quotes and proposals in minutes instead of hours. Builders and contractors save hours each week.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Summarise Documents & Contracts</h3>
              <p className="text-muted-foreground">
                AI can read and summarise lengthy contracts, tender documents, and compliance paperwork - ideal for recruiters and professional services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Marketing Content</h3>
              <p className="text-muted-foreground">
                Create social media posts, job ads, listing descriptions, and email campaigns faster with AI assistance.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-3">Need Help Setting Up AI for Your Business?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              JOURN3Y is one of Australia's best AI consultants for small business. We help tradies, builders, recruiters, and business owners implement AI tools tailored to their industry.
            </p>
            <Button asChild>
              <Link href="/contact?utm_source=small-business-ai&utm_medium=how_to_section">
                Get Expert Help
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              AI Specialists Serving Your Area
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              JOURN3Y provides AI consulting for small businesses across Sydney, Melbourne, Gold Coast, Brisbane and all of Australia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Northern Beaches, Sydney</p>
                <p className="text-sm text-muted-foreground">Manly, Dee Why, Mona Vale</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">North Shore, Sydney</p>
                <p className="text-sm text-muted-foreground">Chatswood, St Leonards, Lane Cove</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">The Shire, Sydney</p>
                <p className="text-sm text-muted-foreground">Cronulla, Sutherland, Miranda</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Western Sydney</p>
                <p className="text-sm text-muted-foreground">Parramatta, Penrith, Blacktown</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Gold Coast, Queensland</p>
                <p className="text-sm text-muted-foreground">Surfers Paradise, Broadbeach, Burleigh</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">All of Australia</p>
                <p className="text-sm text-muted-foreground">Remote consulting available nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See How AI Can Transform Your Business?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Book a free 30-minute demo and see AI in action for your industry
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact?utm_source=small-business-ai&utm_medium=footer_cta">
              Get Your Free Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "name": "How to Use AI in Your Small Business",
                "description": "Learn how to use AI in your small business. Australia's best AI consultants helping tradies, builders, recruiters and small business owners.",
                "url": "https://www.journ3y.com.au/small-business-ai"
              },
              {
                "@type": "LocalBusiness",
                "name": "JOURN3Y",
                "description": "Australia's best AI consultants for small business. We help tradies, builders, recruiters and business owners implement AI tools.",
                "url": "https://www.journ3y.com.au",
                "telephone": "+61 2 8000 0000",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Sydney",
                  "addressRegion": "NSW",
                  "addressCountry": "AU"
                },
                "areaServed": [
                  { "@type": "City", "name": "Sydney" },
                  { "@type": "AdministrativeArea", "name": "Northern Beaches, Sydney" },
                  { "@type": "AdministrativeArea", "name": "North Shore, Sydney" },
                  { "@type": "AdministrativeArea", "name": "Sutherland Shire, Sydney" },
                  { "@type": "AdministrativeArea", "name": "Western Sydney" },
                  { "@type": "City", "name": "Gold Coast" },
                  { "@type": "City", "name": "Melbourne" },
                  { "@type": "City", "name": "Brisbane" },
                  { "@type": "City", "name": "Perth" },
                  { "@type": "City", "name": "Adelaide" },
                  { "@type": "City", "name": "Hobart" }
                ],
              },
              {
                "@type": "HowTo",
                "name": "How to Use AI in Your Small Business",
                "description": "A guide for Australian small business owners on implementing AI tools",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Automate Customer Enquiries",
                    "text": "Set up AI assistants to answer common questions, book appointments, and handle enquiries 24/7"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Speed Up Quoting & Proposals",
                    "text": "Use AI to generate professional quotes and proposals in minutes instead of hours"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Summarise Documents & Contracts",
                    "text": "Let AI read and summarise lengthy contracts, tender documents, and compliance paperwork"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Generate Marketing Content",
                    "text": "Create social media posts, job ads, and email campaigns faster with AI assistance"
                  }
                ]
              }
            ]
          })
        }}
      />
    </>
  )
}
