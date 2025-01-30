"use client";
// Packages
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

// Local imports
import { DataTable } from "@/components/ui/data-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { Membership, membershipList } from "./data";
import { MembershipColumns } from "./membership-column";

const MembershipContainer = () => {
  const [currentPage, setCurrentpage] = useState(1);
  return (
    <div>
      <TableContainer columns={MembershipColumns} data={membershipList} />
      <div className="w-full flex justify-between py-[40px]">
        <p className="text-[#444444] font-normal text-[16px] leading-[19.2px] ">
          Showing 1 to 25 in first entries
        </p>

        <div>
          <PacificPagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={(page) => setCurrentpage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default MembershipContainer;

const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<Membership>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="Membership List" />
    </>
  );
};
