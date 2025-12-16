'use client'

import { Lightbulb, Rocket, Target } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const FeatureCard = ({ title, description, icon, delay = 0 }: FeatureCardProps) => {
  const featureRef = useScrollReveal();
  
  return (
    <div 
      ref={featureRef} 
      className={`reveal transition-all duration-500 ease-out ${delay > 0 ? `reveal-delay-${delay}00` : ''}`}
    >
      <div className="bg-white rounded-lg p-8 shadow-sm h-full border border-gray-100 hover:shadow-md transition-shadow">
        <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-journey-purple/20 to-journey-blue/20 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6 tracking-tight">We've been in your chair</h2>
        <h3 className="text-xl font-semibold text-center mb-16 tracking-tight">We understand the AI challenges you are facing... and what to do about them</h3>
        
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            title="Planning & Prioritisation"
            description="With endless AI possibilities but limited resources, how do you identify which opportunities will actually deliver meaningful ROI?"
            icon={<Lightbulb className="w-8 h-8 text-journey-purple" />}
            delay={0}
          />
          
          <FeatureCard 
            title="Thinking big... starting small"
            description="How do you demonstrate AI value quickly without massive upfront investments or lengthy implementation cycles?"
            icon={<Rocket className="w-8 h-8 text-journey-blue" />}
            delay={2}
          />
          
          <FeatureCard 
            title="Focus on relavance"
            description="How do you ensure AI solutions actually address your specific business context instead of forcing generic approaches that miss the mark?"
            icon={<Target className="w-8 h-8 text-journey-dark-purple" />}
            delay={4}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
