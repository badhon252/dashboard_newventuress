"use client";
import { SaleDataType } from "@/data/Topvendor";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const TopvendorColumns: ColumnDef<SaleDataType>[] = [
  {
    id: "Profile",
    header: () => <div className="ml-[-205px] ">Profile</div>,
    cell: ({ row }) => {
     

      return (
        <div className="flex items-center gap-x-3">
          <div>
            <Image
              src={row.original.image}
              width={46}
              height={46}
              alt="profile"
            />
          </div>
          <div className="text-left">
            <h2 className="text-[18px] text-gradient font-bold leading-[21px]">
            {row.original.name}
            </h2>
            <p className="text-base text-[#444444] leading-[19.2px] font-normal ">
             {row.original.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Sales Amount",
    cell: ({ row }) => (
      <p className="text-base text-[#444444] leading-[19.2px] font-normal ">
        $ {row.original.sales_amount}
      </p>
    ),
  },
];
