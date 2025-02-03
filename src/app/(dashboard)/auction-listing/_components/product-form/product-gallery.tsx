"use client"

import { useCallback, useState, useRef } from "react"
import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ImageIcon, Trash2, Check } from "lucide-react"
import Image from "next/image"

interface UploadedFile {
  name: string
  url: string
  isPrimary?: boolean
}

export function ProductGallery() {
  const { control, setValue } = useFormContext()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateFormValue = useCallback(
    (getNewFiles: (prev: UploadedFile[]) => UploadedFile[]) => {
      setUploadedFiles((prev) => {
        const newFiles = getNewFiles(prev)
        setValue(
          "images",
          newFiles.map((file) => file.url),
        )
        setValue("primaryImage", newFiles.find((file) => file.isPrimary)?.url || "")
        return newFiles
      })
    },
    [setValue],
  )

  const handleFiles = useCallback(
    async (files: File[]) => {
      const newFiles = await Promise.all(
        files.map(async (file) => {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          const url = URL.createObjectURL(file)
          return { name: file.name, url, isPrimary: false }
        }),
      )

      updateFormValue((prev) => {
        const updatedFiles = [...prev, ...newFiles]
        if (updatedFiles.length === 1) {
          updatedFiles[0].isPrimary = true
        }
        return updatedFiles
      })
    },
    [updateFormValue],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      handleFiles(files)
    },
    [handleFiles],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files)
        handleFiles(files)
        e.target.value = ""
      }
    },
    [handleFiles],
  )

  const removeFile = useCallback(
    (index: number) => {
      updateFormValue((prev) => {
        const newFiles = prev.filter((_, i) => i !== index)
        if (prev[index].isPrimary && newFiles.length > 0) {
          newFiles[0].isPrimary = true
        }
        return newFiles
      })
    },
    [updateFormValue],
  )

  const handleImageClick = useCallback(
    (index: number) => {
      updateFormValue((prev) =>
        prev.map((file, i) => ({
          ...file,
          isPrimary: i === index,
        })),
      )
    },
    [updateFormValue],
  )

  const handleFormItemClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="images"
        render={() => (
          <FormItem>
            <FormLabel>Product Gallery</FormLabel>
            <div
              className={`mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer
                ${isDragging ? "border-primary bg-primary/5" : "border-gray-200"}
                ${uploadedFiles.length === 0 ? "h-[200px]" : "min-h-[120px]"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFormItemClick}
            >
              {uploadedFiles.length === 0 ? (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click here or drop your images to upload</p>
                  <p className="text-xs text-gray-500">JPEG, PNG files are allowed (max 5MB each)</p>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-2">
                      <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleImageClick(index)
                        }}
                      >
                        <div className="h-12 w-12 relative">
                          <Image
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            fill
                            className="rounded object-cover"
                          />
                          {file.isPrimary && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Check className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile(index)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="sr-only"
                accept="image/jpeg,image/png"
                multiple
                onChange={handleFileSelect}
              />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

