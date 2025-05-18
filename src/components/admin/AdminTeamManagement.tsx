
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Plus } from 'lucide-react';
import TeamMembersTable from './team/TeamMembersTable';
import TeamMemberForm from './team/TeamMemberForm';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  order: number;
}

interface AdminTeamManagementProps {
  onLogout: () => void;
}

export default function AdminTeamManagement({ onLogout }: AdminTeamManagementProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [showTeamPage, setShowTeamPage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchTeamMembers();
    fetchSiteSettings();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order', { ascending: true });
        
      if (error) throw error;
      
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'show_team_page')
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching site settings:', error);
      } else {
        setShowTeamPage(data?.value === 'true');
      }
    } catch (error) {
      console.error('Error in fetchSiteSettings:', error);
    }
  };

  const handleEditMember = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    if (member) {
      setCurrentMember(member);
      setIsEditing(true);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the UI by removing the deleted member
      setTeamMembers(teamMembers.filter(m => m.id !== id));
      
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive"
      });
    }
  };

  const handleReorderMember = async (id: string, direction: 'up' | 'down') => {
    const index = teamMembers.findIndex(m => m.id === id);
    if (index === -1) return;
    
    // Can't move first item up or last item down
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === teamMembers.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newMembers = [...teamMembers];
    
    // Swap the order values
    const temp = newMembers[index].order;
    newMembers[index].order = newMembers[newIndex].order;
    newMembers[newIndex].order = temp;
    
    // Reorder the array
    [newMembers[index], newMembers[newIndex]] = [newMembers[newIndex], newMembers[index]];
    
    // Update state immediately for a snappy UI
    setTeamMembers(newMembers);
    
    // Update the order in the database
    try {
      const updates = [
        { id: newMembers[index].id, order: newMembers[index].order },
        { id: newMembers[newIndex].id, order: newMembers[newIndex].order }
      ];
      
      // Update each member with their new order
      for (const update of updates) {
        const { error } = await supabase
          .from('team_members')
          .update({ order: update.order })
          .eq('id', update.id);
          
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error reordering team members:', error);
      toast({
        title: "Error",
        description: "Failed to reorder team members",
        variant: "destructive"
      });
      // Fetch the original order again
      fetchTeamMembers();
    }
  };

  const handleShowTeamToggle = async (value: boolean) => {
    setIsSaving(true);
    try {
      // Check if the setting exists
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'show_team_page');
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Update existing setting
        await supabase
          .from('site_settings')
          .update({ value: value ? 'true' : 'false' })
          .eq('key', 'show_team_page');
      } else {
        // Insert new setting
        await supabase
          .from('site_settings')
          .insert([
            { key: 'show_team_page', value: value ? 'true' : 'false' }
          ]);
      }
      
      setShowTeamPage(value);
      toast({
        title: "Success",
        description: `Team page is now ${value ? 'visible' : 'hidden'}`,
      });
    } catch (error) {
      console.error('Error updating site settings:', error);
      toast({
        title: "Error",
        description: "Failed to update page visibility",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveMember = () => {
    setIsEditing(false);
    setCurrentMember(null);
    fetchTeamMembers();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Team Management</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/admin')} variant="outline">
            Back to Dashboard
          </Button>
          
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
      
      {isEditing ? (
        <TeamMemberForm 
          member={currentMember || undefined}
          onSave={handleSaveMember}
          onCancel={() => {
            setIsEditing(false);
            setCurrentMember(null);
          }}
        />
      ) : (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Team Page Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Switch 
                  id="show-team-page" 
                  checked={showTeamPage}
                  disabled={isSaving}
                  onCheckedChange={handleShowTeamToggle}
                />
                <Label htmlFor="show-team-page">
                  {showTeamPage ? 'Team page is visible in navigation' : 'Team page is hidden from navigation'}
                </Label>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <Button onClick={() => setIsEditing(true)} className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </div>
            
            <TeamMembersTable 
              members={teamMembers}
              onEdit={handleEditMember}
              onDelete={handleDeleteMember}
              onReorder={handleReorderMember}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
}
