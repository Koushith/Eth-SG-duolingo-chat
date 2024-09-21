import { ReactNode } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ReclaimModalProps {
  children: ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ReclaimModal({ children, isOpen, onOpenChange }: ReclaimModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {children}
      </DialogContent>
    </Dialog>
  )
}
