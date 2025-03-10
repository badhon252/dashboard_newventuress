import React, { useState } from "react";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import SendNewsLetter from "./SendNewsLetter";
const AuctionsButton = ({ row }: any) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const session = useSession();
  const token = session?.data?.user?.token;
  console.log({token});

  const queryClient = useQueryClient();

  const {mutate : deleteNewsLetter} = useMutation({
    mutationKey: ["delete-news-letter"],
    mutationFn : () => fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/newsletter/${row.original._id}`, {
      method : "DELETE",
      headers : {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res)=>res.json()),

    onSuccess : (data) => {
      if (!data?.status) {
        toast.error(data.message, {
          position: "top-right",
          richColors: true,
        });
        return;
      }
      setIsDeleteModalOpen(false);
      toast.success(data.message, {
        position: "top-right",
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: ["news-letter"] });
    }
  })


  const handleDeleteNewsLetter = () => {
    setIsDeleteModalOpen(true);
  };
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
          className="bg-white h-auto w-[160px] rounded-lg shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]"
        >
          <DropdownMenuItem
            onClick={()=>setIsOpen(true)}
            className="p-[8px] text-green-600 hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer"
          >
            Send News Letter   
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteNewsLetter}
            className="p-[8px] text-red-600 hover:bg-[#E6EEF6] rounded-b-[8px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* delete modal  */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteNewsLetter}
      />

      {/* send news letter modal  */}
      <div>
        <SendNewsLetter open={isOpen} onOpenChange={setIsOpen}/>
      </div>
    </div>
  );
};

export default AuctionsButton;
