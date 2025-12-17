'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface IndustryCardProps {
  slug: string
  name: string
  tagline: string
  iconName: string
}

export default function IndustryCard({ slug, name, tagline, iconName }: IndustryCardProps) {
  // Get the icon component from Lucide
  const IconComponent = (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Building

  return (
    <Link href={`/smb/${slug}`} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 hover:border-primary/30">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <IconComponent className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tagline}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
