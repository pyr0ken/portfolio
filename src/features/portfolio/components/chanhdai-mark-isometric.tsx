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
 * 3D Isometric "0x" Architectural Sculpture (Pure CAD Blueprint Schematic)
 * - Giant, towering curved stadium "0" with deep central negative-space cutout.
 * - Authentic 3D isometric "x" cross nestled directly into the lower-right flank of the "0".
 * - Staggered compact diagonal cascade along the 30° CAD axis (not spread wide horizontally).
 * - Pure monochrome zinc palette with metallic white cursor spotlight and spring bounce physics.
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

        {/* 3D Isometric Top Faces: Giant Curved '0' + Compact Interlocking 'x' */}
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
          {/* Giant Curved Stadium '0' with Deep Hollow Cutout */}
          <path d="M 138 48 Q 166.8 32 195 48 L 260 105 Q 277.6 128.6 260 150 L 195 240 Q 166.8 256.6 138 240 L 72 185 Q 55.9 160.6 72 140 Z M 150 80 Q 166.8 70 182 80 L 218 115 Q 226 128.6 218 140 L 182 180 Q 166.8 190 150 180 L 116 145 Q 108 128.6 116 115 Z" />
          {/* Authentic 3D Isometric 'x' Cross Nested Beside the '0' */}
          <path d="M 270 135 L 310 105 L 360 155 L 410 105 L 450 135 L 395 190 L 450 245 L 410 275 L 360 225 L 310 275 L 270 245 L 325 190 Z" />
        </motion.g>

        {/* Precision 1px Technical Wireframe Stroke Edges */}
        <motion.path
          id={ids.stroke}
          variants={{
            normal: {
              d: [
                // '0' Outer Curved Perimeter & Inner Hole
                "M 138 48 Q 166.8 32 195 48 L 260 105 Q 277.6 128.6 260 150 L 195 240 Q 166.8 256.6 138 240 L 72 185 Q 55.9 160.6 72 140 Z",
                "M 150 80 Q 166.8 70 182 80 L 218 115 Q 226 128.6 218 140 L 182 180 Q 166.8 190 150 180 L 116 145 Q 108 128.6 116 115 Z",
                // '0' Vertical Corner Drops & Curved Bottom Wireframes
                "M 72 185 V 217",
                "M 195 240 V 272",
                "M 260 150 V 182",
                "M 72 217 L 138 272 Q 166.8 288.6 195 272 L 260 182",
                "M 116 145 V 177 L 150 212 V 180",
                // 'x' 12 Outer Edges
                "M 270 135 L 310 105 L 360 155 L 410 105 L 450 135 L 395 190 L 450 245 L 410 275 L 360 225 L 310 275 L 270 245 L 325 190 Z",
                // 'x' Vertical Drops & Bottom Wireframes
                "M 270 245 V 277 L 310 307 V 275 L 360 257 V 225 L 410 307 V 275 L 450 277 V 245 L 395 222 V 190",
                "M 310 307 L 360 257 L 410 307",
                "M 450 135 V 167 L 395 222",
              ].join(" "),
            },
            pressed: {
              d: [
                // '0' (Pressed)
                "M 138 64 Q 166.8 48 195 64 L 260 121 Q 277.6 144.6 260 166 L 195 256 Q 166.8 272.6 138 256 L 72 201 Q 55.9 176.6 72 156 Z",
                "M 150 96 Q 166.8 86 182 96 L 218 131 Q 226 144.6 218 156 L 182 196 Q 166.8 206 150 196 L 116 161 Q 108 144.6 116 131 Z",
                "M 72 201 V 217",
                "M 195 256 V 272",
                "M 260 166 V 182",
                "M 72 217 L 138 272 Q 166.8 288.6 195 272 L 260 182",
                "M 116 161 V 177 L 150 212 V 196",
                // 'x' (Pressed)
                "M 270 151 L 310 121 L 360 171 L 410 121 L 450 151 L 395 206 L 450 261 L 410 291 L 360 241 L 310 291 L 270 261 L 325 206 Z",
                "M 270 261 V 277 L 310 307 V 291 L 360 257 V 241 L 410 307 V 291 L 450 277 V 261 L 395 222 V 206",
                "M 310 307 L 360 257 L 410 307",
                "M 450 151 V 167 L 395 222",
              ].join(" "),
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
            normal: {
              d: "M 72 140 L 72 185 L 138 240 Q 166.8 256.6 195 240 L 260 150 V 182 L 195 272 Q 166.8 288.6 138 272 L 72 217 Z",
            },
            pressed: {
              d: "M 72 156 L 72 201 L 138 256 Q 166.8 272.6 195 256 L 260 166 V 182 L 195 272 Q 166.8 288.6 138 272 L 72 217 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M 116 115 Q 108 128.6 116 145 L 150 180 V 212 L 116 177 Q 108 160.6 116 145 Z",
            },
            pressed: {
              d: "M 116 131 Q 108 144.6 116 161 L 150 196 V 212 L 116 177 Q 108 160.6 116 145 Z",
            },
          }}
          transition={transition}
        />

        {/* 'x' Extrusion Walls */}
        <motion.path
          variants={{
            normal: {
              d: "M 270 245 L 310 275 V 307 L 270 277 Z",
            },
            pressed: {
              d: "M 270 261 L 310 291 V 307 L 270 277 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M 310 275 L 360 225 V 257 L 310 307 Z",
            },
            pressed: {
              d: "M 310 291 L 360 241 V 257 L 310 307 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M 360 225 L 410 275 V 307 L 360 257 Z",
            },
            pressed: {
              d: "M 360 241 L 410 291 V 307 L 360 257 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M 410 275 L 450 245 V 277 L 410 307 Z",
            },
            pressed: {
              d: "M 410 291 L 450 261 V 277 L 410 307 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M 450 245 L 395 190 V 222 L 450 277 Z",
            },
            pressed: {
              d: "M 450 261 L 395 206 V 222 L 450 277 Z",
            },
          }}
          transition={transition}
        />
        <motion.path
          variants={{
            normal: {
              d: "M 450 135 L 395 190 V 222 L 450 167 Z",
            },
            pressed: {
              d: "M 450 151 L 395 206 V 222 L 450 167 Z",
            },
          }}
          transition={transition}
        />
      </g>

      {/* Top Hatch Surfaces */}
      <use href={`#${ids.faceFill}`} className="fill-background" />
      <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

      {/* Crisp 1px Technical Wireframe Edges (Base Gray + Dynamic Metallic White Spotlight) */}
      <use href={`#${ids.stroke}`} stroke="var(--stroke)" strokeWidth="1" />
      <use
        href={`#${ids.stroke}`}
        stroke={`url(#${ids.radialGradient})`}
        strokeWidth="1"
      />
    </motion.svg>
  )
}
