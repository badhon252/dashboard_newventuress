import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

export function AdditionalInfo() {
  const { control } = useFormContext()
  const [tags, setTags] = useState<string[]>(["Flower", "Edibles", "Apparel"])
  const [currentTag, setCurrentTag] = useState("")

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="coa"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>COA (Certificate Of Authenticity)</FormLabel>
            </div>
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormLabel>Tags</FormLabel>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeTag(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag(currentTag)
              }
            }}
          />
          <Button type="button" onClick={() => addTag(currentTag)} variant="secondary">
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

