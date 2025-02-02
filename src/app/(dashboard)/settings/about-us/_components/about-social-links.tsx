import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"

interface SocialLinksProps {
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  isEditing: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AboutSocialLinks({ facebook, twitter, instagram, linkedin, isEditing, onChange }: SocialLinksProps) {
  return (
    <div className="space-y-4 text-[#3D3D3D]">
      <h3 className="text-lg font-semibold">Social Links</h3>
      <div className="grid grid-cols-1 gap-y-5">
        <div>
          <Label htmlFor="facebook">Facebook</Label>
          <Input id="facebook" name="facebook" value={facebook} onChange={onChange} disabled={!isEditing} className="h-[43px] mt-1"/>
        </div>
        <div>
          <Label htmlFor="twitter">Twitter</Label>
          <Input id="twitter" name="twitter" value={twitter} onChange={onChange} disabled={!isEditing} className="h-[43px] mt-1"/>
        </div>
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input id="instagram" name="instagram" value={instagram} onChange={onChange} disabled={!isEditing} className="h-[43px] mt-1"/>
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" name="linkedin" value={linkedin} onChange={onChange} disabled={!isEditing} className="h-[43px] mt-1"/>
        </div>
      </div>
    </div>
  )
}

