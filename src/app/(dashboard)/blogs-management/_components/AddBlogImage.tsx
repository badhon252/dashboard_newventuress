"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface AddBlogImageProps {
  onImageSelect: (file: File | null) => void;
  existingImage?: string;
}

const AddBlogImage: React.FC<AddBlogImageProps> = ({
  onImageSelect,
  existingImage,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(existingImage || null);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      onImageSelect(image);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image, onImageSelect]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="space-y-4 border border-[#9C9C9C] rounded-[12px] p-6">
      <Label className="text-base font-normal text-[#444444] leading-[19px]">
        Blog Galary
      </Label>
      <div
        className={`rounded-lg border-2 border-dashed p-4 text-center transition-colors hover:bg-accent/50 ${
          preview ? "border-primary" : "border-muted-foreground/25"
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        style={{ height: "160px" }}
      >
        {preview ? (
          <div className="relative">
            <Image
              src={preview}
              width={200}
              height={200}
              alt="Preview"
              className="mx-auto max-h-32 rounded"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute -right-2 -top-2"
              onClick={handleRemoveImage}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/assets/img/image_icon.png"
                alt="image icon"
                width={51}
                height={43}
              />
              <p className="mb-1 text-sm text-muted-foreground">
                Drop your imager here, or browse
              </p>
              <p className="mb-1 text-sm text-muted-foreground">
              Jpeg, png are allowed
              </p>
              <label className="cursor-pointer text-sm font-bold text-primary hover:underline">
                Click to Upload
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddBlogImage;
