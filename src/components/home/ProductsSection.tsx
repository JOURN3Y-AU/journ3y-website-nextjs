'use client'

import Link from 'next/link'
import { FileText, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useScrollReveal from '@/hooks/useScrollReveal'

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  link: string;
  buttonColor: string;
}

const ProductCard = ({ title, description, icon, gradient, link, buttonColor }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className={`h-48 ${gradient} flex items-center justify-center`}>
        {icon}
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-2xl font-semibold mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        <Button 
          asChild 
          variant="outline" 
          className={`w-full justify-center mt-auto border-${buttonColor} text-${buttonColor} hover:bg-${buttonColor}/10`}
        >
          <Link href={link}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const ProductsSection = () => {
  const productSectionRef = useScrollReveal();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div ref={productSectionRef} className="text-center mb-16 reveal transition-all duration-500 ease-out">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Accelerate your AI JOURN3Y</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            JOURN3Y has the people, products and services to get you moving towards confidently taking advantage of AI in your business
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ProductCard 
            title="Blueprint"
            description="Transforms business strategy into AI-powered action"
            icon={<FileText className="w-20 h-20 text-white" strokeWidth={1.5} />}
            gradient="bg-gradient-to-br from-journey-purple/90 to-journey-blue/90"
            link="/products/blueprint"
            buttonColor="journey-purple"
          />
          
          <ProductCard 
            title="Glean"
            description="AI-powered work platform that connects all your company's knowledge"
            icon={<img src="/Glean-logo.png" alt="Glean Logo" className="w-full h-full object-cover" />}
            gradient="bg-gradient-to-br from-journey-blue/90 to-journey-dark-blue/90"
            link="/products/glean"
            buttonColor="journey-blue"
          />
          
          <ProductCard 
            title="Services"
            description="The people, expertise and platforms to delivery AI into your organisation"
            icon={<Users className="w-20 h-20 text-white" strokeWidth={1.5} />}
            gradient="bg-gradient-to-br from-journey-dark-purple/90 to-journey-purple/90"
            link="/products/services"
            buttonColor="journey-dark-purple"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
