"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function NotificationFilter() {
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

            <div>
                <Select>
                    <SelectTrigger className="py-[9px] px-[10px] bg-primary text-white border-0  [&>svg]:text-white">
                        <SelectValue placeholder="Chose Date Range" />

                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="last7days">Last 7 Days</SelectItem>
                        <SelectItem value="last30days">Last 30 Days</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <Select>
                    <SelectTrigger className="py-[9px] px-[10px] bg-primary text-white border-0  [&>svg]:text-white">
                        <SelectValue placeholder="Chose by view" />

                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
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

