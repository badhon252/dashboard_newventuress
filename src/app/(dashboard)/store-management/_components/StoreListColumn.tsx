"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DemoTableItemsType } from "@/data/StoreListData";
import { Box } from "lucide-react";
import { ImInfinite } from "react-icons/im";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import StoreAction from "./StoreAction";

export const StoreListColumn: ColumnDef<DemoTableItemsType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "verification",
    header: () => <div className="ml-[-20px] ">Verification</div>,
 
    cell: ({ row }) => {
      return (
        <div>
          <Image
            src={row.original.verification}
            height={14}
            width={14}
            alt="img"
          />
        </div>
      );
    },
  },
  {
    id: "profile",
    header: () => <div className="ml-[-180px] ">Profile</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-[8px]">
          <div>
            <Image
              src={row.original.image}
              height={142}
              width={110}
              alt="img"
              className="rounded-[8px] py-[15px]"
            />
          </div>
          <div className="w-[250px] flex flex-col items-start">
            <h4 className="text-lg text-gradient font-semibold leading-[21px]">
              {row.original.name}
            </h4>
            <h5 className="text-base font-normal leading-[19px] text-[#3D3D3D] py-2">
              <span className="text-[#3D3D3D]"> {row.original.userName}</span>
            </h5>
            <p className="text-base font-normal text-gradient leading-[19px] text-left">
              {row.original.userStatus}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "box",
    header: () => <Box className="w-[16px] h-[16px] ml-[20px]"/>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Box className="w-[12px] h-[13px]"/>
          <div className="flex items-center">
            <span className="text-base text-[#E10E0E] font-normal leading-[19px]">
              {row.original.remainingBox}
            </span>{" "}
            /
            <span className="text-base text-[#444444] font-normal leading-[19px]">
              {row.original.totalBox}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "gross Sales",
    header: () => <div className="ml-[-55px] ">Gross Sales</div>,
   
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="text-base text-[#E10E0E] font-normal leading-[19px]">
            {row.original.grossSales}
          </span>
          <span className="text-base text-[#444444] font-normal leading-[19px]">/MB/</span>
          <ImInfinite className="text-[16px]" />
        </div>
      );
    },
  },
  {
    header: "Total Fees",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-base text-[#444444] font-normal leading-[19px]">
            ${row.original.adminFees}
          </span>
        </div>
      );
    },
  },
  {
    header: "Due Fees",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-base text-[#444444] font-normal leading-[19px]">
            ${row.original.paidFees}
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
          <span className="text-base text-[#444444] font-normal leading-[19px]">
            ${row.original.totalFees}
          </span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({row}) => {
      return (
        <div>
          <StoreAction row={row}/>
        </div>
      );
    },
  },
];
