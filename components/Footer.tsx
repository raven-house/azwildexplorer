'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const SATYAM_GITHUB_URL = 'https://github.com/satyambnsal'
const AZTEC_SCAN_URL = 'https://aztecscan.xyz'
const AZTEC_EXPLORER_URL = 'https://www.aztecexplorer.xyz'

export const Footer = () => {
  return (
    <footer className="pt-6 pb-10 px-4 md:px-6 lg:px-8 text-sm border-t border-t-primary/10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Real Block Explorers:</span>
          <Link
            href={AZTEC_SCAN_URL}
            target="_blank"
            className="text-primary hover:underline inline-flex items-center"
          >
            AztecScan
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
          <Link
            href={AZTEC_EXPLORER_URL}
            target="_blank"
            className="text-primary hover:underline inline-flex items-center"
          >
            Aztec Explorer
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>

        <div className="flex items-center gap-1">
          Built by{' '}
          <Link
            href={SATYAM_GITHUB_URL}
            target="_blank"
            className="text-primary hover:underline inline-flex items-center"
          >
            Satyam Bansal
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
