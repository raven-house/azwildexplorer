import Link from 'next/link'
import ReadDisclaimerModal from './ReadDisclaimerModal'

export function Header() {
  return (
    <header className="border-b border-b-primary/10 bg-background">
      <div className="flex h-16 items-center gap-8 px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-bold text-primary">SOMETHING HAPPENED ON AZTEC</span>
        </Link>

        <nav className="flex items-center gap-6">
          <ReadDisclaimerModal />
          <span className="text-sm">Testnet</span>
        </nav>
      </div>
    </header>
  )
}
