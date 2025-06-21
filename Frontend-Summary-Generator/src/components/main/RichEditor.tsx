import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[350px] p-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const isActive = (name: string, attributes?: Record<string, any>) => {
    return editor.isActive(name, attributes);
  };

  useEffect(() => {
    editor.commands.setContent(content);
  }, [content, editor]);

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const setTextAlign = (alignment: string) =>
    editor.chain().focus().setTextAlign(alignment).run();

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2 flex items-center gap-1 flex-wrap">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <Button
            variant={isActive("bold") ? "default" : "ghost"}
            size="sm"
            onClick={toggleBold}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={isActive("italic") ? "default" : "ghost"}
            size="sm"
            onClick={toggleItalic}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={isActive("underline") ? "default" : "ghost"}
            size="sm"
            onClick={toggleUnderline}
            className="h-8 w-8 p-0"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1">
          <Button
            variant={
              isActive("paragraph", { textAlign: "left" }) ? "default" : "ghost"
            }
            size="sm"
            onClick={() => setTextAlign("left")}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={
              isActive("paragraph", { textAlign: "center" })
                ? "default"
                : "ghost"
            }
            size="sm"
            onClick={() => setTextAlign("center")}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={
              isActive("paragraph", { textAlign: "right" })
                ? "default"
                : "ghost"
            }
            size="sm"
            onClick={() => setTextAlign("right")}
            className="h-8 w-8 p-0"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[350px] max-h-[400px] overflow-y-auto ">
        <EditorContent editor={editor} className="focus-within:outline-none" />
      </div>
    </div>
  );
};

export default RichEditor;
