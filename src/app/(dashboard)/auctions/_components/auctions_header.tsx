"use client"

import { Button } from "@/components/ui/button"
import { Box } from "lucide-react"
import { useState } from "react"
import { BidsModal } from "./bids-modal"
import type React from "react" // Added import for React

interface AuctionsHeaderProps {
  showAddAuction: boolean
  setShowAddAuction: React.Dispatch<React.SetStateAction<boolean>>
}

const AuctionsHeader: React.FC<AuctionsHeaderProps> = ({ showAddAuction, setShowAddAuction }) => {
  const [showBidsModal, setShowBidsModal] = useState(false)

  return (
    <>
      <div className="h-[80px] w-full bg-white p-[8px] rounded-[12px] flex items-center justify-between">
        <div className="px-[10px] text-[12px] leading-[14.4px]">
          <span className="font-medium">All</span> (20) |<span className="text-gradient"> Published (30) | </span>
          <span className="text-gradient"> Draft (30) | </span>
          <span className="text-gradient"> Pending (30) | </span>
          <span className="text-gradient"> Archived (30) </span>
        </div>
        <div className="flex gap-4">
          <div>
            <Button onClick={() => setShowBidsModal(true)}>
              Bids Settings <Box className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div>
            <Button onClick={() => setShowAddAuction((prev) => !prev)}>
              {showAddAuction ? "Auction" : "Add New"} <Box className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <BidsModal isOpen={showBidsModal} onClose={() => setShowBidsModal(false)} />
    </>
  )
}

export default AuctionsHeader

