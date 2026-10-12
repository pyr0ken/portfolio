"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

const VIEWBOX_WIDTH = 1410

const PYR0KEN_LOGOTYPE_PATH =
  "M49 65H81V257H49V65ZM81 65H209V97H81V65ZM177 97H209V129H177V97ZM81 129H209V161H81V129ZM241 65H273V129H241V65ZM241 129H401V161H241V129ZM369 65H401V257H369V65ZM241 225H369V257H241V225ZM433 65H465V257H433V65ZM465 65H593V97H465V65ZM561 97H593V129H561V97ZM657 1H753V33H657V1ZM625 33H657V65H625V33ZM753 33H785V65H753V33ZM625 65H657V193H625V65ZM753 65H785V193H753V65ZM625 193H657V225H625V193ZM753 193H785V225H753V193ZM657 225H753V257H657V225ZM721 65H753V97H721V65ZM689 97H721V161H689V97ZM657 161H689V193H657V161ZM817 1H849V257H817V1ZM849 129H881V161H849V129ZM881 97H913V129H881V97ZM913 65H945V97H913V65ZM945 33H977V65H945V33ZM881 161H913V193H881V161ZM913 193H945V225H913V193ZM945 225H977V257H945V225ZM1041 65H1137V97H1041V65ZM1137 97H1169V129H1137V97ZM1009 129H1169V161H1009V129ZM1009 65H1041V225H1009V65ZM1041 193H1169V225H1041V193ZM1201 65H1233V257H1201V65ZM1233 65H1361V97H1233V65ZM1329 97H1361V257H1329V97Z"

export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion()

  const gradientX1Raw = useMotionValue(0.5)
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, VIEWBOX_WIDTH]),
    {
      stiffness: 150,
      damping: 25,
    }
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const containerRect = event.currentTarget.getBoundingClientRect()
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    )
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return
    gradientX1Raw.set(0.5)
  }

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[37.5%] items-center justify-center">
          <svg
            className="container size-full"
            viewBox="0 0 1410 258"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="pyr0ken"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={PYR0KEN_LOGOTYPE_PATH}
              fill="url(#paint0_linear_1145_73)"
            />
            <path
              className="stroke-foreground/10"
              d={PYR0KEN_LOGOTYPE_PATH}
              strokeWidth="2"
            />
            <defs>
              <motion.linearGradient
                id="paint0_linear_1145_73"
                x1={gradientX1}
                y1="1"
                x2="705"
                y2="257"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        aria-hidden
      />
    </div>
  )
}
