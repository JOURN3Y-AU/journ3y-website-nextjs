
import useScrollReveal from '@/hooks/useScrollReveal';

const Brand3yIntegrationsSection = () => {
  const sectionRef = useScrollReveal();

  const integrations = [
    { name: 'Facebook', logo: '/logos/facebook.svg' },
    { name: 'Instagram', logo: '/logos/instagram.svg' },
    { name: 'Google Ads', logo: '/logos/google.svg' },
    { name: 'YouTube', logo: '/logos/youtube.svg' },
    { name: 'Twitter', logo: '/logos/twitter.svg' },
    { name: 'TikTok', logo: '/logos/tiktok.svg' },
    { name: 'LinkedIn', logo: '/logos/linkedin.svg' },
    { name: 'Pinterest', logo: '/logos/pinterest.svg' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Connects Where Your Brand Data Lives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Brand3y seamlessly integrates with all major marketing and social media platforms, 
            giving you a unified view of your brand's performance across every channel where your audience engages.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
          {integrations.map((integration, index) => (
            <div key={index} className={`reveal reveal-delay-${(index + 1) * 50} transition-all duration-500 ease-out`}>
              <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{integration.name.slice(0, 2)}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{integration.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-green-600">One dashboard.</span> All your brand data. 
            Real-time insights from every platform your customers use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brand3yIntegrationsSection;
