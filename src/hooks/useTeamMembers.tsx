
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember } from '@/types/teamMember';

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching team members...');
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order', { ascending: true }) as { data: TeamMember[], error: any };
        
      if (error) {
        console.error('Supabase error fetching team members:', error);
        throw new Error(`Failed to fetch team members: ${error.message}`);
      }
      
      console.log(`Fetched ${data?.length || 0} team members`);
      setTeamMembers(data || []);
    } catch (err: any) {
      console.error('Error in fetchTeamMembers:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return {
    teamMembers,
    loading,
    error,
    refetchTeamMembers: fetchTeamMembers
  };
}
