
import useScrollReveal from '@/hooks/useScrollReveal';
import { Building2, Users, TrendingUp } from 'lucide-react';

const Brand3ySocialProofSection = () => {
  const sectionRef = useScrollReveal();

  const metrics = [
    {
      icon: Building2,
      number: "500+",
      label: "Fortune 500 Companies",
      description: "Already testing our platform"
    },
    {
      icon: Users,
      number: "1000+",
      label: "Marketing Leaders",
      description: "On our private beta waitlist"
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Faster Insights",
      description: "Compared to traditional research"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Trusted by Marketing Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Already being tested by marketing teams at leading companies worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className={`reveal reveal-delay-${(index + 1) * 100} transition-all duration-500 ease-out`}>
              <div className="bg-white rounded-lg p-8 shadow-lg border border-blue-100 text-center">
                <metric.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{metric.number}</div>
                <div className="text-lg font-semibold text-gray-800 mb-2">{metric.label}</div>
                <div className="text-gray-600">{metric.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg border border-blue-100 max-w-4xl mx-auto">
          <blockquote className="text-center">
            <p className="text-xl italic text-gray-800 mb-6">
              "Finally, a tool that gives me the competitive intelligence I need without the weeks of manual research. 
              I can walk into any executive meeting confident I have the latest market insights."
            </p>
            <cite className="text-gray-600">
              <span className="font-semibold">Marketing Director</span> • Fortune 100 Technology Company
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Brand3ySocialProofSection;
