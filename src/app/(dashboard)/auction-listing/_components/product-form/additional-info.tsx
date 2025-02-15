import type React from "react"
import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { InputWithTags } from "@/components/ui/input-with-tags"
import { Label } from "@/components/ui/label"

export function AdditionalInfo({
  tags,
  setTags,
}: { tags: string[]; setTags: React.Dispatch<React.SetStateAction<string[]>> }) {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="coa"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} className="h-[20px] w-[20px]" />
            </FormControl>
            <div className="space-y-1 leading-none ">
              <FormLabel className="text-[16px] font-medium text-[@444444]">
                COA (Certificate Of Authenticity)
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="mt-3">
          <InputWithTags placeholder="Add Tags" limit={10} tags={tags} setTags={setTags} className="border-[#9E9E9E]" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="save-info" />
          <Label
            htmlFor="save-info"
            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Save this information for faster check-out next time
          </Label>
        </div>
      </div>
    </div>
  )
}

