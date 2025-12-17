import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'

interface IndustryHeroProps {
  headline: string
  subhead: string
  industryName: string
  imageUrl?: string | null
}

export default function IndustryHero({ headline, subhead, industryName, imageUrl }: IndustryHeroProps) {
  return (
    <section className="relative py-20 md:py-28 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {subhead}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href={`/contact?industry=${encodeURIComponent(industryName)}&utm_source=smb&utm_medium=hero`}>
                  Get Your Free Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#use-cases">
                  See What's Possible
                  <ChevronDown className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-lg">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${industryName} - AI solutions`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/30" />
                  </div>
                  <p className="text-muted-foreground text-sm">Industry illustration</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
