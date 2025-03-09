"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { TiEdit } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { SubCategoryDataResponse } from "@/data/subCategory";
import { toast } from "sonner";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  description: string;
  categoryId: string;
  industry: string;
  subCategoryId?: string;
  subCategoryName?: string;
  setIsOpenEditModal: (data: boolean) => void;
}

export function EditCategory({
  title,
  imageUrl,
  description,
  categoryId,
  industry = "cbd", // Default to CBD if not provided
  subCategoryId = "",
  subCategoryName = "",
  setIsOpenEditModal,
}: CategoryCardProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  const token = session.data?.user?.token;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(subCategoryName || "");
  const [id, setId] = useState(subCategoryId || "");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: title,
    description: description,
    industry: industry,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Set initial values when props change
  useEffect(() => {
    setFormData({
      categoryName: title,
      description: description,
      industry: industry,
    });
    setSelectedItem(subCategoryName || "");
    setId(subCategoryId || "");
  }, [title, description, industry, subCategoryName, subCategoryId]);

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
      toast.error("Please select a JPEG or PNG file");
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
      setSelectedFile(file);
      setUploadProgress(100);
    };
    reader.readAsDataURL(file);
  };

  const queryClient = useQueryClient();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle radio group change
  const handleRadioChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      industry: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryName) {
      toast.error("Category name is required");
      return;
    }

    if (!id) {
      toast.error("Please select a subcategory");
      return;
    }

    setIsLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("categoryName", formData.categoryName);
    formDataToSubmit.append("subCategory", id);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("industry", formData.industry);

    if (selectedFile) {
      formDataToSubmit.append("image", selectedFile);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSubmit,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Category updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["allcategory"] });
        setIsOpenEditModal(false);
      } else {
        toast.error(`Error: ${result.message || "Failed to update category"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const { data, isLoading: isLoadingSubcategories } =
    useQuery<SubCategoryDataResponse>({
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

  const handleFileButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="rounded-t-3xl bg-primary p-4">
        <h1 className="text-[28px] font-semibold text-white">Edit Category</h1>
      </div>
      <div className="bg-white">
        <CardContent className="p-6">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryName">
                    Category Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="categoryName"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    required
                    className="h-[51px] border border-[#B0B0B0]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Sub Category <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative inline-block text-left w-full border-[1px] border-[#B0B0B0] py-2 rounded-[8px]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                      }}
                      className="font-medium rounded-lg text-sm text-[#444444] px-2 py-2.5 text-center inline-flex justify-between items-center w-full"
                      type="button"
                    >
                      {selectedItem ||
                        (isLoadingSubcategories
                          ? "Loading subcategories..."
                          : "Select Sub Category")}
                      <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg w-full shadow-md cursor-pointer">
                        <ul className="py-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
                          {data && data.data && Array.isArray(data.data) ? (
                            data.data.map((item) => (
                              <li key={item._id}>
                                <p
                                  onClick={() =>
                                    handleSelect(item.subCategoryName, item._id)
                                  }
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  {item.subCategoryName}
                                </p>
                              </li>
                            ))
                          ) : (
                            <li>
                              <p className="w-full text-left px-4 py-2 text-gray-500">
                                No subcategories available
                              </p>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Type Description here"
                    className="min-h-[91px] border border-[#B0B0B0]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.industry}
                    onValueChange={handleRadioChange}
                    className="flex items-center space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cbd" id="edit-cbd" />
                      <Label htmlFor="edit-cbd">HEMP/CBD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="recreational"
                        id="edit-recreational"
                      />
                      <Label htmlFor="edit-recreational">Recreational</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Category Image</Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    } 
                    ${imagePreview || imageUrl ? "p-2" : "p-6"}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleFileButtonClick}
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
                            e.preventDefault();
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

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="flex items-center gap-4 p-4">
                    <div className="relative w-10 h-10 bg-gray-100 rounded">
                      <ImageIcon className="w-6 h-6 absolute inset-0 m-auto text-gray-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpenEditModal(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Category"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
