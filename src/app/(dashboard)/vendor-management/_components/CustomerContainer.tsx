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
import { useState } from "react";
import { CustomerListColumn } from "./CustomerListColumn";

const CustomerContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, isError, error } =
    useQuery<VendorManagementResponse>({
      queryKey: ["vendor-management"],
      queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/all`).then(
          (res) => res.json()
        ),
    });

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = (
      <ErrorContainer message={error.message ?? "Failed to load verdor data"} />
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
            <PacificPagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={(page) => setCurrentPage(page)}
            />
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
