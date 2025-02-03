import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function Pricing() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-3 gap-4">
      <FormField
        control={control}
        name="purchasePrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] text-[#444444] font-normal">Purchase Price</FormLabel>
            <FormControl>
              <div className="relative h-[45px] flex items-center">
                <div className="absolute py-[9px] px-[17px] bg-[#E6EEF6] rounded-l-lg ml-[1px]">
                  <span className="text-[#3053c7]">$</span>
                </div>
                <Input
                  type="number"
                  className="pl-14 placeholder:text-[#C5C5C5] border-[#B0B0B0] h-[45px]"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sellingPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] text-[#444444] font-normal">Selling Price</FormLabel>
            <FormControl>
              <div className="relative h-[45px] flex items-center">
              <div className="absolute py-[9px] px-[17px] bg-[#E6EEF6] rounded-l-lg ml-[1px]">
                  <span className="text-[#3053c7]">$</span>
                </div>
                <Input
                  type="number"
                  className="pl-14 placeholder:text-[#C5C5C5] border-[#B0B0B0] h-[45px]"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="discountPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] text-[#444444] font-normal">Discount Price</FormLabel>
            <FormControl>
              <div className="relative h-[45px] flex items-center">
                <div className="absolute py-[9px] px-[17px] bg-[#E6EEF6] rounded-l-lg ml-[1px]">
                  <span className="text-[#3053c7]">$</span>
                </div>
                <Input
                  type="number"
                  className="pl-14 placeholder:text-[#C5C5C5] border-[#B0B0B0] h-[45px]"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

