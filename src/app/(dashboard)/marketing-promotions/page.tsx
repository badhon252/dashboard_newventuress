"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

type FormInputs = {
  facebookTitle: string
  facebookDescription: string
  instagramTitle: string
  instagramDescription: string
  facebookProfile: string
  twitterProfile: string
  instagramProfile: string
  linkedinProfile: string
  facebookImagePath: string
  instagramImagePath: string
}

export default function SocialMediaSettings() {
  const [facebookImagePreview, setFacebookImagePreview] = useState<string | null>(null)
  const [instagramImagePreview, setInstagramImagePreview] = useState<string | null>(null)
  const [facebookImageFile, setFacebookImageFile] = useState<File | null>(null)
  const [instagramImageFile, setInstagramImageFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // Validate URLs with regex (basic validation)
    const urlPattern = /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin)\.com\/[A-Za-z0-9_.-]+$/;
  
    if (!urlPattern.test(data.facebookProfile)) {
      console.error("Invalid Facebook URL");
      alert("Please enter a valid Facebook profile URL.");
      return;
    }
    if (!urlPattern.test(data.twitterProfile)) {
      console.error("Invalid Twitter URL");
      alert("Please enter a valid Twitter profile URL.");
      return;
    }
    if (!urlPattern.test(data.instagramProfile)) {
      console.error("Invalid Instagram URL");
      alert("Please enter a valid Instagram profile URL.");
      return;
    }
    if (!urlPattern.test(data.linkedinProfile)) {
      console.error("Invalid LinkedIn URL");
      alert("Please enter a valid LinkedIn profile URL.");
      return;
    }
    // Use the file names if files were uploaded, otherwise use empty strings
    const facebookImageName = facebookImageFile ? facebookImageFile.name : ""
    const instagramImageName = instagramImageFile ? instagramImageFile.name : ""

    const formData = {
      ...data,
      facebookImagePath: facebookImageName,
      instagramImagePath: instagramImageName,
    }

    console.log("Form Data:", JSON.stringify(formData, null, 2))
    console.log("Images:", [facebookImageName, instagramImageName].filter(Boolean))
  }

  useEffect(() => {
    return () => {
      if (facebookImagePreview) URL.revokeObjectURL(facebookImagePreview)
      if (instagramImagePreview) URL.revokeObjectURL(instagramImagePreview)
    }
  }, [facebookImagePreview, instagramImagePreview])

  const handleDeleteImage = (inputId: string, setImagePreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    setImagePreview(null)
    const fileInput = document.getElementById(inputId) as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
    fieldName: "facebookImagePath" | "instagramImagePath",
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const objectUrl = URL.createObjectURL(file)
        setImagePreview(objectUrl)
        setImageFile(file)
        setValue(fieldName, file.name)
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Facebook Setup */}
            <div className="space-y-4">
              <h3 className="text-[22px] text-gradient font-medium">Facebook Setup</h3>
              <div className="space-y-2">
                <Label htmlFor="facebookTitle" className="text-base text-[#444444]">
                  Facebook Title
                </Label>
                <Input id="facebookTitle" {...register("facebookTitle", { required: "Facebook title is required" })} />
                {errors.facebookTitle && <p className="text-red-500">{errors.facebookTitle.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookDescription" className="text-base text-[#444444]">
                  Facebook descriptions
                </Label>
                <Textarea
                  id="facebookDescription"
                  {...register("facebookDescription", { required: "Facebook description is required" })}
                />
                {errors.facebookDescription && <p className="text-red-500">{errors.facebookDescription.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-base text-[#444444]">Facebook Image</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    id="facebook-image"
                    {...register("facebookImagePath")}
                    onChange={(e) =>
                      handleImageUpload(e, setFacebookImagePreview, setFacebookImageFile, "facebookImagePath")
                    }
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
                <Label htmlFor="instagramTitle" className="text-base text-[#444444]">
                  Instagram Title
                </Label>
                <Input
                  id="instagramTitle"
                  {...register("instagramTitle", { required: "Instagram title is required" })}
                />
                {errors.instagramTitle && <p className="text-red-500">{errors.instagramTitle.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramDescription" className="text-base text-[#444444]">
                  Instagram Description
                </Label>
                <Textarea
                  id="instagramDescription"
                  {...register("instagramDescription", { required: "Instagram description is required" })}
                />
                {errors.instagramDescription && <p className="text-red-500">{errors.instagramDescription.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-base text-[#444444]">Instagram Image</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    id="instagram-image"
                    {...register("instagramImagePath")}
                    onChange={(e) =>
                      handleImageUpload(e, setInstagramImagePreview, setInstagramImageFile, "instagramImagePath")
                    }
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
                <Label htmlFor="facebookProfile" className="text-base text-[#444444]">
                  Facebook
                </Label>
                <Input
                  id="facebookProfile"
                  {...register("facebookProfile", { required: "Facebook profile URL is required" })}
                />
                {errors.facebookProfile && <p className="text-red-500">{errors.facebookProfile.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterProfile" className="text-base text-[#444444]">
                  Twitter
                </Label>
                <Input
                  id="twitterProfile"
                  {...register("twitterProfile", { required: "Twitter profile URL is required" })}
                />
                {errors.twitterProfile && <p className="text-red-500">{errors.twitterProfile.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramProfile" className="text-base text-[#444444]">
                  Instagram
                </Label>
                <Input
                  id="instagramProfile"
                  {...register("instagramProfile", { required: "Instagram profile URL is required" })}
                />
                {errors.instagramProfile && <p className="text-red-500">{errors.instagramProfile.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinProfile" className="text-base text-[#444444]">
                  Linkedin
                </Label>
                <Input
                  id="linkedinProfile"
                  {...register("linkedinProfile", { required: "LinkedIn profile URL is required" })}
                />
                {errors.linkedinProfile && <p className="text-red-500">{errors.linkedinProfile.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="text-base font-semibold bg-primary px-[40px] py-3">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

