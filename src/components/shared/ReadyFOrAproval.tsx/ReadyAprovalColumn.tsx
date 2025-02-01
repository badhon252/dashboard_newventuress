"use client";

import { TransactionDataType } from "@/data/ReadyAproval"
import { ColumnDef } from "@tanstack/react-table";

export const TopvendorColumns: ColumnDef<TransactionDataType>[] = [
  {
    header: "Type",
    cell: ({ row }) => (
      <p className="text-base text-[#444444] leading-[19.2px] font-normal py-[13px] ">
        {row.original.type}
      </p>
    ),
  },
  {
    header: "Amount",
    cell: ({ row }) => (
      <p className="text-base text-[#444444] leading-[19.2px] font-normal ">
        {row.original.amount}
      </p>
    ),
  },
  {
    header: "Status",
    cell: ({ row }) => (
      <p className="text-base text-[#444444] leading-[19.2px] font-normal ">
        {row.original.status}
      </p>
    ),
  },
];
