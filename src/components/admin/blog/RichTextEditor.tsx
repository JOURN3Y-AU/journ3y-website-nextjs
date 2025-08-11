
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { Button } from '@/components/ui/button';
import { 
  Bold as BoldIcon, 
  Italic as ItalicIcon, 
  List as ListIcon, 
  ListOrdered as ListOrderedIcon,
  Heading1,
  Heading2,
  Link as LinkIcon,
  ImageIcon,
  Youtube as YoutubeIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { uploadImage } from '../ImageUploadService';

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [videoWidth, setVideoWidth] = useState('640');
  const [imageWidth, setImageWidth] = useState('full');
  const [showImageSizeInput, setShowImageSizeInput] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const imageUrl = await uploadImage(file);
      
      // Insert the image first
      editor.chain().focus().setImage({ src: imageUrl }).run();
      
      // Then update the image with size styling using a small delay
      setTimeout(() => {
        const imgElements = editor.view.dom.querySelectorAll('img[src="' + imageUrl + '"]');
        const lastImg = imgElements[imgElements.length - 1] as HTMLImageElement;
        if (lastImg) {
          // Remove existing width classes
          lastImg.classList.remove('w-full', 'w-3/4', 'w-1/2', 'w-1/3');
          
          // Add the selected width class
          const widthClass = imageWidth === 'full' ? 'w-full' : 
                            imageWidth === 'large' ? 'w-3/4' :
                            imageWidth === 'medium' ? 'w-1/2' : 'w-1/3';
          lastImg.classList.add(widthClass, 'mx-auto', 'block');
        }
      }, 100);
      
      setImageWidth('full');
      setShowImageSizeInput(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploadingImage(false);
      // Reset the input
      event.target.value = '';
    }
  };

  const addYoutubeVideo = () => {
    if (youtubeUrl) {
      const width = parseInt(videoWidth) || 640;
      const height = Math.round(width * 0.5625); // 16:9 aspect ratio
      
      editor.commands.setYoutubeVideo({
        src: youtubeUrl,
        width: width,
        height: height,
      });
      setYoutubeUrl('');
      setVideoWidth('640');
      setShowYoutubeInput(false);
    }
  };

  return (
    <div className="border-b pb-2 mb-3 flex flex-wrap gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={editor.isActive('bold') ? 'bg-slate-200' : ''}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={editor.isActive('italic') ? 'bg-slate-200' : ''}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={editor.isActive('bulletList') ? 'bg-slate-200' : ''}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      
      {!showLinkInput ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={editor.isActive('link') ? 'bg-slate-200' : ''}
          onClick={() => setShowLinkInput(true)}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="https://"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="border px-2 py-1 text-sm rounded"
          />
          <Button type="button" size="sm" onClick={addLink}>
            Add
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setShowLinkInput(false)}>
            Cancel
          </Button>
        </div>
      )}

      {editor.isActive('link') && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Unlink
        </Button>
      )}

      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={addImage}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploadingImage}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploadingImage}
          >
            <ImageIcon className="h-4 w-4" />
            {isUploadingImage && <span className="ml-1">...</span>}
          </Button>
        </div>
        
        {!showImageSizeInput ? (
          <Button
            type="button"
            variant="outline" 
            size="sm"
            onClick={() => setShowImageSizeInput(true)}
          >
            Size
          </Button>
        ) : (
          <div className="flex items-center gap-1">
            <label className="text-xs text-gray-600">Size:</label>
            <select
              value={imageWidth}
              onChange={(e) => setImageWidth(e.target.value)}
              className="border px-2 py-1 text-sm rounded"
            >
              <option value="small">Small (33%)</option>
              <option value="medium">Medium (50%)</option>
              <option value="large">Large (75%)</option>
              <option value="full">Full Width</option>
            </select>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowImageSizeInput(false)}>
              ✓
            </Button>
          </div>
        )}
      </div>

      {!showYoutubeInput ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowYoutubeInput(true)}
        >
          <YoutubeIcon className="h-4 w-4" />
        </Button>
      ) : (
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="YouTube URL..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="border px-2 py-1 text-sm rounded min-w-[200px]"
          />
          <div className="flex items-center gap-1">
            <label className="text-xs text-gray-600">Width:</label>
            <select
              value={videoWidth}
              onChange={(e) => setVideoWidth(e.target.value)}
              className="border px-2 py-1 text-sm rounded"
            >
              <option value="400">Small (400px)</option>
              <option value="560">Medium (560px)</option>
              <option value="640">Large (640px)</option>
              <option value="800">Extra Large (800px)</option>
            </select>
          </div>
          <Button type="button" size="sm" onClick={addYoutubeVideo}>
            Add
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setShowYoutubeInput(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  className?: string;
}

export default function RichTextEditor({ content, onChange, className }: RichTextEditorProps) {
  useEffect(() => {
    // Add global styles for lists when component mounts
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .ProseMirror ul {
        list-style-type: disc;
        padding-left: 1.5rem;
      }
      .ProseMirror ol {
        list-style-type: decimal;
        padding-left: 1.5rem;
      }
      .ProseMirror ul li, .ProseMirror ol li {
        margin: 0.5rem 0;
      }
      .ProseMirror p {
        margin: 1rem 0;
      }
      .ProseMirror h1, .ProseMirror h2 {
        font-weight: bold;
        margin: 1.5rem 0 1rem;
      }
      .ProseMirror h1 {
        font-size: 1.5rem;
      }
      .ProseMirror h2 {
        font-size: 1.25rem;
      }
      .ProseMirror img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1rem 0;
      }
      .ProseMirror iframe {
        border-radius: 8px;
        margin: 1rem 0;
      }
    `;
    document.head.appendChild(styleElement);

    // Clean up when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true, 
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
        heading: {
          levels: [1, 2]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-journey-purple underline'
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4'
        }
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: 'rounded-lg my-4'
        }
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-w-full'
      }
    }
  });

  return (
    <div className={`border rounded-md ${className}`}>
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="px-3 py-2 min-h-[400px]"
      />
    </div>
  );
}
