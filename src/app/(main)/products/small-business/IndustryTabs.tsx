'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface IndustryData {
  [key: string]: {
    title: string
    description: { bold: string; text: string }[]
    image: string
    benefits: { title: string; description: string }[]
  }
}

interface IndustryTabsProps {
  industryData: IndustryData
}

export default function IndustryTabs({ industryData }: IndustryTabsProps) {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('recruitment')

  useEffect(() => {
    const industry = searchParams.get('industry')
    if (industry && industryData[industry]) {
      setActiveTab(industry)
    }
  }, [searchParams, industryData])

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'tab_click', {
        industry: value,
        campaign: searchParams.get('utm_campaign') || 'direct'
      })
    }
  }

  const handleCTAClick = (action: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_click', {
        section: 'industry_selector',
        action,
        industry: activeTab,
        campaign: searchParams.get('utm_campaign') || 'direct'
      })
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="recruitment" className="text-sm md:text-base">
          Recruitment
        </TabsTrigger>
        <TabsTrigger value="realestate" className="text-sm md:text-base">
          Real Estate
        </TabsTrigger>
        <TabsTrigger value="construction" className="text-sm md:text-base">
          Construction
        </TabsTrigger>
      </TabsList>

      {Object.entries(industryData).map(([key, data]) => (
        <TabsContent key={key} value={key} className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {data.title}
              </h3>
              <div className="text-lg text-muted-foreground space-y-2">
                {data.description.map((item, i) => (
                  <div key={i}><strong>{item.bold}</strong>{item.text}</div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white">
                  <Link
                    href={`/contact?service=small-business&industry=${key}&utm_source=${searchParams.get('utm_source') || 'page'}`}
                    onClick={() => handleCTAClick('request_demo')}
                  >
                    Request Demo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:order-last">
              <img
                src={data.image}
                alt={`${key} AI solutions`}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.map((benefit, index) => (
              <Card key={index} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
