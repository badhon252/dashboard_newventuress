"use client";

import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import { DataTable } from "@/components/ui/data-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { User, VendorManagementResponse } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { CustomerListColumn } from "./CustomerListColumn";
import { useDebounce } from "@/hooks/useDebounce";

const CustomerContainer = ({ searchQuery }:any) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const delay = 500;

  const debounceValue = useDebounce(searchQuery, delay);

  const { isLoading, data, isError, error } =
    useQuery<VendorManagementResponse>({
      queryKey: ["vendor-management", currentPage, debounceValue],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/all?page=${currentPage}&limit=6&email=${debounceValue}`
        ).then((res) => res.json()),
    });

  let content;

  if (isLoading) {
    content = (
      <div className="flex items-center gap-x-3 justify-center h-[400px]">
        <Loader2 className="animate-spin" /> <span>Loading Data...</span>
      </div>
    );
  } else if (isError) {
    content = (
      <ErrorContainer
        message={error?.message ?? "Failed to load verdor data"}
      />
    );
  } else if (data) {
    content = (
      <section className="w-full">
        <div className="h-auto w-full rounded-[24px] bg-white shadow-[0px_0px_22px_8px_#C1C9E4]">
          <TableContainer
            data={data?.data ?? []}
            columns={CustomerListColumn}
          />
        </div>
        <div className="my-[40px] flex w-full justify-between">
          <p className="text-[16px] font-normal leading-[19.2px] text-[#444444]">
            Showing 1 to 25 in first entries
          </p>
          <div>
            {data?.meta && data?.meta?.totalPages > 1 && (
              <PacificPagination
                currentPage={currentPage}
                totalPages={data?.meta?.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  return content;
};

export default CustomerContainer;

const TableContainer = ({
  data,
  columns,
}: {
  data: User[];
  columns: ColumnDef<User>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="Vendor Lists" />
    </>
  );
};
