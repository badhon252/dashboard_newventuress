import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function InventoryDetails() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-3 gap-4">
      <FormField
        control={control}
        name="size"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[16px] font-normal text-[#444444]">Size (KG)</FormLabel>
            <FormControl>
              <Input type="text" {...field} className="border-[#B0B0B0] h-[48px]"/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input
                type="number"
                className="border-[#B0B0B0] h-[48px]"
                {...field}
                onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sku"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SKU</FormLabel>
            <FormControl>
              <Input type="text" {...field} placeholder="Fox-0369" className="border-[#B0B0B0] h-[48px]"/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

