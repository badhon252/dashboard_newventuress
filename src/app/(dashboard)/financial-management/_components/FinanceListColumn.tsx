"use client";

import Image from "next/image";
import { DemoTableItemsType } from "@/data/FinanceListData";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CustomerListColumn: ColumnDef<DemoTableItemsType>[] = [
  {
    header: "Details",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4">
          <div>
            <Image
              src={row.original.image}
              height={120}
              width={120}
              alt="img"
              className="h-[110px] w-[142px] rounded-lg object-cover"
            />
          </div>
          <div className="w-[250px] text-left">
            <h4 className="text-gradient text-[18px] font-semibold">
              {row.original.name}
            </h4>
            <h5 className="text-gradient py-2 text-[16px] font-normal">
              <span className="text-[#3D3D3D]"> {row.original.userEmail}</span>
            </h5>
            <p className="text-wrap text-[16px] font-normal text-gradient">
              {row.original.userInfo}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    header: "Product Type",
    cell: ({ row }) => {
      return (
        <div className="text-[16px] font-normal text-[#444444]">
          {row.original.productType}
        </div>
      );
    },
  },
  {
    header: "Total Sales",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] font-normal text-[#444444]">
            ${row.original.totalSales}
          </span>
        </div>
      );
    },
  },
  {
    header: "Vendor Revenue",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] font-normal text-[#444444]">
            ${row.original.vendorRevenue}
          </span>
        </div>
      );
    },
  },
  {
    header: "Paid Fees",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] font-normal text-[#444444]">
            ${row.original.paidFees}
          </span>
        </div>
      );
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] font-normal text-[#444444]">
            {row.original.status === "Approved" ? (
              <span className="text-white bg-[#2A6C2D] text-[12px] font-semibold py-[6px] px-[17px] rounded-md fle">
                {row.original.status}
              </span>
            ) : (
              <span className="text-white bg-[#00417E] text-[12px] font-semibold py-[6px] px-[17px] rounded-md fle">
                {row.original.status}
              </span>
            )}
          </span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white h-auto w-[110px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]"
            >
              {row.original.status === "Pending" && (
                <DropdownMenuItem className=" p-[8px] hover:bg-[#E6EEF6] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gradient text-left cursor-pointer">
                  Approved
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className=" text-left p-[8px] hover:bg-[#E6EEF6] cursor-pointer  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  alert("Delete clicked for row:");
                }}
                className=" text-left p-[8px] text-red-600 cursor-pointer hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
