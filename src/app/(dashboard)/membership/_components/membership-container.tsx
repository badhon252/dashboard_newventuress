"use client";

import { DataTable } from "@/components/ui/data-table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Membership, membershipList } from "./data";
import { MembershipColumns } from "./membership-column";

const MembershipContainer = () => {
  return (
    <div>
      <TableContainer columns={MembershipColumns} data={membershipList} />
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
