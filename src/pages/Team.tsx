
import { Card, CardContent } from '@/components/ui/card';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { TeamMember } from '@/types/teamMember';
import { useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Team() {
  const { teamMembers, loading, error } = useTeamMembers();
  const { showTeamPage, loading: loadingSettings } = useSiteSettings();
  
  // Add debug logging to help diagnose issues
  useEffect(() => {
    console.log('Team page loaded');
    console.log('Team members:', teamMembers);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
    console.log('Show team page setting:', showTeamPage);
    console.log('Settings loading state:', loadingSettings);
  }, [teamMembers, loading, error, showTeamPage, loadingSettings]);

  if (loading || loadingSettings) {
    return (
      <div className="container mx-auto py-24 mt-16 px-4">
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg">Loading team members...</p>
        </div>
      </div>
    );
  }

  // Add explicit error handling
  if (error) {
    return (
      <div className="container mx-auto py-24 mt-16 px-4">
        <div className="flex justify-center items-center min-h-[50vh] flex-col">
          <p className="text-lg text-red-500 mb-4">Error loading team members</p>
          <p className="text-sm text-gray-500">Please try refreshing the page</p>
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

      {!teamMembers || teamMembers.length === 0 ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <p className="text-lg text-gray-500">Team information coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden bg-gray-100 w-full max-w-[200px] mx-auto pt-2">
                <div className="h-[90%] w-[90%] mx-auto overflow-hidden group relative">
                  <img 
                    src={member.image_url} 
                    alt={member.name}
                    className="object-cover w-full h-full filter grayscale transition-all duration-300 group-hover:grayscale-0"
                    onError={(e) => {
                      // Handle image loading errors
                      console.error(`Failed to load image for ${member.name}`);
                      e.currentTarget.src = '/placeholder.svg';
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
      )}
    </div>
  );
}
