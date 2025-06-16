
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const ANNOUNCEMENT_STORAGE_KEY = 'journ3y_announcement_dismissed';
const ANNOUNCEMENT_VERSION = 'glean_partnership_2024';

export function useAnnouncement() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementEnabled, setAnnouncementEnabled] = useState(false);
  const [announcementEndDate, setAnnouncementEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkIfShouldShow = () => {
    if (!announcementEnabled) return false;
    
    // Check if announcement has an end date and if it's passed
    if (announcementEndDate) {
      const endDate = new Date(announcementEndDate);
      const now = new Date();
      if (now > endDate) return false;
    }

    // Check localStorage for dismissal
    const dismissed = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
    if (dismissed) {
      try {
        const dismissedData = JSON.parse(dismissed);
        // Check if it's the same version and within 30 days
        if (dismissedData.version === ANNOUNCEMENT_VERSION) {
          const dismissedDate = new Date(dismissedData.timestamp);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          if (dismissedDate > thirtyDaysAgo) {
            return false;
          }
        }
      } catch (error) {
        console.error('Error parsing announcement dismissal data:', error);
      }
    }

    return true;
  };

  const fetchAnnouncementSettings = async () => {
    setLoading(true);
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
      setShowAnnouncement(checkIfShouldShow());
    } catch (error) {
      console.error('Error fetching announcement settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissAnnouncement = () => {
    const dismissalData = {
      version: ANNOUNCEMENT_VERSION,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, JSON.stringify(dismissalData));
    setShowAnnouncement(false);
  };

  const resetAnnouncement = () => {
    localStorage.removeItem(ANNOUNCEMENT_STORAGE_KEY);
    if (checkIfShouldShow()) {
      setShowAnnouncement(true);
    }
  };

  useEffect(() => {
    fetchAnnouncementSettings();
  }, []);

  return {
    showAnnouncement,
    loading,
    dismissAnnouncement,
    resetAnnouncement,
    refetchSettings: fetchAnnouncementSettings
  };
}
