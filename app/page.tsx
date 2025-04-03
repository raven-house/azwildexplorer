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
import { ArrowRight, Bell, Box, Code, Layout, MessageSquare } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { INITIAL_TRANSACTION_DATA, PRIVACY_LINKS, RICK_ROLL_WORDS } from '@/lib/mock-data'

const INITIAL_DASHBOARD_DATA = [
  {
    id: '1',
    heading: 'Blocks',
    value: 1284180,
    formattedValue: '1,284,180',
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
    value: 164543068,
    formattedValue: '164,543,068',
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
    value: 5465761,
    formattedValue: '5,465,761',
    increaseRate: 2,
    icon: (
      <Code
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
  {
    id: '4',
    heading: 'Events',
    value: 924266759,
    formattedValue: '924,266,759',
    increaseRate: 10,
    icon: (
      <Bell
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
  {
    id: '5',
    heading: 'Messages',
    value: 2095024,
    formattedValue: '2,095,024',
    increaseRate: 3,
    icon: (
      <MessageSquare
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
  {
    id: '6',
    heading: 'Classes',
    value: 65705,
    formattedValue: '65,705',
    increaseRate: 1,
    icon: (
      <Layout
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
]

type Transaction = { hash: string; revealed: boolean }

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

const getRandomStatus = () => {
  const statuses = ['Paid', 'Pending', 'Unpaid']
  return statuses[Math.floor(Math.random() * statuses.length)]
}

const getRandomTxnType = () => {
  const types = ['INVOKE_FUNCTION', 'DEPLOY', 'TRANSFER', 'APPROVE', 'SWAP']
  return types[Math.floor(Math.random() * types.length)]
}

const getRandomInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function Home() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTION_DATA)
  const [dashboardData, setDashboardData] = useState(INITIAL_DASHBOARD_DATA)
  const [counter, setCounter] = useState(0)

  const [selectedMessage, setSelectedMessage] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [transactionHashes, setTransactionHashes] = useState<Transaction[]>([])
  const router = useRouter()

  const updateDashboardItem = (id: string, increment: number) => {
    setDashboardData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          const newValue = item.value + increment
          return {
            ...item,
            value: newValue,
            formattedValue: newValue.toLocaleString(),
          }
        }
        return item
      })
    })
  }

  useEffect(() => {
    const intervals = dashboardData.map((item) => {
      let minInterval, maxInterval

      switch (item.id) {
        case '1': // Blocks
          minInterval = 3000
          maxInterval = 6000
          break
        case '2': // Transactions
          minInterval = 1000
          maxInterval = 3000
          break
        case '3': // Contracts
          minInterval = 5000
          maxInterval = 10000
          break
        case '4': // Events
          minInterval = 2000
          maxInterval = 4000
          break
        case '5': // Messages
          minInterval = 4000
          maxInterval = 8000
          break
        case '6': // Classes
          minInterval = 10000
          maxInterval = 20000
          break
        default:
          minInterval = 5000
          maxInterval = 10000
      }

      const intervalId = setInterval(() => {
        const randomMultiplier = Math.random() < 0.2 ? Math.floor(Math.random() * 5) + 2 : 1
        const increment = item.increaseRate * randomMultiplier

        updateDashboardItem(item.id, increment)

        if (item.id === '2' && Math.random() < 0.3) {
          addNewTransaction()
        }
      }, getRandomInterval(minInterval, maxInterval))

      return intervalId
    })

    return () => {
      intervals.forEach((intervalId) => clearInterval(intervalId))
    }
  }, [])

  const addNewTransaction = () => {
    const newTransaction = {
      txnHash: generateRandomTxnHash(),
      txnStatus: getRandomStatus(),
      txnType: getRandomTxnType(),
      age: '0s ago',
    }

    setTransactions((prevTransactions) => {
      const updatedTransactions = [newTransaction, ...prevTransactions]
      return updatedTransactions.slice(0, 7)
    })

    setCounter((prevCounter) => prevCounter + 1)
  }

  useEffect(() => {
    const ageInterval = setInterval(() => {
      setTransactions((prevTransactions) =>
        prevTransactions.map((txn) => {
          const currentAgeInSeconds = parseTimeToSeconds(txn.age)
          const newAgeInSeconds = isNaN(currentAgeInSeconds) ? 1 : currentAgeInSeconds + 1
          return {
            ...txn,
            age: formatTime(newAgeInSeconds),
          }
        })
      )
    }, 1000)

    return () => {
      clearInterval(ageInterval)
    }
  }, [])

  const handleRevealClick = () => {
    const choice = Math.floor(Math.random() * 3)

    if (choice === 0) {
      router.push('/txn-detail')
    } else if (choice === 1) {
      const randomIndex = Math.floor(Math.random() * PRIVACY_LINKS.length)
      window.open(PRIVACY_LINKS[randomIndex].url, '_blank')
    } else {
      const randomHashes = generateRandomHashes(6)
      setTransactionHashes(randomHashes)
      setIsDialogOpen(true)
    }
  }

  const revealHash = (index: number) => {
    setTransactionHashes((prevHashes) =>
      prevHashes.map((hash, i) => (i === index ? { ...hash, revealed: true } : hash))
    )
  }

  return (
    <main className="pt-6 md:pt-10 lg:pt-16 pb-10 flex flex-col gap-8 md:gap-12 lg:gap-16 px-4 md:px-6 lg:px-8">
      <section>
        <div className="grid  grid-cols-2 xl:grid-cols-3 gap-3">
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
        <h2 className="text-primary font-bold mb-4 text-lg md:text-xl">Latest Transactions</h2>
        <div className="overflow-x-auto -mx-4 px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Transaction Hash</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Age</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow
                  key={txn.txnHash}
                  className={
                    counter > 0 && txn === transactions[0] ? 'bg-primary/20 animate-pulse' : ''
                  }
                >
                  <TableCell className="font-medium">
                    <span className="text-primary underline hover:no-underline cursor-pointer text-sm md:text-base">
                      {shortenTxnHash(txn.txnHash)}
                    </span>
                  </TableCell>
                  <TableCell>{txn.txnType}</TableCell>
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
          </Table>
        </div>
      </section>

      <Dialog
        open={isDialogOpen && !!selectedMessage}
        onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false)
            setSelectedMessage('')
          }
        }}
      >
        <DialogContent className="sm:max-w-md max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>Transaction Information</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center">
            <p className="text-lg font-semibold text-primary">{selectedMessage}</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogOpen && transactionHashes.length > 0}
        onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false)
            setTransactionHashes([])
          }
        }}
      >
        <DialogContent className="sm:max-w-md max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>Transaction Hashes</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <div className="grid">
            {transactionHashes.map((hash, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-primary/30 p-3"
              >
                <code className="font-mono text-xs md:text-sm overflow-hidden text-ellipsis max-w-[65%]">
                  {hash.revealed
                    ? RICK_ROLL_WORDS[index % RICK_ROLL_WORDS.length]
                    : shortenTxnHash(hash.hash)}
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
        </DialogContent>
      </Dialog>
    </main>
  )
}
