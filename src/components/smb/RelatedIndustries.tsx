import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import * as LucideIcons from 'lucide-react'
import { LucideIcon, ArrowRight } from 'lucide-react'

interface RelatedIndustry {
  slug: string
  name: string
  tagline: string
  icon_name: string
}

interface RelatedIndustriesProps {
  industries: RelatedIndustry[]
}

export default function RelatedIndustries({ industries }: RelatedIndustriesProps) {
  if (!industries || industries.length === 0) return null

  const getIconComponent = (iconName: string): LucideIcon => {
    return (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Building
  }

  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            We Also Help Businesses In
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {industries.map((industry) => {
            const Icon = getIconComponent(industry.icon_name)
            return (
              <Link key={industry.slug} href={`/small-business-ai/${industry.slug}`}>
                <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {industry.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {industry.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
