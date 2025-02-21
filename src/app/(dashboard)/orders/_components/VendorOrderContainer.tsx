"use client";

import { orderDataResponse, orderDataType } from "./data";
import { OrderColumn } from "./OrderColumn";

function VendorOrderContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
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
          Authorization: `Bearer ${token}`, // Set token in headers
        },
      }).then((res) => res.json() as Promise<orderDataResponse>), // Explicit type assertion
    enabled: !!token, // Ensures query runs only if token is available
  });
  console.log(data, "data");

 

  const { mutate } = useMutation({
    mutationFn: async (orderId: string): Promise<void> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete order");
      }
    },
  });

  const deleteOrder = (orderId: string) => {
    mutate(orderId);
  };

  let content;
  if (isLoading) {
    content = (
      <div className="w-full h-[400px] flex justify-center items-center flex-col">
        <Loader2 className="animate-spin opacity-80" />
        <p>Loading your data...</p>
      </div>
    );
  } else if (isError) {
    content = <p>Error: { }</p>;
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
        {/* Call the OrderColumn function here */}
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
    </section>
  )
}

export default VendorOrderContainer;


import { DataTable } from "@/components/ui/data-table";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { useState } from "react";
import OrderDetials from "./OrderDetials";
import { useMutation, useQuery,  } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

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
