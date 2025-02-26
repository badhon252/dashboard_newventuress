"use client";

import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { BlogManagementColumn } from "./BlogManagementColumn";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import PacificPagination from "@/components/ui/PacificPagination";
import { DataTable } from "@/components/ui/data-table";
import { blogsDataType } from "@/data/blogsManagementData";

const BlogManagementContainer = ({
  blogs,
  isLoading,
  isError,
  error,
  setPage,
  currentPage,
  totalPages,
  selectedRows,
  handleSelectRow,
}: {
  blogs: blogsDataType[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  setPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
  selectedRows: blogsDataType[];
  handleSelectRow: (row: blogsDataType) => void;
}) => {
  if (selectedRows.length > 0) {
    console.log("Rows selected:", selectedRows);
    // or display a message to the user
  }
  
  let content;

  if (isLoading) {
    content = (
      <div className="w-full p-4">
        <TableSkeletonWrapper count={5} width="100%" height="120px" className="bg-black/10" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="w-full h-[400px]">
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (blogs.length === 0) {
    content = <NotFound message="No data found" />;
  } else {
    content = (
      <div className="w-full">
        <TableContainer data={blogs} columns={BlogManagementColumn(handleSelectRow)} />
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto rounded-[24px] bg-white">
        {content}
      </div>
      <div className="mt-[30px] mb-[208px] w-full flex justify-between">
        <p className="font-normal text-[16px] leading-[19.2px] text-[#444444]">
          Showing page {currentPage} of {totalPages}
        </p>
        <div>
          <PacificPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogManagementContainer;


// TableContainer Component
const TableContainer = ({
  data,
  columns,
}: {
  data: blogsDataType[];
  columns: ColumnDef<blogsDataType>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} columns={columns} title="Blogs List" />;
};
