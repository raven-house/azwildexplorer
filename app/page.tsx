import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Bell, Box, Code, Layout, MessageSquare } from 'lucide-react'

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
    <main className="pt-20">
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
    </main>
  )
}
