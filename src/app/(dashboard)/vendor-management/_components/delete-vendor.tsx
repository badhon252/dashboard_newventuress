"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/types/admin";

interface DeleteVendorModalProps {
  vendorDetails: User;
  setIsOpen: (open: boolean) => void;
}

export function DeleteVendorModal({
  vendorDetails,
  setIsOpen,
}: DeleteVendorModalProps) {
  return (
    <div className="p-0 overflow-hidden max-h-[722px] flex flex-col justify-between py-[26px]">
      <div className="p-6 pb-0">
        <h1 className="text-center text-[32px] font-semibold text-[#1a237e] leading-9">
          Are You Sure To Delete this Vendor?
        </h1>
      </div>

      <div className="px-[68px] mt-4">
        <h3 className="font-semibold mb-4 text-[25px] text-gradient py-4">
          Vendor Details
        </h3>

        <div className="">
          <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
            <span className="text-[#444444] font-medium ">User Name</span>
            {/* <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={vendorDetails.avatarUrl} />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar> */}
            <span className="text-gradient">{vendorDetails.fullName}</span>
          </div>
        </div>

        {/* <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
            <span className="text-[#444444]">Store Name</span>
            <span className="text-black">{vendorDetails.storeName}</span>
          </div> */}

        <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
          <span className="text-[#444444]">ID</span>
          <span className="text-black">{vendorDetails._id}</span>
        </div>

        <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
          <span className="text-[#444444]">Email</span>
          <span>{vendorDetails.email}</span>
        </div>

        <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
          <span className="text-[#444444]">Industry</span>
          <span>
            {vendorDetails.industry[0]}, {vendorDetails.industry[1]}
          </span>
        </div>

        <div className="flex items-center justify-between py-4 border-y-[1px] border-[#C5C5C5]">
          <span className="text-[#444444]">Joining Date</span>
          <span>{vendorDetails.createdAt}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3 px-[68px]">
        <Button
          variant="outline"
          className="w-full border-gradient text-primary h-[40px] hover:bg-[#121D42]/10 border-[#121D42]/50 cursor-pointer py-[18px]"
          onClick={() => setIsOpen(false)}
        >
          Yes
        </Button>
        <Button
          className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90 h-[40px] py-[18px]"
          onClick={() => setIsOpen(false)}
        >
          No
        </Button>
      </div>
    </div>
  );
}
