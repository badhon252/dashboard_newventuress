"use client";

import Image from "next/image";
import { DemoTableItemsType } from "@/data/VendorListData";

import { ColumnDef } from "@tanstack/react-table";
import VendorAction from "./VendorAction";

// const handleDelete = (row: any) => {
//   alert("Delete clicked for row:");
//   console.log("Delete clicked for row:", row);
//   return (
//     <Modal>
//       <div className="text-center">
//         <h3>Delete Vendor</h3>
//         <p>Are you sure you want to delete this vendor?</p>
//         <div className="flex justify-center gap-4">
//           {/* <Button variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirm}>Confirm</Button> */}
//         </div>
//       </div>
//     </Modal>
//   );
// };

export const CustomerListColumn: ColumnDef<DemoTableItemsType>[] = [
  {
    header: "Vendor",
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
            <h5 className="text-gradient py-2 text-[16px] font-normal">
              <span className="text-[#444444]"> {row.original.userEmail}</span>
            </h5>
            <p className="text-wrap text-[16px] font-normal text-[#444444]">
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
            {row.original.status === "Approved" ? row.original.totalOder : "-"}
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
            {row.original.status === "Approved"
              ? `$${row.original.moneySpent}`
              : "-"}
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
            {row.original.status === "Approved" ? row.original.lastOrder : "-"}
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
          <VendorAction row={row} />
        </div>
      );
    },
  },
];
