'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { SMBMatchResult, SMBIndustry } from '@/types/smb'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export default function SmartMatcher() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SMBMatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/match-industry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessDescription: query }),
      })

      if (!response.ok) {
        throw new Error('Failed to match industry')
      }

      const data = await response.json()
      setResult(data)
    } catch {
      setError('Sorry, we couldn\'t process your request. Please try again or browse our industries above.')
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconName: string): LucideIcon => {
    return (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Building
  }

  return (
    <section className="py-12 px-4 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <Card className="border-dashed border-2">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Don't see your industry?</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Tell us about your business and we'll show you how we can help
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="e.g. I run a mobile dog grooming business"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !query.trim()}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Find
              </Button>
            </form>

            {error && (
              <p className="mt-4 text-sm text-destructive">{error}</p>
            )}

            {result && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  {result.reasoning}
                </p>

                <Link href={`/small-business-ai/${result.matchedIndustry.slug}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/30 bg-primary/5">
                    <CardContent className="p-4 flex items-center gap-4">
                      {(() => {
                        const Icon = getIconComponent(result.matchedIndustry.icon_name)
                        return (
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                        )
                      })()}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{result.matchedIndustry.name}</h4>
                        <p className="text-sm text-muted-foreground truncate">{result.matchedIndustry.tagline}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>

                {result.alternateIndustries && result.alternateIndustries.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Also consider:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.alternateIndustries.map((alt) => (
                        <Link
                          key={alt.slug}
                          href={`/small-business-ai/${alt.slug}`}
                          className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          {alt.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
