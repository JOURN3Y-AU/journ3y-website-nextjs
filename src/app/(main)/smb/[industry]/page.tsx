import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight, Home } from 'lucide-react'
import { getIndustryBySlug, getRelatedIndustries, getAllIndustrySlugs } from '@/lib/smb'
import { generateFAQSchema, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schemas'
import IndustryHero from '@/components/smb/IndustryHero'
import PainPointsSection from '@/components/smb/PainPointsSection'
import UseCasesSection from '@/components/smb/UseCasesSection'
import FAQSection from '@/components/smb/FAQSection'
import RelatedIndustries from '@/components/smb/RelatedIndustries'

interface IndustryPageProps {
  params: Promise<{ industry: string }>
}

// Generate static paths for all industries
export async function generateStaticParams() {
  const slugs = await getAllIndustrySlugs()
  return slugs.map((slug) => ({ industry: slug }))
}

// Generate metadata for each industry page
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { industry: slug } = await params
  const industry = await getIndustryBySlug(slug)

  if (!industry) {
    return {
      title: 'Industry Not Found | JOURN3Y',
    }
  }

  return {
    title: industry.metadata_title || `AI for ${industry.name} Australia | JOURN3Y`,
    description: industry.metadata_description || `AI consulting and automation for ${industry.name} businesses in Australia. Transform your operations with AI built for your industry.`,
    keywords: industry.metadata_keywords,
    openGraph: {
      title: industry.metadata_title || `AI for ${industry.name} Australia | JOURN3Y`,
      description: industry.metadata_description || `AI solutions for ${industry.name} businesses in Australia.`,
      url: `https://www.journ3y.com.au/smb/${industry.slug}`,
      siteName: 'JOURN3Y',
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: industry.metadata_title || `AI for ${industry.name} Australia | JOURN3Y`,
      description: industry.metadata_description || `AI solutions for ${industry.name} businesses.`,
    },
    alternates: {
      canonical: `https://www.journ3y.com.au/smb/${industry.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { industry: slug } = await params
  const industry = await getIndustryBySlug(slug)

  if (!industry) {
    notFound()
  }

  // Fetch related industries
  const relatedIndustries = await getRelatedIndustries(industry.related_industries || [])

  // Generate schema markup
  const faqSchema = generateFAQSchema(industry.faqs)
  const serviceSchema = generateServiceSchema(industry)
  const breadcrumbSchema = generateBreadcrumbSchema(industry)

  return (
    <>
      {/* Breadcrumb */}
      <nav className="container mx-auto max-w-6xl px-4 py-4 mt-16">
        <ol className="flex items-center text-sm text-muted-foreground">
          <li className="flex items-center">
            <Link href="/" className="hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
          </li>
          <li className="flex items-center">
            <Link href="/smb" className="hover:text-foreground transition-colors">
              Small Business
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
          </li>
          <li className="text-foreground font-medium">{industry.name}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <IndustryHero
        headline={industry.hero_headline}
        subhead={industry.hero_subhead}
        industryName={industry.name}
        imageUrl={industry.hero_image_url}
      />

      {/* Pain Points */}
      <PainPointsSection painPoints={industry.pain_points} />

      {/* Use Cases */}
      <div id="use-cases">
        <UseCasesSection useCases={industry.use_cases} />
      </div>

      {/* Results Statement */}
      {industry.results_statement && (
        <section className="py-12 px-4 bg-primary/5">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              "{industry.results_statement}"
            </p>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <FAQSection faqs={industry.faqs} />

      {/* Related Industries */}
      <RelatedIndustries industries={relatedIndustries} />

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See AI in Action for Your {industry.name} Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book a free 30-minute demo and see exactly how we can help
          </p>
          <Button size="lg" asChild>
            <Link href={`/contact?industry=${encodeURIComponent(industry.name)}&utm_source=smb&utm_medium=footer_cta`}>
              Book Your Free Demo - 30 Minutes, No Commitment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Schema Markup */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
