
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useImageUpload } from '@/hooks/useImageUpload';
import { checkAuthStatus, getHighestOrderValue, updateTeamMember, createTeamMember } from '@/services/TeamMemberService';
import { TeamMember, TeamMemberFormData } from '@/types/teamMember';

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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { 
    imagePreview, 
    handleImageChange, 
    uploadImageIfNeeded 
  } = useImageUpload({ initialImageUrl: member?.image_url });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Starting team member save process...");
      
      // Check authentication status
      await checkAuthStatus();
      
      // Upload image if needed and get URL
      let imageUrl = formData.image_url;
      try {
        imageUrl = await uploadImageIfNeeded(imageUrl);
      } catch (imageError) {
        console.error("Error uploading image:", imageError);
        // Continue with save process even if image upload fails
      }

      // Determine order value for new members
      let orderValue = formData.order || 0;
      if (!formData.order) {
        orderValue = await getHighestOrderValue();
      }

      const updatedMember = {
        ...formData,
        image_url: imageUrl,
        order: orderValue,
      };

      if (member?.id) {
        // Update existing member
        await updateTeamMember(member.id, updatedMember);
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
      } else {
        // Create new member
        await createTeamMember(updatedMember, orderValue);
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
