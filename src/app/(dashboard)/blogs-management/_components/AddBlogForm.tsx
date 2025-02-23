"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import AddBlogImage from "./AddBlogImage";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
});


const AddBlogForm: React.FC = () => {
  const session = useSession();
  const token = session?.data?.user?.token;
  console.log({ token });

  // ✅ Manage Image State
  const [image, setImage] = useState<File | null>(null);

  const { mutate } = useMutation({
    mutationKey: ["addBlog"],
    mutationFn: async (data: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-blog`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data, // Do not set "Content-Type" manually
        }
      );
      return response.json();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (image) {
      formData.append("image", image);
    }

    mutate(formData);
  };

  return (
    <div className="bg-white rounded-[24px] p-[32px] mb-[60px]">
      <div className="bg-primary px-4 py-3 mb-4 rounded-t-lg text-white text-[32px] leading-[38px] font-semibold">
        Add Blogs
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-5 gap-[54px] ">
            <div className="md:col-span-3 space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal text-[#444444] leading-[19px]">
                      Title<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter blog title"
                        className="h-[51px] border-[#9C9C9C]"
                        {...field}
                      />
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
                    <FormLabel className="text-base font-normal text-[#444444] leading-[19px]">Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type Description Here"
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
            <div className="md:col-span-2">
              <AddBlogImage onImageSelect={setImage}  />
            </div>
          </div>
          <div className="flex justify-end -mt-10">
            <Button type="submit" className="py-[12px] px-[24px]">
              Post
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddBlogForm;
