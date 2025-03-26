import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { Logo } from "@/components/logo"

export function NavBar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 max-w-full">
        <Link href="/" className="flex items-center space-x-2">
          {siteConfig.logo.src ? (
            <>
              <Logo width={siteConfig.logo.width || 32} height={siteConfig.logo.height || 32} />
              <span className="text-base md:text-xl font-bold truncate">{siteConfig.name}</span>
            </>
          ) : (
            <span className="text-base md:text-xl font-bold truncate">{siteConfig.name}</span>
          )}
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/docs" className="text-xs md:text-sm font-medium hover:underline">
            Documentation
          </Link>
          <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
              <GithubIcon className="h-4 w-4 md:h-5 md:w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

