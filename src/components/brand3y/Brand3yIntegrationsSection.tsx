
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
    <section className="pt-4 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Connect to Where Your Brand's Data Lives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            What if you could see everything happening with your brand across every platform—from social media to advertising to customer conversations—in one unified view? 
            <br/>We're building that platform.
            <br/>Track your performance, analyze competitor moves, and understand customer sentiment without jumping between a dozen different tools
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
          {integrations.map((integration, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              <div className="w-16 h-16 mb-3 flex items-center justify-center bg-white rounded-lg shadow-sm">
                <img 
                  src={integration.logo} 
                  alt={`${integration.name} logo`}
                  className="max-w-12 max-h-12 object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">{integration.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-blue-600">One platform.</span> All your brand data. 
            Real-time insights from every platform your customers use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brand3yIntegrationsSection;
