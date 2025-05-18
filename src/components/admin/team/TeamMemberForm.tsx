
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useTeamMemberForm } from '@/hooks/useTeamMemberForm';
import { TeamMember } from '@/types/teamMember';
import TeamMemberFields from './TeamMemberFields';
import ImageUploadField from './ImageUploadField';

interface TeamMemberFormProps {
  member?: TeamMember;
  onSave: () => void;
  onCancel: () => void;
}

export default function TeamMemberForm({ member, onSave, onCancel }: TeamMemberFormProps) {
  const {
    formData,
    imagePreview,
    isSubmitting,
    handleChange,
    handleImageChange,
    handleSubmit
  } = useTeamMemberForm({ member, onSave });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{member ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <TeamMemberFields 
            formData={formData}
            onChange={handleChange}
          />
          
          <ImageUploadField 
            imagePreview={imagePreview}
            onChange={handleImageChange}
            isEdit={!!member}
          />
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
