
import useScrollReveal from '@/hooks/useScrollReveal';
import { AlertCircle, Clock, TrendingDown, HelpCircle } from 'lucide-react';

const Brand3yProblemSection = () => {
  const sectionRef = useScrollReveal();

  const problems = [
    {
      icon: HelpCircle,
      question: "How's our brand performing against competitors?"
    },
    {
      icon: TrendingDown,
      question: "What's driving their recent growth?"
    },
    {
      icon: AlertCircle,
      question: "Should we be worried about their new campaign?"
    },
    {
      icon: Clock,
      question: "What's our share of voice this quarter?"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Every Brand Meeting Feels Like This
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {problems.map((problem, index) => (
            <div key={index} className={`reveal reveal-delay-${(index + 1) * 100} transition-all duration-500 ease-out`}>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <problem.icon className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-800">"{problem.question}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-600 italic">
            These questions take weeks to research. By the time you have answers, the market has moved on.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brand3yProblemSection;
