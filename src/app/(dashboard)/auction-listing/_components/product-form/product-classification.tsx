import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"




export function ProductClassification() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-2 gap-6 text-[16px]">
      <FormField
        control={control}
        name="productType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-[16px] font-normal">Product Type <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <div className="space-y-2">
                {["CBD", "Recreational"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={type}
                      checked={field.value?.includes(type)}
                      onChange={(e) => {
                        const valueArray = field.value || [];
                        let newValueArray;

                        if (e.target.checked) {
                          newValueArray = [...valueArray, type]; // Add the type if checked
                        } else {
                          newValueArray = valueArray.filter((val: string) => val !== type); // Remove the type if unchecked
                        }

                        // Update the field value
                        field.onChange(newValueArray);

                        // Perform additional action after the checkbox is checked/unchecked
                        console.log(`Checkbox for ${type} was ${e.target.checked ? "checked" : "unchecked"}`);
                        console.log("Current field value:", newValueArray);

                        // Example: You can call an API or update another state here
                        // someActionAfterCheck(newValueArray);
                      }}
                      className="h-4 w-4 border-[#9C9C9C]"
                    />
                    <label className="text-[16px] text-[#444444]">{type}</label>
                  </div>
                ))}
              </div>
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
            <FormLabel className="text-[16px] font-normal">Stock Status <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <div className="space-y-2">
                {["In Stock", "Out of Stock"].map((type) => (
                  <div key={type} className="flex items-center space-x-2 ">
                    <input
                      type="checkbox"
                      value={type}
                      checked={field.value?.includes(type)} // This ensures checking for exact match
                      onChange={(e) => {
                        const valueArray = field.value || [];
                        let newValueArray;

                        if (e.target.checked) {
                          newValueArray = [...valueArray, type]; // Add the type if checked
                        } else {
                          newValueArray = valueArray.filter((val: string) => val !== type); // Remove the type if unchecked
                        }

                        // Update the field value
                        field.onChange(newValueArray);

                        // Perform additional action after the checkbox is checked/unchecked
                        console.log(`Checkbox for ${type} was ${e.target.checked ? "checked" : "unchecked"}`);
                        console.log("Current field value:", newValueArray);
                      }}
                      className="h-4 w-4 border-[#9C9C9C]"
                    />
                    <label className="text-[16px] text-[#444444]">{type}</label>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  )
}

