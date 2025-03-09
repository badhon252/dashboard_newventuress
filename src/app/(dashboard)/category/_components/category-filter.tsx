"use client";
import { Button } from "@/components/ui/button";
import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector";

// Demo lists for the dropdowns
const showList = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "CBD/HEMP", value: "cbd/hemp" },
  { id: 3, name: "Recreational", value: "recreational" },
];

const CategoryFilter = ({show, setShow}:any) => {

  return (
    <div className="h-[60px] p-[8px] bg-white w-full flex justify-between items-center rounded-lg">
    <div className="flex gap-x-[12px]">
      {/* Dropdown for "Show" */}
      <div className="h-full flex items-center gap-x-[9px] w-fit">
        <span className="text-[16px] font-medium leading-[19.2px] text-[#444444] ml-2">
          Show
        </span>
        <PacificDropdownSelector
          list={showList}
          selectedValue={show}
          onValueChange={(value)=>setShow(value)}
        />
      </div> 
    
     
    </div >
    <div className="mr-2">

    <Button className="w-[135px] h-[43px] px-[24px] py-[12px] text-[16px] font-medium leading-[19.2px] ">Bulk Delete</Button>
    </div>
  </div>
  );
};

export default CategoryFilter;

// Generic Dropdown Component
