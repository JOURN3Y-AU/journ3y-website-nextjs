
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/components/admin/ImageUploadService';
import { supabase } from '@/integrations/supabase/client';

export interface TeamMember {
  id: string;  // Required id
  name: string;
  position: string;
  bio: string;
  image_url: string;
  order?: number;
}

// Create a separate type for form data that can have optional id
export type TeamMemberFormData = Omit<TeamMember, 'id'> & { id?: string };

interface UseTeamMemberFormProps {
  member?: TeamMember;
  onSave: () => void;
}

export function useTeamMemberForm({ member, onSave }: UseTeamMemberFormProps) {
  const [formData, setFormData] = useState<TeamMemberFormData>({
    name: '',
    position: '',
    bio: '',
    image_url: '',
    ...member
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (member?.image_url) {
      setImagePreview(member.image_url);
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Starting team member save process...");
      
      // Log authentication status
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("Current auth status:", sessionData.session ? "Authenticated" : "Not authenticated");
      
      let imageUrl = formData.image_url;

      // Upload image if a new one is selected
      if (imageFile) {
        console.log("Uploading new image...");
        try {
          imageUrl = await uploadImage(imageFile);
          console.log("Image uploaded successfully:", imageUrl);
        } catch (imageError) {
          console.error("Error uploading image:", imageError);
          // Continue with save process even if image upload fails
        }
      }

      // Get the highest order value for new member
      let orderValue = formData.order || 0;
      if (!formData.order) {
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
        
        orderValue = existingMembers && existingMembers.length > 0 
          ? (existingMembers[0].order + 1) 
          : 1;
        console.log("New team member will have order:", orderValue);
      }

      const updatedMember = {
        ...formData,
        image_url: imageUrl,
        order: orderValue,
      };

      if (member?.id) {
        // Update existing member
        console.log("Updating existing team member:", member.id);
        const { data: updateData, error: updateError } = await supabase
          .from('team_members')
          .update({
            name: updatedMember.name,
            position: updatedMember.position,
            bio: updatedMember.bio,
            image_url: updatedMember.image_url,
          })
          .eq('id', member.id)
          .select();
          
        if (updateError) {
          console.error("Error updating team member:", updateError);
          throw updateError;
        }
        
        console.log("Team member updated successfully:", updateData);
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
      } else {
        // Create new member
        console.log("Creating new team member with data:", {
          name: updatedMember.name,
          position: updatedMember.position,
          image_url: updatedMember.image_url,
          order: orderValue
        });
        
        const { data: insertData, error: insertError } = await supabase
          .from('team_members')
          .insert([{
            name: updatedMember.name,
            position: updatedMember.position,
            bio: updatedMember.bio,
            image_url: updatedMember.image_url,
            order: orderValue
          }])
          .select();
          
        if (insertError) {
          console.error("Error inserting team member:", insertError);
          throw insertError;
        }
        
        console.log("Team member created successfully:", insertData);
        toast({
          title: "Success",
          description: "Team member added successfully",
        });
      }

      onSave();
    } catch (error: any) {
      console.error('Error saving team member:', error);
      // Include full error details in the console
      if (error.details || error.hint || error.code) {
        console.error('Additional error details:', {
          details: error.details,
          hint: error.hint,
          code: error.code
        });
      }
      
      toast({
        title: "Error",
        description: error.message || "Failed to save team member",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    imagePreview,
    isSubmitting,
    handleChange,
    handleImageChange,
    handleSubmit
  };
}
