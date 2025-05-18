
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { 
  Bold as BoldIcon, 
  Italic as ItalicIcon, 
  List as ListIcon, 
  ListOrdered as ListOrderedIcon,
  Heading1,
  Heading2,
  Link as LinkIcon
} from 'lucide-react';
import { useState } from 'react';

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

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
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  className?: string;
}

export default function RichTextEditor({ content, onChange, className }: RichTextEditorProps) {
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
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-ul:list-disc prose-ol:list-decimal focus:outline-none min-w-full'
      }
    }
  });

  return (
    <div className={`border rounded-md ${className}`}>
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="px-3 py-2 min-h-[400px] prose prose-ul:list-disc prose-ol:list-decimal max-w-none"
      />
    </div>
  );
}
