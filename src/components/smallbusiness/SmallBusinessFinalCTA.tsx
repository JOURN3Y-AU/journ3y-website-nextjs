import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar, MessageCircle, Star } from 'lucide-react'

interface SmallBusinessFinalCTAProps {
  utmParams?: Record<string, string>;
}

const SmallBusinessFinalCTA = ({ utmParams }: SmallBusinessFinalCTAProps) => {
  const handleCTAClick = (action: string) => {
    // Track CTA click with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_click', {
        section: 'final',
        action,
        campaign: utmParams?.utm_campaign || 'direct'
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of small businesses already using AI to streamline operations, 
            enhance productivity, and accelerate growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border text-center">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-center">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Proven Results
              </h3>
              <p className="text-muted-foreground text-sm">
                Average 40% increase in operational efficiency within 90 days
              </p>
            </CardContent>
          </Card>

          <Card className="border-border text-center">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-center">
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Quick Implementation
              </h3>
              <p className="text-muted-foreground text-sm">
                Up and running in 4 weeks
              </p>
            </CardContent>
          </Card>

          <Card className="border-border text-center">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-center">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Ongoing Support
              </h3>
              <p className="text-muted-foreground text-sm">
                Dedicated support team and regular optimisation sessions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary text-white text-lg px-8"
            >
              <Link
                href={`/contact?service=small-business&inquiry=demo&utm_source=${utmParams?.utm_source || 'page'}`}
                onClick={() => handleCTAClick('request_demo')}
              >
                Get Your Free Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No commitment required. See how AI can transform your business in just 30 minutes.
          </p>

          <div className="pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Trusted by small businesses across Australia • Industry-specific solutions • 
              Managed AI platform for Teams • Expert implementation support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmallBusinessFinalCTA;