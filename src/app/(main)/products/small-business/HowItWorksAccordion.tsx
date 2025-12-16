'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'

interface Step {
  id: string
  number: string
  title: string
  summary: string
  details: string[]
}

interface HowItWorksAccordionProps {
  steps: Step[]
}

export default function HowItWorksAccordion({ steps }: HowItWorksAccordionProps) {
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({})

  const toggleStep = (stepId: string) => {
    setOpenSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }))

    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'section_expand', {
        step: stepId,
        action: openSteps[stepId] ? 'collapse' : 'expand'
      })
    }
  }

  return (
    <div className="grid gap-6">
      {steps.map((step) => (
        <Card key={step.id} className="border-border">
          <Collapsible
            open={openSteps[step.id]}
            onOpenChange={() => toggleStep(step.id)}
          >
            <CollapsibleTrigger asChild>
              <CardContent className="p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                      <span className="text-lg font-bold text-foreground">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.summary}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openSteps[step.id] ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="ml-22 space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}
