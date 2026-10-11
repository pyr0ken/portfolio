export function ChanhDaiMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      aria-hidden
      {...props}
    >
      {/* 0x Systems Mark (Blocky Monospace 0 and X with Central Cutout) */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 64 48 H 208 V 208 H 64 Z M 108 88 H 164 V 168 H 108 Z M 280 48 L 336 48 L 364 96 L 392 48 L 448 48 L 396 128 L 448 208 L 392 208 L 364 160 L 336 208 L 280 208 L 332 128 Z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M 32 24 H 104 V 104 H 32 Z M 54 44 H 82 V 84 H 54 Z M 140 24 L 168 24 L 182 48 L 196 24 L 224 24 L 198 64 L 224 104 L 196 104 L 182 80 L 168 104 L 140 104 L 166 64 Z"/></svg>`
}
