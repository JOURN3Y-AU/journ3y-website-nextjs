
import { supabase } from '@/integrations/supabase/client';
import { TeamMember, TeamMemberFormData } from '@/types/teamMember';

export async function getHighestOrderValue(): Promise<number> {
  console.log("Fetching existing team members to determine order...");
  const { data: existingMembers, error: fetchError } = await supabase
    .from('team_members')
    .select('order')
    .order('order', { ascending: false })
    .limit(1) as any;
  
  if (fetchError) {
    console.error("Error fetching team members for order:", fetchError);
    throw fetchError;
  }
  
  const orderValue = existingMembers && existingMembers.length > 0 
    ? (existingMembers[0].order + 1) 
    : 1;
  
  console.log("New team member will have order:", orderValue);
  return orderValue;
}

export async function updateTeamMember(id: string, memberData: Partial<TeamMember>) {
  console.log("Updating existing team member:", id);
  const { data, error } = await supabase
    .from('team_members')
    .update({
      name: memberData.name,
      position: memberData.position,
      bio: memberData.bio,
      image_url: memberData.image_url,
    })
    .eq('id', id)
    .select();
    
  if (error) {
    console.error("Error updating team member:", error);
    throw error;
  }
  
  console.log("Team member updated successfully:", data);
  return data;
}

export async function createTeamMember(memberData: TeamMemberFormData, orderValue: number) {
  console.log("Creating new team member with data:", {
    name: memberData.name,
    position: memberData.position,
    image_url: memberData.image_url,
    order: orderValue
  });
  
  const { data, error } = await supabase
    .from('team_members')
    .insert([{
      name: memberData.name,
      position: memberData.position,
      bio: memberData.bio,
      image_url: memberData.image_url,
      order: orderValue
    }])
    .select();
    
  if (error) {
    console.error("Error inserting team member:", error);
    throw error;
  }
  
  console.log("Team member created successfully:", data);
  return data;
}

export async function checkAuthStatus() {
  const { data: sessionData } = await supabase.auth.getSession();
  const isAuthenticated = !!sessionData.session;
  console.log("Current auth status:", isAuthenticated ? "Authenticated" : "Not authenticated");
  return isAuthenticated;
}
