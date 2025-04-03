'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b border-b-primary/10 bg-background sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <span className="text-xl md:text-2xl font-bold text-primary">SOMETHING.WTF</span>
          </Link>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-between ml-8">
          <div className="relative w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-full border-none rounded-full bg-card placeholder:text-white placeholder:font-bold ps-10"
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
      </div>

      {isMenuOpen && (
        <div className="lg:hidden p-4 bg-background border-t border-primary/10 animate-in slide-in-from-top absolute w-full">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-full border-none rounded-full bg-card placeholder:text-white placeholder:font-bold ps-10"
            />
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Blockchain
            </Link>
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Code
            </Link>
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Data
            </Link>
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium py-2"
            >
              Developer
            </Link>

            <Button
              variant="outline"
              className="rounded-md border mt-2"
            >
              Testnet
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
