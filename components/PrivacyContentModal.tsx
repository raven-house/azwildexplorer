import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Shield, BookOpen, FileText } from 'lucide-react'

export type PrivacyContentType = 'gdpr' | 'constitutional' | 'foi'

type PrivacyContentProps = {
  isOpen: boolean
  onClose: () => void
  contentType: PrivacyContentType
}

const PrivacyContentModal: React.FC<PrivacyContentProps> = ({ isOpen, onClose, contentType }) => {
  const contentMap = {
    gdpr: {
      title: 'General Data Protection Regulation (GDPR)',
      icon: <Shield className="w-5 h-5 mr-2 text-primary" />,
      content: (
        <div className="space-y-4">
          <p>
            The General Data Protection Regulation (GDPR) is a regulation in EU law on data
            protection and privacy for all individuals within the European Union.
          </p>
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Key Principles:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Lawfulness, fairness and transparency</li>
              <li>Purpose limitation</li>
              <li>Data minimization</li>
              <li>Accuracy</li>
              <li>Storage limitation</li>
              <li>Integrity and confidentiality</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600">
            This is simplified content for demonstration purposes.
          </p>
        </div>
      ),
    },
    constitutional: {
      title: 'Constitutional Right to Privacy',
      icon: <BookOpen className="w-5 h-5 mr-2 text-primary" />,
      content: (
        <div className="space-y-4">
          <p>
            Article 8 of the European Convention on Human Rights provides a right to respect for
            one&apos;s private and family life, home and correspondence.
          </p>
          <blockquote className="p-4 my-4 border-l-4 border-primary bg-primary/10">
            <p>
              Everyone has the right to respect for his private and family life, his home and his
              correspondence.
            </p>
          </blockquote>
          <p className="text-sm text-gray-600">
            This is simplified content for demonstration purposes.
          </p>
        </div>
      ),
    },
    foi: {
      title: 'Freedom of Information Act',
      icon: <FileText className="w-5 h-5 mr-2 text-primary" />,
      content: (
        <div className="space-y-4">
          <p>
            The Freedom of Information Act (FOIA) is a federal law that allows for the full or
            partial disclosure of previously unreleased information and documents controlled by the
            United States government.
          </p>
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-bold mb-2">FOIA Principles:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Government transparency</li>
              <li>Public right to information</li>
              <li>Limited exemptions</li>
              <li>Judicial review</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600">
            This is simplified content for demonstration purposes.
          </p>
        </div>
      ),
    },
  }

  const selectedContent = contentMap[contentType]

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="w-full sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-primary">
            {selectedContent.icon}
            {selectedContent.title}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">{selectedContent.content}</div>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full"
          >
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PrivacyContentModal
