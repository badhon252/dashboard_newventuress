"use client";
import { useState } from "react";
import PacificPagination from "@/components/ui/PacificPagination";
import { CategoryCard } from "./categoryCard";

const initialCategories = [
  { id: 1, title: "Flowers", imageUrl: "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 2, title: "Wax", imageUrl: "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, title: "Hats", imageUrl: "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 4, title: "Glasswear", imageUrl: "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 5, title: "Apparel", imageUrl: "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 6, title: "Pipes", imageUrl: "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 7, title: "Bongs", imageUrl: "https://images.pexels.com/photos/8326748/pexels-photo-8326748.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 8, title: "Trays", imageUrl: "https://images.pexels.com/photos/3536257/pexels-photo-3536257.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

export default function CategoryList() {
  const [categories, setCategories] = useState(initialCategories);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to delete a category
  const handleDelete = (id: number) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
  };

  return (
    <div>
      <div className="min-h-screen max-w-[1506px] p-4 md:p-6 bg-white rounded-[12px]">
        <div className="mx-auto">
          <div className="mb-6 rounded-t-3xl bg-primary p-4">
            <h1 className="text-[28px] font-semibold text-white">Category List</h1>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                imageUrl={category.imageUrl}
                onDelete={() => handleDelete(category.id)} // Call handleDelete
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[40px] flex justify-between">
        <div className="text-[#444444] font-normal text-[16px]">
          Showing 1 to {categories.length} entries
        </div>
        <div className="w-[400px]">
          <PacificPagination
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            totalPages={10}
          />
        </div>
      </div>
    </div>
  );
}
