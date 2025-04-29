import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertCircle, Lock, Eye, Info } from 'lucide-react'

export const ReadDisclaimerModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold bg-primary hover:bg-primary/90">
          <AlertCircle className="w-4 h-4 mr-2" />
          READ DISCLAIMER
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b border-b-primary/40 pb-4">
          <DialogTitle className="text-xl flex items-center text-primary">
            <Lock className="w-5 h-5 mr-2" />
            PRIVACY DISCLAIMER
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-sm">
              This is an <strong>Aztec blockchain explorer</strong> that displays real transactions
              on the Aztec network. The transactions, blocks, and data shown here reflect actual
              network activity.
            </p>
          </div>

          <h3 className="font-bold text-sm flex items-center">
            <Info className="w-4 h-4 mr-2 text-primary" />
            About Aztec Network
          </h3>
          <p className="text-sm pl-6">
            Aztec is a privacy-focused Layer 2 solution that uses zero-knowledge proofs to enable
            private transactions on Ethereum. Due to Aztec&apos;s cryptographic privacy features,
            transaction details are protected, which is why our &quot;Reveal&quot; buttons may not
            display complete information.
          </p>

          <h3 className="font-bold text-sm flex items-center">
            <Eye className="w-4 h-4 mr-2 text-primary" />
            Purpose of This Explorer
          </h3>
          <ul className="text-sm space-y-2 pl-6">
            <li className="flex items-start">
              <span className="w-4 h-4 mr-2 mt-1 text-xs bg-primary text-white rounded-full flex items-center justify-center">
                1
              </span>
              <span>Understand the concept of private transactions</span>
            </li>
            <li className="flex items-start">
              <span className="w-4 h-4 mr-2 mt-1 text-xs bg-primary text-white rounded-full flex items-center justify-center">
                2
              </span>
              <span>Understand how zero-knowledge technology works in practice</span>
            </li>
            <li className="flex items-start">
              <span className="w-4 h-4 mr-2 mt-1 text-xs bg-primary text-white rounded-full flex items-center justify-center">
                3
              </span>
              <span>
                Appreciate why transaction details aren&apos;t publicly visible in privacy-focused
                networks
              </span>
            </li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg text-sm">
            <p>
              New transactions appear as they occur on the network. Due to the privacy-preserving
              nature of Aztec, transaction details remain confidential and protected by
              cryptography. This explorer provides a window into network activity while respecting
              the fundamental privacy guarantees that make Aztec unique.
            </p>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button className="w-full">I Understand</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReadDisclaimerModal
