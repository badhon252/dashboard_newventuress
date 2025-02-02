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
            <FormLabel>Purchase Price</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  type="number"
                  className="pl-6"
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
            <FormLabel>Selling Price</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  type="number"
                  className="pl-6"
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
            <FormLabel>Discount Price</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  type="number"
                  className="pl-6"
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

