import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ProductClassification() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField
        control={control}
        name="productType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Product Type *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="CBD" />
                  </FormControl>
                  <FormLabel className="font-normal">CBD</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Recreational" />
                  </FormControl>
                  <FormLabel className="font-normal">Recreational</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="stockStatus"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Stock Status *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="In Stock" />
                  </FormControl>
                  <FormLabel className="font-normal">In Stock</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Out of Stock" />
                  </FormControl>
                  <FormLabel className="font-normal">Out of Stock</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

