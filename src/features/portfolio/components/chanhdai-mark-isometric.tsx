"use client"

import { useEffect, useId, useRef } from "react"
import type { Transition } from "motion/react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { metalClickSound } from "@/lib/soundcn/metal-click"
import { useSound } from "@/hooks/soundcn/use-sound"

const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 18,
  stiffness: 200,
}

/**
 * 3D Isometric Systems Terminal Prompt (`>_`)
 * Follows mouse cursor with radial spotlight reflection and animated spring physics on click.
 */
export function ChanhDaiMarkIsometric() {
  const id = useId()
  const ids = {
    facePattern: `pyr0ken-face-pattern-${id}`,
    faceFill: `pyr0ken-face-fill-${id}`,
    stroke: `pyr0ken-stroke-${id}`,
    radialGradient: `pyr0ken-radial-gradient-${id}`,
  }

  const ref = useRef<SVGSVGElement>(null)
  const [play] = useSound(metalClickSound)

  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { margin: "80px" })

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
    stiffness: 300,
    damping: 30,
    mass: 0.1,
  })

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return
    if (window.matchMedia("(hover: none)").matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [shouldReduceMotion, isInView, mouseX, mouseY])

  return (
    <motion.svg
      ref={ref}
      className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
      viewBox="0 0 556 354"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial="normal"
      whileTap="pressed"
      onTap={() => play()}
    >
      <defs>
        <pattern
          id={ids.facePattern}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="var(--pattern)"
            strokeWidth="1"
          />
        </pattern>

        {/* 3D Isometric Top Faces for Terminal Prompt `>` and `_` */}
        <motion.g
          id={ids.faceFill}
          variants={{
            normal: { y: 0 },
            pressed: { y: 16 },
          }}
          transition={transition}
        >
          {/* Top Face of Chevron `>` */}
          <path d="M55.93 64.58 L222.20 160.58 L55.93 256.58 L111.35 256.58 L277.63 160.58 L111.35 64.58 Z" />
          {/* Top Face of Underscore `_` */}
          <path d="M333.05 224.58 L499.33 224.58 L499.33 256.58 L333.05 256.58 Z" />
        </motion.g>

        {/* 3D Isometric Wireframe Edges */}
        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: [
                // Chevron `>` top and side edges
                "M55.93 64.58 L222.20 160.58 L55.93 256.58 L111.35 256.58 L277.63 160.58 L111.35 64.58 Z",
                "M55.93 256.58 V288.58 L111.35 288.58 V256.58",
                "M222.20 160.58 V192.58 L277.63 192.58 V160.58",
                "M111.35 288.58 L277.63 192.58",
                // Underscore `_` top and side edges
                "M333.05 224.58 L499.33 224.58 L499.33 256.58 L333.05 256.58 Z",
                "M333.05 256.58 V288.58 L499.33 288.58 V256.58",
                "M499.33 288.58 V256.58",
              ].join(""),
            },
            pressed: {
              d: [
                // Compressed when clicked
                "M55.93 80.58 L222.20 176.58 L55.93 272.58 L111.35 272.58 L277.63 176.58 L111.35 80.58 Z",
                "M55.93 272.58 V288.58 L111.35 288.58 V272.58",
                "M222.20 176.58 V192.58 L277.63 192.58 V176.58",
                "M111.35 288.58 L277.63 192.58",
                "M333.05 240.58 L499.33 240.58 L499.33 272.58 L333.05 272.58 Z",
                "M333.05 272.58 V288.58 L499.33 288.58 V272.58",
                "M499.33 288.58 V272.58",
              ].join(""),
            },
          }}
          transition={transition}
        />

        {/* Dynamic Cursor Spotlight Radial Gradient */}
        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#38bdf8]"
            stopColor="var(--color-sky-500)"
          />
          <stop
            className="dark:[stop-color:var(--color-sky-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      {/* Grid Guide Lines */}
      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />
        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      {/* 3D Extrusion Side Wall Faces */}
      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        <motion.path
          variants={{
            normal: {
              d: "M55.93 256.58 L111.35 256.58 V288.58 L55.93 288.58 Z",
            },
            pressed: {
              d: "M55.93 272.58 L111.35 272.58 V288.58 L55.93 288.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M111.35 256.58 L277.63 160.58 V192.58 L111.35 288.58 Z",
            },
            pressed: {
              d: "M111.35 272.58 L277.63 176.58 V192.58 L111.35 288.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M333.05 256.58 L499.33 256.58 V288.58 L333.05 288.58 Z",
            },
            pressed: {
              d: "M333.05 272.58 L499.33 272.58 V288.58 L333.05 288.58 Z",
            },
          }}
          transition={transition}
        />
      </g>

      {/* Top Hatch Surfaces */}
      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      {/* Wireframe Strokes & Spotlight Highlights */}
      <use href={`#${ids.stroke}`} stroke="var(--stroke)" strokeWidth="1.5" />
      <use
        href={`#${ids.stroke}`}
        stroke={`url(#${ids.radialGradient})`}
        strokeWidth="1.5"
      />
    </motion.svg>
  )
}
