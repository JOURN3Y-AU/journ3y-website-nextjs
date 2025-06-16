
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AnnouncementSettingsProps {
  initialEnabled: boolean;
  initialEndDate: string | null;
  onReset: () => void;
}

export default function AnnouncementSettings({ 
  initialEnabled, 
  initialEndDate, 
  onReset 
}: AnnouncementSettingsProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [endDate, setEndDate] = useState(initialEndDate || '');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleEnabledToggle = async (value: boolean) => {
    setIsSaving(true);
    try {
      await upsertSetting('announcement_enabled', value ? 'true' : 'false');
      setEnabled(value);
      toast({
        title: "Success",
        description: `Announcement ${value ? 'enabled' : 'disabled'}`,
      });
    } catch (error) {
      console.error('Error updating announcement enabled setting:', error);
      toast({
        title: "Error",
        description: "Failed to update announcement setting",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEndDateChange = async () => {
    setIsSaving(true);
    try {
      await upsertSetting('announcement_end_date', endDate);
      toast({
        title: "Success",
        description: "Announcement end date updated",
      });
    } catch (error) {
      console.error('Error updating announcement end date:', error);
      toast({
        title: "Error",
        description: "Failed to update end date",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const upsertSetting = async (key: string, value: string) => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', key);
      
    if (error) throw error;
    
    if (data && data.length > 0) {
      await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key);
    } else {
      await supabase
        .from('site_settings')
        .insert([{ key, value }]);
    }
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Announcement Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Switch 
            id="announcement-enabled" 
            checked={enabled}
            disabled={isSaving}
            onCheckedChange={handleEnabledToggle}
          />
          <Label htmlFor="announcement-enabled">
            {enabled ? 'Partnership announcement is enabled' : 'Partnership announcement is disabled'}
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="announcement-end-date">
            End Date (optional - leave blank for no expiry)
          </Label>
          <div className="flex space-x-2">
            <Input
              id="announcement-end-date"
              type="date"
              value={formatDateForInput(endDate)}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isSaving}
            />
            <Button 
              onClick={handleEndDateChange}
              disabled={isSaving}
              variant="outline"
            >
              Update
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Testing</Label>
              <p className="text-sm text-gray-600">
                Reset the announcement to test it (clears the 30-day dismissal)
              </p>
            </div>
            <Button 
              onClick={onReset}
              variant="outline"
              size="sm"
            >
              Reset for Testing
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
