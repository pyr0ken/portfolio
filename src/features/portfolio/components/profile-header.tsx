"use client"

import { useState } from "react"

import { ShimmeringText } from "@/registry/components/shimmering-text"
import { USER } from "@/features/portfolio/data/user"

import { FlipSentences } from "./flip-sentences"
import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="screen-line-bottom grid grid-cols-[auto_1fr] overflow-y-clip border-x screen-line-bottom-border after:z-1">
      <div className="flex flex-col border-r border-line">
        <div className="flex items-center justify-center p-3 sm:p-4">
          <div className="relative size-24 rounded-full min-[24rem]:size-28 sm:size-36">
            <img
              className="block size-full rounded-[inherit] object-cover select-none dark:hidden"
              src={USER.avatarSketch}
              alt="Avatar with sketch style in light mode"
            />
            <img
              className="hidden size-full rounded-[inherit] object-cover select-none dark:block"
              src={USER.avatar}
              alt="Avatar in dark mode"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] inset-ring-1 inset-ring-foreground/30 dark:inset-ring-foreground/10" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div
          className="group flex h-full cursor-pointer items-center gap-2 p-4 select-none sm:px-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-2xl font-medium tracking-tight transition-transform duration-200 group-hover:scale-[1.01] sm:text-[2rem]/none">
            <ShimmeringText
              text={USER.displayName}
              isStopped={!isHovered}
              duration={0.8}
              className="[--color:var(--foreground)] [--shimmering-color:#ffffff] dark:[--shimmering-color:#f4f4f5]"
            />
          </h1>

          <VerifiedIcon
            className="size-4.5 shrink-0 transition-transform duration-300 select-none group-hover:scale-125 group-hover:text-sky-400"
            aria-hidden
          />

          {USER.namePronunciationUrl && (
            <PronounceMyName namePronunciationUrl={USER.namePronunciationUrl} />
          )}
        </div>

        <FlipSentences className="flex h-12 items-center border-t border-line px-4 py-2 sm:h-10 sm:px-6">
          {USER.flipSentences}
        </FlipSentences>
      </div>
    </div>
  )
}
