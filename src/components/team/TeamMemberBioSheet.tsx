import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { TeamMember } from '@/types/teamMember';
import { useIsMobile } from '@/hooks/use-mobile';

interface TeamMemberBioSheetProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamMemberBioSheet({ member, isOpen, onClose }: TeamMemberBioSheetProps) {
  const isMobile = useIsMobile();

  if (!member) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"}
        className={isMobile ? "h-[80vh]" : "w-[400px]"}
      >
        <SheetHeader className="text-left">
          <div className="flex flex-col items-center sm:items-start gap-4 mb-6">
            <div className={`aspect-square overflow-hidden bg-gray-100 rounded-lg ${isMobile ? 'w-24 h-24' : 'w-32 h-32'}`}>
              <img 
                src={member.image_url} 
                alt={member.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="text-center sm:text-left">
              <SheetTitle className="text-xl font-bold">{member.name}</SheetTitle>
              <SheetDescription className="text-primary font-medium text-base mt-1">
                {member.position}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
              About
            </h3>
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              {member.bio}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}