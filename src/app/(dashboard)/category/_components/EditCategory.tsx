"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader,  } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

export default function EditCategory() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setUploadProgress(0);
      };

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgress(progress);
        }
      };

      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setUploadProgress(100);
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please select a JPEG or PNG file");
    }
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImagePreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="">
      <div className="mb-6 rounded-t-lg bg-primary p-4">
        <h1 className="text-[28px] font-semibold text-white">
          EditCategory
        </h1>
      </div>
      <Card className="">
        <CardHeader className="bg-gradient-to-r from-navy-700 to-navy-900"></CardHeader>
        <CardContent className="p-6">
          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2 ">
                  <Label htmlFor="category-name " className="text-[#444444]">
                    Category Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="category-name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sub-category" className="text-[#444444]">
                    Sub-category <span className="text-red-500">*</span>
                  </Label>
                  <Input id="sub-category" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#444444]">
                    Short Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Type Description here"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-[#444444]">
                    Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input id="slug" required />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-[#444444]">Category Image</Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }
                    ${imagePreview ? "p-2" : "p-6"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={openFileDialog}
                  >
                    <Input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/png"
                      onChange={handleFileInput}
                    />

                    {imagePreview ? (
                      <div className="relative aspect-video w-full h-[257px]">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Category preview"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 h-[193px] ">
                        <ImageIcon className="w-12 h-12 text-gray-400 mt-10 " />
                        <p className="text-sm text-gray-600">
                          Drop your image here, or browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Jpeg, png are allowed
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {uploadProgress > 0 && (
                  <div className="flex items-center gap-4 p-4 ">
                    <div className="relative w-10 h-10 bg-gray-100 rounded">
                      <ImageIcon className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    {uploadProgress === 100 && (
                      <Check className="w-5 h-5 text-white bg-blue-600 rounded-full " />
                    )}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-5 w-5 text-[#919792]" />
                    </button>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">Update</Button>
                    <Button className="bg-primary hover:bg-navy-900 ">
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="save-info" />
              <Label htmlFor="save-info" className="text-sm text-[#444444]">
                Save this information for faster Adding Products
              </Label>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
