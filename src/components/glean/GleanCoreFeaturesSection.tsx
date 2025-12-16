'use client'

import { Search, SquarePen, Workflow } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';

const GleanCoreFeaturesSection = () => {
  const section1Ref = useScrollReveal();

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div ref={section1Ref} className="text-center mb-16 reveal transition-all duration-500 ease-out">
          <h2 className="text-3xl font-bold mb-4">Three Pillars of Glean's Work AI</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Glean combines search, creation, and automation in one unified platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Find & Understand</h3>
            <p className="text-gray-600 mb-4">
              Search across all your company's apps, documents, and data sources with AI-powered contextual results.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Universal search across 100+ apps</li>
              <li>• Personalized, contextual results</li>
              <li>• Permissions-aware security</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <SquarePen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Create & Summarize</h3>
            <p className="text-gray-600 mb-4">
              Generate content, summarize documents, and create presentations with your company's knowledge.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• AI-powered content creation</li>
              <li>• Brand-safe and compliant</li>
              <li>• Context from your data</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Workflow className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Automate Work</h3>
            <p className="text-gray-600 mb-4">
              Build AI agents to automate repetitive tasks and workflows across your organization.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Low-code agent builder</li>
              <li>• Process automation</li>
              <li>• Workflow integration</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GleanCoreFeaturesSection;
