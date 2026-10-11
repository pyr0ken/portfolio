export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      aria-hidden
      {...props}
    >
      {/* Terminal Prompt Chevron `>` and Underscore `_` (Pixel-Perfect Symmetric) */}
      <path
        fill="currentColor"
        d="M 72 44 L 198 128 L 72 212 L 122 212 L 248 128 L 122 44 Z M 280 180 H 440 V 212 H 280 Z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="currentColor" d="M 36 22 L 99 64 L 36 106 L 61 106 L 124 64 L 61 22 Z M 140 90 H 220 V 106 H 140 Z"/></svg>`
}
