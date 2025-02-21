"use client";
import { orderDataResponse, orderDataType } from "./data";
import { OrderColumn } from "./OrderColumn";

function VendorOrderContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deletedid, setDeletedid] = useState('');
  const [selectedRow, setSelectedRow] = useState<orderDataType | null>(null);
  const session = useSession();
  const token = session.data?.user?.token;

  const { data, isLoading, isError } = useQuery<orderDataResponse>({
    queryKey: ["order"],
    queryFn: async (): Promise<orderDataResponse> =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json() as Promise<orderDataResponse>),
    enabled: !!token,
    
  });
  // console.log(data, "data");




  const queryClient = useQueryClient();
 
  const { mutate } = useMutation({
    mutationKey: ["deleteOrder"],
    mutationFn: async (orderId: string): Promise<void> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete order");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });


  const deleteOrder = (orderId: string) => {
    setDeletedid(orderId);
    setIsDeleteModalOpen(true);
  };
  const finalDelete = () => { 
    mutate(deletedid);
    setIsDeleteModalOpen(false);
  }


 
  
  

  let content;
  if (isLoading) {
    content = (
      <div className="w-full h-[400px] flex justify-center items-center flex-col">
        <Loader2 className="animate-spin opacity-80" />
        <p>Loading your data...</p>
      </div>
    );
  } else if (isError) {
    content = <p>Error:</p>;
  } else {
    content = (
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto  rounded-[24px] bg-white">
        <TableContainer
          data={data?.data ?? []}
          columns={OrderColumn({ setIsOpen, setSelectedRow, deleteOrder }) as ColumnDef<orderDataType>[]}
        />
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto rounded-[24px] bg-white">
        {content}
      </div>
      <div className="my-[40px] w-full flex justify-between">
        <p className="font-normal text-[16px] leading-[19.2px] text-[#444444]">
          Showing 1 to 25 in first entries
        </p>
        <div>
          <PacificPagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/* Render the modal */}
      {isOpen && (
        <OrderDetials
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          rowData={selectedRow}
        />
      )}
      {isDeleteModalOpen && (
        <Modal>
          <h2 className=" text-xl text-[#444444] pt-7">Are you absolutely sure?</h2>
          <p className=" text-base text-[#444444] pt-1">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
          <div className="flex justify-end gap-7 mt-4">
            <button
              onClick={finalDelete}
              className="text-base font-semibold  bg-primary px-7 py-1 text-white rounded-lg">Yes</button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="text-base font-semibold border-[1px] border-[#00417E] text-gradient  px-7 py-1  rounded-lg">No</button>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default VendorOrderContainer;


import { DataTable } from "@/components/ui/data-table";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { useState } from "react";
import OrderDetials from "./OrderDetials";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Modal from "@/components/shared/modal/modal";


const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<orderDataType>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mt-[30px]">
      <DataTable table={table} columns={columns} title="Orders" />
    </div>
  );
};
