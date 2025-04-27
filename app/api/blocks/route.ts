import { NextResponse } from 'next/server'
import { formatTime } from '@/lib/utils'
import { supabaseServiceClient } from '@/app/db/config/server'

interface Transaction {
  txnHash: string
  txnStatus: string
  txnType: string
  age: string
  blockHeight?: string
}

interface Block {
  hash: string
  height: string
  header: {
    globalVariables: {
      timestamp: number
    }
  }
  body: {
    txEffects: { txHash: string }[]
  }
}

const getRandomTxnType = () => {
  const types = ['INVOKE_FUNCTION', 'DEPLOY', 'TRANSFER', 'APPROVE', 'SWAP']
  return types[Math.floor(Math.random() * types.length)]
}

const calculateAge = (timestamp: number): string => {
  const now = Date.now()
  const diffSeconds = Math.floor((now - timestamp) / 1000)
  return formatTime(diffSeconds)
}

export async function GET() {
  try {
    // Get the latest block height to determine the range
    const heightResponse = await fetch(
      'https://api.testnet.aztecscan.xyz/v1/temporary-api-key/l2/latest-height'
    )
    if (!heightResponse.ok) {
      throw new Error(`Failed to fetch latest block height: ${heightResponse.status}`)
    }

    const latestHeight = parseInt(await heightResponse.text(), 10)

    const fromBlock = Math.max(0, latestHeight - 5)
    const toBlock = latestHeight - 3

    const blocksResponse = await fetch(
      `https://api.testnet.aztecscan.xyz/v1/temporary-api-key/l2/blocks?from=${fromBlock}&to=${toBlock}`
    )

    if (!blocksResponse.ok) {
      throw new Error(`Failed to fetch blocks: ${blocksResponse.status}`)
    }

    const blocks: Block[] = await blocksResponse.json()

    // Process blocks to extract transactions
    const transactions: Transaction[] = []

    blocks.forEach((block) => {
      const blockTimestamp = block.header.globalVariables.timestamp

      block.body.txEffects.forEach((tx) => {
        transactions.push({
          txnHash: tx.txHash,
          txnStatus: 'CONFIRMED',
          txnType: getRandomTxnType(),
          age: calculateAge(blockTimestamp),
          blockHeight: block.height,
        })
      })
    })

    // Sort transactions by block height (descending)
    transactions.sort((a, b) => {
      return parseInt(b.blockHeight || '0', 10) - parseInt(a.blockHeight || '0', 10)
    })

    // Store in Supabase for backup/fallback
    await storeTransactionsInSupabase(transactions)

    // Return the latest transactions (up to 7)
    return NextResponse.json(transactions.slice(0, 7))
  } catch (error) {
    console.error('Error fetching blocks and transactions:', error)

    // Fallback to stored transactions if API fails
    const fallbackTransactions = await getStoredTransactions(7)
    return NextResponse.json(fallbackTransactions)
  }
}

async function storeTransactionsInSupabase(transactions: Transaction[]) {
  try {
    for (const transaction of transactions) {
      const { error } = await supabaseServiceClient.from('aztec_transactions').upsert(
        {
          txn_hash: transaction.txnHash,
          txn_status: transaction.txnStatus,
          txn_type: transaction.txnType,
          age: transaction.age,
          block_height: transaction.blockHeight,
          created_at: new Date().toISOString(),
        },
        {
          onConflict: 'txn_hash',
        }
      )

      if (error) {
        console.error('Error storing transaction:', error)
      }
    }
  } catch (error) {
    console.error('Error storing transactions in Supabase:', error)
  }
}

async function getStoredTransactions(count: number): Promise<Transaction[]> {
  try {
    const { data, error } = await supabaseServiceClient
      .from('aztec_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(count)

    if (error) {
      console.error('Error fetching from Supabase:', error)
      return []
    }

    return data.map((tx) => ({
      txnHash: tx.txn_hash,
      txnStatus: tx.txn_status,
      txnType: tx.txn_type,
      age: tx.age,
      blockHeight: '12333',
    }))
  } catch (error) {
    console.error('Error getting stored transactions:', error)
    return []
  }
}
