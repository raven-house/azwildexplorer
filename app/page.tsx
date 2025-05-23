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
import { shortenTxnHash } from '@/lib/utils'
import { ArrowRight, Box, Code, RefreshCw, Search } from 'lucide-react'
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
import PrivacyContentModal, { PrivacyContentType } from '@/components/PrivacyContentModal'
import { TransactionsSkeleton } from '@/components/TransactionsSkeleton'
import { toast } from 'sonner'

const INITIAL_DASHBOARD_DATA = [
  {
    id: '1',
    heading: 'Blocks',
    value: 0,
    formattedValue: '0',
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
    heading: 'Contract Classes',
    value: 0,
    formattedValue: '0',
    icon: (
      <Code
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
]

type Transaction = {
  hash: string
  revealed: boolean
}

interface TxnData {
  txnHash: string
  txnStatus: string
  txnType: string
  age: string
  blockHeight?: string
}

const generateRandomTxnHash = (): string => {
  let result = '0x'
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz'
  const length = 64

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

const generateRandomHashes = (count: number): Transaction[] => {
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

export default function Home() {
  const [transactions, setTransactions] = useState<TxnData[]>([])
  const [dashboardData, setDashboardData] = useState(INITIAL_DASHBOARD_DATA)
  const [counter, setCounter] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalCases, setModalCases] = useState<Array<any>>([])
  const [transactionHashes, setTransactionHashes] = useState<Transaction[]>([])

  const [isPrivacyContentModalOpen, setIsPrivacyContentModalOpen] = useState(false)
  const [privacyContentType, setPrivacyContentType] = useState<PrivacyContentType>('constitutional')
  const [fromBlock, setFromBlock] = useState<number | null>(null)

  useEffect(() => {
    setTimeout(() => {
      toast.info('Try to find your transaction here!', {
        icon: <Search className="h-5 w-5 text-blue-500" />,
        duration: 7000,
      })
    }, 1500)
  }, [])

  // Fetch transactions from our API route
  const fetchTransactions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/blocks?till_block=${fromBlock ?? 0}`)

      if (response.ok) {
        const { transactions, finalFormBlock } = (await response.json()) || {}

        // Only update if we got data
        if (transactions && transactions.length > 0) {
          setFromBlock(finalFormBlock)
          setTransactions(transactions)
          setCounter((prev) => prev + 1) // Increment counter to trigger highlight animation
        }
      } else {
        console.error('Failed to fetch transactions:', response.status)
        toast.error("Couldn't fetch transactions", {
          description: 'There was an error loading the latest transactions',
        })
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
      toast.error('Network error', {
        description: "Couldn't connect to blockchain explorer service",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()

    const txnInterval = setInterval(() => {
      fetchTransactions()
    }, 20000)

    return () => {
      clearInterval(txnInterval)
    }
  }, [])

  useEffect(() => {
    const fetchLatestBlockHeight = async () => {
      try {
        const response = await fetch(
          'https://api.testnet.aztecscan.xyz/v1/temporary-api-key/l2/latest-height'
        )
        const data = await response.json()

        setDashboardData((prevData) => {
          return prevData.map((item) => {
            if (item.id === '1') {
              const blockHeight = parseInt(data, 10) || 0
              return {
                ...item,
                value: blockHeight,
                formattedValue: blockHeight.toLocaleString(),
              }
            }
            return item
          })
        })
      } catch (error) {
        console.error('Error fetching latest block height:', error)
      }
    }

    fetchLatestBlockHeight()
  }, [])

  useEffect(() => {
    const fetchTotalTransactions = async () => {
      try {
        const response = await fetch(
          'https://api.testnet.aztecscan.xyz/v1/temporary-api-key/l2/stats/total-tx-effects'
        )

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.text()
        const totalTransactions = parseInt(data, 10)

        if (!isNaN(totalTransactions)) {
          setDashboardData((prevData) => {
            return prevData.map((item) => {
              if (item.id === '2') {
                return {
                  ...item,
                  value: totalTransactions,
                  formattedValue: totalTransactions.toLocaleString(),
                }
              }
              return item
            })
          })
        }
      } catch (error) {
        console.error('Error fetching total transactions:', error)
      }
    }

    fetchTotalTransactions()
  }, [])

  useEffect(() => {
    const fetchTotalContractClasses = async () => {
      try {
        const response = await fetch(
          'https://api.testnet.aztecscan.xyz/v1/temporary-api-key/l2/stats/total-contracts'
        )

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.text()
        const totalContractClasses = parseInt(data, 10)

        if (!isNaN(totalContractClasses)) {
          setDashboardData((prevData) => {
            return prevData.map((item) => {
              if (item.id === '3') {
                return {
                  ...item,
                  value: totalContractClasses,
                  formattedValue: totalContractClasses.toLocaleString(),
                }
              }
              return item
            })
          })
        }
      } catch (error) {
        console.error('Error fetching total contract classes:', error)
      }
    }

    fetchTotalContractClasses()
  }, [])

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
    const isPrivacyContent = false
    // TODO: Use below code if we want to show privacy content (Information details)
    // const isPrivacyContent = Math.random() < 0.2

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
    fetchTransactions()
  }

  return (
    <main className="py-6 flex flex-col gap-4 md:gap-12 px-4 md:px-6 lg:px-8">
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
                  <CardHeader className="p-3 md:p-4 w-full">
                    <CardTitle className="text-sm md:text-lg">{data.heading}</CardTitle>
                    <CardDescription className="text-lg md:text-2xl">
                      {data.formattedValue}
                    </CardDescription>
                  </CardHeader>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-primary font-bold text-lg md:text-xl">Latest Transactions</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
        <div className="overflow-x-auto -mx-4 px-4">
          <Table className="transaction-table">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Transaction Hash</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Age</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TransactionsSkeleton />
            ) : (
              <TableBody>
                {transactions.map((txn, index) => (
                  <TableRow
                    key={txn.txnHash}
                    className={counter > 0 && index === 0 ? 'transaction-highlight' : ''}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <TableCell className="font-medium">
                      <span className="text-sm md:text-base">{txn.txnHash}</span>
                    </TableCell>
                    <TableCell>{txn.txnStatus}</TableCell>
                    <TableCell>{txn.age}</TableCell>
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
                ))}
              </TableBody>
            )}
          </Table>
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
