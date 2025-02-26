"use client"

import { useEffect, useRef } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { ScrollArea } from "@radix-ui/react-scroll-area"

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder: "Type Description Here",
      })

      // Set initial content using Quill's method to prevent direct innerHTML manipulation
      if (value) {
        quill.root.innerHTML = value // or you can use `quill.clipboard.dangerouslyPasteHTML(value)`
      }

      // Handle content changes
      quill.on("text-change", () => {
        const html = quill.root.innerHTML
        onChange(html)
      })

      quillRef.current = quill
    }
  }, [onChange, value])

  // Handle external value changes
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value
    }
  }, [value])

  return (
    <div className="quill-editor-container">
      <ScrollArea className="max-h-[500px] overflow-y-auto">
      <div ref={editorRef} className="min-h-[192px]" />
      </ScrollArea>
      <style jsx global>{`
        .quill-editor-container .ql-container {
          border-color: #9C9C9C;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          min-height: 160px;
          position: relative;
        }
        .quill-editor-container .ql-toolbar {
          border-color: #9C9C9C;
          height: 50px;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          position: sticky;
          top: 0;
          background: white;
          z-index: 50; /* Ensures the toolbar stays above the editor */
        }
      `}</style>
    </div>
  )
}

export default QuillEditor
