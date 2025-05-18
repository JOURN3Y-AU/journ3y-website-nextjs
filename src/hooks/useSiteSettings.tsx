
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SiteSetting {
  key: string;
  value: string;
}

export function useSiteSettings() {
  const [showTeamPage, setShowTeamPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchSiteSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching site settings...');
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'show_team_page')
        .single() as { data: SiteSetting, error: any };
        
      if (error) {
        if (error.code === 'PGRST116') {
          // No data found, this is not necessarily an error
          console.log('No show_team_page setting found in the database');
          setShowTeamPage(false);
        } else {
          console.error('Supabase error fetching site settings:', error);
          throw new Error(`Failed to fetch site settings: ${error.message}`);
        }
      } else if (data) {
        console.log('Site setting found:', data);
        setShowTeamPage(data.value === 'true');
      }
    } catch (err: any) {
      console.error('Error in fetchSiteSettings:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Don't show a toast here to avoid unnecessary error messages for users
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  return {
    showTeamPage,
    loading,
    error,
    refetchSettings: fetchSiteSettings
  };
}
