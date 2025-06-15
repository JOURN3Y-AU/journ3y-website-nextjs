
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

const ImageCarousel = ({ images, alt, className = "" }: ImageCarouselProps) => {
  console.log('ImageCarousel images:', images); // Debug log to see if all images are passed
  
  return (
    <div className="relative">
      <Carousel 
        className={`w-full ${className}`} 
        opts={{ 
          align: "start", 
          loop: true,
          slidesToScroll: 1,
          containScroll: "trimSnaps"
        }}
        setApi={(api: CarouselApi) => {
          if (api) {
            console.log('Embla API initialized:', api);
            console.log('Total slides:', api.slideNodes().length);
            console.log('Can scroll prev:', api.canScrollPrev());
            console.log('Can scroll next:', api.canScrollNext());
            console.log('Current slide index:', api.selectedScrollSnap());
            
            api.on('select', () => {
              console.log('Slide changed to index:', api.selectedScrollSnap());
              console.log('Can scroll prev:', api.canScrollPrev());
              console.log('Can scroll next:', api.canScrollNext());
            });
            
            api.on('pointerDown', () => {
              console.log('Pointer down event');
            });
            
            api.on('pointerUp', () => {
              console.log('Pointer up event');
            });
          }
        }}
      >
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-4 basis-full">
              <div className="relative aspect-video">
                <img 
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  className="rounded-lg shadow-xl w-full h-full object-cover"
                  onError={(e) => console.log('Image failed to load:', image)}
                  onLoad={() => console.log('Image loaded:', image)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10" 
          onClick={() => console.log('Previous button clicked')}
        />
        <CarouselNext 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          onClick={() => console.log('Next button clicked')}
        />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
