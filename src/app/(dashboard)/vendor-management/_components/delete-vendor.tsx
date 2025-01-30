"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface VendorDetailsProps {
  id: string;
  userName: string;
  email: string;
  storeName: string;
  phone: string;
  joiningDate: string;
  avatarUrl: string;
}

interface DeleteVendorModalProps {
  // isOpen: boolean
  // onClose: () => void
  // onConfirm: () => void
  vendorDetails: VendorDetailsProps;
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

      <div className="px-[68px]">
        <h3 className="font-medium mb-4 text-[14px] text-muted-foreground py-4">
          Vendor Details
        </h3>

        <div className="">
          <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
            <span className="text-muted-foreground font-medium ">
              User Name
            </span>
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={vendorDetails.avatarUrl} />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <span className="text-gradient">{vendorDetails.userName}</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
            <span className="text-muted-foreground">Store Name</span>
            <span className="text-gradient">{vendorDetails.storeName}</span>
          </div>

          <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
            <span className="text-muted-foreground">ID</span>
            <span className="text-gradient">{vendorDetails.id}</span>
          </div>

          <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
            <span className="text-muted-foreground">Email</span>
            <span>{vendorDetails.email}</span>
          </div>

          <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5]">
            <span className="text-muted-foreground">Phone</span>
            <span>{vendorDetails.phone}</span>
          </div>

          <div className="flex items-center justify-between py-4 border-y-[1px] border-[#C5C5C5]">
            <span className="text-muted-foreground">Joining Date</span>
            <span>{vendorDetails.joiningDate}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            className="w-full border-gradient text-gradient  hover:text-blue-500 border-[#121D42] cursor-pointer py-[18px]"
            onClick={() => setIsOpen(false)}
          >
            Yes
          </Button>
          <Button
            className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90 py-[18px]"
            onClick={() => setIsOpen(false)}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
