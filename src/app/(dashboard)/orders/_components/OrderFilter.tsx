"use client"

import { useState, useEffect } from "react"
import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector"
import DateRangePicker from "./date-range-picker"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

// Demo lists for the dropdowns
const showList = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Live", value: "live" },
  { id: 3, name: "Expired", value: "expired" },
]

const ChoseStoresList = [
  { id: 1, name: "Chose stores", value: "Chose stores" },
  { id: 2, name: "Sales", value: "sales" },
  { id: 3, name: "Rentals", value: "rentals" },
]


const ChosebyStatusList = [
  { id: 1, name: "Chose by Status", value: "Chose by Status" },
  { id: 2, name: "Pending", value: "Pending" },
  { id: 3, name: "Completed", value: "Completed" },
  { id: 4, name: "Processing", value: "Processing" },
]
const ChosebyPriceList = [
  { id: 1, name: "Chose price", value: "Chose Price" },
  { id: 2, name: "Default", value: "Default" },
  { id: 3, name: "Price (Low>High)", value: "Price (Low>High)" },
  { id: 4, name: "Price (High>Low)", value: "Price (High>Low)" },
]

function OrderFilter() {
  const [show, setShow] = useState<string>("all")
  const [stores, setStores] = useState<string>("Chose stores")
  const [chosebyStatus, setChosebyStatus] = useState<string>("Chose by Status")
  const [chosebyPrice, setChosebyPrice] = useState<string>("Chose Price")
  const [date, setDate] = useState<DateRange | undefined>()

  // Log date changes
  useEffect(() => {
    if (date) {
      console.log("Date Range Changed:", {
        from: date.from ? format(date.from, "yyyy-MM-dd") : undefined,
        to: date.to ? format(date.to, "yyyy-MM-dd") : undefined,
      })
    }
  }, [date])

  const formatDateRange = (range: DateRange | undefined) => {
    if (range?.from) {
      if (range.to) {
        return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
      }
      return format(range.from, "LLL dd, y")
    }
    return "Pick a date range"
  }

  return (
    <div className="h-[68px] mt-[30px] py-[8px] px-[16px] bg-white w-full flex items-center justify-between rounded-[12px]">
      <div className="flex gap-x-4 2xl:gap-x-[28px]">
        <div className="h-full flex items-center gap-x-[9px] w-fit">
          <span className="text-[16px] font-medium leading-[19.2px] text-[#444444]">Show</span>
          <PacificDropdownSelector list={showList} selectedValue={show} onValueChange={setShow}/>
        </div>
        <div className="h-full flex items-center gap-2">
          <span className="text-[16px] font-medium leading-[19.2px] text-[#444444]">Entries</span>
          <PacificDropdownSelector list={ChoseStoresList} selectedValue={stores} onValueChange={setStores} />
        </div>
        <div className="h-full flex items-center gap-2">
          <DateRangePicker
            date={date}
            onDateChange={(newDate) => {
              setDate(newDate)
              console.log("Date Range Selected:", {
                from: newDate?.from ? format(newDate.from, "yyyy-MM-dd") : undefined,
                to: newDate?.to ? format(newDate.to, "yyyy-MM-dd") : undefined,
              })
            }}
            trigger={
              <Button variant="outline" className="w-auto justify-start text-left font-normal bg-primary text-[#F5F5F5] hover:text-[#F5F5F5]">
                {formatDateRange(date)}
                <ChevronDown />
              </Button>
            }
          />
        </div>
        <div className="h-full flex items-center gap-2">
          <PacificDropdownSelector
            list={ChosebyStatusList}
            selectedValue={chosebyStatus}
            onValueChange={setChosebyStatus}
          />
        </div>
        <div className="h-full flex items-center gap-2">
          <PacificDropdownSelector
            list={ChosebyPriceList}
            selectedValue={chosebyPrice}
            onValueChange={setChosebyPrice}
          />
        </div>
      </div>
      <div>
        <button className="px-[20px] py-[9px] bg-primary text-[#F5F5F5] rounded-lg">Bulk Delete</button>
      </div>
    </div>
  )
}

export default OrderFilter

