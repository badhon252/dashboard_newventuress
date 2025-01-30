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
import { useState } from "react";
import { DeleteVendorModal } from "./delete-vendor";
// import EditeCupon from "./EditeCupon";

const VendorAction = ({ row }: any) => {
  //   const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isOpen, setIsOpen] = useState(false);
  console.log(row);

  const handleLogout = () => {
    setIsOpen(true); // Show the modal when "Log out" is clicked
  };

  const vendorDetails = {
    id: "#127 - 007Euro",
    userName: "Aliana Gulag",
    email: "alianulag@gmail.com",
    storeName: "The Ice land Guy Smokes",
    phone: "+478 5556578",
    joiningDate: "8 Aug,2024",
    avatarUrl:
      "https://images.pexels.com/photos/395087/pexels-photo-395087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
          {row.original.status === "Pending" && (
            <DropdownMenuItem className=" p-[8px] hover:bg-[#E6EEF6] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gradient text-left cursor-pointer">
              Approved
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className=" text-left p-[8px] hover:bg-[#E6EEF6] cursor-pointer  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              handleLogout();
            }}
            className=" text-left p-[8px] text-red-600 cursor-pointer hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
            <DeleteVendorModal
              vendorDetails={vendorDetails}
              setIsOpen={setIsOpen}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default VendorAction;
