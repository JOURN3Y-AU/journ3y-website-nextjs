'use client'

import { CheckCircle, Award, Users, Headphones, Target } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

const GleanPartnerBenefitsSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose an Authorized Glean Partner?</h2>
          <p className="text-xl text-gray-600">JOURN3Y's certified expertise ensures successful implementation and maximum ROI</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Certified Implementation Expertise</h3>
            <p className="text-gray-600 text-sm">JOURN3Y's team is certified in Glean best practices</p>
          </div>

          <div className="text-center bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Proven Methodologies</h3>
            <p className="text-gray-600 text-sm">Access to exclusive partner resources and implementation frameworks</p>
          </div>

          <div className="text-center bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Priority Support</h3>
            <p className="text-gray-600 text-sm">Direct access to Glean engineering and faster issue resolution</p>
          </div>

          <div className="text-center bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Success Guarantee</h3>
            <p className="text-gray-600 text-sm">Partner-backed implementation success with measurable outcomes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GleanPartnerBenefitsSection;