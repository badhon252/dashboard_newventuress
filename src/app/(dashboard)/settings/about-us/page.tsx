"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { AboutInfo } from "./_components/about-info"
import { AboutStatistics } from "./_components/about-statistics"
import { AboutSocialLinks } from "./_components/about-social-links"
import { AboutImage } from "./_components/about-img"
import { useAboutForm } from "./_components/hooks/useAboutForm"
import { initialData } from "./_components/data"


export default function AboutEditPage() {
  const {
    isEditing,
    formData,
    handleInputChange,
    handleImageUpload,
    toggleEditing,
    resetForm,
    addSection,
    deleteSection,
  } = useAboutForm(initialData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
    toggleEditing()
  }

  const handleCancel = () => {
    resetForm()
    toggleEditing()
  }

  return (
    <div className="bg-white mb-[30px] rounded-lg">
      <div className="">
        <div className="flex justify-between items-center mb-6 bg-primary py-4 px-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-white">About Us</h1>
          <Button variant="secondary" onClick={isEditing ? handleCancel : toggleEditing}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <CardContent className="p-6 space-y-6">
              <AboutInfo
                sections={formData.sections}
                isEditing={isEditing}
                onChange={handleInputChange}
                onAddSection={addSection}
                onDeleteSection={deleteSection}
              />

              <AboutStatistics
                products={formData.products}
                customers={formData.customers}
                vendors={formData.vendors}
                isEditing={isEditing}
                onChange={(e) => handleInputChange(e, "", "content")}
              />

              <div className="grid grid-cols-2 gap-4">
                <AboutSocialLinks
                  facebook={formData.facebook}
                  twitter={formData.twitter}
                  instagram={formData.instagram}
                  linkedin={formData.linkedin}
                  isEditing={isEditing}
                  onChange={(e) => handleInputChange(e, "", "content")}
                />

                <AboutImage image={formData.image} isEditing={isEditing} onImageUpload={handleImageUpload} />
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button type="submit" className="w-full md:w-auto">
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </div>
        </form>
      </div>
    </div>
  )
}

