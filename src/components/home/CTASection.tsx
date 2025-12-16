import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-journey-purple to-journey-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to Transform Your Business with AI?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Contact us today to schedule a consultation and discover how our AI solutions can drive growth for your business.
        </p>
        <Button asChild variant="secondary" size="lg" className="px-8 py-6 text-lg bg-white text-journey-purple hover:bg-gray-100">
          <Link href="/contact">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
