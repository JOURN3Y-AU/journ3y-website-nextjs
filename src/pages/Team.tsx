
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  order: number;
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('order', { ascending: true });
          
        if (error) throw error;
        setTeamMembers(data || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <Avatar className="h-full w-full rounded-none">
                  <AvatarImage 
                    src={member.image_url} 
                    alt={member.name} 
                    className="object-cover h-full w-full"
                  />
                  <AvatarFallback className="text-4xl h-full w-full rounded-none">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-journey-purple font-medium mb-2">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
