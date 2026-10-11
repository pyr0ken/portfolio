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
 * 3D Isometric "0x" Architectural Sculpture (Pure Monochrome CAD Schematic)
 * Features a giant, towering hollow "0" loop in the upper quadrant and an interlocking,
 * sweeping angled "x" bracket wrapping tightly along the lower-left diagonal axis.
 * Retains compact staggered composition, metallic white spotlight, and spring bounce physics.
 */
export function ChanhDaiMarkIsometric() {
  const id = useId()
  const ids = {
    facePattern: `ox-face-pattern-${id}`,
    faceFill: `ox-face-fill-${id}`,
    stroke: `ox-stroke-${id}`,
    radialGradient: `ox-radial-gradient-${id}`,
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
        {/* Technical Architectural Diagonal Cross-Hatch Pattern */}
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

        {/* 3D Isometric Top Faces: Giant '0' Loop + Wrapped Stepped 'x' Cradle */}
        <motion.g
          id={ids.faceFill}
          variants={{
            normal: { y: 0 },
            pressed: { y: 16 },
          }}
          transition={transition}
        >
          {/* Lower Wrapped 'x' Cradle - Stepped Base Tier 1 */}
          <path d="M333.05 256.58L222.20 320.58L166.78 288.58L277.63 224.58L333.05 256.58Z" />
          {/* THE GIANT HOLLOW '0' RING (Towering Upper-Center Monolith) */}
          <path d="M388.48 32.58L277.63 96.58L388.48 160.58L499.33 96.58L554.76 128.58L388.48 224.58L166.78 96.58L333.05 0.58L388.48 32.58Z" />
          {/* Lower Wrapped 'x' Cradle - Curved Step Tier 2 */}
          <path d="M166.78 288.58L111.35 320.58L0.50 256.58L55.93 224.58L166.78 288.58Z" />
          {/* Upper Right Corner Bevel of '0' */}
          <path d="M554.76 64.58L499.33 96.58L388.48 32.58L443.90 0.58L554.76 64.58Z" />
          {/* Lower Wrapped 'x' Cradle - Ascending Wing Tier 3 */}
          <path d="M166.78 160.58L55.93 224.58L0.50 192.58L111.35 128.58L166.78 160.58Z" />
        </motion.g>

        {/* Precision 1px Technical Wireframe Stroke Edges */}
        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: [
                // Lower Wrapped 'x' Cradle (Curved & Stepped)
                "M28.21 240.58 L0.50 224.58 V192.58 L111.35 128.58 L166.78 160.58 V192.58 L83.64 240.58",
                "M166.78 160.58 L0.50 256.58 V288.58 L111.35 352.58 L166.78 320.58 L222.20 352.58 L333.05 288.58 V256.58 L277.63 224.58 L166.78 288.58 L0.50 192.58",
                "M0.50 256.58 L111.35 320.58 L166.78 288.58 L222.20 320.58 L333.05 256.58",
                "M111.35 320.58 V352.58",
                "M166.78 288.58 V320.58",
                "M222.20 320.58 V352.58",
                // Crossing Isometric 'x' Internal Ribs
                "M55.93 224.58 L222.20 320.58",
                "M111.35 352.58 L277.63 224.58",
                // Giant Towering '0' Outer Ring and Deep Hollow Window
                "M499.33 96.58 L554.76 128.58 V160.58 L388.48 256.58 L166.78 128.58 V96.58 L333.05 0.58 L499.33 96.58",
                "M166.78 96.58 L388.48 224.58 L554.76 128.58",
                "M527.04 112.58 L554.76 96.58 V64.58 L443.90 0.58 L277.63 96.58 L388.48 160.58 L554.76 64.58",
                "M305.34 112.58 L388.48 64.58 L471.62 112.58",
                "M388.48 224.58 V256.58",
                "M388.48 32.58 V64.58",
              ].join(""),
            },
            pressed: {
              d: [
                // Lower Wrapped 'x' Cradle (Pressed)
                "M42.07 248.58 L0.50 224.58 V208.58 L111.35 144.58 L166.78 176.58 V192.58 L69.78 248.58",
                "M166.78 176.58 L0.5 272.58 V288.58 L111.35 352.58 L166.78 320.58 L222.20 352.58 L333.05 288.58 V272.58 L277.63 240.58 L166.78 304.58 L0.5 208.58",
                "M0.5 272.58 L111.35 336.58 L166.78 304.58 L222.20 336.58 L333.05 272.58",
                "M111.35 336.58 V352.58",
                "M166.78 304.58 V320.58",
                "M222.20 336.58 V352.58",
                "M55.93 240.58 L222.20 336.58",
                "M111.35 352.58 L277.63 240.58",
                // Giant Towering '0' (Pressed)
                "M499.33 112.58 L554.76 144.58 V160.58 L388.48 256.58 L166.78 128.58 V112.58 L333.05 16.58 L499.33 112.58",
                "M166.78 112.58 L388.48 240.58 L554.76 144.58",
                "M513.19 120.58 L554.76 96.58 V80.58 L443.90 16.58 L277.63 112.58 L388.48 176.58 L554.76 80.58",
                "M291.48 120.58 L388.48 64.58 L485.47 120.58",
                "M388.48 240.58 V256.58",
                "M388.48 48.58 V64.58",
              ].join(""),
            },
          }}
          transition={transition}
        />

        {/* Pure Monochrome Metallic White Radial Spotlight */}
        <motion.radialGradient
          id={ids.radialGradient}
          cx={cx}
          cy={cy}
          r="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            className="dark:[stop-color:#ffffff]"
            stopColor="var(--color-zinc-700)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-600)]"
            offset="1"
            stopColor="var(--color-zinc-400)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      {/* Dashed Architectural Projection / Vanishing Guideline Axes */}
      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />
        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      {/* Solid Vertical Wall Facets (True CAD Matte Shading) */}
      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        <motion.path
          variants={{
            normal: {
              d: "M166.78 160.58L55.93 224.58L0.50 192.58V224.58L55.93 256.58L166.78 192.58V160.58Z",
            },
            pressed: {
              d: "M166.78 176.58L55.93 240.58L0.50 208.58V224.58L55.93 256.58L166.78 192.58V176.58Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M166.78 288.58L111.35 320.58L0.50 256.58V288.58L111.35 352.58L166.78 320.58L222.20 352.58L333.05 288.58V256.58L222.20 320.58L166.78 288.58Z",
            },
            pressed: {
              d: "M166.78 304.58L111.35 336.58L0.50 272.58V288.58L111.35 352.58L166.78 320.58L222.20 352.58L333.05 288.58V272.58L222.20 336.58L166.78 304.58Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M388.48 224.58L166.78 96.58V128.58L388.48 256.58L554.76 160.58V128.58L388.48 224.58Z",
            },
            pressed: {
              d: "M388.48 240.58L166.78 112.58V128.58L388.48 256.58L554.76 160.58V144.58L388.48 240.58Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M388.48 32.58L277.63 96.58V128.58L388.48 64.58L499.33 128.58L554.75 96.58V64.58L499.33 96.58L388.48 32.58Z",
            },
            pressed: {
              d: "M388.48 48.58L277.63 112.58V128.58L388.48 64.58L499.33 128.58L554.75 96.58V80.58L499.33 112.58L388.48 48.58Z",
            },
          }}
          transition={transition}
        />
      </g>

      {/* Top Hatch Surfaces */}
      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      {/* Crisp Technical Wireframe Edges (Base Gray + Dynamic Metallic White Spotlight) */}
      <use href={`#${ids.stroke}`} stroke="var(--stroke)" strokeWidth="1" />
      <use
        href={`#${ids.stroke}`}
        stroke={`url(#${ids.radialGradient})`}
        strokeWidth="1"
      />
    </motion.svg>
  )
}
