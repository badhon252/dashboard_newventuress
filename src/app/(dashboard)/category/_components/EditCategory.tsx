import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { TiEdit } from "react-icons/ti";
import { Checkbox } from '@/components/ui/checkbox';



interface CategoryCardProps {
  title: string;
  imageUrl: string;
  description: string;
  slug: string;
}



export default function EditCategory({ title, imageUrl, description, slug }: CategoryCardProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    categoryName: title,
    subCategory: "",
    description: description,
    slug: slug,
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Please select a JPEG or PNG file");
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => setUploadProgress(0);
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress((e.loaded / e.total) * 100);
      }
    };
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setFileName(file.name); // Capture the file name
      setUploadProgress(100);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = (e: React.MouseEvent, buttonType: "update" | "confirm") => {
    e.preventDefault();
    console.log(buttonType, {
      ...formData,
      image: fileName, // Log the file name (or file path if you had it available)
    });
  };

  return (
    <div>
      <div className="rounded-t-3xl bg-primary p-4">
        <h1 className="text-[28px] font-semibold text-white">Edit Category</h1>
      </div>
      <div className="bg-white">
        <CardContent className="p-6">
          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Category Name <span className="text-red-500">*</span></Label>
                  <Input id="categoryName" value={formData.categoryName} onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })} required className="h-[51px] border border-[#B0B0B0]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subCategory">Sub-category <span className="text-red-500">*</span></Label>
                  <Input id="subCategory" value={formData.subCategory} onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })} required className="h-[51px] border border-[#B0B0B0]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Type Description here" className="min-h-[91px] border border-[#B0B0B0]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                  <Input id="slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required className="h-[51px] border border-[#B0B0B0]" />
                </div>
              </div>

              {/* Right Section (Image Upload) */}
              <div className="space-y-4">
                <div>
                  <Label>Category Image</Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${imagePreview || imageUrl ? "p-2" : "p-6"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/png"
                      onChange={handleFileInput}
                    />
                    {imagePreview || imageUrl ? (
                      <div className="relative aspect-video w-full h-[257px]">
                        <Image
                          src={imagePreview || imageUrl}
                          alt="Category preview"
                          fill
                          className="object-cover rounded"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                        >
                          <TiEdit size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 h-[193px]">
                        <ImageIcon className="w-12 h-12 text-gray-400 mt-10" />
                        <p className="text-sm text-gray-600">Drop your image here, or browse</p>
                        <p className="text-xs text-gray-500">Jpeg, png are allowed</p>
                      </div>
                    )}
                  </div>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative w-10 h-10 bg-gray-100 rounded">
                      <ImageIcon className="w-6 h-6 absolute inset-0 m-auto text-gray-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={(e) => handleButtonClick(e, "update")}>Update</Button>
                  <Button className="bg-primary hover:bg-navy-900" onClick={(e) => handleButtonClick(e, "confirm")}>Confirm</Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="save-info" />
              <Label htmlFor="save-info" className="text-sm text-gray-500">Save this information for faster Adding Products</Label>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
