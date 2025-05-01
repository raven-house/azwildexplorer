import { NextRequest, NextResponse } from 'next/server'
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  let tillBlock = parseInt(searchParams.get('till_block') || '0')
  const minTransactions = 10 // Minimum number of transactions we want to fetch

  if (!tillBlock) {
    const heightResponse = await fetch(
      'https://api.testnet.aztecscan.xyz/v1/temporary-api-key/l2/latest-height'
    )
    if (!heightResponse.ok) {
      throw new Error(`Failed to fetch latest block height: ${heightResponse.status}`)
    }

    tillBlock = parseInt(await heightResponse.text(), 10)
  }

  try {
    const allTransactions: Transaction[] = []
    let currentToBlock = tillBlock
    let currentFromBlock = Math.max(0, currentToBlock - 5)
    let finalFromBlock = currentFromBlock

    // Keep fetching until we have at least minTransactions or hit block 0
    while (allTransactions.length < minTransactions && currentFromBlock >= 0) {
      const blocksResponse = await fetch(
        `https://api.testnet.aztecscan.xyz/v1/temporary-api-key/l2/blocks?from=${currentFromBlock}&to=${currentToBlock}`
      )

      if (!blocksResponse.ok) {
        throw new Error(`Failed to fetch blocks: ${blocksResponse.status}`)
      }

      const blocks: Block[] = await blocksResponse.json()

      // Process blocks to extract transactions
      blocks.forEach((block) => {
        const blockTimestamp = block.header.globalVariables.timestamp

        block.body.txEffects.forEach((tx) => {
          allTransactions.push({
            txnHash: tx.txHash,
            txnStatus: 'CONFIRMED',
            txnType: getRandomTxnType(),
            age: calculateAge(blockTimestamp),
            blockHeight: block.height,
          })
        })
      })

      // Update block range for next iteration if needed
      if (allTransactions.length < minTransactions) {
        currentToBlock = currentFromBlock - 1
        currentFromBlock = Math.max(0, currentToBlock - 5)
        finalFromBlock = currentFromBlock // Keep track of the final fromBlock

        // Break if we've reached block 0
        if (currentFromBlock === 0 && currentToBlock === 0) {
          break
        }
      }
    }

    // Sort transactions by block height (descending)
    allTransactions.sort((a, b) => {
      return parseInt(b.blockHeight || '0', 10) - parseInt(a.blockHeight || '0', 10)
    })

    // Store in Supabase for backup/fallback
    await storeTransactionsInSupabase(allTransactions)

    // Return the latest transactions (up to 7) along with the final fromBlock
    return NextResponse.json({
      transactions: allTransactions,
      finalFromBlock: finalFromBlock,
    })
  } catch (error) {
    console.error('Error fetching blocks and transactions:', error)

    // Fallback to stored transactions if API fails
    const fallbackTransactions = await getStoredTransactions(7)
    return NextResponse.json({
      transactions: fallbackTransactions,
      finalFromBlock: null,
      error: 'Used fallback transactions from database',
    })
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
