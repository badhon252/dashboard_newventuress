"use client"

import PacificDropdownSelector from "@/components/ui/PacificDropdownSelector"
import { useState } from "react"

// Demo lists for the dropdowns
const showList = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Live", value: "live" },
  { id: 3, name: "Expired", value: "expired" },
]

function CustomerFilter() {
  const [show, setShow] = useState<string>("all")

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    // Get the table element
    const tableToPrint = document.querySelector(".customer-table")
    if (!tableToPrint) return

    // Create the print content
    const printContent = `
      <html>
        <head>
          <title>Customer List</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; }
            .print-table { width: 100%; border-collapse: collapse; }
            .print-table th, .print-table td { 
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .print-table th { 
              background-color: #f9fafb;
              font-weight: 600;
            }
            .customer-profile {
              display: flex;
              align-items: center;
              gap: 1rem;
            }
            .customer-info {
              display: flex;
              flex-direction: column;
            }
            @media print {
              .print-table th { background-color: #f9fafb !important; }
            }
          </style>
        </head>
        <body>
          ${tableToPrint.outerHTML}
        </body>
      </html>
    `

    // Write the content to the new window
    printWindow.document.write(printContent)
    printWindow.document.close()

    // Wait for images to load before printing
    printWindow.onload = () => {
      printWindow.print()
      printWindow.onafterprint = () => {
        printWindow.close()
      }
    }
  }

  return (
    <div className="my-[30px] flex h-[60px] w-full items-center justify-between rounded-[12px] bg-white p-[8px]">
      <div className="flex gap-x-[28px]">
        <div className="flex h-full w-fit items-center gap-x-[9px]">
          <span className="text-[16px] font-medium leading-[19.2px] text-[#444444]">Show</span>
          <PacificDropdownSelector list={showList} selectedValue={show} onValueChange={setShow} />
        </div>
        <button onClick={handlePrint} className="bg-primary px-[14px] rounded-[8px] text-sm text-normal text-[#fff]">
          Print
        </button>
      </div>
      <div>
        <button className="rounded-lg bg-primary px-[20px] py-[9px] text-[#F5F5F5]">Bulk Delete</button>
      </div>
    </div>
  )
}

export default CustomerFilter

