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

    // Placeholder for Meta Pixel - Add your pixel ID here
    // window.fbq('track', 'PageView');
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
      // Placeholder for Meta Pixel conversion tracking
      // window.fbq('track', 'Lead');

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
    // Placeholder for Meta Pixel event tracking
    // window.fbq('track', 'InitiateCheckout');
  };
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-gradient-shift" />
        
        {/* Floating orbs for depth */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{
        animationDelay: '2s'
      }} />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in opacity-0" style={{
            animationDelay: '0.2s'
          }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">Find 5-10 Hours Per Week for Your Business{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                  Real Estate Business
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground">
                See how Northern Beaches businesses are using AI to cut admin time in half - without hiring more staff
              </p>
              
              <div className="pt-4">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 hover:scale-105 transition-all shadow-lg hover:shadow-xl group" asChild onClick={() => handleCTAClick('hero')}>
                  <a href="https://calendly.com/kevin-morrell-journ3y/30min" target="_blank" rel="noopener noreferrer">
                    Book Your Free 15-Minute Discovery Call
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in opacity-0" style={{
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
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow border-2">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Stop Repetitive Writing</h3>
                <p className="text-muted-foreground">
                  Auto-generate property descriptions, client emails, and follow-ups in seconds
                </p>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-2">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Instant Reports & Quotes</h3>
                <p className="text-muted-foreground">
                  Create market analyses, proposals, and quotes while you're with clients
                </p>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-2">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Get Your Time Back</h3>
                <p className="text-muted-foreground">
                  Spend time building relationships, not stuck behind a keyboard
                </p>
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
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-3xl font-bold text-primary">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Book a 15-minute discovery call</h3>
              <p className="text-muted-foreground">Quick chat to understand your business needs</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto text-3xl font-bold text-secondary">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">We show you where AI can save time</h3>
              <p className="text-muted-foreground">Identify specific opportunities in your workflow</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto text-3xl font-bold text-accent">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Start saving hours within 2 weeks</h3>
              <p className="text-muted-foreground">Quick setup, immediate results</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Form */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Get Your Time Back?
            </h2>
            
            <Button size="lg" className="text-xl px-12 py-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity shadow-xl mb-8" asChild onClick={() => handleCTAClick('main_cta')}>
              <a href="https://calendly.com/kevin-morrell-journ3y/30min" target="_blank" rel="noopener noreferrer">
                Book Your Free Discovery Call
                <ArrowRight className="ml-2 w-6 h-6" />
              </a>
            </Button>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 shadow-lg">
              <div className="text-center mb-6">
                <p className="text-lg text-muted-foreground">Prefer to chat first?</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleInputChange} required className="text-lg py-6" />
                </div>
                
                <div>
                  <Input type="email" name="email" placeholder="Your Email *" value={formData.email} onChange={handleInputChange} required className="text-lg py-6" />
                </div>
                
                <div>
                  <Input type="tel" name="phone" placeholder="Your Phone *" value={formData.phone} onChange={handleInputChange} required className="text-lg py-6" />
                </div>
                
                <div>
                  <Textarea name="message" placeholder="Any questions or details? (optional)" value={formData.message} onChange={handleInputChange} className="min-h-[100px] text-lg" />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
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
              <p className="text-lg font-semibold text-foreground">✓ No lock-in contracts</p>
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