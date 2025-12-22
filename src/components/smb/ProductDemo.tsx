'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play, Maximize2, X } from 'lucide-react'
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
    mediaUrl: '/demos/chat-demo.mp4',
    mediaType: 'video',
  },
  {
    title: 'Contract Risk Review',
    description: 'Upload any contract and get an instant risk analysis. Key terms highlighted, obligations summarised, and potential issues flagged - so you know exactly what you\'re signing.',
    mediaUrl: '/demos/contract-review.mp4',
    mediaType: 'video',
  },
  {
    title: 'From Document to Done',
    description: 'Read a document, understand it, then take action. Watch the AI summarise an invoice and draft a follow-up email to the client - ready to send in seconds.',
    mediaUrl: '/demos/document-to-email.mp4',
    mediaType: 'video',
  },
]

export default function ProductDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
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
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-xl border group">
              {hasMedia ? (
                <>
                  {currentItem.mediaType === 'video' ? (
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
                  )}
                  {/* Expand button */}
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Expand video"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </>
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

      {/* Expanded Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close expanded view"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.mediaType === 'video' ? (
              <video
                src={currentItem.mediaUrl}
                className="w-full h-full object-contain rounded-lg"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={currentItem.mediaUrl}
                alt={currentItem.title}
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}
