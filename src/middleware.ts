import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

import { COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(COOKIE_NAME)?.value
    const isAuthed = await verifySessionToken(token)

    // If on login page and already authenticated, go to /admin
    if (pathname === "/admin/login") {
      if (isAuthed) {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.next()
    }

    // For all other /admin routes, must be authenticated
    if (!isAuthed) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
