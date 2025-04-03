'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Clock, Eye, EyeOff, Lock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

interface TransactionType {
  id: number
  hash: string
  timestamp: string
}

interface PrivacyLawType {
  name: string
  url: string
}

const generateHash = (): string => {
  const characters = '0123456789abcdef'
  let hash = '0x'
  for (let i = 0; i < 64; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return hash
}

interface ResponseItem {
  text: string
  link?: {
    url: string
    label: string
  }
}

const privacyResponses: ResponseItem[] = [
  { text: 'Something happened 🤷‍♂️' },
  { text: "no, txs are private, there's nothing to see here" },
  { text: "Don't you know what zero-knowledge means?" },
  { text: "Even if I wanted to show you something, I can't!" },
  { text: 'You can keep clicking all you want...' },
  { text: "No, really, txs are private, there's nothing to see here" },
  {
    text: 'Ever heard of GDPR?',
    link: {
      url: 'https://gdpr-info.eu/',
      label: 'Read the regulations',
    },
  },
  {
    text: 'Privacy is a constitutional right',
    link: {
      url: 'https://fra.europa.eu/en/law-reference/european-convention-human-rights-article-8-0',
      label: 'Learn more',
    },
  },
  {
    text: 'You could file a request for information, but...',
    link: {
      //TODO: Need to confirm if the URL is correct
      url: 'https://www.foia.gov/',
      label: 'Good luck with that',
    },
  },
  {
    //TODO: Fix the URL for the aztec merch
    text: 'Maybe you should just buy some merch instead',
    link: {
      url: 'https://shop.aztec.network/',
      label: 'Visit store',
    },
  },
]

const rickRollWords: string[] = [
  'never',
  'gonna',
  'give',
  'you',
  'up',
  'never',
  'gonna',
  'let',
  'you',
  'down',
  'never',
  'gonna',
  'run',
  'around',
  'desert',
  'you',
  'never',
  'gonna',
  'make',
  'you',
  'cry',
  'never',
  'gonna',
  'say',
  'goodbye',
]

const privacyLaws: PrivacyLawType[] = [
  { name: 'GDPR (EU)', url: 'https://gdpr.eu/' },
  { name: 'CCPA (California)', url: 'https://oag.ca.gov/privacy/ccpa' },
  { name: 'Privacy Act (USA)', url: 'https://www.justice.gov/opcl/privacy-act-1974' },
  {
    name: 'PIPEDA (Canada)',
    url: 'https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/',
  },
  { name: 'Privacy Foundation', url: 'https://privacyfoundation.org/' },
]

interface TransactionProps {
  hash: string
  timestamp: string
  index: number
}

const Transaction: React.FC<TransactionProps> = ({ hash, timestamp, index }) => {
  const [revealed, setRevealed] = useState<number>(0)
  const [response, setResponse] = useState<ResponseItem | null>(null)
  const [words, setWords] = useState<string[]>([])
  const [subHashes, setSubHashes] = useState<string[]>([])
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const generateSubHashes = (): string[] => {
    const hashes: string[] = []
    for (let i = 0; i < 3; i++) {
      hashes.push(generateHash().substring(0, 30) + '...')
    }
    return hashes
  }

  const handleReveal = (): void => {
    if (revealed === 0) {
      const randomResponse = privacyResponses[Math.floor(Math.random() * privacyResponses.length)]
      setResponse(randomResponse)
      setRevealed(1)

      // 30% chance to show the popup with more hashes
      if (Math.random() < 0.3) {
        setSubHashes(generateSubHashes())
        setShowPopup(true)
      }
    } else if (revealed === 1) {
      if (showPopup) {
        const selectedWords: string[] = []
        for (let i = 0; i < 3; i++) {
          selectedWords.push(rickRollWords[Math.floor(Math.random() * rickRollWords.length)])
        }
        setWords(selectedWords)
        setRevealed(2)
      } else {
        setRevealed(0)
        setResponse(null)
      }
    } else {
      setRevealed(0)
      setResponse(null)
      setWords([])
      setShowPopup(false)
      setSubHashes([])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card className="w-full overflow-hidden border-l-4 border-l-purple-500 hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-mono flex items-center">
              <Lock className="h-4 w-4 mr-2 text-purple-500" />
              TX #{index + 1}
            </CardTitle>
            <Badge
              variant="outline"
              className="flex items-center text-xs"
            >
              <Clock className="h-3 w-3 mr-1" />
              {timestamp}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          {revealed === 0 && (
            <motion.p
              className="font-mono text-xs sm:text-sm overflow-hidden text-ellipsis whitespace-nowrap text-gray-600 dark:text-gray-400"
              initial={{ opacity: 1 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {hash}
            </motion.p>
          )}
          {revealed === 1 && response && (
            <motion.div
              className="text-sm italic text-purple-600 dark:text-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>{response.text}</p>
              {response.link && (
                <a
                  href={response.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs mt-1 inline-block underline text-purple-700 hover:text-purple-900"
                >
                  {response.link.label}
                </a>
              )}

              {showPopup && (
                <motion.div
                  className="mt-3 p-3 bg-purple-50 dark:bg-gray-800 rounded-md border border-purple-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs font-medium mb-2">Transaction Details:</p>
                  {subHashes.map((subHash, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between mb-1"
                    >
                      <span className="font-mono text-xs truncate w-32 md:w-40">{subHash}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs py-0 h-6"
                        onClick={() => {
                          const newWords = [
                            rickRollWords[Math.floor(Math.random() * rickRollWords.length)],
                            rickRollWords[Math.floor(Math.random() * rickRollWords.length)],
                            rickRollWords[Math.floor(Math.random() * rickRollWords.length)],
                          ]
                          setWords((prevWords) => [...prevWords, ...newWords])
                          setRevealed(2)
                        }}
                      >
                        Decode
                      </Button>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
          {revealed === 2 && (
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {words.map((word, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-xs capitalize"
                >
                  {word}
                </Badge>
              ))}
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReveal}
            className="text-xs flex items-center hover:text-purple-600 transition-colors"
          >
            {revealed === 0 ? (
              <>
                <Eye className="h-3 w-3 mr-1" /> Reveal
              </>
            ) : (
              <>
                <EyeOff className="h-3 w-3 mr-1" />{' '}
                {revealed === 1 ? (showPopup ? 'Transform' : 'Reset') : 'Reset'}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const PrivacyBlockchainExplorer: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  const addTransaction = useCallback((): void => {
    const newTransaction: TransactionType = {
      id: Date.now() + Math.floor(Math.random() * 10000),
      hash: generateHash(),
      timestamp: formatTime(),
    }

    setTransactions((prevTransactions) => [newTransaction, ...prevTransactions.slice(0, 9)])
  }, [])

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      addTransaction()
    }

    const interval = setInterval(() => {
      const delay = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000
      setTimeout(addTransaction, delay)
    }, 20000)

    return () => clearInterval(interval)
  }, [addTransaction])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <Shield className="h-6 w-6 mr-2 text-purple-600" />
                Something Happened (.wtf)
              </CardTitle>
              <CardDescription className="mt-2">
                A zero-knowledge blockchain explorer where... something happens?
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="animate-pulse"
            >
              Live
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-lg mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Privacy First</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Aztec uses zero-knowledge proofs to ensure transaction privacy. The hashes below
                represent obfuscated real-world transactions.
              </p>
            </div>
          </div>

          <h3 className="text-sm font-medium mb-4 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Recent Transactions
          </h3>

          <div className="space-y-2">
            {transactions.map((tx, index) => (
              <Transaction
                key={tx.id}
                hash={tx.hash}
                timestamp={tx.timestamp}
                index={index}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start border-t">
          <h3 className="text-sm font-medium mb-2 mt-4">Privacy Resources</h3>
          <div className="flex flex-wrap gap-2">
            {privacyLaws.map((law, index) => (
              <a
                key={index}
                href={law.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
              >
                {law.name}
                {index < privacyLaws.length - 1 && ' • '}
              </a>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PrivacyBlockchainExplorer

const formatTime = (): string => {
  const now = new Date()
  return now.toLocaleTimeString()
}
