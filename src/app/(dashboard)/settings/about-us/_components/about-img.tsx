
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import type React from "react"

interface CompanyLogoProps {
  image: string
  isEditing: boolean
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AboutImage({ image, isEditing, onImageUpload }: CompanyLogoProps) {
  return (
    <div>
      <Label>Image</Label>
      <div className="mt-2 space-y-4">
        <div className="border border-dashed border-[#919792] rounded-lg p-4 w-full">
            <Image
                src={image || "/placeholder.svg"}
                alt="Company Logo"
                width={400}
                height={200}
                className="w-[706px] h-[288px]"
            />
        </div>
        {isEditing && <div className="flex items-center justify-end"><div className="border border-dashed border-[#919792] rounded-lg"><Input type="file" accept="image/*" onChange={onImageUpload}   className="ring-0 w-[105px] h-[33px] border-0 mt-2"/></div></div>}
      </div>
    </div>
  )
}