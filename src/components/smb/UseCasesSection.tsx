import { Card, CardContent } from '@/components/ui/card'
import type { SMBUseCase } from '@/types/smb'
import * as LucideIcons from 'lucide-react'
import { LucideIcon, CheckCircle2 } from 'lucide-react'

interface UseCasesSectionProps {
  useCases: SMBUseCase[]
}

export default function UseCasesSection({ useCases }: UseCasesSectionProps) {
  if (!useCases || useCases.length === 0) return null

  const getIconComponent = (iconName: string): LucideIcon => {
    return (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) || LucideIcons.Zap
  }

  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Here's How AI Fixes This
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical solutions that deliver real results
          </p>
        </div>

        <div className="space-y-6">
          {useCases.map((useCase) => {
            const Icon = getIconComponent(useCase.icon_name)
            return (
              <Card key={useCase.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-xl mb-3">
                            {useCase.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {useCase.description}
                          </p>
                          {useCase.benefit && (
                            <div className="flex items-center gap-2 text-primary">
                              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                              <span className="font-medium text-sm">
                                {useCase.benefit}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
