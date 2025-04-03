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
import { ArrowRight, Bell, Box, Code, Layout, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const TRANSACTION_MOCK_DATA = [
  {
    txnHash: '0x0838f46715219fc857bd5da73170ab1e9e869850a0f7578e7565c6eb8017973d',
    txnStatus: 'Paid',
    txnType: 'INVOKE_FUNCTION',
  },
  {
    txnHash: '0x0838f46715219fc857bd5da731708jy88s869850a0f7578e7565c6eb801797cd',
    txnStatus: 'Pending',
    txnType: 'INVOKE_FUNCTION',
  },
  {
    txnHash: '0x0838f46715219fc857bd5da731708jh7js869850a0f7578e7565c6eb8017979kj',
    txnStatus: 'Unpaid',
    txnType: 'INVOKE_FUNCTION',
  },
  {
    txnHash: '0x0838f46715219fc857bd5da731708jhuujj69850a0f7578e7565c6eb801797ik',
    txnStatus: 'Paid',
    txnType: 'INVOKE_FUNCTION',
  },
  {
    txnHash: '0x0838f46715219fc857bd5da73170ssss8s869850a0f7578e7565c6eb801794df',
    txnStatus: 'Paid',
    txnType: 'INVOKE_FUNCTION',
  },
  {
    txnHash: '0x0838f46715219fc857bd5da731708jsdjs869850a0f7578e7565c6eb8017972s',
    txnStatus: 'Pending',
    txnType: 'INVOKE_FUNCTION',
  },
  {
    txnHash: '0x0838f46715219fc857bd5da731708jh7js8698508hfr6h78e765c6eb801797xs',
    txnStatus: 'Unpaid',
    txnType: 'INVOKE_FUNCTION',
  },
]

const DASHBOARD_DATA = [
  {
    id: '1',
    heading: 'Blocks',
    value: '1,284,180',
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
    value: '164,543,068',
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
    value: '5,465,761',
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
    value: '924,266,759',
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
    value: '2,095,024',
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
    value: '65,705',
    icon: (
      <Layout
        size={24}
        className="text-pink-500"
      />
    ),
    color: 'text-pink-500',
  },
]

export default function Home() {
  return (
    <main className="pt-20 flex flex-col gap-20">
      <section>
        <div className="grid grid-cols-3 gap-3">
          {DASHBOARD_DATA.map((data) => {
            return (
              <Card key={data.id}>
                <div className="flex items-center px-6">
                  <div>{data.icon}</div>
                  <CardHeader>
                    <CardTitle>{data.heading}</CardTitle>
                    <CardDescription className="text-2xl">{data.value}</CardDescription>
                  </CardHeader>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-primary font-bold mb-4">Latest Transactions</h2>
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
            {TRANSACTION_MOCK_DATA.map((txn) => (
              <TableRow key={txn.txnHash}>
                <TableCell className="font-medium">
                  <Link href="/txn-detail">{shortenTxnHash(txn.txnHash)}</Link>
                </TableCell>
                <TableCell>{txn.txnType}</TableCell>
                <TableCell>{txn.txnStatus}</TableCell>
                <TableCell>12</TableCell>
                <TableCell className="text-right">
                  <Link
                    href="/txn-detail"
                    className="underline"
                  >
                    <Button size="sm">Reveal</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  )
}
