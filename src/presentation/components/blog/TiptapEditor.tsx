"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Mark, mergeAttributes } from "@tiptap/core";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Undo, Redo, Type } from "lucide-react";

// 1. Declare Custom commands for TypeScript type-safety
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

// 2. Define Custom FontSize Mark extension
const FontSize = Mark.create({
  name: "fontSize",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.size) {
            return {};
          }
          return { style: `font-size: ${attributes.size}` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          const hasFontSize = (element as HTMLElement).style.fontSize;
          return hasFontSize ? {} : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ chain }) => {
          return chain().setMark(this.name, { size }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().unsetMark(this.name).run();
        },
    };
  },
});

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
}

export default function TiptapEditor({ value, onChange, disabled }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      FontSize,
    ],
    content: value,
    editable: !disabled,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert focus:outline-none min-h-[300px] max-w-none text-neutral-800 dark:text-zinc-200",
      },
    },
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

  const getCurrentFontSize = () => {
    const attrs = editor.getAttributes("fontSize");
    return attrs.size || "default";
  };

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950/40">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-neutral-50 dark:bg-zinc-900 border-b border-neutral-200 dark:border-neutral-800">
        
        {/* Font Size Dropdown */}
        <div className="flex items-center gap-1 bg-white dark:bg-zinc-950 px-2 py-1 rounded border border-neutral-200 dark:border-neutral-800 mr-1 shadow-xs">
          <Type className="w-3.5 h-3.5 text-zinc-400" />
          <select
            value={getCurrentFontSize()}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "default") {
                editor.chain().focus().unsetFontSize().run();
              } else {
                editor.chain().focus().setFontSize(val).run();
              }
            }}
            className="bg-transparent border-none text-neutral-800 dark:text-zinc-250 text-xs font-bold focus:outline-none cursor-pointer pr-1"
            disabled={disabled}
            title="ขนาดตัวอักษร (Font Size)"
          >
            <option value="default" className="bg-white dark:bg-zinc-900">ขนาดปกติ (Default)</option>
            <option value="12px" className="bg-white dark:bg-zinc-900">12px (เล็กพิเศษ)</option>
            <option value="14px" className="bg-white dark:bg-zinc-900">14px (เล็ก)</option>
            <option value="16px" className="bg-white dark:bg-zinc-900">16px (ปกติ)</option>
            <option value="18px" className="bg-white dark:bg-zinc-900">18px (ค่อนข้างใหญ่)</option>
            <option value="20px" className="bg-white dark:bg-zinc-900">20px (ใหญ่)</option>
            <option value="24px" className="bg-white dark:bg-zinc-900">24px (ใหญ่พิเศษ)</option>
            <option value="30px" className="bg-white dark:bg-zinc-900">30px (หัวข้อ)</option>
            <option value="36px" className="bg-white dark:bg-zinc-900">36px (หัวข้อหลัก)</option>
          </select>
        </div>

        <div className="w-px h-4 bg-neutral-300 dark:bg-zinc-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 transition ${
            editor.isActive("bold") ? "bg-neutral-200 dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 font-bold" : ""
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
      <div className="p-4 focus-within:outline-none">
        <EditorContent editor={editor} className="outline-none focus:outline-none" />
      </div>
    </div>
  );
}
