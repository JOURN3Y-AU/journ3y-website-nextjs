
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface Document {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  description: string | null;
  created_at: string;
  public_url: string;
}

export const uploadDocument = async (file: File, description?: string): Promise<Document> => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = fileName;

    console.log('Uploading document:', fileName);

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    // Insert document record
    const { data: docData, error: docError } = await supabase
      .from('documents')
      .insert({
        filename: fileName,
        original_filename: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        description: description || null
      })
      .select()
      .single();

    if (docError) {
      console.error('Database insert error:', docError);
      throw docError;
    }

    // Return document with clean URL
    return {
      ...docData,
      public_url: `${window.location.origin}/documents/${fileName}`
    };
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const fetchDocuments = async (): Promise<Document[]> => {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(doc => ({
      ...doc,
      public_url: `${window.location.origin}/documents/${doc.filename}`
    }));
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const deleteDocument = async (id: string, filePath: string): Promise<void> => {
  try {
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('documents')
      .remove([filePath]);

    if (storageError) {
      console.error('Storage delete error:', storageError);
      throw storageError;
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (dbError) {
      console.error('Database delete error:', dbError);
      throw dbError;
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
