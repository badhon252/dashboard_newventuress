"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function ContentManagementFilter() {
    return (
        <div className="flex items-center bg-white mb-[30px] gap-4 p-4 w-full rounded-[12px]">

            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Show</span>
                <Select defaultValue="all">
                    <SelectTrigger className="py-[9px] px-[10px] bg-primary text-white border-0 [&>svg]:text-white">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Entries</span>
                <Select defaultValue="choose stores">
                    <SelectTrigger className="py-[9px] px-[10px] bg-primary text-white border-0 [&>svg]:text-white">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="choose stores">Chose stores</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="ml-auto">
                <Button variant="default" className="bg-primary text-white ">
                    Bulk Delete
                </Button>
            </div>
        </div>
    )
}

