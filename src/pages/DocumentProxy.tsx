
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function DocumentProxy() {
  const { filename } = useParams<{ filename: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndServeDocument = async () => {
      if (!filename) {
        setError('No filename provided');
        setLoading(false);
        return;
      }

      try {
        // First, verify the document exists in our database
        const { data: docData, error: docError } = await supabase
          .from('documents')
          .select('*')
          .eq('filename', filename)
          .single();

        if (docError || !docData) {
          setError('Document not found');
          setLoading(false);
          return;
        }

        // Get the file from Supabase Storage
        const { data: fileData, error: fileError } = await supabase.storage
          .from('documents')
          .download(docData.file_path);

        if (fileError || !fileData) {
          setError('Failed to load document');
          setLoading(false);
          return;
        }

        // Create a blob URL and redirect to it
        const blob = new Blob([fileData], { type: docData.mime_type || 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        // For PDFs and images, we can display them inline
        if (docData.mime_type?.startsWith('image/') || docData.mime_type === 'application/pdf') {
          window.location.replace(url);
        } else {
          // For other file types, trigger download
          const link = document.createElement('a');
          link.href = url;
          link.download = docData.original_filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error serving document:', err);
        setError('Failed to load document');
        setLoading(false);
      }
    };

    fetchAndServeDocument();
  }, [filename]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return null;
}
