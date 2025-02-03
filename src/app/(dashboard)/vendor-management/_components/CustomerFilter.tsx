"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector";

// Demo lists for the dropdowns
const showList = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Live", value: "live" },
  { id: 3, name: "Expired", value: "expired" },
];




function CustomerFilter() {
  const [show, setShow] = useState<string>("all"); // Default to "all"
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  // This is a mock list of suggestions. In a real application, you'd fetch these from your backend or generate them based on your data.
  const suggestions = ["Store 1", "Store 2", "Store 3", "Product A", "Product B", "Category X", "Category Y"]

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="my-[30px] flex h-[60px] w-full items-center justify-between rounded-[12px] bg-white p-[8px]">
      {/* Dropdown for "Show" */}
      <div className="flex gap-x-[28px]">
        <div className="flex h-full w-fit items-center gap-x-[9px]">
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
        <div className="flex h-full items-center gap-2">
          <span className="text-sm">Entries</span>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Popover open={showSuggestions && filteredSuggestions.length > 0} onOpenChange={setShowSuggestions}>
                <PopoverTrigger asChild>
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-[200px]"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setShowSuggestions(true)
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <ul className="max-h-[200px] overflow-auto">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSearchQuery(suggestion)
                          setShowSuggestions(false)
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="rounded-lg bg-primary px-[20px] py-[9px] text-[#F5F5F5]">
          Bulk Delete
        </button>
      </div>
    </div>
  );
}

export default CustomerFilter;
