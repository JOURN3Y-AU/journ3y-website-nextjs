
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/components/admin/ImageUploadService';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id?: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  order?: number;
}

interface TeamMemberFormProps {
  member?: TeamMember;
  onSave: () => void;
  onCancel: () => void;
}

export default function TeamMemberForm({ member, onSave, onCancel }: TeamMemberFormProps) {
  const [formData, setFormData] = useState<TeamMember>({
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
      let imageUrl = formData.image_url;

      // Upload image if a new one is selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Get the highest order value for new member
      let orderValue = formData.order || 0;
      if (!formData.order) {
        const { data: existingMembers } = await supabase
          .from('team_members')
          .select('order')
          .order('order', { ascending: false })
          .limit(1);
        
        orderValue = existingMembers && existingMembers.length > 0 
          ? (existingMembers[0].order + 1) 
          : 1;
      }

      const updatedMember = {
        ...formData,
        image_url: imageUrl,
        order: orderValue,
      };

      if (member?.id) {
        // Update existing member
        const { error } = await supabase
          .from('team_members')
          .update({
            name: updatedMember.name,
            position: updatedMember.position,
            bio: updatedMember.bio,
            image_url: updatedMember.image_url,
          })
          .eq('id', member.id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
      } else {
        // Create new member
        const { error } = await supabase
          .from('team_members')
          .insert([{
            name: updatedMember.name,
            position: updatedMember.position,
            bio: updatedMember.bio,
            image_url: updatedMember.image_url,
            order: orderValue
          }]);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Team member added successfully",
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving team member:', error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{member ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input 
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter job title/position"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter a brief bio"
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Profile Image</Label>
            <div className="flex items-center space-x-4">
              {imagePreview && (
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <Input 
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="max-w-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {member ? 'Upload a new image or keep the existing one' : 'Upload a profile image (square images work best)'}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : member ? 'Update' : 'Add Member'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
