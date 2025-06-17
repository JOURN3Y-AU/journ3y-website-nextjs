
import useScrollReveal from '@/hooks/useScrollReveal';

const Brand3yHeroSection = () => {
  const heroRef = useScrollReveal();

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div ref={heroRef} className="reveal transition-all duration-500 ease-out">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                  <span>🚀 Coming Soon</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
                Stop saying{' '}
                <span className="text-green-600">"I'll get back to you on that"</span>{' '}
                in brand strategy meetings
              </h1>
              
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                What if you could be the marketer who always has the answers? The one everyone turns to when they need to understand what's really happening in the market?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#waitlist" 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-center"
                >
                  Join the Waitlist
                </a>
                <a 
                  href="#learn-more" 
                  className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Column - Video */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-8 border border-green-100">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-64 object-cover rounded-lg mb-4"
                >
                  <source src="/Portrait_Video_Generation_Complete.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="text-center">
                  <p className="text-gray-600 italic">
                    "Finally, I can confidently answer any brand question in real-time"
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- Marketing Director, Fortune 500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brand3yHeroSection;
