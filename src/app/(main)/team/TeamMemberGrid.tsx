'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { TeamMember } from '@/types/teamMember'
import TeamMemberBioSheet from '@/components/team/TeamMemberBioSheet'

interface TeamMemberGridProps {
  teamMembers: TeamMember[]
}

export default function TeamMemberGrid({ teamMembers }: TeamMemberGridProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member)
    setIsSheetOpen(true)
  }

  const handleSheetClose = () => {
    setIsSheetOpen(false)
    setSelectedMember(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Card
            key={member.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 p-6 cursor-pointer hover:scale-105"
            onClick={() => handleMemberClick(member)}
            role="button"
            aria-label={`View ${member.name}'s full bio`}
          >
            <div className="aspect-square overflow-hidden bg-gray-100 w-full max-w-[200px] mx-auto rounded-md">
              <div className="h-full w-full p-[5%] overflow-hidden group relative">
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="object-cover w-full h-full filter grayscale transition-all duration-300 group-hover:grayscale-0"
                  onError={(e) => {
                    console.error(`Failed to load image for ${member.name}`)
                    e.currentTarget.src = '/placeholder.svg'
                  }}
                />
              </div>
            </div>
            <CardContent className="p-4 pt-3">
              <h3 className="text-base font-semibold">{member.name}</h3>
              <p className="text-sm text-journey-purple font-medium mb-1">{member.position}</p>
              <p className="text-xs text-gray-600 line-clamp-3">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <TeamMemberBioSheet
        member={selectedMember}
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
      />
    </>
  )
}
