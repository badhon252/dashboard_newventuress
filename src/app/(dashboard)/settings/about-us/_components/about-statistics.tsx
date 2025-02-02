import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"

interface StatisticsProps {
  products: string
  customers: string
  vendors: string
  isEditing: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function AboutStatistics({ products, customers, vendors, isEditing, onChange }: StatisticsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 text-[#9C9C9C] text-[16px] font-medium">
      <div className="flex items-center gap-2">
        <Label htmlFor="products" className="text-nowrap">Our Products:</Label>
        <Input id="products" name="products" value={products} onChange={onChange} disabled={!isEditing} />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="customers" className="text-nowrap">Satisfied Customers:</Label>
        <Input id="customers" name="customers" value={customers} onChange={onChange} disabled={!isEditing} />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="vendors" className="text-nowrap">Our Vendors:</Label>
        <Input id="vendors" name="vendors" value={vendors} onChange={onChange} disabled={!isEditing} />
      </div>
    </div>
  )
}

