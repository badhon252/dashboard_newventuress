"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteStoreModal } from "./StoreDeleteAction";
import { useState } from "react";

const StoreAction = ({ row }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(row);

  const handleLogout = () => {
    setIsOpen(true);
  };

  const storeManagementDetails = {
    id: "#127 - 007Euro",
    userName: " Adrian Jordan",
    email: "alinaulag@gmail.com",
    storeName: "Shaken Not Stirred",
    phone: "+478 5556578",
    joiningDate: "8 Aug,2024",
    avatarUrl: "/assets/img/store_management_user_img.png",
  };
  return (
    <>
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
          <DropdownMenuItem className=" text-left p-[8px] hover:bg-[#E6EEF6] cursor-default focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            Details
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              handleLogout();
            }}
            className=" text-left p-[8px] text-red-600 cursor-default hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <section
          className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50 overflow-auto "
          onClick={() => setIsOpen(false)} // Close modal when clicking outside
        >
          <div
            className="relative w-[343px] md:w-[533px] bg-white rounded-[16px]  border  overflow-auto "
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Background overlay inside modal */}
            <div className="absolute rounded-[16px] opacity-50" />

            {/* Modal content */}
            <DeleteStoreModal
              storeManagementDetails={storeManagementDetails}
              setIsOpen={setIsOpen}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default StoreAction;
