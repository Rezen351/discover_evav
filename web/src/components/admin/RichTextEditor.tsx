"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, active, label, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md-design text-sm font-semibold transition-colors focus-ring ${
        active
          ? "bg-nav-gradient text-tropical-dark"
          : "bg-white text-black/70 hover:bg-brand/5 hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div
      className="flex flex-wrap items-center gap-1.5 border border-brand/15 border-b-0 rounded-t-md-design bg-white p-2"
      role="toolbar"
      aria-label="Alat format teks"
    >
      <ToolbarButton
        label="Teks tebal"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </ToolbarButton>
      <ToolbarButton
        label="Teks miring"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton
        label="Garis bawah"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline?.().run()}
      >
        <span className="underline">U</span>
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-brand/15" />
      <ToolbarButton
        label="Judul 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </ToolbarButton>
      <ToolbarButton
        label="Judul 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        label="Judul 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-brand/15" />
      <ToolbarButton
        label="Daftar poin"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        •
      </ToolbarButton>
      <ToolbarButton
        label="Daftar bernomor"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </ToolbarButton>
      <ToolbarButton
        label="Kutipan"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        &quot;
      </ToolbarButton>
      <ToolbarButton
        label="Tautan"
        active={editor.isActive("link")}
        onClick={() => {
          const url = window.prompt("Masukkan URL tautan");
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
          }
          editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        ↗
      </ToolbarButton>
      <span className="mx-1 h-5 w-px bg-brand/15" />
      <ToolbarButton
        label="Batalkan"
        onClick={() => editor.chain().focus().undo().run()}
      >
        ↺
      </ToolbarButton>
      <ToolbarButton
        label="Ulangi"
        onClick={() => editor.chain().focus().redo().run()}
      >
        ↻
      </ToolbarButton>
    </div>
  );
}

/**
 * Editor rich-text berbasis TipTap (StarterKit) untuk penulisan artikel berita.
 * Mengembalikan HTML melalui prop `onChange`.
 */
export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis isi berita di sini…",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } })],
    content: value,
    editorProps: {
      attributes: {
        class: "prose-editor min-h-[320px] rounded-b-md-design border border-brand/15 bg-white p-4 focus:outline-none",
        "aria-label": "Editor isi berita",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <span className="mt-1 block text-xs text-black/40">{placeholder}</span>
    </div>
  );
}
