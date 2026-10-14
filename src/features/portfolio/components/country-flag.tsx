import type { ComponentProps } from "react"
import { MapPinIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CountryFlagProps = ComponentProps<"span"> & {
  location?: string
}

function detectCountryCode(loc?: string): string | null {
  if (!loc) return null
  const s = loc.toLowerCase()
  if (
    s.includes("iran") ||
    s.includes("tehran") ||
    s.includes("ایران") ||
    s.includes("تهران")
  )
    return "ir"
  if (s.includes("finland") || s.includes("helsinki") || s.includes("فنلاند"))
    return "fi"
  if (
    s.includes("germany") ||
    s.includes("deutschland") ||
    s.includes("berlin") ||
    s.includes("آلمان")
  )
    return "de"
  if (
    s.includes("united kingdom") ||
    s.includes("great britain") ||
    s.includes("london") ||
    s.includes("england") ||
    /\buk\b/.test(s)
  )
    return "gb"
  if (
    s.includes("united states") ||
    s.includes("usa") ||
    /\bus\b/.test(s) ||
    s.includes("america")
  )
    return "us"
  if (s.includes("canada") || s.includes("toronto") || s.includes("کانادا"))
    return "ca"
  if (s.includes("france") || s.includes("paris") || s.includes("فرانسه"))
    return "fr"
  if (
    s.includes("netherlands") ||
    s.includes("amsterdam") ||
    s.includes("holland") ||
    s.includes("هلند")
  )
    return "nl"
  if (s.includes("sweden") || s.includes("stockholm") || s.includes("سوئد"))
    return "se"
  if (s.includes("switzerland") || s.includes("سوئیس")) return "ch"
  if (
    s.includes("emirates") ||
    s.includes("uae") ||
    s.includes("dubai") ||
    s.includes("امارات")
  )
    return "ae"
  if (
    s.includes("turkey") ||
    s.includes("türkiye") ||
    s.includes("istanbul") ||
    s.includes("ترکیه")
  )
    return "tr"
  return null
}

export function CountryFlag({
  location,
  className,
  ...props
}: CountryFlagProps) {
  const code = detectCountryCode(location)

  switch (code) {
    case "ir":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#239f40" d="M0 0h640v160H0z" />
            <path fill="#ffffff" d="M0 160h640v160H0z" />
            <path fill="#da0000" d="M0 320h640v160H0z" />
            <g fill="#da0000" transform="translate(80) scale(0.9375)">
              <path d="M279.8 197.5c8.4 10.4 34.5 67.6-15.7 105.2-23.7 17.8-9 18.6-8.3 21.6 38-20.1 50.3-47.5 50-72-.2-24.4-13.2-46-26-54.8" />
              <path d="M284.8 194.8a73.3 73.3 0 0 1 15.7 112.4c27.2-6 62-86.4-15.7-112.4m-57.6 0a73.3 73.3 0 0 0-15.6 112.4c-27.3-6-62-86.4 15.6-112.4" />
              <path d="M232.2 197.5c-8.4 10.4-34.5 67.6 15.7 105.2 23.6 17.8 9 18.6 8.3 21.6-38-20.1-50.3-47.5-50-72 .2-24.4 13.2-46 26-54.8" />
              <path d="M304.2 319.1c-14.9.2-33.6-2-47.5-9.3 2.3 4.5 4.2 7.3 6.5 11.7 13.2 1.3 31.5 2.8 41-2.4m-95 0c14.9.2 33.6-2 47.5-9.3-2.3 4.5-4.2 7.3-6.5 11.7-13.2 1.3-31.5 2.8-41-2.4m27.3-138.7c3 8 10.9 9.2 19.3 4.5 6.2 3.6 15.7 3.9 19-4.1 2.5 19.8-18.3 15-19 11.2-7.8 7.5-22.2 3.2-19.3-11.6" />
              <path d="m256.4 331.6 7.8-9 1.1-120.1-9.3-8.2-9.3 7.8 1.9 121z" />
            </g>
          </svg>
        </span>
      )
    case "fi":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#fff" d="M0 0h640v480H0z" />
            <path fill="#002f6c" d="M0 174.5h640v131H0z" />
            <path fill="#002f6c" d="M175.5 0h130.9v480h-131z" />
          </svg>
        </span>
      )
    case "de":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#fc0" d="M0 320h640v160H0z" />
            <path fill="#000001" d="M0 0h640v160H0z" />
            <path fill="red" d="M0 160h640v160H0z" />
          </svg>
        </span>
      )
    case "gb":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#012169" d="M0 0h640v480H0z" />
            <path
              fill="#FFF"
              d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"
            />
            <path
              fill="#C8102E"
              d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"
            />
            <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
            <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
          </svg>
        </span>
      )
    case "us":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#bd3d44" d="M0 0h640v480H0" />
            <path
              stroke="#fff"
              stroke-width="37"
              d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
            />
            <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
            <marker id="us-a" markerHeight="30" markerWidth="30">
              <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z" />
            </marker>
            <path
              fill="none"
              marker-mid="url(#us-a)"
              d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60z"
            />
          </svg>
        </span>
      )
    case "ca":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#fff" d="M150.1 0h339.7v480H150z" />
            <path
              fill="#d52b1e"
              d="M-19.7 0h169.8v480H-19.7zm509.5 0h169.8v480H489.9zM201 232l-13.3 4.4 61.4 54c4.7 13.7-1.6 17.8-5.6 25l66.6-8.4-1.6 67 13.9-.3-3.1-66.6 66.7 8c-4.1-8.7-7.8-13.3-4-27.2l61.3-51-10.7-4c-8.8-6.8 3.8-32.6 5.6-48.9 0 0-35.7 12.3-38 5.8l-9.2-17.5-32.6 35.8c-3.5.9-5-.5-5.9-3.5l15-74.8-23.8 13.4q-3.2 1.3-5.2-2.2l-23-46-23.6 47.8q-2.8 2.5-5 .7L264 130.8l13.7 74.1c-1.1 3-3.7 3.8-6.7 2.2l-31.2-35.3c-4 6.5-6.8 17.1-12.2 19.5s-23.5-4.5-35.6-7c4.2 14.8 17 39.6 9 47.7"
            />
          </svg>
        </span>
      )
    case "fr":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#000091" d="M0 0h213.3v480H0z" />
            <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
            <path fill="#e1000f" d="M426.7 0H640v480H426.7z" />
          </svg>
        </span>
      )
    case "nl":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#ae1c28" d="M0 0h640v160H0z" />
            <path fill="#fff" d="M0 160h640v160H0z" />
            <path fill="#21468b" d="M0 320h640v160H0z" />
          </svg>
        </span>
      )
    case "se":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#005293" d="M0 0h640v480H0z" />
            <path
              fill="#fecb00"
              d="M176 0v192H0v96h176v192h96V288h368v-96H272V0z"
            />
          </svg>
        </span>
      )
    case "ch":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <g fill-rule="evenodd" stroke-width="1pt">
              <path fill="red" d="M0 0h640v480H0z" />
              <g fill="#fff">
                <path d="M170 195h300v90H170z" />
                <path d="M275 90h90v300h-90z" />
              </g>
            </g>
          </svg>
        </span>
      )
    case "ae":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <path fill="#00732f" d="M0 0h640v160H0z" />
            <path fill="#fff" d="M0 160h640v160H0z" />
            <path fill="#000001" d="M0 320h640v160H0z" />
            <path fill="red" d="M0 0h220v480H0z" />
          </svg>
        </span>
      )
    case "tr":
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[2px] ring-1 ring-border/60",
            className
          )}
          title={location}
          {...props}
        >
          <svg
            viewBox="0 0 640 480"
            className="size-full object-cover"
            aria-hidden
          >
            <g fill-rule="evenodd">
              <path fill="#e30a17" d="M0 0h640v480H0z" />
              <path
                fill="#fff"
                d="M407 247.5c0 66.2-54.6 119.9-122 119.9s-122-53.7-122-120 54.6-119.8 122-119.8 122 53.7 122 119.9"
              />
              <path
                fill="#e30a17"
                d="M413 247.5c0 53-43.6 95.9-97.5 95.9s-97.6-43-97.6-96 43.7-95.8 97.6-95.8 97.6 42.9 97.6 95.9z"
              />
              <path
                fill="#fff"
                d="m430.7 191.5-1 44.3-41.3 11.2 40.8 14.5-1 40.7 26.5-31.8 40.2 14-23.2-34.1 28.3-33.9-43.5 12-25.8-37z"
              />
            </g>
          </svg>
        </span>
      )
    default:
      return (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center text-muted-foreground/80",
            className
          )}
          title={location}
          {...props}
        >
          <MapPinIcon className="size-full" aria-hidden />
        </span>
      )
  }
}
