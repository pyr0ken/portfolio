import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { clampParam } from "../params"

const geistSemiBold = readFileSync(
  join(process.cwd(), "src/assets/fonts/Geist-SemiBold.ttf")
)

const geistMonoRegular = readFileSync(
  join(process.cwd(), "src/assets/fonts/GeistMono-Regular.ttf")
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = clampParam(searchParams.get("title"), 160)
  const description = clampParam(searchParams.get("description"), 320)

  return new ImageResponse(
    <div tw="flex h-full w-full bg-black text-zinc-50">
      <div tw="absolute inset-y-0 left-12 flex w-px border border-zinc-800" />
      <div tw="absolute inset-y-0 right-12 flex w-px border border-zinc-800" />
      <div tw="absolute inset-x-0 top-12 flex h-px border border-zinc-800" />
      <div tw="absolute inset-x-0 bottom-12 flex h-px border border-zinc-800" />

      {/* Header bar with 0x mark and live domain badge */}
      <div tw="absolute top-18 left-18 right-18 flex justify-between items-center">
        <div tw="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 256"
            width={128}
            height={64}
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 64 48 H 208 V 208 H 64 Z M 108 88 H 164 V 168 H 108 Z M 280 48 L 336 48 L 364 96 L 392 48 L 448 48 L 396 128 L 448 208 L 392 208 L 364 160 L 336 208 L 280 208 L 332 128 Z"
            />
          </svg>
        </div>

        <div tw="flex items-center border border-zinc-800 bg-zinc-900/80 px-4 py-2 rounded-lg">
          <div tw="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2.5" />
          <span
            style={{
              fontFamily: "GeistMono",
              fontSize: 18,
              color: "#e4e4e7",
            }}
          >
            pyr0ken.ir
          </span>
        </div>
      </div>

      <div tw="absolute inset-x-0 top-40 bottom-24 flex flex-col justify-end border-t-2 border-zinc-800">
        <div
          tw="border-t-2 border-b-2 border-zinc-800 px-18"
          style={{
            fontFamily: "GeistSans",
            fontWeight: 600,
            fontSize: 64,
            lineHeight: 1,
            textWrap: "balance",
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </div>

        {description && (
          <div tw="flex flex-col">
            <div
              tw="border-b-2 border-zinc-800 px-18 py-8 text-zinc-400"
              style={{
                fontFamily: "GeistMono",
                fontWeight: 400,
                fontSize: 32,
                lineHeight: 1.25,
                textWrap: "balance",
              }}
            >
              {description}
            </div>
          </div>
        )}
      </div>

      {/* CAD technical footer */}
      <div
        tw="absolute bottom-15 left-18 right-18 flex justify-between items-center text-zinc-500"
        style={{ fontFamily: "GeistMono", fontSize: 16 }}
      >
        <div tw="flex items-center">
          <span tw="mr-8">SYS: BACKEND & INFRASTRUCTURE</span>
          <span tw="mr-8">ARCH: HIGH-CONCURRENCY</span>
          <span>STACK: RUST / FASTAPI / K8S</span>
        </div>
        <div tw="flex items-center">
          <span>SPEC 1200x630</span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GeistSans",
          data: geistSemiBold,
          weight: 600,
        },
        {
          name: "GeistMono",
          data: geistMonoRegular,
          weight: 400,
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=31536000, immutable",
      },
    }
  )
}
