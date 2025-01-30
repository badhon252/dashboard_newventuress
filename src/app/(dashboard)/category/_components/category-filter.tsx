"use client";
import { Button } from "@/components/ui/button";
import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector";
import { useState } from "react";

// Demo lists for the dropdowns
const showList = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Live", value: "live" },
  { id: 3, name: "Expired", value: "expired" },
];

const CategoryFilter = () => {
  const [show, setShow] = useState<string>("all"); // Default to "all"

  return (
    <div className="h-[60px] p-[8px] bg-white w-full flex justify-between gap-x-[12px]">
      {/* Dropdown for "Show" */}
      <div className="h-full flex items-center gap-x-[9px] w-fit">
        <span className="text-[16px] font-medium leading-[19.2px] text-[#444444]">
          Show
        </span>
        <PacificDropdownSelector
          list={showList}
          selectedValue={show}
          onValueChange={setShow}
        />
      </div>
      {/* Dropdown for "Categories" */}

      <Button>Bulk Delete</Button>
    </div>
  );
};

export default CategoryFilter;

// Generic Dropdown Component
