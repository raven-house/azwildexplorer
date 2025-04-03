import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-b-primary/10 bg-background">
      <div className="flex h-16 items-center gap-8 px-4">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold text-primary">SOMETHING.WTF</span>
        </Link>

        <div className="relative w-1/3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className=" w-[320px] min-w-max border-none rounded-4xl bg-card placeholder:text-white placeholder:font-bold ps-10"
            />
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Blockchain
          </Link>
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Code
          </Link>
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Data
          </Link>
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Developer
          </Link>

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
