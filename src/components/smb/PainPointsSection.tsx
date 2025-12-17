import { Card, CardContent } from '@/components/ui/card'
import type { SMBPainPoint } from '@/types/smb'

interface PainPointsSectionProps {
  painPoints: SMBPainPoint[]
}

export default function PainPointsSection({ painPoints }: PainPointsSectionProps) {
  if (!painPoints || painPoints.length === 0) return null

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We Get It
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The challenges you're facing - we've heard them before
          </p>
        </div>

        <div className={`grid gap-6 ${painPoints.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {painPoints.map((point) => (
            <Card key={point.id} className="bg-muted/30 border-none">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  "{point.title}"
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
