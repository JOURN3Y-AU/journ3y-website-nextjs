import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, FileText, Clock, CheckCircle, Zap, ArrowRight } from 'lucide-react';
const NorthernBeachesLanding = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Find 5-10 Hours Per Week for Your Business | JOURN3Y AI - Northern Beaches';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'See how Northern Beaches businesses are using AI to cut admin time in half - without hiring more staff. Book your free 15-minute discovery call.');
    }
    
    // Check if Meta Pixel is loaded
    console.log('Meta Pixel available:', typeof (window as any).fbq !== 'undefined');
    if (typeof (window as any).fbq !== 'undefined') {
      console.log('Meta Pixel PageView tracked on mount');
    }
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          subject: 'Northern Beaches Landing - New Lead',
          source: 'Northern Beaches Landing Page'
        }
      });
      if (error) throw error;
      toast({
        title: "Thanks! We'll be in touch within 24 hours.",
        description: "Your details have been sent successfully."
      });

      // Track form submission
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'form_submission', {
          page_location: window.location.href,
          form_type: 'contact_form'
        });
      }
      
      // Meta Pixel conversion tracking
      if (typeof window !== 'undefined' && typeof (window as any).fbq !== 'undefined') {
        console.log('Tracking CompleteRegistration event');
        (window as any).fbq('track', 'CompleteRegistration');
      } else {
        console.warn('Meta Pixel not available for CompleteRegistration tracking');
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or email us directly at kevin.morrell@journ3y.com.au",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCTAClick = (location: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_click', {
        location,
        page: 'northern_beaches_landing'
      });
    }
    
    // Meta Pixel Lead event tracking
    if (typeof window !== 'undefined' && typeof (window as any).fbq !== 'undefined') {
      console.log('Tracking Lead event from:', location);
      (window as any).fbq('track', 'Lead');
    } else {
      console.warn('Meta Pixel not available for Lead tracking');
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Logo Header */}
      <header className="py-6 px-4 bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-2">
            <img src="/JOURN3Y-logo.svg" alt="JOURN3Y Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold font-heading tracking-tight text-foreground">
              JOURN3Y
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-8 md:py-24 px-4 sm:px-6 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-gradient-shift" />
        
        {/* Floating orbs for depth - smaller on mobile */}
        <div className="absolute top-20 -left-20 w-32 h-32 md:w-72 md:h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-20 w-40 h-40 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{
        animationDelay: '2s'
      }} />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="space-y-3 md:space-y-6 animate-fade-in opacity-0" style={{
            animationDelay: '0.2s'
          }}>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight break-words">Find 5-10 Hours Per Week for{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">Your Business</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">See how Northern Beaches businesses are using AI to cut admin time in half - without hiring more staff</p>
              
              <div className="pt-2 md:pt-4">
                <Button size="lg" className="text-sm sm:text-base md:text-lg px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 w-full md:w-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 hover:scale-105 transition-all shadow-lg hover:shadow-xl group" asChild onClick={() => handleCTAClick('hero')}>
                  <a href="https://calendly.com/kevin-morrell-journ3y/30min" target="_blank" rel="noopener noreferrer">
                    <span className="break-words">Book Your Free 30-Minute Discovery Call</span>
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in opacity-0 mt-6 md:mt-0" style={{
            animationDelay: '0.4s'
          }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 hover:scale-[1.02] transform transition-transform">
                <img src="/northern-beaches-hero.jpg" alt="Professional business owner working productively in modern coastal office" className="w-full h-auto object-cover" />
              </div>
              
              {/* Decorative gradient ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl -z-10 blur-xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow border-2">
              <div className="space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Stop Repetitive Writing</h3>
                <p className="text-sm md:text-base text-muted-foreground">Auto-generate marketing material, clients emails and follow-ups in seconds</p>
              </div>
            </Card>

            <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow border-2">
              <div className="space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Instant Reports & Quotes</h3>
                <p className="text-sm md:text-base text-muted-foreground">Stop spending hours building quotes from scratch. Get instant insights into your business and clients</p>
              </div>
            </Card>

            <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow border-2">
              <div className="space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Get Your weekends Back</h3>
                <p className="text-sm md:text-base text-muted-foreground">Make the most of your work dy so you can do more of what you want on the weekend</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-2xl md:text-3xl font-semibold text-foreground">
            Join 100+ small businesses already saving{' '}
            <span className="text-primary">1-2 hours per person, every day</span>
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-2xl md:text-3xl font-bold text-primary">
                1
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">Book a 30-minute discovery call</h3>
              <p className="text-sm md:text-base text-muted-foreground">Quick chat to understand your business needs</p>
            </div>

            <div className="text-center space-y-3 md:space-y-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto text-2xl md:text-3xl font-bold text-secondary">
                2
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">We show you where AI can save time</h3>
              <p className="text-sm md:text-base text-muted-foreground">Identify specific opportunities in your workflow</p>
            </div>

            <div className="text-center space-y-3 md:space-y-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto text-2xl md:text-3xl font-bold text-accent">
                3
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">Start saving hours within 2 weeks</h3>
              <p className="text-sm md:text-base text-muted-foreground">Quick setup, immediate results</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Form */}
      <section className="py-12 md:py-24 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
              Ready to Get Your Time Back?
            </h2>
            
            <Button size="lg" className="text-base md:text-xl px-8 py-6 md:px-12 md:py-8 w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity shadow-xl mb-6 md:mb-8" asChild onClick={() => handleCTAClick('main_cta')}>
              <a href="https://calendly.com/kevin-morrell-journ3y/30min" target="_blank" rel="noopener noreferrer">
                Book Your Free Discovery Call
                <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
              </a>
            </Button>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-6 md:p-8 shadow-lg">
              <div className="text-center mb-4 md:mb-6">
                <p className="text-base md:text-lg text-muted-foreground">Prefer to chat first?</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <Input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleInputChange} required className="text-base md:text-lg py-5 md:py-6" />
                </div>
                
                <div>
                  <Input type="email" name="email" placeholder="Your Email *" value={formData.email} onChange={handleInputChange} required className="text-base md:text-lg py-5 md:py-6" />
                </div>
                
                <div>
                  <Input type="tel" name="phone" placeholder="Your Phone *" value={formData.phone} onChange={handleInputChange} required className="text-base md:text-lg py-5 md:py-6" />
                </div>
                
                <div>
                  <Textarea name="message" placeholder="Any questions or details? (optional)" value={formData.message} onChange={handleInputChange} className="min-h-[100px] text-base md:text-lg" />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full text-base md:text-lg py-5 md:py-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
                  {isSubmitting ? 'Sending...' : 'Send My Details'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="w-10 h-10 text-primary" />
              <p className="text-lg font-semibold text-foreground">🇦🇺 Australian-based team</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <Zap className="w-10 h-10 text-secondary" />
              <p className="text-lg font-semibold text-foreground">⚡ Setup in under 2 weeks</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="w-10 h-10 text-accent" />
              <p className="text-lg font-semibold text-foreground">✓ Short term contracts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-foreground text-background">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm">
            © 2024 JOURN3Y. All rights reserved. | Northern Beaches, Sydney
          </p>
        </div>
      </footer>
    </div>;
};
export default NorthernBeachesLanding;