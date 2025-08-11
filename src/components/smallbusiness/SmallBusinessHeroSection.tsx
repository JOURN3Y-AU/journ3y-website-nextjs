import { Button } from '@/components/ui/button';
import { ArrowDown, Building2, Users, Zap } from 'lucide-react';
interface SmallBusinessHeroSectionProps {
  utmParams?: Record<string, string>;
}
const SmallBusinessHeroSection = ({
  utmParams
}: SmallBusinessHeroSectionProps) => {
  const scrollToIndustrySelector = () => {
    const element = document.getElementById('industry-selector');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }

    // Track scroll action with Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'cta_click', {
        section: 'hero',
        action: 'scroll_to_industries',
        campaign: utmParams?.utm_campaign || 'direct'
      });
    }
  };
  return <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            AI-Powered Productivity for
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Small Business
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">Fully managed AI service configured for your industry. Streamline your operations, enhance productivity, and scale your business with AI.</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
            <div className="flex flex-col items-center space-y-2">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Real Estate</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Zap className="w-8 h-8 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Construction</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Users className="w-8 h-8 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Recruitment</span>
            </div>
          </div>

          <div className="pt-8">
            <Button onClick={scrollToIndustrySelector} size="lg" className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity group">
              Explore Industry Solutions
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default SmallBusinessHeroSection;