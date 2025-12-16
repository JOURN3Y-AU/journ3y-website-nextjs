
'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

const ANNOUNCEMENT_STORAGE_KEY = 'journ3y_announcement_dismissed';
const ANNOUNCEMENT_VERSION = 'glean_partnership_2024';

export function useAnnouncement() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementEnabled, setAnnouncementEnabled] = useState(false);
  const [announcementEndDate, setAnnouncementEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncementSettings = async () => {
    console.log('Fetching announcement settings...');
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['announcement_enabled', 'announcement_end_date']);

      if (error) {
        console.error('Error fetching announcement settings:', error);
        // Don't return early, continue with defaults
      }

      let enabled = false;
      let endDate = null;

      if (data && data.length > 0) {
        console.log('Fetched announcement settings:', data);
        const enabledSetting = data.find(item => item.key === 'announcement_enabled');
        const endDateSetting = data.find(item => item.key === 'announcement_end_date');
        
        enabled = enabledSetting?.value === 'true';
        endDate = endDateSetting?.value || null;
        
        console.log('Parsed settings:', { enabled, endDate });
      } else {
        console.log('No announcement settings found, using defaults');
      }

      setAnnouncementEnabled(enabled);
      setAnnouncementEndDate(endDate);
      
      // Only show announcement if it's enabled
      if (!enabled) {
        console.log('Announcement disabled in settings');
        setShowAnnouncement(false);
        setLoading(false);
        return;
      }
      
      // Check if announcement has an end date and if it's passed
      if (endDate) {
        const endDateObj = new Date(endDate);
        const now = new Date();
        console.log('Checking end date:', { endDate: endDateObj, now, expired: now > endDateObj });
        if (now > endDateObj) {
          console.log('Announcement expired');
          setShowAnnouncement(false);
          setLoading(false);
          return;
        }
      }

      // Check localStorage for dismissal
      const dismissed = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
      console.log('Checking localStorage dismissal:', dismissed);
      
      if (dismissed) {
        try {
          const dismissedData = JSON.parse(dismissed);
          console.log('Parsed dismissal data:', dismissedData);
          
          // Check if it's the same version and within 30 days
          if (dismissedData.version === ANNOUNCEMENT_VERSION) {
            const dismissedDate = new Date(dismissedData.timestamp);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            console.log('Checking 30-day window:', {
              dismissedDate,
              thirtyDaysAgo,
              stillValid: dismissedDate > thirtyDaysAgo
            });
            
            if (dismissedDate > thirtyDaysAgo) {
              console.log('Announcement still dismissed within 30 days');
              setShowAnnouncement(false);
              setLoading(false);
              return;
            }
          }
        } catch (error) {
          console.error('Error parsing announcement dismissal data:', error);
        }
      }

      console.log('Announcement should show');
      setShowAnnouncement(true);
      
    } catch (error) {
      console.error('Error in fetchAnnouncementSettings:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissAnnouncement = () => {
    console.log('Dismissing announcement');
    const dismissalData = {
      version: ANNOUNCEMENT_VERSION,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, JSON.stringify(dismissalData));
    setShowAnnouncement(false);
  };

  const resetAnnouncement = () => {
    console.log('Resetting announcement');
    localStorage.removeItem(ANNOUNCEMENT_STORAGE_KEY);
    // Force show the announcement if enabled
    if (announcementEnabled) {
      const now = new Date();
      const shouldShow = !announcementEndDate || now <= new Date(announcementEndDate);
      console.log('After reset, should show:', shouldShow);
      setShowAnnouncement(shouldShow);
    }
  };

  useEffect(() => {
    fetchAnnouncementSettings();
  }, []);

  console.log('useAnnouncement state:', {
    showAnnouncement,
    announcementEnabled,
    announcementEndDate,
    loading
  });

  return {
    showAnnouncement,
    loading,
    dismissAnnouncement,
    resetAnnouncement,
    refetchSettings: fetchAnnouncementSettings
  };
}
