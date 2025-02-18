import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline, Bold, Italic, List, Type } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import UnderlineExtension from '@tiptap/extension-underline';

export default function RichTextEditor() {
  const userData = useSelector((state: RootState) => state.user);
  
  const editor = useEditor({
    extensions: [StarterKit, UnderlineExtension],
    content: userData
      ? `
        <h2>User Profile</h2>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Phone:</strong> ${userData.phone}</p>
        <p><strong>Address:</strong> ${userData.address}</p>
      `
      : '<p>No user data available</p>',
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col border rounded-2xl overflow-hidden bg-white shadow-lg transition hover:shadow-xl">
      {/* Toolbar */}
      <div className="border-b bg-gray-100 p-3 flex gap-3 items-center justify-start shadow-md rounded-t-xl">
        {[ 
          { icon: Type, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
          { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
          { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
          { icon: Underline, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline') },
          { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
        ].map(({ icon: Icon, action, active }, index) => (
          <button
            key={index}
            onClick={action}
            className={`p-2 rounded-lg transition-colors duration-300 ${active ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-100 text-gray-800'}`}
          >
            <Icon size={20} />
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="p-6 prose max-w-none min-h-[300px] focus:outline-none bg-gray-50 rounded-lg shadow-inner transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
