import { cookies } from "next/headers"

const COOKIE_NAME = "pyr0ken_admin_token"
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60 // 7 days

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "pyr0ken-default-admin-fallback-session-key-32-chars-long"
  )
}

export async function createSignature(
  data: string,
  secret: string
): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data))
  const hashArray = Array.from(new Uint8Array(sig))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function createSessionToken(): Promise<string> {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2)
  const payload = `${timestamp}:${random}`
  const signature = await createSignature(payload, getSecret())
  return `${payload}.${signature}`
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false
  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [payload, signature] = parts
  const [timestampStr] = payload.split(":")
  const timestamp = Number.parseInt(timestampStr, 10)
  if (Number.isNaN(timestamp)) return false

  // Check expiration (7 days)
  if (Date.now() - timestamp > MAX_AGE_SECONDS * 1000) return false

  const expectedSignature = await createSignature(payload, getSecret())
  return signature === expectedSignature
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return verifySessionToken(token)
}

export async function verifyPassword(password: string): Promise<boolean> {
  const realPassword = process.env.ADMIN_PASSWORD
  if (!realPassword) return false
  return password === realPassword
}

export { COOKIE_NAME, MAX_AGE_SECONDS }
