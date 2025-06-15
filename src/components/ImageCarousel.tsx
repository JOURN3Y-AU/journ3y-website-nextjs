
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

const ImageCarousel = ({ images, alt, className = "" }: ImageCarouselProps) => {
  console.log('ImageCarousel images:', images); // Debug log to see if all images are passed
  
  return (
    <div className="relative">
      <Carousel className={`w-full ${className}`} opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <div className="relative">
                <img 
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                  onError={(e) => console.log('Image failed to load:', image)}
                  onLoad={() => console.log('Image loaded:', image)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
