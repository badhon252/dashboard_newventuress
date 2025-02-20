import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Trash2 } from "lucide-react"
import type React from "react"

interface Section {
  id: string
  title: string
  content: string
}

interface CompanyInfoProps {
  sections: Section[]
  isEditing: boolean
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    sectionId: string,
    field: "title" | "content",
  ) => void
  onAddSection: () => void
  onDeleteSection: (sectionId: string) => void
}

export function AboutInfo({ sections, isEditing, onChange, onAddSection, onDeleteSection }: CompanyInfoProps) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.id} className="space-y-2">
          <div className="flex justify-between items-center">
            {isEditing ? (
              <Input
                value={section.title}
                onChange={(e) => onChange(e, section.id, "title")}
                className="font-normal text-[#444444] text-[16px] leading-[19px]"
              />
            ) : (
              <Label htmlFor={`section-${section.id}`} className="text-[20px] font-semibold text-[#3D3D3D]">
                {section.title}
              </Label>
            )}
            {isEditing && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteSection(section.id)}
                aria-label={`Delete ${section.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Textarea
            id={`section-${section.id}`}
            name={`section-${section.id}`}
            value={section.content}
            onChange={(e) => onChange(e, section.id, "content")}
            disabled={!isEditing}
            className="h-32"
            placeholder={`Enter ${section.title.toLowerCase()} here`}
          />
        </div>
      ))}
      {isEditing && (
        <Button onClick={onAddSection} variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Section
        </Button>
      )}
    </div>
  )
}

