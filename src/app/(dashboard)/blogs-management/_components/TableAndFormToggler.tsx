"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import BlogManagementHeader from "./BlogManagementHeader";
import BlogManagementFilter from "./BlogManagementFilter";
import AddBlogForm from "./AddBlogForm";
import BlogManagementContainer from "./BlogManagementContainer";
import { blogsDataResponse } from "@/data/blogsManagementData";
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';



const TableAndFormToggler = () => {
    const [addBlogForm, setAddBlogForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    const { data, isLoading, isError, error } = useQuery<blogsDataResponse>({
        queryKey: ["blogs", currentPage],
        queryFn: () =>
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-blog?page=${currentPage}&limit=${5}`)
                .then((res) => res.json()),
    });



    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Update the current page when pagination changes
    };

    const table = useReactTable({
        data: data?.data ?? [],
        columns: [], // define your columns here
        getCoreRowModel: getCoreRowModel(),
      });


    return (
        <div>
            <BlogManagementHeader addBlogForm={addBlogForm} setAddBlogForm={setAddBlogForm} meta={data?.meta ?? []}/>
            <BlogManagementFilter table={table}/>
            {addBlogForm ? (
                <AddBlogForm setAddBlogForm={setAddBlogForm} />
            ) : (
                <BlogManagementContainer
                    blogs={data?.data ?? []}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    setPage={handlePageChange}
                    currentPage={currentPage}
                    totalPages={data?.meta?.totalPages ? data.meta.totalPages : 1}
                />

            )}
        </div>
    );
};

export default TableAndFormToggler;
