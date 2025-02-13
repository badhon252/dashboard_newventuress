"use client";

import { DemoTableItemsType } from "@/data/CustomerListData";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ActionCell from "./Actioncell";

export const CustomerListColumn: ColumnDef<DemoTableItemsType>[] = [
  {
    header: "Customer Profile",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-4">
          <div>
            <Image
              src={row.original.image}
              height={120}
              width={120}
              alt="img"
              className="h-[120px] w-[120px] rounded-full object-cover"
            />
          </div>
          <div className="w-[250px] text-left">
            <h4 className="text-gradient text-[18px] font-semibold">
              {row.original.name}
            </h4>
            <h5 className="py-2 text-[16px] font-normal">
              <span className="text-[#444444]"> {row.original.userEmail}</span>
            </h5>
            <p className="text-[16px] font-normal text-[#444444]">
              {row.original.userInfo}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    header: "Store",
    cell: ({ row }) => {
      return (
        <div className="text-gradient text-[18px] font-semibold">
          {row.original.store}
        </div>
      );
    },
  },
  {
    header: "Total Orders",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] font-normal text-[#444444]">
            {row.original.totalOder}
          </span>
        </div>
      );
    },
  },
  {
    header: "Money Spent",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] font-normal text-[#444444]">
            ${row.original.moneySpent}
          </span>
        </div>
      );
    },
  },
  {
    header: "Last Order",
    cell: ({ row }) => {
      return (
        <div>
          <span className="text-[16px] font-normal text-[#444444]">
            {row.original.lestOrder}
          </span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => <ActionCell row={row} /> // Use the ActionCell component here
  },
];
