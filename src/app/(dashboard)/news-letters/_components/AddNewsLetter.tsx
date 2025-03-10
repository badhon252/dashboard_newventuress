"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
  email: z.string(),
});

const AddNewsLetter = ({
  open,
  onOpenChange,
  isOpen,
  setIsOpen,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const session = useSession();
  const token = session?.data?.user?.token;
  console.log({ token });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-news-letter"],
    mutationFn: (data:any) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter`, {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data.message, {
          position: "top-right",
          richColors: true,
        });
        return;
      }
      form.reset();
      onOpenChange(false);
      toast.success(data.message, {
        position: "top-right",
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: ["news-letter"] })
    }
    
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

    mutate(values);

    console.log(values);
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="w-full flex items-center justify-end">
              <X
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
              />
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex items-center justify-end">
                <Button disabled={isPending} type="submit">
                  {isPending ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewsLetter;
