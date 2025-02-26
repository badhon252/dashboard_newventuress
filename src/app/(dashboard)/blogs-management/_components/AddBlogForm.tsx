"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type Dispatch, type SetStateAction, useState } from "react"
import AddBlogImage from "./AddBlogImage"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import QuillEditor from "./AddTiptapEditor"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
})

interface Props {
  setAddBlogForm: Dispatch<SetStateAction<boolean>>
  token: string
}

const AddBlogForm = ({ setAddBlogForm, token }: Props) => {
  // Initialize hooks before checking for token
  // const session = useSession()
  // const token = session?.data?.user?.token
  const queryClient = useQueryClient()
  const [image, setImage] = useState<File | null>(null)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const { mutate, isPending } = useMutation({
    mutationKey: ["addBlog"],
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data, // Do not set "Content-Type" manually
      })
      return response.json()
    },
    onSuccess: (data) => {
      if (!data.status) {
        toast.error(data.message, {
          position: "top-right",
          richColors: true,
        })
        return
      }

      // ✅ Reset the form
      form.reset()
      setImage(null)

      toast.success(data.message, {
        position: "top-right",
        richColors: true,
      })

      // ✅ Refresh the blog list
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      setAddBlogForm(false)
    },
    onError: () => {
      // ❌ Show error message
      setMessage({ text: "Failed to add blog. Please try again.", type: "error" })

      // Auto-hide message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    },
  })

  console.log(token);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
  // Return early if no token is found
  if (!token) return null

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    if (image) {
      formData.append("image", image)
      console.log(image)
    }

    mutate(formData)
    console.log(formData)
  }

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
                      <Input placeholder="Enter blog title" className="h-[51px] border-[#9C9C9C]" {...field} />
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
                    <FormLabel className="text-base font-normal text-[#444444] leading-[19px]">
                      Short Description
                    </FormLabel>
                    <FormControl>
                      <QuillEditor value={field.value} onChange={(newValue) => field.onChange(newValue)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <AddBlogImage onImageSelect={setImage} />
            </div>
          </div>
          {/* ✅ Show Success/Error Message */}
          {message && <AlertDialog>{message.text}</AlertDialog>}

          <div className="flex justify-end -mt-10">
            <Button type="submit" className="py-[12px] px-[24px]">
              {isPending ? (
                <p className="flex">
                  Posting... <Loader2 className="animate-spin text-white" />
                </p>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddBlogForm

