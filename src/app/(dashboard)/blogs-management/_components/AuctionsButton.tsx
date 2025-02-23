
"use client"
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import EditBlogForm from "./EditBlogForm";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { useQueryClient } from "@tanstack/react-query";


const AuctionsButton = ({ row }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const queryClient = useQueryClient();

  const handleEdit = () => {
    setSelectedRow(row); // Set the row data when the edit button is clicked
    setIsOpen(true); // Show the modal
  };

  useEffect(() => {
    if (selectedRow) {
      console.log(selectedRow);
    }
  }, [selectedRow]);



  const session = useSession();

  const handleDeleteConfirm = async () => {
    if (!row?.original?._id) {
      console.error("Blog ID is missing");
      return;
    }

    const token = session.data?.user?.token;
    if (!token) {
      console.error("User token is missing");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-blog/${row.original._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Close the modal
        setIsDeleteModalOpen(false);
        // Handle successful deletion (e.g., refresh data)
        queryClient.invalidateQueries({ queryKey: ["blogs"] }); // Refresh the blog list (or any relevant data)
        console.log("Blog deleted successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };


  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }



  return (
    <div>
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
          <DropdownMenuItem

            onClick={handleEdit}

            className="p-[8px] hover:bg-[#E6EEF6] cursor-pointer  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Edit


          </DropdownMenuItem>


          <DropdownMenuItem
            className="p-[8px] text-red-600 cursor-pointer hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleDeleteClick}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (

        <section
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{ boxShadow: "0px 0px 22px 8px #C1C9E4" }}
            className="relative w-[343px] md:w-[1250px] rounded-[16px] border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="absolute inset-0 z-0 bg-[url('/assets/img/modalbg.png')] bg-no-repeat bg-cover rounded-[16px] opacity-50" />


            <div className="relative z-10">
              <EditBlogForm setIsOpen={setIsOpen} blogData={selectedRow} />
            </div>
          </div>
        </section>

      )
      }
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

    </div >
  );
};

export default AuctionsButton;
