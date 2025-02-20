"use client";

import { blurDataUrl } from "@/data/blur-data.url";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import MembershipAction from "./membership-auction";
import { MembershipPlan } from "@/types/membership";

export const MembershipColumns: ColumnDef<MembershipPlan>[] = [
  {
    header: "Profile",

    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-[12px] w-fit mx-auto ">
          <Image
            src={row.original.profileImage || "/assets/img/profile_img.png"}
            alt="Profile"
            height={100}
            width={100}
            className="rounded-full object-covers h-[80px] w-[80px]"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
          <div className="space-y-[8px]">
            <h4 className="font-semibold text-[18px] leading-[21.6px] text-gradient">
              Monir Hossain
            </h4>
            <p className="text-[#444444] text-[16px] leading-[19.2px] font-normal">
              test@gmail.com
            </p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Plan",
    cell: ({ row }) => {
      return (
        <div className="bg-primary text-white p-[10px] rounded-[12px] ">
          {row.original.planType}
        </div>
      );
    },
  },
  {
    header: "Time",
    cell: ({ row }) => {
      return (
        <p className="text-[16px] leading-[19.2px] font-normal text-[#444444]">
          {row.original.time || "3:00"}
        </p>
      );
    },
  },
  {
    header: "Remaining",
    cell: ({ row }) => {
      return (
        <div className="text-[16px] font-normal leading-[19.2px] text-[#444444] space-y-[8px]">
          <p>Auction: {row.original.numberOfAuction}</p>
          <p>Bids: {row.original.numberOfBids}</p>
        </div>
      );
    },
  },
  {
    header: "Store",
    cell: ({ row }) => (
      <p className="text-gradient text-[18px] leading-[21.6px] font-semibold">
        {row.original?.store || "No Stote"}
      </p>
    ),
  },
  {
    id: "actions",
    cell: () => <MembershipAction />,
  },
];
