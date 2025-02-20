"use client"

import * as React from "react"
import { addMonths, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange | undefined
  onDateChange?: (date: DateRange | undefined) => void
  trigger: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

export default function DateRangePicker({
  className,
  date,
  onDateChange,
  trigger,
  onOpenChange,
}: DateRangePickerProps) {
  const [leftMonth, setLeftMonth] = React.useState<Date>(new Date())
  const [rightMonth, setRightMonth] = React.useState<Date>(addMonths(new Date(), 1))

  const handleDateSelect = (newDate: DateRange | undefined) => {
    console.log("Selected Date Range:", {
      from: newDate?.from ? format(newDate.from, "yyyy-MM-dd") : undefined,
      to: newDate?.to ? format(newDate.to, "yyyy-MM-dd") : undefined,
    })
    onDateChange?.(newDate)
  }

  return (
    <div className={cn("grid gap-2 ", className)}>
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="w-[666px] bg-[#E6EEF6] p-[12px]" align="start">
          <div className="flex items-center justify-between text-[#444444] mb-3">
            <h4 className="text-sm font-normal">Please Select A date Range</h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-4 py-1 text-gradient hover:bg-white/20 border border-[#20357aa1]"
              onClick={() => onOpenChange?.(false)}
            >
              Close
            </Button>
          </div>
          <div className="flex justify-between">
            {/* Left Calendar */}
            <div className="relative w-[314px] border">
              <div className="text-white">
                <div className="font-medium mt-1 bg-primary p-2 text-center text-[14px]">CALENDER</div>
                <div className="bg-primary p-2">
                    <div className="text-sm opacity-80">2025</div>
                    <div className="font-medium">Wed, Jan 6</div>
                </div>
                
              </div>
              <Calendar
                mode="range"
                selected={date}
                onSelect={handleDateSelect}
                month={leftMonth}
                onMonthChange={setLeftMonth}
                className="p-3"
                showOutsideDays={false}
              />
            </div>

            {/* Right Calendar */}
            <div className="relative border w-[314px] ">
              <div className="text-white">
                <div className="font-medium mt-1 bg-primary p-2 text-center text-[14px]">CALENDER</div>
                <div className="bg-primary p-2">
                    <div className="text-sm opacity-80">2025</div>
                    <div className="font-medium">Wed, Jan 6</div>
                </div>
                
              </div>
              <Calendar
                mode="range"
                selected={date}
                onSelect={handleDateSelect}
                month={rightMonth}
                onMonthChange={setRightMonth}
                className="p-3"
                showOutsideDays={false}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

