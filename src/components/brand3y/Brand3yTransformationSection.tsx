'use client'

import useScrollReveal from '@/hooks/useScrollReveal';
import { ArrowRight, Target, Crown } from 'lucide-react';

const Brand3yTransformationSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">
              Transform From Reactive Researcher to Strategic Oracle
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Before */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Target className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-3 text-red-800">Before</h3>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>"I'll get back to you on that"</li>
                  <li>Weeks of manual research</li>
                  <li>Outdated insights</li>
                  <li>Reactive decision making</li>
                </ul>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-orange-600" />
              </div>

              {/* After */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <Crown className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-3 text-orange-800">After</h3>
                <ul className="text-sm text-orange-700 space-y-2">
                  <li>"Here's exactly what's happening"</li>
                  <li>Real-time competitive intelligence</li>
                  <li>Predictive insights</li>
                  <li>Strategic leadership</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg p-8 border border-orange-200">
              <p className="text-xl text-gray-800 leading-relaxed">
                While other marketers scramble to research basic competitor info, you'll be the one 
                <span className="font-semibold text-orange-600"> predicting their next move</span>. 
                Be the marketer who confidently says <span className="font-semibold">"Here's exactly what's happening"</span> 
                whether it's competitor spend shifts, sentiment changes, or emerging threats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brand3yTransformationSection;
