"use client";
// Packages
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


// Local imports
import { DataTable } from "@/components/ui/data-table";

import { TopvendorColumns } from "./ReadyAprovalColumn";
import { TransactionDataType, transactions } from "@/data/ReadyAproval";

const ReadyAprovalContainer = () => {
 
  return (
    <div>
      <TableContainer columns={TopvendorColumns} data={transactions} />
      
    </div>
  );
};

export default ReadyAprovalContainer;

const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<TransactionDataType>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="Ready for Aproval" />
    </>
  );
};
