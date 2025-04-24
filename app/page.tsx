'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table'
import { formatTime, parseTimeToSeconds, shortenTxnHash } from '@/lib/utils'
import { ArrowRight, Box, Code, RefreshCw } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { MODAL_CASES, PRIVACY_LINKS, RICK_ROLL_LYRICS } from '@/lib/mock-data'
import Image from 'next/image'
import Link from 'next/link'
import { ReadDisclaimerModal } from '@/components/ReadDisclaimerModal'
import PrivacyContentModal, { PrivacyContentType } from '@/components/PrivacyContentModal'

// API endpoints
const API_BASE_URL = 'https://api.testnet.aztecscan.xyz/v1/temporary-api-key'
const BLOCKS_ENDPOINT = `${API_BASE_URL}/l2/blocks`
const LATEST_HEIGHT_ENDPOINT = `${API_BASE_URL}/l2/latest-height`

// Interface for block data from API
interface BlockData {
  hash: string
  height: string
  finalizationStatus: number
  proposedOnL1: {
    l1BlockTimestamp: string
  }
  header: {
    globalVariables: {
      timestamp: number
      blockNumber: number
    }
    contentCommitment: {
      numTxs: number
    }
  }
  body: {
    txEffects: Array<{
      txHash: string
    }>
  }
}

// Interface for transaction from API
interface Transaction {
  hash: string
  birthTimestamp?: number
  txnStatus?: string
  txnType?: string
  age?: string
}

const INITIAL_DASHBOARD_DATA = [
  {
    id: '1',
    heading: 'Blocks',
    value: 0,
    formattedValue: '0',
    increaseRate: 1,
    icon: (
      <Box
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
  {
    id: '2',
    heading: 'Transactions',
    value: 0,
    formattedValue: '0',
    increaseRate: 5,
    icon: (
      <ArrowRight
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
  {
    id: '3',
    heading: 'Contracts',
    value: 0,
    formattedValue: '0',
    increaseRate: 2,
    icon: (
      <Code
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
]

type RevealableTransaction = { hash: string; revealed: boolean }

const generateRandomTxnHash = (): string => {
  let result = '0x'
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz'
  const length = 64

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

const generateRandomHashes = (count: number): RevealableTransaction[] => {
  const hashes = []
  for (let i = 0; i < count; i++) {
    const randomHash = generateRandomTxnHash()
    hashes.push({
      hash: randomHash,
      revealed: false,
    })
  }
  return hashes
}

const getTransactionAge = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000)
  const secondsAgo = now - timestamp
  // Handle negative values (in case server time is ahead of local time)
  return formatTime(secondsAgo > 0 ? secondsAgo : 1)
}

const getRandomTxnType = () => {
  const types = ['INVOKE_FUNCTION', 'DEPLOY', 'TRANSFER', 'APPROVE', 'SWAP']
  return types[Math.floor(Math.random() * types.length)]
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [dashboardData, setDashboardData] = useState(INITIAL_DASHBOARD_DATA)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [counter, setCounter] = useState(0)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [modalCases, setModalCases] = useState<Array<any>>([])
  const [transactionHashes, setTransactionHashes] = useState<RevealableTransaction[]>([])

  const [isPrivacyContentModalOpen, setIsPrivacyContentModalOpen] = useState(false)
  const [privacyContentType, setPrivacyContentType] = useState<PrivacyContentType>('gdpr')

  // Function to fetch latest block height
  const fetchLatestBlockHeight = async () => {
    try {
      const response = await fetch(LATEST_HEIGHT_ENDPOINT)
      if (!response.ok) {
        throw new Error(`Failed to fetch latest block height: ${response.status}`)
      }
      // The API returns just the height as a string
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching latest block height:', error)
      setError('Failed to fetch latest block height. Using fallback data.')
      return null
    }
  }

  // Function to fetch blocks from API
  const fetchBlocks = async () => {
    try {
      setLoading(true)
      const response = await fetch(BLOCKS_ENDPOINT)
      if (!response.ok) {
        throw new Error(`Failed to fetch blocks: ${response.status}`)
      }
      const data = await response.json()

      // Update dashboard data with real values
      updateDashboardWithRealData(data)

      // Process transactions from blocks
      const txs = processTransactionsFromBlocks(data)
      setTransactions(txs)

      setLoading(false)
    } catch (error) {
      console.error('Error fetching blocks:', error)
      setError('Failed to fetch blocks. Using fallback data.')
      setLoading(false)
    }
  }

  // Function to process transactions from blocks
  const processTransactionsFromBlocks = (blocks: BlockData[]) => {
    // Extract and transform transactions from blocks
    const processedTxs: Transaction[] = []

    // For demonstration, we'll create mock transactions based on block data
    // In a real implementation, you would extract actual transaction data from the blocks
    blocks.slice(0, 7).forEach((block) => {
      const tx: Transaction = {
        hash: block.hash, // Using block hash as transaction hash for demo
        txnStatus: 'PENDING',
        txnType: getRandomTxnType(),
        age: getTransactionAge(block.timestamp),
      }
      processedTxs.push(tx)
    })

    return processedTxs
  }

  // Function to update dashboard with real data
  const updateDashboardWithRealData = (blocks: BlockData[]) => {
    // Calculate total transactions from the blocks
    const totalTxs = blocks.reduce((sum, block) => {
      const numTxs = block.header?.contentCommitment?.numTxs || 0
      return sum + numTxs
    }, 0)

    // Get the height of the latest block or use the length of blocks
    const latestBlockHeight = blocks.length > 0 ? parseInt(blocks[0].height) : blocks.length

    // For contracts, we'll keep using the mock data approach since the API doesn't
    // directly provide this information
    const contractsCount = 5465761 // Keeping this static as in the original data

    setDashboardData((prevData) => {
      return prevData.map((item) => {
        if (item.id === '1') {
          // Blocks
          return {
            ...item,
            value: latestBlockHeight,
            formattedValue: latestBlockHeight.toLocaleString(),
          }
        } else if (item.id === '2') {
          // Transactions
          return {
            ...item,
            value: totalTxs,
            formattedValue: totalTxs.toLocaleString(),
          }
        } else if (item.id === '3') {
          // Contracts
          return {
            ...item,
            value: contractsCount,
            formattedValue: contractsCount.toLocaleString(),
          }
        }
        return item
      })
    })
  }

  // Function to update dashboard with real-time data
  const updateDashboardWithLiveData = async () => {
    const latestHeight = await fetchLatestBlockHeight()
    if (latestHeight) {
      setDashboardData((prevData) => {
        return prevData.map((item) => {
          if (item.id === '1') {
            // Blocks
            return {
              ...item,
              value: latestHeight,
              formattedValue: latestHeight.toLocaleString(),
            }
          }
          return item
        })
      })
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchBlocks()

    // Set up polling for complete data refresh
    const pollInterval = setInterval(() => {
      fetchBlocks() // Fetch all block data to update everything
    }, 2000) // Poll every 20 seconds to match the UI update interval

    return () => {
      clearInterval(pollInterval)
    }
  }, [])

  // Update transaction ages periodically
  useEffect(() => {
    const ageInterval = setInterval(() => {
      setTransactions((prevTransactions) =>
        prevTransactions.map((txn) => {
          if (!txn.age) return txn

          if (txn.age === 'just now') {
            return {
              ...txn,
              age: '1m ago',
            }
          }

          const currentAgeInSeconds = parseTimeToSeconds(txn.age)
          let newAgeInSeconds = currentAgeInSeconds

          if (currentAgeInSeconds < 300) {
            newAgeInSeconds = currentAgeInSeconds + 60
          } else if (currentAgeInSeconds < 3600) {
            newAgeInSeconds = currentAgeInSeconds + 120
          } else {
            newAgeInSeconds = currentAgeInSeconds + 300
          }

          return {
            ...txn,
            age: formatTime(newAgeInSeconds),
          }
        })
      )
    }, 15000)

    return () => {
      clearInterval(ageInterval)
    }
  }, [])

  // Auto-retry logic for failed reveal attempts
  useEffect(() => {
    let autoRetryInterval: NodeJS.Timeout | undefined

    if (isDialogOpen && modalCases.length > 0 && modalCases[0]?.type === 'case') {
      autoRetryInterval = setInterval(() => {
        handleTryAgain()
      }, 5000)
    }

    return () => {
      if (autoRetryInterval) {
        clearInterval(autoRetryInterval)
      }
    }
  }, [isDialogOpen, modalCases])

  const handleRevealClick = () => {
    const isPrivacyContent = Math.random() < 0.4

    if (isPrivacyContent) {
      const randomIndex = Math.floor(Math.random() * PRIVACY_LINKS.length)
      const selectedLink = PRIVACY_LINKS[randomIndex]

      setPrivacyContentType(selectedLink.contentType as PrivacyContentType)
      setIsPrivacyContentModalOpen(true)
    } else {
      setModalCases([])
      const showTransactionHashes = Math.random() < 0.3

      if (showTransactionHashes) {
        setTransactionHashes(generateRandomHashes(6))
        setModalCases([{ type: 'hashes' }])
      } else {
        const randomCaseIndex = Math.floor(Math.random() * MODAL_CASES.length)
        setModalCases([
          {
            type: 'case',
            case: MODAL_CASES[randomCaseIndex],
          },
        ])
      }

      setIsDialogOpen(true)
    }
  }

  const handleTryAgain = () => {
    const randomCaseIndex = Math.floor(Math.random() * MODAL_CASES.length)

    setModalCases((prev) => [
      ...prev,
      {
        type: 'case',
        case: MODAL_CASES[randomCaseIndex],
      },
    ])
  }

  const revealHash = (index: number) => {
    setTransactionHashes((prevHashes) =>
      prevHashes.map((hash, i) => (i === index ? { ...hash, revealed: true } : hash))
    )
  }

  const handleRefresh = () => {
    fetchBlocks()
  }

  return (
    <main className="py-6 flex flex-col gap-4 md:gap-12 px-4 md:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-center">This is not a real block explorer</h1>
          <ReadDisclaimerModal />
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <RefreshCw size={16} /> Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <section>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {dashboardData.map((data) => {
            return (
              <Card
                key={data.id}
                className="transition-all hover:shadow-md"
              >
                <div className="flex items-center px-3 md:px-6">
                  <div>{data.icon}</div>
                  <CardHeader className="p-3 md:p-4">
                    <CardTitle className="text-sm md:text-lg">{data.heading}</CardTitle>
                    <CardDescription className="text-lg md:text-2xl">
                      {loading ? 'Loading...' : data.formattedValue}
                    </CardDescription>
                  </CardHeader>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-primary font-bold mb-4 text-lg md:text-xl">Latest Transactions</h2>
        <div className="overflow-x-auto -mx-4 px-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading transaction data...</p>
            </div>
          ) : (
            <Table className="transaction-table">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Transaction Hash</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((txn, index) => (
                    <TableRow
                      key={txn.hash}
                      className={counter > 0 && index === 0 ? 'transaction-highlight' : ''}
                      style={{
                        transitionDelay: `${index * 50}ms`,
                      }}
                    >
                      <TableCell className="font-medium">
                        <span className="text-sm md:text-base">{shortenTxnHash(txn.hash)}</span>
                      </TableCell>
                      <TableCell>{txn.txnStatus || 'PENDING'}</TableCell>
                      <TableCell>{txn.age || 'Unknown'}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={handleRevealClick}
                          className="text-xs md:text-sm"
                        >
                          Reveal
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8"
                    >
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </section>

      <PrivacyContentModal
        isOpen={isPrivacyContentModalOpen}
        onClose={() => setIsPrivacyContentModalOpen(false)}
        contentType={privacyContentType}
      />

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false)
            setModalCases([])
            setTransactionHashes([])
          }
        }}
      >
        <DialogContent className="sm:max-w-md max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>Transaction Information</DialogTitle>
          </DialogHeader>

          <div className="p-4 space-y-8 max-h-[70vh] overflow-y-auto">
            {modalCases.map((modalItem, modalIndex) => (
              <div
                key={modalIndex}
                className={`p-4 rounded-lg ${
                  modalIndex > 0 ? 'border-t border-gray-200 pt-8' : ''
                }`}
              >
                {modalItem.type === 'case' && (
                  <div className="case-content">
                    {modalItem.case.isBlockQuote ? (
                      <blockquote className="p-4 my-4 border-l-4 border-primary bg-primary/10 text-lg font-medium">
                        {modalItem.case.title}
                      </blockquote>
                    ) : (
                      <p className="text-lg font-semibold text-center mb-4">
                        {modalItem.case.title}
                      </p>
                    )}

                    {modalItem.case.hasSubheading && (
                      <p className="text-sm text-gray-600 mt-2 mb-4">
                        {modalItem.case.subheadingLink ? (
                          <>
                            <Link
                              href={modalItem.case.subheadingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {modalItem.case.subheadingText}
                            </Link>
                          </>
                        ) : (
                          modalItem.case.subheading
                        )}
                      </p>
                    )}

                    {modalItem.case.gifUrl && (
                      <div className="flex justify-center my-4">
                        <Image
                          src={modalItem.case.gifUrl}
                          alt="Reaction GIF"
                          className="max-w-full rounded-md shadow-sm"
                          width={300}
                          height={200}
                        />
                      </div>
                    )}

                    {modalItem.case.content && (
                      <p className="text-sm text-gray-700 mt-4">{modalItem.case.content}</p>
                    )}
                  </div>
                )}

                {modalItem.type === 'hashes' && (
                  <div className="grid">
                    {/* Group transactions by type */}
                    <div className="mb-6">
                      <p className="font-semibold text-center mb-4">Notes</p>
                      {transactionHashes.slice(0, 2).map((hash, index) => (
                        <div
                          key={`${modalIndex}-hash-${index}`}
                          className="flex justify-between items-center border-b border-primary/30 p-3"
                        >
                          <code className="font-mono text-xs md:text-sm overflow-hidden text-ellipsis max-w-[65%]">
                            {hash.revealed ? RICK_ROLL_LYRICS[index] : shortenTxnHash(hash.hash)}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revealHash(index)}
                            disabled={hash.revealed}
                            className="text-xs md:text-sm"
                          >
                            {hash.revealed ? 'Revealed' : 'Reveal'}
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <p className="font-semibold text-center mb-4">Nullifiers</p>
                      {transactionHashes.slice(2, 4).map((hash, index) => (
                        <div
                          key={`${modalIndex}-hash-${index + 2}`}
                          className="flex justify-between items-center border-b border-primary/30 p-3"
                        >
                          <code className="font-mono text-xs md:text-sm overflow-hidden text-ellipsis max-w-[65%]">
                            {hash.revealed
                              ? RICK_ROLL_LYRICS[index + 2]
                              : shortenTxnHash(hash.hash)}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revealHash(index + 2)}
                            disabled={hash.revealed}
                            className="text-xs md:text-sm"
                          >
                            {hash.revealed ? 'Revealed' : 'Reveal'}
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="mb-2">
                      <p className="font-semibold text-center mb-4">Logs</p>
                      {transactionHashes.slice(4, 6).map((hash, index) => (
                        <div
                          key={`${modalIndex}-hash-${index + 4}`}
                          className="flex justify-between items-center border-b border-primary/30 p-3"
                        >
                          <code className="font-mono text-xs md:text-sm overflow-hidden text-ellipsis max-w-[65%]">
                            {hash.revealed
                              ? RICK_ROLL_LYRICS[index + 4]
                              : shortenTxnHash(hash.hash)}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revealHash(index + 4)}
                            disabled={hash.revealed}
                            className="text-xs md:text-sm"
                          >
                            {hash.revealed ? 'Revealed' : 'Reveal'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {modalCases[0]?.type === 'case' && (
              <DialogFooter>
                <Button
                  onClick={handleTryAgain}
                  className="w-full mt-2"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                </Button>
              </DialogFooter>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
