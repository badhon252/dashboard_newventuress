import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function BasicInfo() {
  const { control } = useFormContext();

  return (
    <div className="space-y-[16px] mt-[16px]">
      <FormField
        control={control}
        name="title"
        render={({ field }) =>
          <FormItem>
            <FormLabel>
              Title <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} className="h-[51px] border-[#B0B0B0]" />
            </FormControl>
            <FormMessage />
          </FormItem>}
      />

      <FormField
        control={control}
        name="shortDescription"
        render={({ field }) =>
          <FormItem>
            <FormLabel>Short Description</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Type Description Here"
                className="resize-none h-[60px] border-[#9C9C9C]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) =>
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Type Description here"
                className="h-[91px] border-[#9C9C9C]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>}
      />
    </div>
  );
}
