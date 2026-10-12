import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeftIcon, ShieldIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard – pyr0ken",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-zinc-800 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-foreground hover:opacity-80"
            >
              <ShieldIcon className="size-4" />
              <span>PYR0KEN / ADMIN</span>
            </Link>
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-muted-foreground uppercase">
              v1.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="size-3.5" />
              <span>Public Site</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}
