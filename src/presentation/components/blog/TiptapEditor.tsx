"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Undo, Redo } from "lucide-react";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
}

export default function TiptapEditor({ value, onChange, disabled }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Keep content synchronized if updated externally
  React.useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950/40">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-neutral-50 dark:bg-zinc-900 border-b border-neutral-200 dark:border-neutral-800">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition ${
            editor.isActive("bold") ? "bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100" : ""
          }`}
          disabled={disabled}
          title="ตัวหนา"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition ${
            editor.isActive("italic") ? "bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100" : ""
          }`}
          disabled={disabled}
          title="ตัวเอียง"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition ${
            editor.isActive("heading", { level: 1 }) ? "bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100" : ""
          }`}
          disabled={disabled}
          title="หัวข้อหลัก H1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition ${
            editor.isActive("heading", { level: 2 }) ? "bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100" : ""
          }`}
          disabled={disabled}
          title="หัวข้อย่อย H2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-neutral-300 dark:bg-zinc-700 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition ${
            editor.isActive("bulletList") ? "bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100" : ""
          }`}
          disabled={disabled}
          title="รายการแบบสัญลักษณ์"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition ${
            editor.isActive("orderedList") ? "bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100" : ""
          }`}
          disabled={disabled}
          title="รายการแบบลำดับตัวเลข"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition ${
            editor.isActive("blockquote") ? "bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100" : ""
          }`}
          disabled={disabled}
          title="อัญพจน์คำพูด"
        >
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-neutral-300 dark:bg-zinc-700 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 disabled:opacity-50 transition"
          disabled={disabled || !editor.can().undo()}
          title="ย้อนกลับ (Undo)"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 disabled:opacity-50 transition"
          disabled={disabled || !editor.can().redo()}
          title="ทำซ้ำ (Redo)"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="p-4 min-h-[250px] focus-within:outline-none dark:text-zinc-300">
        <EditorContent editor={editor} className="outline-none focus:outline-none" />
      </div>
    </div>
  );
}
