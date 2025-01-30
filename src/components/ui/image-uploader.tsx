"use client";

import { ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface ImageUploaderProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ files, setFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Cleanup URLs on unmount
    return () => {
      files?.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFiles = (selectedFiles: File[]) => {
    const imageFiles = selectedFiles.filter(
      (file) =>
        file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
    );
    if (files) {
      setFiles([...files, ...imageFiles]);
    } else {
      setFiles(selectedFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Dropzone */}
      <div
        className="relative border-2 border-dashed rounded-lg p-8 mb-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <ImageIcon className="w-12 h-12 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drop your images here, or browse
          </p>
          <p className="text-sm text-gray-500">Jpeg, png are allowed</p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            multiple
            ref={fileInputRef}
          />
        </div>
      </div>

      {/* Uploaded Images */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {files?.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <div key={index} className="relative group">
              <Image
                src={imageUrl}
                alt={file.name}
                width={100}
                height={100}
                className="w-full h-20 object-cover rounded-lg"
              />
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100"
                onClick={() => removeImage(index)}
                type="button"
              >
                <Trash2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageUploader;
