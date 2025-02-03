"use client";

import { Button } from "@/components/ui/button";
import { contentManagementDataType } from "@/data/contentManagementData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";


export const ContentManagementColumn: ColumnDef<contentManagementDataType>[] = [


  {
    id: "tittle",
    header: () => <div className="ml-[-150px] ">Tittle</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[175px] h-[113px] flex justify-center items-center gap-[2px]">
          <span className="text-base font-medium leading-[19px] text-gradient text-center">{row.original.title}</span>
        </div>
      );
    },
  },
  {
    id: "status",
    header: () => <div className="ml-[-50px] ">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[82px] h-[26px] py-[6px] px-[17px] bg-[#00417E] flex justify-center rounded-[4px]">
          <span className="text-xs font-semibold leading-[14px] text-white text-center ">{row.original.status}</span>
        </div>
      );
    },
  },
  {
    header: "Author",
    cell: ({ row }) => {
      return (
        <div className="w-[63px] h-[57px] flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">{row.original.auctor}</span>
        </div>
      );
    },
  },
  {
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">{row.original.date}</span>
        </div>
      );
    },
  },
  {
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">{row.original.category}</span>
        </div>
      );
    },
  },
  {
    header: "Views and Engagement",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center">{row.original.view}</span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: () => {
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white h-auto w-[110px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]">
              <DropdownMenuItem className="p-[8px] text-red-600 hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-default" >Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }
];