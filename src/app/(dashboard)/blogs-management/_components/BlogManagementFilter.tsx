"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import { Table as TanStackTable, Row } from "@tanstack/react-table";
import { blogsDataType } from "@/data/blogsManagementData";
import { useSession } from "next-auth/react";

export default function BlogManagementFilter({ table }: { table: TanStackTable<blogsDataType> }) {
  const queryClient = useQueryClient();


  const session = useSession();
  const token = session.data?.user?.token;
  console.log({ token });

  const { mutate, isPending } = useMutation({
    mutationFn: async (selectedIds: string[]) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-blog`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify({ ids: selectedIds }),
      });
  
      if (!response.ok) throw new Error("Failed to delete blogs");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Blogs deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      toast.error("Failed to delete blogs. Please try again.");
    },
  });
  
  

  const handleBulkDelete = () => {
    if (!table) {
      console.error("Table instance is undefined.");
      toast.error("Error: Table instance not available.");
      return;
    }
  
    console.log("Table instance:", table);  // Log the entire table instance
    const selectedRows = table.getSelectedRowModel()?.rows ?? [];
    console.log("Selected Rows:", selectedRows);
  
    const selectedIds = selectedRows.map((row: Row<blogsDataType>) => row.original._id);
    console.log("Selected IDs:", selectedIds);
  
    if (selectedIds.length === 0) {
      toast.warn("No blogs selected for deletion.");
      return;
    }
  
    mutate(selectedIds);
  };
  
  
  
  

  return (
    <div className="flex items-center bg-white mb-[30px] gap-4 p-4 w-full rounded-[12px]">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Show</span>
        <Select defaultValue="all">
          <SelectTrigger className="py-[9px] px-[10px] bg-primary text-white border-0 [&>svg]:text-white">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger className="py-[9px] px-[10px] bg-primary text-white border-0 [&>svg]:text-white">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="ml-auto">
        <Button
          variant="default"
          className="bg-red-600 text-white"
          onClick={handleBulkDelete}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Bulk Delete"}
        </Button>
      </div>
    </div>
  );
}
