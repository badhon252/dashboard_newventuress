"use client";

import { blogsDataType } from "@/data/blogsManagementData";
import { ColumnDef } from "@tanstack/react-table";
import AuctionsButton from "./AuctionsButton";
import { Checkbox } from "@/components/ui/checkbox";

export const BlogManagementColumn = (handleSelectRow: (row: blogsDataType) => void): ColumnDef<blogsDataType>[] => [
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
        onCheckedChange={(value) => {
          row.toggleSelected(!!value); // Toggle row selection
          handleSelectRow(row.original); // Pass row.original to handleSelectRow
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "title",
    header: () => <div className="ml-[-250px] ">Tittle</div>,
    cell: ({ row }) => {
      return (
        <div className="w-[300px] h-[114px] flex justify-center gap-[2px] items-center">
          <span className="text-lg font-medium leading-[21px] text-black text-center">{row.original.title}</span>
        </div>
      );
    },
  },
  {
    id: "Author",
    header: () => <div className="">author</div>,
    cell: ({ row }) => {
      return (
        <div className=" h-[114px] flex justify-center gap-[2px] items-center">
          <span className="text-lg font-medium leading-[21px] text-black text-center">{row.original.author}</span>
        </div>
      );
    },
  },
  {
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center items-center">{row.original.createdAt}</span>
        </div>
      );
    },
  },
  {
    header: "Views and Engagement",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] text-center items-center">{row.original.views}</span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {

      return (
        <div className="  ">

          <AuctionsButton row={row} />
        </div>
      );
    },
  },
];