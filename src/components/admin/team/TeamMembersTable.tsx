import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash, MoveUp, MoveDown } from 'lucide-react';
import { TeamMember } from '@/types/teamMember';

interface TeamMembersTableProps {
  members: TeamMember[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (id: string, direction: 'up' | 'down') => void;
  loading: boolean;
}

export default function TeamMembersTable({ 
  members, 
  onEdit, 
  onDelete, 
  onReorder,
  loading 
}: TeamMembersTableProps) {
  const { toast } = useToast();
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({});

  const toggleBio = (id: string) => {
    setExpandedBios((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateBio = (bio: string, expanded: boolean) => {
    if (expanded) return bio;
    return bio.length > 100 ? `${bio.substring(0, 100)}...` : bio;
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <p>Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead className="w-[300px]">Bio</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No team members found. Add your first team member.
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    {member.image_url ? (
                      <img 
                        src={member.image_url} 
                        alt={member.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm text-gray-600">
                      {truncateBio(member.bio, !!expandedBios[member.id])}
                    </p>
                    {member.bio.length > 100 && (
                      <button 
                        onClick={() => toggleBio(member.id)}
                        className="text-xs text-journey-purple mt-1 hover:underline"
                      >
                        {expandedBios[member.id] ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(member.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => onDelete(member.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-1" 
                        disabled={members.indexOf(member) === 0}
                        onClick={() => onReorder(member.id, 'up')}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-1" 
                        disabled={members.indexOf(member) === members.length - 1}
                        onClick={() => onReorder(member.id, 'down')}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
