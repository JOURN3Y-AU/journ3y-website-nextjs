'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Trash2, Copy, FileText } from 'lucide-react';
import { Document, uploadDocument, fetchDocuments, deleteDocument } from '@/services/DocumentService';

interface AdminDocumentManagementProps {
  onLogout: () => void;
}

export default function AdminDocumentManagement({ onLogout }: AdminDocumentManagementProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await fetchDocuments();
      setDocuments(docs);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadedDoc = await uploadDocument(file, description);
      setDocuments([uploadedDoc, ...documents]);
      setDescription('');
      event.target.value = ''; // Reset file input
      
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload document",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm(`Are you sure you want to delete "${doc.original_filename}"?`)) {
      return;
    }

    try {
      await deleteDocument(doc.id, doc.file_path);
      setDocuments(documents.filter(d => d.id !== doc.id));
      
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete document",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied",
      description: "URL copied to clipboard",
    });
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Document Management</h1>
          <p className="text-gray-500 mt-1">Upload and manage documents for sharing</p>
        </div>
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Upload Document
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the document..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>
          {uploading && (
            <p className="text-sm text-gray-500">Uploading...</p>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Uploaded Documents ({documents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-8">Loading documents...</p>
          ) : documents.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No documents uploaded yet</p>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{doc.original_filename}</h3>
                      {doc.description && (
                        <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{formatFileSize(doc.file_size)}</span>
                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-400 break-all">{doc.public_url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(doc.public_url)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy URL
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(doc.public_url, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(doc)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
