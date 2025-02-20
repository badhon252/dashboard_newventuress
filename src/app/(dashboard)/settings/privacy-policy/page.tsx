"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { initialTerms } from "./data";

export default function Page() {
  const [terms, setTerms] = useState(initialTerms)
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => setIsEditing(true)
  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save the content to your backend
    console.log("Saving new content:", terms)
  }

  return (
    <Card className="w-full mx-auto mb-[30px]">
      <CardHeader className="flex flex-row items-center justify-between bg-[#1a237e] text-white rounded-t-lg">
        <CardTitle className="text-xl">Privacy Policy</CardTitle>
        <Button variant="secondary" size="sm" onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? "Save" : "Edit"}
        </Button> 
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[1200px]">
          {isEditing ? (
            <Textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="min-h-[1200px] font-mono text-sm"
              placeholder="Enter terms and conditions..."
            />
          ) : (
            <div className="prose prose-sm max-w-none whitespace-pre-wrap p-6">{terms}</div>
          )}
        </ScrollArea>
      </CardContent>
      {isEditing && (
        <div className="p-4 border-t bg-gray-50 rounded-b-lg flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </Card>
  )
}

