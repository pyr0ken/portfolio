"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon, KeyRoundIcon, Loader2Icon } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = (await res.json()) as { error?: string }

      if (!res.ok) {
        setError(data.error || "Authentication failed")
        setLoading(false)
        return
      }

      router.push("/admin")
      router.refresh()
    } catch {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-line bg-card/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full border border-line bg-zinc-900/90 text-foreground">
            <KeyRoundIcon className="size-5 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-medium tracking-tight">Admin Gate</h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Authenticate to manage portfolio & ordering
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="font-mono text-xs text-muted-foreground"
            >
              Master Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                required
                autoFocus
                className="w-full rounded-lg border border-line bg-background/80 px-3.5 py-2.5 pr-10 font-mono text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground/40 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 text-center font-mono text-xs text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Unlock Admin</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
