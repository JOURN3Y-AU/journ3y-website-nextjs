
import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AnnouncementOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementOverlay = ({ isOpen, onClose }: AnnouncementOverlayProps) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleLearnMore = () => {
    onClose();
    navigate('/products/glean');
  };

  const benefits = [
    "Unified AI-powered search across all your business applications",
    "Enterprise-grade security and compliance built-in", 
    "Seamless integration with 100+ popular business tools",
    "Expert implementation and ongoing support from JOURN3Y",
    "Accelerated time-to-value with proven methodologies"
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
      isClosing ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Announcing our new Partner
            </h2>
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/Glean-logo.png" 
                alt="Glean" 
                className="h-12 object-contain"
              />
            </div>
            <p className="text-xl text-gray-600">
              Bringing Enterprise AI Search to Your Organization
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Transform how your team finds and uses information:
            </h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={handleLearnMore}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Learn More About Glean
            </Button>
            <Button 
              onClick={handleClose}
              variant="outline"
              className="px-8 py-3 text-lg"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementOverlay;
