
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  order?: number;
}

// Create a separate type for form data that can have optional id
export type TeamMemberFormData = Omit<TeamMember, 'id'> & { id?: string };
