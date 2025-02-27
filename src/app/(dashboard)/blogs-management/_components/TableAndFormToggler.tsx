"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BlogManagementHeader from "./BlogManagementHeader";
import BlogManagementFilter from "./BlogManagementFilter";
import BlogManagementContainer from "./BlogManagementContainer";
import { blogsDataResponse, blogsDataType } from "@/data/blogsManagementData";
import AddBlogForm from "./AddBlogForm";

interface Props {
    token: string;
}

const TableAndFormToggler = ({ token }: Props) => {
    const [addBlogForm, setAddBlogForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<blogsDataType[]>([]);
    const queryClient = useQueryClient();


    // ✅ Use token from props, no need for useSession()

    // Fetch Blogs
    const { data, isLoading, isError, error } = useQuery<blogsDataResponse>({
        queryKey: ["blogs", currentPage],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-blog?page=${currentPage}&limit=5`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch blogs");
            return response.json();
        },
        enabled: !!token, // Only run query when token exists
    });


    // Bulk Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (ids: string[]) => {
            console.log("Deleting these IDs:", ids); // Debugging

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-multiple-blogs`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Ensure token is included
                },
                body: JSON.stringify({ ids }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete blogs: ${errorText}`);
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] }); // Refetch data
            setSelectedRows([]); // Clear selection
            if (data?.meta?.totalPages === currentPage && data?.data?.length === 0 && currentPage > 1) {
                // If we deleted the last page's items, go to the previous page
                setCurrentPage(currentPage - 1);
            }
        },
    });


    // Select/Deselect Row
    const handleSelectRow = (row: blogsDataType) => {
        const rowId = row._id || row.id; // Ensure we use the correct ID field

        if (!rowId) {
            console.error("Error: Row ID is null or undefined!", row);
            return;
        }

        setSelectedRows((prev) => {
            const isRowSelected = prev.some((selectedRow) => (selectedRow._id || selectedRow.id) === rowId);

            if (isRowSelected) {
                return prev.filter((selectedRow) => (selectedRow._id || selectedRow.id) !== rowId);
            } else {
                return [...prev, row];
            }
        });
    };



    // Handle Bulk Delete
    const handleBulkDelete = () => {
        if (selectedRows.length === 0) {
            console.warn("No rows selected for deletion");
            return;
        }

        const idsToDelete = selectedRows.map((row) => row._id || row.id).filter(Boolean); // Remove null values

        if (idsToDelete.length === 0) {
            console.error("Error: No valid IDs found for deletion");
            return;
        }

        console.log("Sending delete request with IDs:", idsToDelete);

        deleteMutation.mutate(idsToDelete);
    };


    const handlePageChange = (page: number) => setCurrentPage(page);

    return (
        <div>
            <BlogManagementHeader addBlogForm={addBlogForm} setAddBlogForm={setAddBlogForm} meta={data?.meta ?? []} />
            <BlogManagementFilter selectedRows={selectedRows} handleBulkDelete={handleBulkDelete} />
            {addBlogForm ? (
                <AddBlogForm setAddBlogForm={setAddBlogForm} token={token}/>
            ) : (
            <BlogManagementContainer
                blogs={data?.data ?? []}
                isLoading={isLoading}
                isError={isError}
                error={error}
                setPage={handlePageChange}
                currentPage={currentPage}
                totalPages={data?.meta?.totalPages ?? 1}
                selectedRows={selectedRows}
                handleSelectRow={handleSelectRow}
            />
        )}
        </div>
    );
};

export default TableAndFormToggler;
