import { ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ReclaimModalProps {
  buttonText: string
  children: ReactNode
}

export function ReclaimModal({ buttonText, children }: ReclaimModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {children}
      </DialogContent>
    </Dialog>
  )
}
