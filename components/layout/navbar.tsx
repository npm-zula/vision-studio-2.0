import Link from "next/link"
import { Eye } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Eye className="h-6 w-6" />
            <span className="text-lg font-semibold">Vision Studio</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/datasets"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Datasets
            </Link>
            <Link
              href="/models"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Models
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentation
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
} 