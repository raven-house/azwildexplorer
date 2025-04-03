import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BoxIcon } from 'lucide-react'

const MOCK_HOME_DATA = [
  {
    id: '1',
    heading: 'Blocks',
    value: '1,284,180',
  },
]

export default function Home() {
  return (
    <main className="">
      {MOCK_HOME_DATA.map((data) => {
        return (
          <Card key={data.id}>
            <div className="flex items-center">
              <div>
                <BoxIcon className="text-white" />
              </div>
              <CardHeader>
                <CardTitle>{data.heading}</CardTitle>
                <CardDescription className="text-4xl">{data.value}</CardDescription>
              </CardHeader>
            </div>
          </Card>
        )
      })}
    </main>
  )
}
