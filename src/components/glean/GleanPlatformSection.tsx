'use client'

import { Database, Brain, Shield } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import ImageCarousel from '@/components/ImageCarousel';

const GleanPlatformSection = () => {
  const section2Ref = useScrollReveal();

  const gleamImages = [
    '/glean_1.png',
    '/glean_2.png',
    '/glean_3.png',
    '/glean_4.png'
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={section2Ref} className="reveal transition-all duration-500 ease-out">
            <h2 className="text-3xl font-bold mb-6">Your Enterprise AI Platform, Delivered by JOURN3Y - an Authorised Glean Partner</h2>
            <p className="text-gray-700 mb-6">
              As an Authorized Glean Partner, JOURN3Y brings certified expertise to connect all your company's information and make it instantly accessible. Our partnership ensures you get proven implementation strategies and ongoing support for maximum ROI.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Universal Knowledge Graph</h3>
                  <p className="text-gray-600">Connects and understands relationships between all your company's data and documents.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Contextual AI</h3>
                  <p className="text-gray-600">AI that understands your role, permissions, and what's relevant to your work.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Enterprise Security</h3>
                  <p className="text-gray-600">SOC 2 compliant with advanced permissions and data governance controls.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-first lg:order-last">
            <ImageCarousel 
              images={gleamImages}
              alt="Glean Platform Interface"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GleanPlatformSection;
