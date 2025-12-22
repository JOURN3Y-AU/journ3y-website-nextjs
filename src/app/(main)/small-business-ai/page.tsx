import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { getActiveIndustries } from '@/lib/smb'
import { smbGlobalContent } from '@/lib/smb'
import IndustrySelector from '@/components/smb/IndustrySelector'
import SmartMatcher from '@/components/smb/SmartMatcher'
import ProductDemo from '@/components/smb/ProductDemo'
import HowItWorks from '@/components/smb/HowItWorks'
import StatsBar from '@/components/smb/StatsBar'

export const metadata: Metadata = {
  title: 'AI Solutions for Small Business Australia | Industry-Specific AI | JOURN3Y',
  description: 'AI consulting and automation for Australian small businesses. Industry-specific AI solutions for construction, real estate, recruitment, healthcare, professional services, retail, education, financial services, hospitality, and manufacturing. 4-week implementation.',
  keywords: [
    'AI for small business Australia',
    'small business AI solutions',
    'AI consulting Australia',
    'business automation',
    'AI for SMB',
    'Australian AI consulting',
    'industry AI solutions',
    'small business automation',
    'AI implementation',
    'business process automation'
  ],
  openGraph: {
    title: 'AI Solutions for Small Business Australia | JOURN3Y',
    description: 'Industry-specific AI solutions for Australian small businesses. Transform your operations with AI built for your industry.',
    url: 'https://www.journ3y.com.au/small-business-ai',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions for Small Business Australia | JOURN3Y',
    description: 'Industry-specific AI solutions for Australian small businesses.',
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

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See How AI Can Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book a free 30-minute demo and see AI in action for your industry
          </p>
          <Button size="lg" asChild>
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
            "@type": "WebPage",
            "name": "AI Solutions for Small Business Australia",
            "description": "Industry-specific AI solutions for Australian small businesses",
            "url": "https://www.journ3y.com.au/small-business-ai",
            "provider": {
              "@type": "Organization",
              "name": "JOURN3Y",
              "url": "https://www.journ3y.com.au"
            }
          })
        }}
      />
    </>
  )
}
