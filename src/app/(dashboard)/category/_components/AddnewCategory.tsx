"use client"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SubCategoryDataResponse } from "@/data/subCategory"
import { useQuery } from "@tanstack/react-query"
import { ImageIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"
import { toast } from "sonner"
export default function AddCategoryForm({ setShowCategory }: { setShowCategory: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [imageFile, setImageFile] = useState<File | null>(null) // Store the image file
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [id, setId] = useState("");

  const [formData, setFormData] = useState({
    categoryName: "",
    subCategory: "",
    description: "",
    slug: "",
  })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImageFile(file)

      const reader = new FileReader()
      reader.onloadstart = () => {
        setUploadProgress(0)
      }

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setUploadProgress(progress)
        }
      }

      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
        setUploadProgress(100)
        setSelectedFileName(file.name);
      }

      reader.readAsDataURL(file)
    } else {
      alert("Please select a JPEG or PNG file")
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setImageFile(null)
    setImagePreview(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const { data, } = useQuery<SubCategoryDataResponse>({
    queryKey: ["allsubcategory"],
    queryFn: async (): Promise<SubCategoryDataResponse> =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories`, {
        method: "GET",
      }).then((res) => res.json() as Promise<SubCategoryDataResponse>),
  });
  const handleSelect = (item: string, id: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    setId(id);
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const formDataToSubmit = new FormData()
    formDataToSubmit.append("categoryName", formData.categoryName)
    formDataToSubmit.append("subCategory", id)
    formDataToSubmit.append("description", formData.description)
    formDataToSubmit.append("slug", formData.slug)

    if (imageFile) {
      formDataToSubmit.append("image", imageFile)
    }

    console.log(formDataToSubmit)


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: formDataToSubmit,
      })

      const result = await response.json()
      if (response.ok) {
   
        toast("Category created successfully!")
       
        setShowCategory(false)
        console.log("Response:", result)
      } else {
      
        toast(`Error: ${result.message || "Slected a Category"}`)
      }
      console.log(result.message);
      
    } catch (error) {
      console.error("Network error:", error)
      toast("Network error, please try again.")
      
    } finally {
      setIsLoading(false)
    }
  }


  return (

    <div className=" bg-white rounded-2xl">
     
      <div className="rounded-t-3xl bg-primary px-[32px]  py-4">
        <h1 className="text-[28px] font-semibold text-white">Add New Category</h1>
      </div>
      <div className="mt-4">
        <CardContent className="p-6">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="categoryName">Category Name *</Label>
                <Input className="h-[50px]" id="categoryName" name="categoryName" required value={formData.categoryName} onChange={handleInputChange} />

                <div className="relative inline-block text-left w-full border-[1px] border-[#B0B0B0]/50 py-2 rounded-[8px]">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="font-medium rounded-lg text-sm text-[#444444] px-2 py-2.5 text-center inline-flex justify-between items-center w-full"
                    type="button"
                  >
                    {selectedItem || "Sub Category"}
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg w-full shadow-md cursor-pointer">
                      <ul className="py-2 text-sm text-gray-700">
                        {data?.data.map((item) => (
                          <li key={item._id}>
                            <p
                              onClick={() => handleSelect(item.subCategoryName, item._id)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              {item.subCategoryName}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />

                <Label htmlFor="slug">Slug *</Label>
                <Input id="slug" name="slug" required value={formData.slug} onChange={handleInputChange} />
              </div>

              <div className="space-y-4">
                <Label>Category Image</Label>
                <div
                  className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={openFileDialog}
                >
                  <Input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png" onChange={handleFileInput} />

                  {imagePreview ? (
                    <div className="relative aspect-video w-full h-[170px]">
                      <Image src={imagePreview} alt="Category preview" fill className="object-cover rounded" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 h-[180px]">
                      <ImageIcon className="w-12 h-12 text-gray-400 mt-10" />
                      <p className="text-sm text-gray-600">Drop your image here, or browse</p>
                      <p className="text-xs text-gray-500">Jpeg, png are allowed</p>
                    </div>
                  )}
                </div>

                {uploadProgress === 100 && <p className="text-green-500">{selectedFileName}</p>}
                {uploadProgress > 0 && <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${uploadProgress}%` }} />}
                <div className="flex justify-between">
                  <button type="button" onClick={handleDelete} className="text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <Button type="submit" className="bg-primary hover:bg-navy-900" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Confirm"}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              
            <Checkbox id="save-info" />
            <Label htmlFor="save-info">Save this information</Label>
             </div>
          </form>
        </CardContent>
      </div>
    </div>
  )
}
