
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TeamPageSettings from './team/TeamPageSettings';
import AnnouncementSettings from './AnnouncementSettings';
import TeamMembersList from './team/TeamMembersList';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useAnnouncement } from '@/hooks/useAnnouncement';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminTeamManagementProps {
  onLogout: () => void;
}

export default function AdminTeamManagement({ onLogout }: AdminTeamManagementProps) {
  const navigate = useNavigate();
  const { teamMembers, loading: loadingTeamMembers, refetchTeamMembers } = useTeamMembers();
  const { showTeamPage, loading: loadingSettings } = useSiteSettings();
  const { resetAnnouncement } = useAnnouncement();
  
  const [announcementEnabled, setAnnouncementEnabled] = useState(false);
  const [announcementEndDate, setAnnouncementEndDate] = useState<string | null>(null);
  const [loadingAnnouncement, setLoadingAnnouncement] = useState(true);

  const fetchAnnouncementSettings = async () => {
    setLoadingAnnouncement(true);
    try {
      const { data } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['announcement_enabled', 'announcement_end_date']);

      let enabled = false;
      let endDate = null;

      if (data) {
        const enabledSetting = data.find(item => item.key === 'announcement_enabled');
        const endDateSetting = data.find(item => item.key === 'announcement_end_date');
        
        enabled = enabledSetting?.value === 'true';
        endDate = endDateSetting?.value || null;
      }

      setAnnouncementEnabled(enabled);
      setAnnouncementEndDate(endDate);
    } catch (error) {
      console.error('Error fetching announcement settings:', error);
    } finally {
      setLoadingAnnouncement(false);
    }
  };

  useEffect(() => {
    fetchAnnouncementSettings();
  }, []);

  const loading = loadingTeamMembers || loadingSettings || loadingAnnouncement;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Team Management</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/admin')} variant="outline">
            Back to Dashboard
          </Button>
          
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <AnnouncementSettings 
            initialEnabled={announcementEnabled}
            initialEndDate={announcementEndDate}
            onReset={() => {
              resetAnnouncement();
              alert('Announcement reset! Refresh the page to see it.');
            }}
          />
          <TeamPageSettings initialShowTeamPage={showTeamPage} />
          <TeamMembersList 
            initialMembers={teamMembers} 
            onRefresh={refetchTeamMembers} 
          />
        </>
      )}
    </div>
  );
}
