"use client";

import { useRef, useState } from "react";
import { Trash2,  ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BlogGallery() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(
      (file) =>
        file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
    );
    setFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const imageFiles = selectedFiles.filter(
        (file) =>
          file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
      );
      setFiles((prev) => [...prev, ...imageFiles]);
    }
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Blog Gallery</h2>

      {/* Drop Zone */}
      <div
        className="relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {files.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 w-full">
            {files.map((file, index) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="relative group w-[370px] 2xl:w-[470px]">
                  <Image
                    src={imageUrl}
                    alt={file.name}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-sm z-10"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            <p className="text-sm text-gray-600">
              Drop your images here, or browse
            </p>
            <p className="text-sm text-gray-500">Jpeg, png are allowed</p>
          </div>
        )}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
          multiple
          ref={fileInputRef}
        />
      </div>

      {/* Buttons Below the Drop Zone (Always Visible) */}
      <div className="flex gap-4 justify-end mt-4">
        <Button
          className="text-gradient border border-[#121D42] py-2 px-6 text-base font-medium leading-5"
          type="button"
          variant="outline"
        >
          Update
        </Button>
        <Button
          type="button"
          className="px-8 py-2 text-base font-medium leading-5 bg-gradient-to-r from-[#121D42] via-[#152764] to-[#4857BD] hover:from-[#7091FF] hover:via-[#2F4697] hover:to-[#7485FB] text-white"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
