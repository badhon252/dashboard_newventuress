import { useState } from "react"
import type { FormData } from "../data"

export function useAboutForm(initialData: FormData) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(initialData)
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      sectionId: string,
      field: "title" | "content",
    ) => {
      const { value } = e.target
      setFormData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) => (section.id === sectionId ? { ...section, [field]: value } : section)),
      }))
    }
  
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, image: reader.result as string }))
        }
        reader.readAsDataURL(file)
      }
    }
  
    const toggleEditing = () => setIsEditing(!isEditing)
  
    const resetForm = () => setFormData(initialData)
  
    const addSection = () => {
      const newSection = {
        id: `section-${Date.now()}`,
        title: `New Section ${formData.sections.length + 1}`,
        content: "",
      }
      setFormData((prev) => ({
        ...prev,
        sections: [...prev.sections, newSection],
      }))
    }
  
    const deleteSection = (sectionId: string) => {
      setFormData((prev) => ({
        ...prev,
        sections: prev.sections.filter((section) => section.id !== sectionId),
      }))
    }
  
    return {
      isEditing,
      formData,
      handleInputChange,
      handleImageUpload,
      toggleEditing,
      resetForm,
      setFormData,
      addSection,
      deleteSection,
    }
}

