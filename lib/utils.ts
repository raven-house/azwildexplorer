import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenTxnHash(txnHash: string): string {
  const start = txnHash.substring(0, 6)
  const end = txnHash.substring(txnHash.length - 4)

  return `${start}…${end}`
}
