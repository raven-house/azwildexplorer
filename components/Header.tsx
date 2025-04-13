import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b border-b-primary/10 bg-background">
      <div className="flex h-16 items-center gap-8 px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold text-primary">SOMETHING.WTF</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Button
            variant="outline"
            className="rounded-md border"
          >
            Testnet
          </Button>
        </nav>
      </div>
    </header>
  )
}
