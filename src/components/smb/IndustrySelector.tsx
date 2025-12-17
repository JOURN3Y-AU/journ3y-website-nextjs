import type { SMBIndustry } from '@/types/smb'
import IndustryCard from './IndustryCard'

interface IndustrySelectorProps {
  industries: SMBIndustry[]
}

export default function IndustrySelector({ industries }: IndustrySelectorProps) {
  return (
    <section id="industries" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Industry
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your industry to see how AI can transform your business operations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {industries.map((industry) => (
            <IndustryCard
              key={industry.id}
              slug={industry.slug}
              name={industry.name}
              tagline={industry.tagline}
              iconName={industry.icon_name}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
