"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    image: z.string().optional(),
});

interface EditBlogProps {
    setIsOpen: (open: boolean) => void;
    blogData: any;
}




const EditBlogForm: React.FC<EditBlogProps> = ({ blogData, setIsOpen }) => {
    const [filePreview, setFilePreview] = useState<string | null>(blogData?.original?.image || null);
    const [fileName, setFileName] = useState<string | null>(blogData?.original?.image || null);
    const queryClient = useQueryClient();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: blogData?.original?.title || "",
            description: blogData?.original?.description || "",
            image: blogData?.original?.image || "",
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFilePreview(previewUrl);
            setFileName(file.name);
            form.setValue("image", file.name);
        }
    };

    const handleRemoveImage = () => {
        if (filePreview) URL.revokeObjectURL(filePreview);
        setFilePreview(null);
        setFileName(null);
        form.setValue("image", "");
    };
    console.log(fileName);


    const session = useSession();
    const token = session?.data?.user?.token;


    const mutation = useMutation({
        mutationFn: async (updatedData: z.infer<typeof formSchema>) => {
            const response = await fetch(
                `http://localhost:8001/api/update-blog/${blogData?.original?._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include token
                    },
                    body: JSON.stringify(updatedData),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update blog");
            }
            return response.json();
        },
        onSuccess: () => {

            setIsOpen(false); // Close the modal after a successful update
            form.reset(); // Reset the form fields after submission
            queryClient.invalidateQueries({ queryKey: ["blogs"] }); // Refresh the blog list (or any relevant data)
        },
        onError: (error) => {
            console.error("Error updating blog:", error);
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        mutation.mutate(data);
    };

    return (
        <div className="bg-white rounded-[24px] text-start">
            <div className="flex justify-start items-center bg-primary px-4 py-3 mb- rounded-t-lg text-white text-[32px] leading-[38px] font-semibold">
                Edit Blog
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-[30px]">
                    <div className="flex gap-[54px]">
                        <div className="w-[58%] space-y-[16px]">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            Title<span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="h-[51px] border-[#9C9C9C]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none border-[#9C9C9C] h-[192px]"
                                                rows={12}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-[42%] h-full mt-[16px] border border-[#9C9C9C] rounded-lg p-4">
                            <FormLabel>Upload Image</FormLabel>
                            <div className="h-full mt-[16px] p-4">
                                <div className="flex flex-col items-center justify-center w-full h-[300px] border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <input
                                        type="file"
                                        id="image-upload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    {filePreview ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={filePreview?.startsWith('http') ? filePreview : `/${filePreview}`}
                                                width={400}
                                                height={300}
                                                alt="Uploaded preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                                            >
                                                ❌
                                            </button>
                                        </div>
                                    ) : (
                                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-8 h-8 mb-2 text-gray-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                            <p className="text-sm text-gray-500">Click to upload an image</p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-[60px]">
                        <Button type="submit" className="py-[12px] px-[24px]" >
                            Post
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default EditBlogForm;
