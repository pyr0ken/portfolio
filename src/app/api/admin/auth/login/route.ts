import { NextResponse } from "next/server"

import {
  COOKIE_NAME,
  createSessionToken,
  MAX_AGE_SECONDS,
  verifyPassword,
} from "@/lib/admin-auth"

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { password?: string }
    const { password } = body

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      )
    }

    const isValid = await verifyPassword(password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const token = await createSessionToken()
    const response = NextResponse.json({ success: true })

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE_SECONDS,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
