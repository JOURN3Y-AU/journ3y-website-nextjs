
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { TeamMember } from '@/types/teamMember';

export default function Team() {
  const { teamMembers, loading } = useTeamMembers();

  if (loading) {
    return (
      <div className="container mx-auto py-24 mt-16 px-4">
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 mt-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Team</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Meet the dedicated professionals behind JOURN3Y's success. Our team combines expertise and passion to deliver exceptional solutions.
        </p>
      </div>

      {teamMembers.length === 0 ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <p className="text-lg text-gray-500">Team information coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden bg-gray-100 w-full max-w-[200px] mx-auto pt-2">
                <Avatar className="h-[90%] w-[90%] rounded-none mx-auto">
                  <AvatarImage 
                    src={member.image_url} 
                    alt={member.name} 
                    className="object-cover h-full w-full"
                  />
                  <AvatarFallback className="text-2xl h-full w-full rounded-none">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="p-4 pt-3">
                <h3 className="text-base font-semibold">{member.name}</h3>
                <p className="text-sm text-journey-purple font-medium mb-1">{member.position}</p>
                <p className="text-xs text-gray-600 line-clamp-3">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
