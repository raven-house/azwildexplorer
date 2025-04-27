import { NextResponse } from 'next/server'
import { supabaseServiceClient } from '@/app/db/config/server'
import { formatTime } from '@/lib/utils'

interface ApiTransaction {
  hash: string
  birthTimestamp: number
}

interface Transaction {
  txnHash: string
  txnStatus: string
  txnType: string
  age: string
}

// const getRandomStatus = () => {
//   const statuses = ['PENDING', 'ACCEPTED_ON_L2', 'REVERTED']
//   return statuses[Math.floor(Math.random() * statuses.length)]
// }

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
    const response = await fetch('https://api.testnet.aztecscan.xyz/v1/temporary-api-key/l2/txs')

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    const data: ApiTransaction[] = await response.json()

    const transactions: Transaction[] = data
      .sort((a, b) => b.birthTimestamp - a.birthTimestamp)
      .map((item) => ({
        txnHash: item.hash,
        txnStatus: 'PENDING',
        txnType: getRandomTxnType(),
        age: calculateAge(item.birthTimestamp),
      }))

    if (transactions.length > 0) {
      await storeTransactionsInSupabase(transactions)
    }

    if (transactions.length < 7) {
      const additionalTransactions = await getAdditionalTransactions(
        7 - transactions.length,
        transactions.map((t) => t.txnHash)
      )
      return NextResponse.json([...transactions, ...additionalTransactions].slice(0, 7))
    }

    return NextResponse.json(transactions.slice(0, 7))
  } catch (error) {
    console.error('Error fetching transactions:', error)

    const fallbackTransactions = await getAdditionalTransactions(7, [])
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

async function getAdditionalTransactions(
  count: number,
  excludeHashes: string[]
): Promise<Transaction[]> {
  try {
    const { data, error } = await supabaseServiceClient
      .from('aztec_transactions')
      .select('*')
      .not('txn_hash', 'in', `(${excludeHashes.join(',')})`)
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
    }))
  } catch (error) {
    console.error('Error getting additional transactions:', error)
    return []
  }
}
