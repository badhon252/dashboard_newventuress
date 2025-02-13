"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

export default function EditCategory({ title }: CategoryCardProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    categoryName: "",
    subCategory: "",
    description: "",
    slug: "",
  });

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
      setUploadProgress(100);
    };
    reader.readAsDataURL(file);
  };

  // const handleDelete = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setImagePreview(null);
  //   setUploadProgress(0);
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  const openFileDialog = () => {
    if (!imagePreview) {
      fileInputRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
                  <Input id="categoryName" value={title} onChange={handleChange} required className="h-[51px] border border-[#B0B0B0]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subCategory">Sub-category <span className="text-red-500">*</span></Label>
                  <Input id="subCategory" value={formData.subCategory} onChange={handleChange} required className="h-[51px] border border-[#B0B0B0]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Type Description here" className="min-h-[91px] border border-[#B0B0B0]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                  <Input id="slug" value={formData.slug} onChange={handleChange} required className="h-[51px] border border-[#B0B0B0]" />
                </div>
              </div>

              {/* Right Section (Image Upload) */}
              <div className="space-y-4">
                <div>
                  <Label>Category Image</Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${imagePreview ? "p-2" : "p-6"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={openFileDialog}
                  >
                    <Input type="file" ref={fileInputRef} className="hidden" accept="image/jpeg,image/png" onChange={handleFileInput} />

                    {imagePreview ? (
                      <div className="relative aspect-video w-full h-[257px]">
                        <Image src={imagePreview} alt="Category preview" fill className="object-cover rounded" />
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

                <Button variant="outline">Update</Button>
                <Button className="bg-primary hover:bg-navy-900">Confirm</Button>
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
