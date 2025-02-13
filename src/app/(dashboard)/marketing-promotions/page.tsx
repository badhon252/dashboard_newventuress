"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function SocialMediaSettings() {
  const [facebookImagePreview, setFacebookImagePreview] = useState<string | null>(null)
  const [instagramImagePreview, setInstagramImagePreview] = useState<string | null>(null)

  // Cleanup function for object URLs
  useEffect(() => {
    return () => {
      if (facebookImagePreview) URL.revokeObjectURL(facebookImagePreview)
      if (instagramImagePreview) URL.revokeObjectURL(instagramImagePreview)
    }
  }, [facebookImagePreview, instagramImagePreview])

  // Reusable delete handler
  const handleDeleteImage = (inputId: string, setImagePreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    setImagePreview(null)
    const fileInput = document.getElementById(inputId) as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const objectUrl = URL.createObjectURL(file)
        setImagePreview(objectUrl)
      } catch (error) {
        console.error("Error creating object URL:", error)
        alert("Failed to load the image. Please try again.")
      }
    }
  }

  return (
    <Card className="w-full mx-auto mb-[60px]">
      <CardHeader>
        <div className="mb-6 rounded-t-lg bg-primary p-4">
          <h1 className="text-[28px] font-semibold text-white">Social Media Settings</h1>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Facebook Setup */}
          <div className="space-y-4">
            <h3 className="text-[22px] text-gradient font-medium">Facebook Setup</h3>
            <div className="space-y-2">
              <Label htmlFor="facebook-title" className="text-base text-[#444444]">Facebook Title</Label>
              <Input id="facebook-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook-description" className="text-base text-[#444444]">Facebook descriptions</Label>
              <Textarea id="facebook-description" />
            </div>
            <div className="space-y-2">
              <Label className="text-base text-[#444444]">Facebook Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Input
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  id="facebook-image"
                  onChange={(e) => handleImageUpload(e, setFacebookImagePreview)}
                />
                <label htmlFor="facebook-image" className="cursor-pointer">
                  {facebookImagePreview ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={facebookImagePreview || "/placeholder.svg"}
                        alt="Facebook preview"
                        className="rounded-lg object-cover"
                        fill
                      />
                      {/* Delete icon */}
                      <button
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                        onClick={() => handleDeleteImage("facebook-image", setFacebookImagePreview)}
                        type="button"
                      >
                        <X className="h-5 w-5 text-gray-700" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Drop your image here, or browse</p>
                      <p className="text-xs text-gray-500">Jpeg, png are allowed</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Instagram Setup */}
          <div className="space-y-4">
            <h3 className="text-[22px] text-gradient font-medium">Instagram Setup</h3>
            <div className="space-y-2">
              <Label htmlFor="instagram-title" className="text-base text-[#444444]">Instagram Title</Label>
              <Input id="instagram-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram-description" className="text-base text-[#444444]">Instagram Description</Label>
              <Textarea id="instagram-description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram-description" className="text-base text-[#444444]">
                Instagram Description
              </Label>
              <Textarea id="instagram-description" />
            </div>
            <div className="space-y-2">
              <Label className="text-base text-[#444444]">Instagram Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Input
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  id="instagram-image"
                  onChange={(e) => handleImageUpload(e, setInstagramImagePreview)}
                />
                <label htmlFor="instagram-image" className="cursor-pointer">
                  {instagramImagePreview ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={instagramImagePreview || "/placeholder.svg"}
                        alt="Instagram preview"
                        className="rounded-lg object-cover"
                        fill
                      />
                      {/* Delete icon */}
                      <button
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                        onClick={() => handleDeleteImage("instagram-image", setInstagramImagePreview)}
                        type="button"
                      >
                        <X className="h-5 w-5 text-gray-700" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Drop your image here, or browse</p>
                      <p className="text-xs text-gray-500">Jpeg, png are allowed</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Social Profile Section */}
        <div className="space-y-4">
          <h3 className="text-[22px] text-gradient font-medium">Social Profile</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-base text-[#444444]">Facebook</Label>
              <Input id="facebook" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-base text-[#444444]">Twitter</Label>
              <Input id="twitter" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-base text-[#444444]">Instagram</Label>
              <Input id="instagram" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-base text-[#444444]">Linkedin</Label>
              <Input id="linkedin" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="text-base font-semibold bg-primary px-[40px] py-3">Submit</Button>
        </div>
      </CardContent>
    </Card>
  )
}
