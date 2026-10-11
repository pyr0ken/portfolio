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
 * 3D Isometric Systems "0x" Monolith (Pure CAD Blueprint Schematic)
 * Features an extruded volumetric "0" with deep central cutout and an interlocking 3D "x" cross.
 * Includes interactive cursor tracking with pure metallic white spotlight and spring tap physics.
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

        {/* 3D Isometric Top Faces for '0' (Hollow Ring) and 'x' (Cross) */}
        <motion.g
          id={ids.faceFill}
          variants={{
            normal: { y: 0 },
            pressed: { y: 16 },
          }}
          transition={transition}
          fillRule="evenodd"
          clipRule="evenodd"
        >
          {/* Top Planar Face of '0' with Central Void Cutout */}
          <path d="M111.35 32.58 L222.20 96.58 L111.35 224.58 L0.50 160.58 Z M111.35 96.58 L166.78 128.58 L111.35 160.58 L55.93 128.58 Z" />
          {/* Top Planar Face of 'x' (Isometric Cross with 12 Interlocking Vertices) */}
          <path d="M277.63 96.58 L333.05 64.58 L388.48 128.58 L443.90 64.58 L499.33 96.58 L443.90 160.58 L499.33 224.58 L443.90 256.58 L388.48 192.58 L333.05 256.58 L277.63 224.58 L333.05 160.58 Z" />
        </motion.g>

        {/* 1px Technical Wireframe Stroke Edges */}
        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: [
                // '0' Outer Loop & Inner Hole
                "M111.35 32.58 L222.20 96.58 L111.35 224.58 L0.50 160.58 Z",
                "M111.35 96.58 L166.78 128.58 L111.35 160.58 L55.93 128.58 Z",
                // '0' Vertical Corner Drops
                "M0.50 160.58 V192.58 L111.35 256.58 V224.58 L222.20 96.58 V128.58 L111.35 256.58",
                "M55.93 128.58 V160.58 L111.35 128.58 V96.58",
                // 'x' 12 Outer Edges
                "M277.63 96.58 L333.05 64.58 L388.48 128.58 L443.90 64.58 L499.33 96.58 L443.90 160.58 L499.33 224.58 L443.90 256.58 L388.48 192.58 L333.05 256.58 L277.63 224.58 L333.05 160.58 Z",
                // 'x' Vertical Corner Drops
                "M277.63 224.58 V256.58 L333.05 288.58 V256.58 L388.48 192.58 V224.58 L443.90 256.58 V288.58 L499.33 224.58 V256.58",
                "M443.90 160.58 V192.58 L499.33 224.58",
                "M499.33 96.58 V128.58 L443.90 160.58",
              ].join(""),
            },
            pressed: {
              d: [
                // '0' Pressed
                "M111.35 48.58 L222.20 112.58 L111.35 240.58 L0.50 176.58 Z",
                "M111.35 112.58 L166.78 144.58 L111.35 176.58 L55.93 144.58 Z",
                "M0.50 176.58 V192.58 L111.35 256.58 V240.58 L222.20 112.58 V128.58 L111.35 256.58",
                "M55.93 144.58 V160.58 L111.35 144.58 V112.58",
                // 'x' Pressed
                "M277.63 112.58 L333.05 80.58 L388.48 144.58 L443.90 80.58 L499.33 112.58 L443.90 176.58 L499.33 240.58 L443.90 272.58 L388.48 208.58 L333.05 272.58 L277.63 240.58 L333.05 176.58 Z",
                "M277.63 240.58 V256.58 L333.05 288.58 V272.58 L388.48 208.58 V224.58 L443.90 272.58 V288.58 L499.33 240.58 V256.58",
                "M443.90 176.58 V192.58 L499.33 240.58",
                "M499.33 112.58 V128.58 L443.90 176.58",
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
          r="210"
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

      {/* Dashed Architectural Projection Construction Axes */}
      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        <path d="M-477.55 756.57L1254.51 -243.41" />
        <path d="M977.37 788.58L-754.67 -211.42" />
        <path d="M1143.65 692.58L-588.39 -307.42" />
      </g>

      {/* Solid Vertical Wall Facets (True CAD Matte Shading) */}
      <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
        {/* '0' Extrusion Walls */}
        <motion.path
          variants={{
            normal: { d: "M0.50 160.58 L111.35 224.58 V256.58 L0.50 192.58 Z" },
            pressed: {
              d: "M0.50 176.58 L111.35 240.58 V256.58 L0.50 192.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M111.35 224.58 L222.20 96.58 V128.58 L111.35 256.58 Z",
            },
            pressed: {
              d: "M111.35 240.58 L222.20 112.58 V128.58 L111.35 256.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M55.93 128.58 L111.35 96.58 V128.58 L55.93 160.58 Z",
            },
            pressed: {
              d: "M55.93 144.58 L111.35 112.58 V128.58 L55.93 160.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M111.35 96.58 L166.78 128.58 V160.58 L111.35 128.58 Z",
            },
            pressed: {
              d: "M111.35 112.58 L166.78 144.58 V160.58 L111.35 144.58 Z",
            },
          }}
          transition={transition}
        />

        {/* 'x' Extrusion Walls */}
        <motion.path
          variants={{
            normal: {
              d: "M277.63 224.58 L333.05 256.58 V288.58 L277.63 256.58 Z",
            },
            pressed: {
              d: "M277.63 240.58 L333.05 272.58 V288.58 L277.63 256.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M333.05 256.58 L388.48 192.58 V224.58 L333.05 288.58 Z",
            },
            pressed: {
              d: "M333.05 272.58 L388.48 208.58 V224.58 L333.05 288.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M388.48 192.58 L443.90 256.58 V288.58 L388.48 224.58 Z",
            },
            pressed: {
              d: "M388.48 208.58 L443.90 272.58 V288.58 L388.48 224.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M443.90 256.58 L499.33 224.58 V256.58 L443.90 288.58 Z",
            },
            pressed: {
              d: "M443.90 272.58 L499.33 240.58 V256.58 L443.90 288.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M499.33 224.58 L443.90 160.58 V192.58 L499.33 256.58 Z",
            },
            pressed: {
              d: "M499.33 240.58 L443.90 176.58 V192.58 L499.33 256.58 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M499.33 96.58 L443.90 160.58 V192.58 L499.33 128.58 Z",
            },
            pressed: {
              d: "M499.33 112.58 L443.90 176.58 V192.58 L499.33 128.58 Z",
            },
          }}
          transition={transition}
        />
      </g>

      {/* Top Hatch Surfaces */}
      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      {/* Crisp 1px Technical Wireframe Strokes (Base Gray + Dynamic White Spotlight) */}
      <use href={`#${ids.stroke}`} stroke="var(--stroke)" strokeWidth="1" />
      <use
        href={`#${ids.stroke}`}
        stroke={`url(#${ids.radialGradient})`}
        strokeWidth="1"
      />
    </motion.svg>
  )
}
