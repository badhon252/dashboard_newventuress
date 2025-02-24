"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md py-10">
        <DialogHeader className="flex flex-col items-center gap-2">
          <DialogTitle className="text-xl text-center text-[#1a237e]">
            Are You Sure To Delete this Blog?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button type="button" variant="default" className="w-full" onClick={onConfirm}>
            Yes
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full  text-white hover:bg-[#1a237e]/90 border border-[#1a237e] text-gradient"
            onClick={onClose}
          >
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

