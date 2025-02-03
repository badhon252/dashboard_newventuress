import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Categories() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-3 gap-4">
      <FormField
        control={control}
        name="store"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] text-[#444444] font-normal">Store <span className="text-red-500">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-[#B0B0B0] h-[48px]">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="store1">Store 1</SelectItem>
                <SelectItem value="store2">Store 2</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] text-[#444444] font-normal">Category <span className="text-red-500">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-[#B0B0B0] h-[48px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="category1">Category 1</SelectItem>
                <SelectItem value="category2">Category 2</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="subCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] text-[#444444] font-normal">Sub-Category <span className="text-red-500">*</span></FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-[#B0B0B0] h-[48px]">
                  <SelectValue placeholder="Select sub-category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sub1">Sub-category 1</SelectItem>
                <SelectItem value="sub2">Sub-category 2</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

