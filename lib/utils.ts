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

export const formatTime = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds}s ago`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ago`
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600)
    return `${hours}h ago`
  } else {
    const days = Math.floor(seconds / 86400)
    return `${days}d ago`
  }
}

export const parseTimeToSeconds = (timeString: string) => {
  const match = timeString.match(/(\d+)([smhd])/)
  if (!match) return 0

  const value = parseInt(match[1])
  const unit = match[2]

  switch (unit) {
    case 's':
      return value
    case 'm':
      return value * 60
    case 'h':
      return value * 3600
    case 'd':
      return value * 86400
    default:
      return 0
  }
}
