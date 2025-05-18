
import { useState } from 'react';
import { Image, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  isNew: boolean;
  imageUrl: string;
}

export default function ImageUpload({ 
  imagePreview, 
  onImageChange, 
  onImageRemove, 
  isNew, 
  imageUrl 
}: ImageUploadProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="image">
        Featured Image
      </Label>
      <Card className="border-dashed">
        <CardContent className="p-4 flex flex-col items-center justify-center space-y-4">
          {imagePreview ? (
            <div className="relative w-full">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white"
                onClick={onImageRemove}
              >
                Change
              </Button>
            </div>
          ) : (
            <>
              <div className="p-4 bg-gray-100 rounded-full">
                <Image className="h-8 w-8 text-gray-500" />
              </div>
              <Label 
                htmlFor="image" 
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2 text-gray-700"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Label>
              <p className="text-sm text-gray-500">
                JPG, PNG or GIF up to 10MB
              </p>
            </>
          )}
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
            required={isNew && !imageUrl}
          />
        </CardContent>
      </Card>
    </div>
  );
}
