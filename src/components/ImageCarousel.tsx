
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

const ImageCarousel = ({ images, alt, className = "" }: ImageCarouselProps) => {
  return (
    <div className="relative">
      <Carousel 
        className={`w-full ${className}`} 
        opts={{ 
          align: "start", 
          loop: true,
          slidesToScroll: 1,
          startIndex: 0,
          skipSnaps: false
        }}
      >
        <CarouselContent className="-ml-1">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-1 basis-full">
              <div className="relative aspect-video w-full bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  className="rounded-lg shadow-lg w-full h-full object-contain"
                  onError={(e) => console.log('Image failed to load:', image)}
                  onLoad={() => console.log('Image loaded successfully:', image)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
