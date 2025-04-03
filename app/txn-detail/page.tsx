'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Laugh, AlertTriangle, Lock, Search } from 'lucide-react'
import Link from 'next/link'

const PRIVACY_MESSAGES = [
  'Something happened 🤷‍♂️😝',
  "Noooooo!\nTXs are private, there's nothing to see here 😠",
  "Don't you know what zero-knowledge means?! 😡",
  "Even if I *wanted* to show you something, I can't 😏",
  'You can keep clicking all you want 💀🫠',
]

const getRandomIcon = () => {
  const icons = [
    <Sparkles
      key="sparkles"
      size={24}
      className="text-yellow-500"
    />,
    <Laugh
      key="laugh"
      size={24}
      className="text-green-500"
    />,
    <AlertTriangle
      key="alert"
      size={24}
      className="text-orange-500"
    />,
    <Lock
      key="lock"
      size={24}
      className="text-blue-500"
    />,
    <Search
      key="search"
      size={24}
      className="text-purple-500"
    />,
  ]
  return icons[Math.floor(Math.random() * icons.length)]
}

export default function TxnDetail() {
  const [message, setMessage] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const randomIndex = Math.floor(Math.random() * PRIVACY_MESSAGES.length)
    setMessage(PRIVACY_MESSAGES[randomIndex])
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center justify-center p-4  mt-20">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {getRandomIcon()}
              <h2 className="text-xl font-bold text-primary">Transaction Details</h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className="bg-primary/5 rounded-lg p-6 mb-4"
                key={message}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-medium text-primary">{message}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center">
              <Link href="/">
                <Button>
                  <span>Go Back</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
