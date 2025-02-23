"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { BlogManagementColumn } from "./BlogManagementColumn";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";

const BlogManagementContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery<blogsDataResponse>({
    queryKey: ["blogs", currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-blog?page=${currentPage}&limit=${5}`
      ).then((res) => res.json()),
  });



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
        <ErrorContainer message={error?.message || "Something went Wrong"} />
      </div>
    );
  } else if (data && data.data && data.data.length === 0) {
    content = <NotFound message="No found your data" />;
  } else {
    content = (
      <div className="w-full">
        <TableContainer data={data?.data ?? []} columns={BlogManagementColumn} />
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto  rounded-[24px] bg-white">
        {/* <TableContainer data={blogsManagementData} columns={BlogManagementColumn} /> */}
        {content}
      </div>
      <div className="mt-[30px] mb-[208px] w-full  flex justify-between">
        <p className="font-normal text-[16px] leading-[19.2px] text-[#444444]">
          Showing {currentPage} to {data?.meta?.totalPages} in first entries
        </p>
        <div>
          <PacificPagination
            currentPage={currentPage}
            totalPages={data?.meta?.totalPages ? data.meta.totalPages : 0}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogManagementContainer;
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import PacificPagination from "@/components/ui/PacificPagination";
import { useState } from "react";
import { blogsDataResponse, blogsDataType } from "@/data/blogsManagementData";
import { useQuery } from "@tanstack/react-query";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";





const TableContainer = ({
  data,
  columns,
}: {
  data: any[];
  columns: ColumnDef<blogsDataType>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data, "data");
  return (
    <>
      <DataTable table={table} columns={columns} title="Blogs List" />
    </>
  );
};
