'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DemoItem {
  title: string
  description: string
  mediaUrl: string
  mediaType: 'video' | 'gif' | 'image'
}

// Configure your demo items here
// Save files to: public/demos/
// Reference as: /demos/your-file.gif or /demos/your-file.mp4
const demoItems: DemoItem[] = [
  {
    title: 'Your Business Assistant',
    description: 'Like ChatGPT, but it actually knows your industry. Ask about pricing benchmarks, compliance requirements, or market research - and get answers that make sense for Australian small business.',
    mediaUrl: '/demos/chat-demo.gif', // Save your file as public/demos/chat-demo.gif
    mediaType: 'gif',
  },
  {
    title: 'Contract Risk Review',
    description: 'Upload any contract and get an instant risk analysis. Key terms highlighted, obligations summarised, and potential issues flagged - so you know exactly what you\'re signing.',
    mediaUrl: '/demos/contract-review.gif', // Save your file as public/demos/contract-review.gif
    mediaType: 'gif',
  },
  {
    title: 'From Document to Done',
    description: 'Read a document, understand it, then take action. Watch the AI summarise an invoice and draft a follow-up email to the client - ready to send in seconds.',
    mediaUrl: '/demos/document-to-email.gif', // Save your file as public/demos/document-to-email.gif
    mediaType: 'gif',
  },
]

export default function ProductDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentItem = demoItems[currentIndex]
  const hasMedia = currentItem.mediaUrl && currentItem.mediaUrl.length > 0

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? demoItems.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === demoItems.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real demos of our AI platform - no smoke and mirrors
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Media Side */}
          <div className="relative order-1 md:order-1">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-xl border">
              {hasMedia ? (
                currentItem.mediaType === 'video' ? (
                  <video
                    key={currentItem.mediaUrl}
                    src={currentItem.mediaUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    key={currentItem.mediaUrl}
                    src={currentItem.mediaUrl}
                    alt={currentItem.title}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                // Placeholder when no media is set
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-primary/40" />
                    </div>
                    <p className="text-muted-foreground">Demo coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Side */}
          <div className="order-2 md:order-2">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">{currentItem.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {currentItem.description}
              </p>
            </div>

            {/* Navigation */}
            {demoItems.length > 1 && (
              <div className="flex items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {/* Dots */}
                <div className="flex gap-2">
                  {demoItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === currentIndex
                          ? 'bg-primary'
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      aria-label={`Go to demo ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                <span className="text-sm text-muted-foreground ml-2">
                  {currentIndex + 1} / {demoItems.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
