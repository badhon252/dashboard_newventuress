"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Quote, Heading2, Strikethrough, Code, Undo, Redo } from "lucide-react"

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-input bg-muted/50 p-1 flex flex-wrap gap-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("heading") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("bold") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("italic") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("strike") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("code") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("bulletList") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("orderedList") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={editor.isActive("blockquote") ? "bg-muted" : ""}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function TiptapEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="border rounded-md border-input">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

