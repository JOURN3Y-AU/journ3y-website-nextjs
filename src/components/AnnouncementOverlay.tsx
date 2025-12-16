
'use client'

import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer';

interface AnnouncementOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementOverlay = ({ isOpen, onClose }: AnnouncementOverlayProps) => {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const isMobile = useIsMobile();

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
    router.push('/products/glean');
  };

  const benefits = [
    "Unified AI-powered search, Generative AI and Agents using your organisations data",
    "Enterprise-grade security and compliance built-in", 
    "Seamless integration with 100+ popular business tools",
    "Expert implementation and ongoing support from JOURN3Y",
    "Accelerated time-to-value with proven methodologies"
  ];

  // Mobile drawer version
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleClose}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="text-center pb-4">
            <DrawerTitle className="text-2xl font-bold text-gray-900 mb-2">
              Announcing our new Partner
            </DrawerTitle>
            <div className="flex items-center justify-center mb-3">
              <img 
                src="/Glean-logo.png" 
                alt="Glean" 
                className="h-16 object-contain drop-shadow-md"
              />
            </div>
            <DrawerDescription className="text-lg text-gray-600">
              Bringing Enterprise AI to Your Organization
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Transform how your team finds and uses information:
              </h3>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DrawerFooter className="flex flex-col gap-2">
            <Button 
              onClick={handleLearnMore}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Learn More About Glean
            </Button>
            <Button 
              onClick={handleClose}
              variant="outline"
              className="w-full"
            >
              Maybe Later
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop modal version
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
                className="h-24 object-contain drop-shadow-md"
              />
            </div>
            <p className="text-xl text-gray-600">
              Bringing Enterprise AI to Your Organization
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
