
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TeamMemberFormData } from '@/types/teamMember';

interface TeamMemberFieldsProps {
  formData: TeamMemberFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function TeamMemberFields({ formData, onChange }: TeamMemberFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Enter a brief bio"
          className="min-h-[100px]"
          required
        />
      </div>
    </>
  );
}
