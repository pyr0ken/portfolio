import fs from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

import { isAuthenticated } from "@/lib/admin-auth"

const CONTENT_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "portfolio-content.json"
)

export async function GET() {
  const authed = await isAuthenticated()
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const raw = await fs.readFile(CONTENT_FILE_PATH, "utf-8")
    const data = JSON.parse(raw)
    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error reading content:", error)
    return NextResponse.json(
      { error: "Failed to read content" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  const authed = await isAuthenticated()
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await req.json()) as { data?: unknown }
    const { data } = body

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      )
    }

    const formattedJson = JSON.stringify(data, null, 2) + "\n"

    // 1. Try local filesystem write (works in local dev)
    let localSaved = false
    try {
      await fs.writeFile(CONTENT_FILE_PATH, formattedJson, "utf-8")
      localSaved = true
    } catch {
      // In serverless read-only filesystem, local write will fail, fallback to GitHub commit
    }

    // 2. Commit to GitHub repository if GITHUB_TOKEN is available
    let gitHubCommitted = false
    const gitHubToken = process.env.GITHUB_TOKEN
    const repo = "pyr0ken/portfolio"
    const filePath = "src/data/portfolio-content.json"

    if (gitHubToken) {
      try {
        // First get the current file SHA
        const getRes = await fetch(
          `https://api.github.com/repos/${repo}/contents/${filePath}`,
          {
            headers: {
              Authorization: `Bearer ${gitHubToken}`,
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "pyr0ken-admin",
            },
            cache: "no-store",
          }
        )

        let sha: string | undefined
        if (getRes.ok) {
          const fileData = (await getRes.json()) as { sha?: string }
          sha = fileData.sha
        }

        // Put new content
        const contentBase64 = Buffer.from(formattedJson).toString("base64")
        const putRes = await fetch(
          `https://api.github.com/repos/${repo}/contents/${filePath}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${gitHubToken}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
              "User-Agent": "pyr0ken-admin",
            },
            body: JSON.stringify({
              message: "chore: update portfolio content via admin panel",
              content: contentBase64,
              sha,
              branch: "main",
            }),
          }
        )

        if (putRes.ok) {
          gitHubCommitted = true
        } else {
          const errText = await putRes.text()
          console.error("GitHub commit error:", errText)
        }
      } catch (err) {
        console.error("GitHub API request failed:", err)
      }
    }

    return NextResponse.json({
      success: true,
      localSaved,
      gitHubCommitted,
      message: gitHubCommitted
        ? "Changes committed to GitHub. Vercel deployment will complete in ~30s."
        : "Changes saved locally.",
    })
  } catch (error) {
    console.error("Error saving content:", error)
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    )
  }
}
