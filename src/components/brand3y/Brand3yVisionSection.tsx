
import useScrollReveal from '@/hooks/useScrollReveal';
import { Zap, Activity, Brain, TrendingUp, FileText } from 'lucide-react';

const Brand3yVisionSection = () => {
  const sectionRef = useScrollReveal();

  const benefits = [
    {
      icon: Zap,
      title: "Real-time competitive intelligence at your fingertips"
    },
    {
      icon: Activity,
      title: "Comprehensive brand health monitoring across all channels"
    },
    {
      icon: Brain,
      title: "Instant answers to executive questions"
    },
    {
      icon: TrendingUp,
      title: "AI-powered insights that spot opportunities before competitors"
    },
    {
      icon: FileText,
      title: "Professional brand health reports ready in minutes, not weeks"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Imagine Being the Marketer Who Always Knows
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className={`reveal reveal-delay-${(index + 1) * 100} transition-all duration-500 ease-out`}>
              <div className="bg-white rounded-lg p-8 shadow-lg border border-blue-100 text-center h-full">
                <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                <p className="text-lg font-medium text-gray-800">{benefit.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brand3yVisionSection;
