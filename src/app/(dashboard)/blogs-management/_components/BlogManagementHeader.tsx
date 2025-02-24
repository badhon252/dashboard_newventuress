"use client"
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";

const BlogManagementHeader = ({ addBlogForm, setAddBlogForm, meta}: any) => {
    return (
        <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-between mb-[30px]">
            <div className="px-[10px] text-[12px] leading-[14.4px]">
                <span className="text-xs font-normal text-[#444444] leading-[14px]">All</span> ({meta.total}) |
                <span className="text-xs font-normal leading-[14px] text-gradient"> Published (58) | </span>
                <span className="text-xs font-normal leading-[14px] text-gradient"> Draft (0) | </span>
                <span className="text-xs font-normal leading-[14px] text-gradient"> Pending (0) | </span>
                <span className="text-xs font-normal leading-[14px] text-gradient"> Archived (32) </span>
            </div>

            <div>
                <Button onClick={() => setAddBlogForm(!addBlogForm)} asChild>
                    <span className="flex items-center gap-2 cursor-pointer">
                        Add New <Box />
                    </span>
                </Button>

            </div>

        </div>
    );
};

export default BlogManagementHeader;
