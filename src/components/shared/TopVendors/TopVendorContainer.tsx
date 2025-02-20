"use client";
// Packages
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


// Local imports
import { DataTable } from "@/components/ui/data-table";



import { SaleData, SaleDataType } from "@/data/Topvendor";
import { TopvendorColumns } from "./TopvendorColum";

const TopVendorContainer = () => {

  return (
    <div>
      <TableContainer columns={TopvendorColumns} data={SaleData} />
      
    </div>
  );
};

export default TopVendorContainer;

const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<SaleDataType>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="Top Vendors" />
    </>
  );
};
