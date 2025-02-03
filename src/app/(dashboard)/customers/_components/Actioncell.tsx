import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { DemoTableItemsType } from "@/data/CustomerListData";
interface ActionCellProps {
  row: { original: DemoTableItemsType };
}
const ActionCell: React.FC<ActionCellProps> = ({ row }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (rowData: any) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting row:", selectedRow);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen &&
        <DeleteModal>
          <div className="px-[24px] ">
            <h2 className="text-center text-[32px] text-gradient font-semibold leading-[38.4px] mt-[26px]">
              Are You Sure To Delete this Store?
            </h2>
            <h2 className="text-center text-[25px] text-gradient font-semibold leading-[38.4px] mt-[26px]">
              Customer Details
            </h2>
            <div className="mt-[22px]">
              <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5] px-3">
                <p className="text-base text-[#444444] font-normal leading-[19.2px]">
                  User Name
                </p>
                <div className="flex items-center gap-1">
                  <Image
                    src={row.original.image}
                    height={26}
                    width={26}
                    alt="img"
                    className="h-[26px] w-[26px] rounded-full object-cover"
                  />
                  <p className="text-base text-gradient font-medium leading-[19.2px]">
                    {row.original.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5] px-3">
                <p className="text-base text-[#444444] font-normal leading-[19.2px]">
                  Email
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-base text-[#444444] font-medium leading-[19.2px]">
                    {row.original.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-t-[1px] border-[#C5C5C5] px-3">
                <p className="text-base text-[#444444] font-normal leading-[19.2px]">
                  Phone
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-base text-[#444444] font-medium leading-[19.2px]">
                    {row.original.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-t-[1px] border-b-[1px] border-[#C5C5C5] px-3">
                <p className="text-base text-[#444444] font-normal leading-[19.2px]">
                  Joining Date
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-base text-[#444444] font-medium leading-[19.2px]">
                    {row.original.name}
                  </p>
                </div>
              </div>

              {/* Additional modal content */}
              <div className="mt-[30px]">
                <button
                  onClick={handleConfirmDelete}
                  className="w-full text-base text-gradient font-semibold border-[1px] border-[#0057A8] py-4"
                >
                  Yes
                </button>
              </div>
              <div>
                <button
                  onClick={handleCloseModal}
                  className="w-full text-base text-[#FFFFFF] font-semibold bg-primary py-4 mt-4"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </DeleteModal>}

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
          className="h-auto w-[110px] rounded-lg bg-white shadow-[4px_4px_8px_0px_#0000000D,-4px_-4px_8px_0px_#0000000D]"
        >
          <DropdownMenuItem
            className="cursor-pointer rounded-b-[8px] p-[8px] text-red-600 hover:bg-[#E6EEF6] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => handleDeleteClick(row.original)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionCell;
