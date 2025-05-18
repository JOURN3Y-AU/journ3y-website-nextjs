import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `team_member_images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    const imageUrl = `https://ghtqdgkfbfdlnowrowpw.supabase.co/storage/v1/object/public/${data.path}`;
    return imageUrl;
  } catch (error: any) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
