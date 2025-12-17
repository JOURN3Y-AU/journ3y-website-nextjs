import type { SMBGlobalContent } from '@/types/smb'

interface StatsBarProps {
  stats: SMBGlobalContent['stats']
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="py-12 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</span>
              <span className="text-sm md:text-base opacity-90">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
