
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import TeamMembersTable from './TeamMembersTable';
import TeamMemberForm from './TeamMemberForm';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember } from '@/types/teamMember';

interface TeamMembersListProps {
  initialMembers: TeamMember[];
  onRefresh: () => void;
}

export default function TeamMembersList({ initialMembers, onRefresh }: TeamMembersListProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialMembers);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();

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
        .eq('id', id) as any;
      
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
    const temp = newMembers[index].order!;
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
          .eq('id', update.id) as any;
          
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
      onRefresh();
    }
  };

  const handleSaveMember = () => {
    setIsEditing(false);
    setCurrentMember(null);
    onRefresh();
  };

  return (
    <div className="bg-white rounded-lg shadow">
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
        </>
      )}
    </div>
  );
}
