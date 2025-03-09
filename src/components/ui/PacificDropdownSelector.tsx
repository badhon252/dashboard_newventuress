import { PacificDropdownType } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const PacificDropdownSelector = ({
  list,
  selectedValue,
  onValueChange,
  placeholderText,
}: {
  list: PacificDropdownType[]; // List of items
  selectedValue: string; // Currently selected value
  onValueChange: (value: string) => void; // Function to handle value change
  placeholderText?: string;
}) => {
  return (
    <Select
      value={typeof selectedValue === "string" ? selectedValue : ""}
      onValueChange={(val) => onValueChange(val)} // Update the state on selection
    >
      <SelectTrigger className="bg-primary  rounded-[8px] text-[#fff]">
        <SelectValue placeholder={placeholderText ?? selectedValue} />
      </SelectTrigger>
      <SelectContent className="w-fit *:p-0">
        <SelectGroup className="">
          {list.map((item) => (
            <SelectItem
              key={item.id}
              value={typeof item.value === "string" ? item.value : ""}
              className="text-[#444444] font-normal text-[16px] hover:!bg-[#E6EEF6]"
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PacificDropdownSelector;
